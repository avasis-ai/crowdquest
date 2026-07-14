# Form-ready submission copy

Use the same identity and links for both submissions. Submit the global Consumer and Fan Experiences form first, then the India form before **July 13, 2026 at 11:59 PM IST**.

## Shared fields

**Project title**

CrowdQuest — Every Match Moment Becomes a Quest

**Website**

https://crowdquest.avasis.ai

**Public repository**

https://github.com/avasis-ai/crowdquest

**Demo video**

https://crowdquest.avasis.ai/demo.mp4

**Technical documentation**

https://github.com/avasis-ai/crowdquest/blob/main/docs/ARCHITECTURE.md

## Project description

CrowdQuest turns decisive football moments into free, sponsor-funded micro-quests. Fans lock one answer, the next qualifying match event resolves it, and the room updates points, streaks, rank, and a transparent source receipt. A server-side TxLINE adapter normalizes fixture history and fixture-scoped score SSE into deterministic quest facts, with a clearly labeled historical replay when credentials or sufficient evidence are unavailable. The current MVP never asks fans to stake funds and never transfers rewards automatically: it creates only capped test or approval-required payout-intent metadata.

## TxLINE API feedback

TxLINE’s guest authentication and two-header access model were straightforward. We implemented `/api/fixtures/snapshot`, `/api/scores/historical/{fixtureId}`, `/api/odds/snapshot/{fixtureId}`, and `/api/scores/stream` behind a server-only adapter. Production currently ingests 1,004 confirmed events for fixture `18209181` and projects them into all five authoritative quest facts, with each settlement retaining its TxLINE source sequence.

The main friction was activation and response-contract discovery. Public devnet faucet capacity was unreliable, and the historical score endpoint returned `text/event-stream` frames even when JSON was requested. Its production payload uses fields such as `FixtureId`, `Clock`, `Score`, and `Seq`. Explicit SSE parsing, provisional-event rejection, and production-shaped contract tests resolved the ingestion issue. Reserved faucet capacity and side-by-side historical SSE examples would materially improve onboarding.

## India confirmation

Answer **Yes** to “Did you submit this project to the official World Cup Hackathon?” only after the global form has been submitted successfully. Save both confirmation pages.
