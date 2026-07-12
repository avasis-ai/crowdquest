# Demo script

**Target length: 4 minutes 25 seconds. Hard stop: 4 minutes 40 seconds.** The track permits a video of up to five minutes. Record one continuous product story and leave enough margin for pauses.

## Before recording

- Open the deployed app in a clean browser window at desktop width.
- Restart the replay and confirm the first quest is visible.
- Open `/v1/source` in a second tab if the orchestrator is deployed.
- Confirm the public repository and technical-documentation links work while signed out.
- Hide bookmarks, notifications, terminal history, environment files, tokens, and wallet details.
- Use the exact runtime language below. Do not call replay data live and do not call an intent a payout.

## 0:00–0:25 — Problem and promise

**Show:** CrowdQuest match room, no clicks yet.

**Say:**

> Football fans already watch with a phone in hand, but most second-screen products are either passive scoreboards or ask them to wager. CrowdQuest turns each important match moment into one free, sponsor-funded quest. One moment, one decision, one visible result.

## 0:25–0:50 — Honest replay setup

**Show:** Demo replay card, fixture ID, match hero, and source label.

**Say:**

> This recording uses the deterministic historical replay for fixture 18209181, so the entire experience remains testable when no match is active. Replay is labeled throughout. A server-side TxLINE adapter handles fixture-scoped source data when valid credentials are configured; this screen never exposes those credentials.

If `/v1/source` reports replay or disconnected, say so. Do not substitute a rehearsed “connected” claim.

## 0:50–2:20 — Complete the fan loop

**Show and do:**

1. Choose **No goal** for the penalty quest; click **Reveal next update**.
2. Point to the settlement banner, points, streak, replay progress, and receipt language.
3. Choose **No** for a goal before half-time; reveal.
4. Choose **Before 65′**; reveal the France opener.
5. Choose **Yes** for another goal within ten minutes; reveal the second goal.
6. Choose **France by 2+**; reveal full time.

**Say while advancing:**

> The answer locks before the next update. Resolution is deterministic: each quest declares the event condition that closes it. When the API is available, the orchestrator—not the browser—saves the answer, advances the event cursor, calculates points, and returns the updated room. If the API is unavailable, the demo visibly falls back to local replay rather than breaking.

At completion:

> The fan now has a finished score, streak, and a replayable product receipt. These are game points, not proof of a token transfer.

## 2:20–3:10 — Trust and tool composition

**Show:** Click **Inspect proof trail**, then scan the four tool cards, decision log, and guardrails.

**Say:**

> CrowdQuest is also a vertical test of a unified AI workspace. TxLINE is the match-data boundary, deterministic quest templates direct the experience, the bounty engine scores the room, and a reward boundary can create a capped intent. The current build never sends funds. Its intent states are disabled, test, or approval required, and the Coinbase agent boundary is not called.

> The decision log shown here is a product receipt. Solana proof verification is not implemented, so we do not present it as an on-chain proof.

## 3:10–3:50 — TxLINE backend boundary

**Show:** `/v1/source`, then briefly show `docs/TXLINE_INTEGRATION.md` or the repository tree.

**Say:**

> TxLINE access is isolated in the Node orchestrator. It obtains a guest JWT, sends the activated API token only from the server, scopes records to the configured fixture, and normalizes score records into the small event model used by the resolver. The public browser receives product state rather than raw upstream payloads. The runtime source endpoint tells us whether this deployment is connected or using replay.

Only if the recording actually shows accepted TxLINE data, describe the specific endpoint and returned source metadata. Otherwise add:

> In this deployed recording the source is replay, so I am showing the implemented integration boundary rather than claiming a live feed.

## 3:50–4:15 — Product and commercial path

**Show:** Business strip, sponsor pool explanation, and responsive room if convenient.

**Say:**

> Public rooms are free for fans. Clubs and sponsors can fund private rooms or campaigns, with Polar as an optional checkout path. That creates a clear commercial model without making wallet setup or a stake part of the fan experience.

## 4:15–4:25 — Close

**Return to:** Match room or completion screen.

**Say:**

> CrowdQuest makes a live match participatory in seconds: one match moment, one quest, one transparent settlement. The app, public source, architecture, security boundaries, and TxLINE notes are linked with this submission.

## Claims checklist

Safe in the current build:

- “Deterministic historical replay.”
- “Server-side TxLINE adapter.”
- “Fixture-scoped score normalization.”
- “Points and settlement receipts.”
- “Metadata-only, approval-gated payout intent.”
- “Optional Polar checkout link.”

Do not say without new, recorded evidence:

- “Streaming live from TxLINE.”
- “On-chain verified.”
- “Paid in USDC.”
- “Coinbase agent sent the reward.”
- “248 active users” or any other presentation-only metric as real usage.
