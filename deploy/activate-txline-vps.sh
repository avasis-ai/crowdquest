#!/bin/sh
set -eu

umask 077

APP_DIR=${CROWDQUEST_APP_DIR:-/opt/crowdquest}
ENV_FILE=${CROWDQUEST_ENV_FILE:-/etc/crowdquest/production.env}
SECRETS_DIR=${CROWDQUEST_SECRETS_DIR:-/var/lib/crowdquest/secrets}
WALLET_PARAMETER=${CROWDQUEST_WALLET_PARAMETER:-/crowdquest/activation/solana-devnet-wallet}
RPC_URL=${TXLINE_RPC_URL:-https://api.devnet.solana.com}
PUBLIC_ORIGIN=${CROWDQUEST_PUBLIC_ORIGIN:-https://vps.avasis.ai}
FIXTURE_ID=${TXLINE_FIXTURE_ID:-18209181}
EXPECTED_WALLET=FQisSJCAmo3tCpwzrm7BZFbj1UqdLbmUFdax2dqsgcQg
MINIMUM_LAMPORTS=5000000

fail() {
  printf '%s\n' "activate-txline-vps: $*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "required command is unavailable: $1"
}

[ "$(id -u)" -eq 0 ] || fail "run as root through the authenticated SSM session"
[ -d "$APP_DIR/.git" ] || fail "CrowdQuest repository is missing at $APP_DIR"
[ -f "$ENV_FILE" ] || fail "deployment environment is missing at $ENV_FILE"

for command in aws curl git jq node npm; do require_command "$command"; done

current_source=$(curl --fail --silent --show-error --max-time 20 "$PUBLIC_ORIGIN/v1/source" || true)
if printf '%s' "$current_source" | jq -e '.connected == true and .mode == "live" and .authoritativeQuests > 0' >/dev/null 2>&1; then
  printf '%s\n' "TxLINE is already authoritative; no activation transaction was sent."
  printf '%s\n' "$current_source" | jq -c '{mode,connected,fixtureId,normalizedEvents,authoritativeQuests,streaming}'
  exit 0
fi

if [ -s "$SECRETS_DIR/txline_api_token" ]; then
  fail "a TxLINE token is already materialized but runtime status is not live; inspect orchestrator logs before any reactivation"
fi

temporary_directory=$(mktemp -d /tmp/crowdquest-txline.XXXXXX)
trap 'rm -rf "$temporary_directory"' EXIT HUP INT TERM
wallet_file="$temporary_directory/devnet-wallet.json"
token_file="$temporary_directory/txline.env"

aws ssm get-parameter \
  --name "$WALLET_PARAMETER" \
  --with-decryption \
  --query 'Parameter.Value' \
  --output text > "$wallet_file" 2>/dev/null || fail "could not retrieve the dedicated devnet wallet from Parameter Store"
chmod 0600 "$wallet_file"

npm ci --prefix "$APP_DIR/tools/txline" --ignore-scripts >/dev/null
public_key=$(NODE_PATH="$APP_DIR/tools/txline/node_modules" node -e '
  const fs = require("node:fs");
  const { Keypair } = require("@solana/web3.js");
  const bytes = Uint8Array.from(JSON.parse(fs.readFileSync(process.argv[1], "utf8")));
  process.stdout.write(Keypair.fromSecretKey(bytes).publicKey.toBase58());
' "$wallet_file")
[ "$public_key" = "$EXPECTED_WALLET" ] || fail "Parameter Store wallet does not match the reviewed activation wallet"

balance_payload=$(jq -cn --arg wallet "$public_key" '{jsonrpc:"2.0",id:1,method:"getBalance",params:[$wallet,{commitment:"confirmed"}]}')
balance_response=$(curl --fail --silent --show-error --max-time 20 "$RPC_URL" -H 'content-type: application/json' --data "$balance_payload")
balance=$(printf '%s' "$balance_response" | jq -er '.result.value') || fail "could not read the devnet wallet balance"

if [ "$balance" -lt "$MINIMUM_LAMPORTS" ]; then
  printf '%s\n' "BLOCKED_FUNDING"
  printf '%s\n' "Fund this public wallet with at least 0.005 devnet SOL using an official Solana method: $public_key"
  printf '%s\n' "Current balance: $balance lamports"
  exit 20
fi

TXLINE_RPC_URL="$RPC_URL" \
TXLINE_FIXTURE_ID="$FIXTURE_ID" \
TXLINE_WALLET_PATH="$wallet_file" \
TXLINE_OUTPUT_FILE="$token_file" \
npm --prefix "$APP_DIR/tools/txline" run activate

api_token=$(sed -n 's/^TXLINE_API_TOKEN=//p' "$token_file" | head -n 1)
[ "${#api_token}" -ge 8 ] || fail "activation did not produce a valid API token"
install -d -m 0700 -o root -g root "$SECRETS_DIR"
staged_secret=$(mktemp "$SECRETS_DIR/.txline-api-token.XXXXXX")
printf '%s' "$api_token" > "$staged_secret"
chmod 0444 "$staged_secret"
mv -f "$staged_secret" "$SECRETS_DIR/txline_api_token"
unset api_token

CROWDQUEST_ENV_FILE="$ENV_FILE" "$APP_DIR/deploy/vps-deploy.sh"

attempt=0
while [ "$attempt" -lt 20 ]; do
  source_status=$(curl --fail --silent --show-error --max-time 20 "$PUBLIC_ORIGIN/v1/source" || true)
  if printf '%s' "$source_status" | jq -e '.connected == true and .mode == "live" and .normalizedEvents > 0 and .authoritativeQuests > 0' >/dev/null 2>&1; then
    printf '%s\n' "TXLINE_ACTIVATION_COMPLETE"
    printf '%s\n' "$source_status" | jq -c '{mode,connected,fixtureId,normalizedEvents,authoritativeQuests,streaming}'
    exit 0
  fi
  attempt=$((attempt + 1))
  sleep 3
done

printf '%s\n' "The token was activated and retained, but the public source did not become authoritative." >&2
printf '%s\n' "$source_status" | jq -c '{mode,connected,fixtureId,normalizedEvents,authoritativeQuests,streaming}' >&2 || true
exit 1
