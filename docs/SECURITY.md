# Security

CrowdQuest is a hackathon MVP with explicit trust boundaries. It has not undergone an independent security audit and must not be treated as a custody, betting, or production payment system.

## Security posture at a glance

| Area | Current posture |
| --- | --- |
| Fan identity | Unauthenticated guest session with a random UUID |
| Fan funds | No deposits or stakes |
| Rewards | Points in the product; payout-intent metadata only |
| TxLINE credential | Read server-side from environment variables |
| Admin refresh | Bearer token required when `ADMIN_TOKEN` is configured |
| Persistence | Memory or PostgreSQL JSONB |
| Browser fallback | Local deterministic replay if the API is unavailable |

## Implemented controls

- Server configuration is parsed and bounded with Zod.
- Request bodies are limited to 16 KiB.
- Display names and choice identifiers have length limits.
- Choice identifiers must belong to the active quest.
- Answer requests include the active quest identifier, so a delayed duplicate cannot settle the next quest.
- Public room snapshots omit the server answer key.
- CORS accepts only configured origins, plus requests without an `Origin` header.
- API responses set `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, a restrictive `Permissions-Policy`, and `Cache-Control: no-store`.
- TxLINE, database, admin, and agent credentials belong only in the orchestrator environment.
- `.env*` files are ignored except for sanitized examples.
- TxLINE records are normalized into a narrow domain object rather than returned raw to the browser.
- Payout amounts are clamped to a configured maximum.
- The payout gateway does not hold a wallet key and does not execute a transfer.

## Trust boundaries

### Browser

The browser is untrusted. Timers, points, replay arrays, and the local fallback can be modified by a user. Only server-saved state can become authoritative in a future reward flow. The current leaderboard is presentation data and is not a financial ledger.

### Orchestrator

The orchestrator validates basic input and owns API-backed scoring. Guest room routes are public and session possession is the only access boundary; anyone with a room UUID can read, answer, or reset that room.

### TxLINE

TxLINE is a read-only upstream in this repository. A configured token does not by itself prove data freshness or on-chain validity. Runtime “connected” status also requires normalized fixture evidence that can resolve a quest, and the current product does not verify Solana validation proofs.

### Reward agent

The Coinbase/agent configuration is a reserved boundary. `PayoutGateway` currently creates intent metadata only and never calls an agent, signs a message, or transfers USDC. `approval_required` means “stop for a later approval workflow,” not “approved” or “paid.”

## Required before real rewards

Do not enable real-value rewards until all of the following exist:

1. Authenticated users and role-based sponsor/admin access.
2. Server-authoritative room membership, answer deadlines, and leaderboard calculation.
3. Per-user and per-IP rate limits, bot controls, and abuse monitoring.
4. Idempotency keys and replay protection for answers and reward operations.
5. An append-only reward ledger with uniqueness constraints and reconciliation.
6. Separate approval and signing services with least-privilege wallets and low limits.
7. Destination allowlists, sanctions/compliance controls where applicable, and operational review.
8. Secret rotation, managed secret storage, structured audit logs, alerting, and incident response.
9. Independent application and smart-contract security review.
10. Legal review covering promotions, gaming, tax, consumer protection, privacy, and territorial restrictions.

## Required before production fan traffic

- Add authentication or signed, expiring room capabilities.
- Prevent a second answer from advancing a later quest; make answer writes idempotent.
- Enforce deadlines on the server instead of relying on the browser countdown.
- Add route-level rate limiting and concurrency tests.
- Add Content Security Policy and HSTS at the edge.
- Define retention and deletion behavior for room and profile data.
- Avoid logging credentials, raw authorization headers, or full upstream payloads.
- Use TLS between every deployed component and restrict PostgreSQL by network policy.

## Secret handling

Never commit or paste these values into screenshots, issues, demo videos, or frontend variables:

- `DATABASE_URL`
- `TXLINE_API_TOKEN`
- `COINBASE_AGENT_TOKEN`
- `ADMIN_TOKEN`

Only `NEXT_PUBLIC_CROWDQUEST_API_URL` and an optional public Polar checkout URL are intended for browser exposure. Rotate any credential immediately if it appears in Git history or a recording.

## Reporting a vulnerability

Until a dedicated security address is published, avoid posting exploitable details in a public issue. Contact the repository owner privately and include the affected route, reproduction steps, expected impact, and a suggested mitigation if available.
