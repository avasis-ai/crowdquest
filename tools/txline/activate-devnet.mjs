import { createHash } from "node:crypto";
import { chmod, readFile, writeFile } from "node:fs/promises";
import { isAbsolute } from "node:path";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import nacl from "tweetnacl";

const RPC_URL = process.env.TXLINE_RPC_URL || "https://api.devnet.solana.com";
const TXLINE_ORIGIN = process.env.TXLINE_ORIGIN || "https://txline-dev.txodds.com";
const FIXTURE_ID = Number(process.env.TXLINE_FIXTURE_ID || "18209181");
const WALLET_PATH = process.env.TXLINE_WALLET_PATH;
const OUTPUT_FILE = process.env.TXLINE_OUTPUT_FILE;
const PROGRAM_ID = new PublicKey("6pW64gN1s2uqjHkn1unFeEjAwJkPGHoppGvS715wyP2J");
const TOKEN_MINT = new PublicKey("4Zao8ocPhmMgq7PdsYWyxvqySMGx7xb9cMftPMkEokRG");
const DEVNET_GENESIS_HASH = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG";
const IDL_URL = "https://raw.githubusercontent.com/txodds/tx-on-chain/5098017650532818dfab23977196930fcccce0f6/examples/devnet/idl/txoracle.json";
const IDL_SHA256 = "1e7d55726eda9ad4d6ef62910fe5d7e007c687f4ff8b1c771a42b69b7089724e";

if (!WALLET_PATH) fail("TXLINE_WALLET_PATH is required");
if (!OUTPUT_FILE || !isAbsolute(OUTPUT_FILE)) fail("TXLINE_OUTPUT_FILE must be an absolute path outside the repository");
if (!Number.isSafeInteger(FIXTURE_ID) || FIXTURE_ID <= 0) fail("TXLINE_FIXTURE_ID must be a positive integer");

const walletBytes = Uint8Array.from(JSON.parse(await readFile(WALLET_PATH, "utf8")));
const payer = Keypair.fromSecretKey(walletBytes);
const connection = new Connection(RPC_URL, "confirmed");
const genesisHash = await connection.getGenesisHash();
if (genesisHash !== DEVNET_GENESIS_HASH) fail("RPC is not Solana devnet; refusing to sign");

const idlResponse = await fetch(IDL_URL, { signal: AbortSignal.timeout(20_000) });
if (!idlResponse.ok) fail(`Could not download the pinned TxLINE IDL (${idlResponse.status})`);
const idlText = await idlResponse.text();
if (createHash("sha256").update(idlText).digest("hex") !== IDL_SHA256) fail("Pinned TxLINE IDL hash mismatch");
const idl = JSON.parse(idlText);
if (idl.address !== PROGRAM_ID.toBase58()) fail("Pinned IDL program address mismatch");

const wallet = {
  payer,
  publicKey: payer.publicKey,
  async signTransaction(transaction) { transaction.partialSign(payer); return transaction; },
  async signAllTransactions(transactions) { for (const transaction of transactions) transaction.partialSign(payer); return transactions; },
};
const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
const program = new Program(idl, provider);

const balance = await connection.getBalance(payer.publicKey, "confirmed");
if (balance < 5_000_000) {
  fail(`Wallet needs at least 0.005 devnet SOL for account rent and fees; current balance is ${(balance / 1e9).toFixed(6)}. Use the official Solana faucet or devnet-pow.`);
}

const [pricingMatrix] = PublicKey.findProgramAddressSync([Buffer.from("pricing_matrix")], PROGRAM_ID);
const matrix = await program.account.pricingMatrix.fetch(pricingMatrix);
const freeRow = matrix.rows.find((row) => Number(row.rowId) === 1);
if (!freeRow) fail("TxLINE service level 1 is absent from the on-chain pricing matrix");
if (freeRow.pricePerWeekToken.toString() !== "0") fail("TxLINE service level 1 is not free; refusing to spend tokens");

