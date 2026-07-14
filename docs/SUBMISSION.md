# Submission checklist

CrowdQuest targets the **Consumer and Fan Experiences** global track and the **TxODDS World Cup India Buildathon** regional pool. The same project must be submitted to both listings to compete for both prize pools.

> **Critical order:** submit to the global Consumer and Fan Experiences listing first, then submit the same project to the India listing and answer its “official World Cup Hackathon” question truthfully with **Yes**. For India eligibility, complete **both submissions by July 13, 2026 at 11:59 PM IST**, even though the global form remains open later.

## Deadlines and links

Checked against the live listings on July 12, 2026:

| Listing | Deadline | Link |
| --- | --- | --- |
| Superteam India regional buildathon and safe dual-submit cutoff | **July 13, 2026 at 11:59 PM IST** | [India listing](https://superteam.fun/earn/listing/txodds-world-cup-buildathon-india/) |
| Consumer and Fan Experiences global track | **July 19, 2026 at 11:59 PM UTC** (July 20, 5:29 AM IST) | [Global listing](https://superteam.fun/earn/listing/consumer-and-fan-experiences/) |

The India deadline arrives first, and its rules require the matching official-track submission by that deadline. Recheck each live countdown immediately before submitting; this document does not override the sponsor listing.

## Readiness gate

Do not submit until every required item is true:

- [x] The app is reachable at a public URL while signed out.
- [x] The repository is public and contains the final source and these documents.
- [x] The demo is public/unlisted, viewable while signed out, and under five minutes.
- [x] The deployed runtime honestly demonstrates TxLINE as a primary data source, with the authored replay retained as a fallback.
- [x] `/v1/source` and the demo agree about connected versus replay mode.
- [x] Accepted TxLINE fixture, historical-score SSE, and fixture-scoped stream operations have been tested without exposing credentials.
- [x] The team has written genuine TxLINE API feedback from that test.
- [x] No screen or copy implies that test intents are completed payouts.
- [x] The project was built specifically for this hackathon.
- [ ] The submitting owner/team is eligible for Superteam Earn; the India submission is from an India-based individual or team of one to three.

Replay is valuable for judging after matches finish, but replay alone must not be used to claim the live/primary-data requirement. Payout execution is not required for the consumer track and should remain outside the claim set.

## Shared asset pack

Prepare these once and reuse the exact same links in both forms:

| Asset | Value |
| --- | --- |
| Project title | `CrowdQuest — Every Match Moment Becomes a Quest` |
| Public app | `https://crowdquest.avasis.ai` |
| Public repository | `https://github.com/avasis-ai/crowdquest` |
| Demo video | `https://crowdquest.avasis.ai/demo.mp4` |
| Technical documentation | `https://github.com/avasis-ai/crowdquest/blob/main/docs/ARCHITECTURE.md` |
| TxLINE integration notes | `https://github.com/avasis-ai/crowdquest/blob/main/docs/TXLINE_INTEGRATION.md` |

Verify all five links from a private/incognito window.

## Global submission

The live Consumer and Fan Experiences form asks for:

- [ ] Public demo-video link — required.
- [ ] Public repository link — required.
- [ ] Brief project explanation — required.
- [ ] Project title — required.
- [ ] Public live-and-working MVP link — required.
- [ ] TxLINE API experience: what worked and where the team hit friction — required.
- [ ] Technical-documentation link — currently optional in the form, but include it.
- [ ] Project X profile or launch-post link — optional.

### Short pitch

> CrowdQuest turns important football moments into free, time-boxed fan quests. Fans lock one answer, the next qualifying match event resolves it, and the room updates points, streaks, rank, and a transparent settlement receipt. Sponsors fund the experience; fans never stake funds or learn wallet mechanics.

### Accurate current implementation description

> CrowdQuest is a responsive fan-room MVP built specifically for the TxODDS World Cup Hackathon. Its Fastify orchestrator provides guest sessions, PostgreSQL persistence, server-side scoring, source status, and capped reward-intent metadata. TxLINE credentials remain server-side; the production adapter ingests the configured fixture's historical SSE and score stream, rejects provisional records, normalizes confirmed score events, and derives all five quest resolutions with source sequences. The authored historical replay remains available so judges can complete the experience after match activity ends. CrowdQuest awards game points only in the current build. It does not verify Solana proofs or transfer USDC.

After live integration is verified, update only the TxLINE sentence with the exact endpoint, fixture, mode, and evidence shown in the demo. Do not rewrite the payout boundary.

### TxLINE feedback worksheet

The sponsor explicitly requires firsthand feedback. Current tested feedback:

```text
Endpoint(s) tested: POST /auth/guest/start, GET /api/fixtures/snapshot, GET /api/scores/historical/18209181, and GET /api/scores/stream?fixtureId=18209181 (all accepted).
Network and fixture: TxLINE devnet; fixture 18209181.
What worked well: Guest auth and the dual-header access model were straightforward. The fixture-scoped feed supplied a detailed sequence of confirmed goals, penalties, cards, possession changes, clock state, and finalization evidence; CrowdQuest currently normalizes 1,004 confirmed events into five authoritative quest facts.
Schema or documentation detail that helped: The official score schema, devnet IDL, program address, token mint, and runnable subscription examples made a narrow normalizer and deterministic fixture projection possible.
Friction encountered: Free-tier activation initially depended on unreliable public devnet faucet capacity. After activation, the historical score endpoint returned `text/event-stream` frames even when JSON was requested, while field casing differed from an earlier example shape (`FixtureId`, `Clock`, `Score`, `Seq`). Supporting the production SSE contract explicitly resolved this.
Exact error/status, if any: JSON-RPC -32603 Internal error and HTTP/JSON-RPC 429 airdrop-limit responses.
Workaround or improvement requested: Document the historical endpoint's SSE response and production casing alongside the snapshot examples, and provide reserved faucet capacity or sponsor-funded activation for hackathon teams.
```

Do not turn documentation expectations into fabricated experience. If access failed, report the exact activation or request failure and what was still implemented.

## India submission

The India form currently requires exactly these fields:

- [ ] Project Website
- [ ] Project Title
- [ ] Project Description
- [ ] Project Github Link
- [ ] “Did you submit this project to the official World Cup Hackathon? (Yes/No)”

Use the same title, website, repository, and core description as the global submission. Submit globally first so the final answer is truthfully **Yes**. Dual submission is mandatory for India-pool eligibility.

## Final QA, in order

1. Run every validation command in the root and orchestrator packages.
2. Test the public app on desktop and a narrow mobile viewport.
3. Complete all five quests and reset the room.
4. Verify the source label and `/v1/source` response.
5. Confirm the repository contains no `.env`, key, token, database URL, or private infrastructure detail.
6. Watch the final video at 1× speed and confirm it is under five minutes.
7. Open every submission link while signed out.
8. Submit the global Consumer and Fan Experiences form.
9. Save a timestamped screenshot or confirmation URL.
10. Submit the India form before July 13, 11:59 PM IST and answer the dual-submission question.
11. Save the second confirmation.

## Evidence bundle

Keep a private submission record containing the final URLs, Git commit SHA, deployment time, video duration, both confirmation screenshots, and any TxLINE request identifiers with secrets removed. This makes a sponsor follow-up or live interview much easier.