const jwtResponse = await fetch(`${TXLINE_ORIGIN}/auth/guest/start`, {
  method: "POST",
  signal: AbortSignal.timeout(20_000),
});
if (!jwtResponse.ok) fail(`TxLINE guest auth failed (${jwtResponse.status})`);
const { token: jwt } = await jwtResponse.json();
if (!jwt) fail("TxLINE guest auth returned no token");

const userTokenAccount = getAssociatedTokenAddressSync(TOKEN_MINT, payer.publicKey, false, TOKEN_2022_PROGRAM_ID);
if (!await connection.getAccountInfo(userTokenAccount, "confirmed")) {
  const createAccount = new Transaction().add(createAssociatedTokenAccountInstruction(
    payer.publicKey,
    userTokenAccount,
    payer.publicKey,
    TOKEN_MINT,
    TOKEN_2022_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  ));
  await sendAndConfirmTransaction(connection, createAccount, [payer], { commitment: "confirmed" });
}

const [tokenTreasuryPda] = PublicKey.findProgramAddressSync([Buffer.from("token_treasury_v2")], PROGRAM_ID);
const tokenTreasuryVault = getAssociatedTokenAddressSync(TOKEN_MINT, tokenTreasuryPda, true, TOKEN_2022_PROGRAM_ID);
const subscribe = await program.methods.subscribe(1, 4).accounts({
  user: payer.publicKey,
  pricingMatrix,
  tokenMint: TOKEN_MINT,
  userTokenAccount,
  tokenTreasuryVault,
  tokenTreasuryPda,
  tokenProgram: TOKEN_2022_PROGRAM_ID,
  associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  systemProgram: SystemProgram.programId,
}).transaction();

for (const instruction of subscribe.instructions) {
  const allowed = [PROGRAM_ID, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, SystemProgram.programId];
  if (!allowed.some((programId) => programId.equals(instruction.programId))) fail(`Unexpected program in subscription transaction: ${instruction.programId.toBase58()}`);
}
const txSig = await sendAndConfirmTransaction(connection, subscribe, [payer], { commitment: "confirmed" });

const signedMessage = new TextEncoder().encode(`${txSig}::${jwt}`);
const walletSignature = Buffer.from(nacl.sign.detached(signedMessage, payer.secretKey)).toString("base64");
const activationResponse = await fetch(`${TXLINE_ORIGIN}/api/token/activate`, {
  method: "POST",
  headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
  body: JSON.stringify({ txSig, walletSignature, leagues: [] }),
  signal: AbortSignal.timeout(30_000),
});
if (!activationResponse.ok) fail(`TxLINE activation failed (${activationResponse.status}): ${(await activationResponse.text()).slice(0, 180)}`);
const activationText = await activationResponse.text();
let apiToken = activationText.trim();
try { apiToken = JSON.parse(activationText).token || apiToken; } catch {}
if (!apiToken || apiToken.length < 8) fail("TxLINE activation returned no API token");

const verificationJwt = await (await fetch(`${TXLINE_ORIGIN}/auth/guest/start`, { method: "POST" })).json();
const verification = await fetch(`${TXLINE_ORIGIN}/api/scores/historical/${FIXTURE_ID}`, {
  headers: { Authorization: `Bearer ${verificationJwt.token}`, "X-Api-Token": apiToken, Accept: "application/json" },
  signal: AbortSignal.timeout(30_000),
});
if (!verification.ok) fail(`API token was issued but fixture verification failed (${verification.status})`);
const records = await verification.json();

await writeFile(OUTPUT_FILE, `TXLINE_API_TOKEN=${apiToken}\n`, { encoding: "utf8", mode: 0o600, flag: "wx" });
await chmod(OUTPUT_FILE, 0o600);
process.stdout.write(`TxLINE devnet activation verified for fixture ${FIXTURE_ID} with ${Array.isArray(records) ? records.length : 0} score records.\n`);
process.stdout.write(`The API token was written to the requested mode-0600 file and was not printed.\n`);

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
