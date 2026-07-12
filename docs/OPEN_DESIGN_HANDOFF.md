# Open Design handoff for CrowdQuest

- Status: design-generation and review protocol
- Canonical design contract: [`../DESIGN.md`](../DESIGN.md)
- Implementation specification: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)

This document explains how to use the isolated Open Design installation to explore and critique CrowdQuest without weakening production security, overwriting working behavior, or turning generated concepts into unsupported product claims.

## 1. Current Open Design runtime

The current studio was verified on 2026-07-12 with this deployment shape:

- Open Design release `0.14.1` at source commit `2225647726d5387bb24e9539fdb577958b6d88c6`.
- VPS checkout at `/opt/open-design`.
- Versioned local Docker image behind an authentication gateway.
- Listener bound to VPS loopback on port `7456`.
- Access through an AWS Systems Manager port-forwarding session.
- Persistent dedicated Docker volume.
- Read-only application root, dropped container capabilities, and no Docker socket.
- No CrowdQuest bind mount, AWS credentials, host agent homes, provider keys, wallet material, or payment secrets inside the Open Design container.

The production CrowdQuest checkout remains separate at `/opt/crowdquest`. Open Design being healthy does not authorize it to edit or deploy that checkout.

## 2. Opening the studio

Use the helper from the `open-design-vps` deployment deliverable directory:

```bash
./connect.sh
```

Then visit `http://127.0.0.1:7456`. If the local port is busy, pass another local port to the helper.

Sign in to Open Design Cloud or configure an explicitly approved BYOK provider from the UI. Never paste a provider key into a prompt, repository file, screenshot, shell history, or exported prototype.

## 3. Source-of-truth order

Open Design must read inputs in this order:

1. [`DESIGN.md`](../DESIGN.md) — product truth, brand, accessibility, and anti-patterns.
2. [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — exact tokens, components, states, and responsive rules.
3. [`ARCHITECTURE.md`](ARCHITECTURE.md) — frontend/orchestrator boundaries and current gaps.
4. [`SECURITY.md`](SECURITY.md) — trust boundaries and requirements before real rewards.
5. [`TXLINE_INTEGRATION.md`](TXLINE_INTEGRATION.md) — live/replay source behavior.
6. [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md) — the demonstrable user flow and safe runtime claims.
7. Current `/` and `/design-system` screenshots at desktop and compact widths.
8. The supplied crypto-wallet and operations-dashboard reference images as mood and hierarchy references only.

Generic Open Design templates, generated skills, or example HTML never override this order.

## 4. Current product scope

### Implemented and preservable

- Guest fan room.
- Six-event historical fixture with five quests.
- Select, lock, settle, points, streak, rank, reset, and completion loop.
- Optional orchestrator session/answer/reset path.
- Browser-local deterministic fallback.
- Live/replay/local source disclosure.
- Leaderboard and demo sponsor pool presentation.
- Optional outbound Polar checkout link.
- Tool-composition, receipt, guardrail, and business explanation view.
- Responsive product and design-system routes.

### Implemented boundaries

- No fan stake.
- No production wallet connection.
- No cryptocurrency transfer.
- No Solana proof verification.
- No Coinbase agent call.
- No subscription lifecycle.
- No production identity, authorization, anti-abuse, or payout reconciliation.

### Concept-only expansion

Open Design may explore bounty discovery, bounty detail, submission, judging, treasury, contributor reputation, organization management, AI orchestration, wallet controls, and operational monitoring. Every such frame must show a visible `Concept` label and remain outside “current product” screenshots until implemented.

## 5. Current generated-run context

### Accepted redesign run

The current product redesign was executed through Open Design 0.14.1 against the real local CrowdQuest checkout and then reviewed in the browser before acceptance:

- Open Design project: `38e28847-e774-49aa-8f27-da4dbe3f324e`
- Conversation: `ddd9770a-5777-4068-a8cc-5d3c6c41b28b`
- Discovery run: `b3a2dd42-daf0-4a75-b740-dd895369329f`
- Implementation run: `af099e73-1ff5-4888-9207-441e30d6ac5a`
- Imported editable design system: `user:crowdquest-signal-os-2`
- Design-system title: `CrowdQuest Signal OS`

The earlier `user:crowdquest-signal-os` entry is retained as `CrowdQuest Signal OS — initial extraction` for provenance; use the `-2` system for future work.

The discovery choices prioritized the active quest and answer, mobile action/navigation, medium information density, a complete design-system reference, the existing score hero, and the purple/lime identity. Open Design produced the first interaction-state pass; the accepted implementation then corrected its remaining truth-language, accessibility, token, responsive, final-settlement, and component gaps. Generated output was not deployed without lint, build, axe, interaction, and visual review.

The working tree may contain generated Open Design artifacts such as `.od-skills/` and `critique.json`. They are working material, not application dependencies or canonical design sources.

The current critique artifact reports a `4.4/5` aggregate with strong clarity and brand scores. Treat that as one qualitative checkpoint, not proof of accessibility, correctness, or release readiness. Review generated output against this handoff, run automated checks, and inspect the actual browser before accepting any score.

Generated artifacts must never:

- silently install runtime dependencies;
- be imported by application code without review;
- carry secrets or internal host details;
- overwrite current screenshots as evidence of shipped behavior;
- deploy automatically;
- be committed merely because Open Design produced them.

## 6. Copy-paste design brief

Use the following prompt after attaching or pasting the canonical documents:

```text
You are the product design-system lead for CrowdQuest.

First read DESIGN.md, docs/DESIGN_SYSTEM.md, docs/ARCHITECTURE.md,
docs/SECURITY.md, docs/TXLINE_INTEGRATION.md, and docs/DEMO_SCRIPT.md.
Treat DESIGN.md as the canonical brand and truth contract.

CrowdQuest is currently a free-to-play, sponsor-funded football match quest MVP.
It has a match room, deterministic historical replay, optional orchestrator,
browser-local fallback, leaderboard, completion state, and a receipts-and-controls
view. It does not currently execute payouts, verify an on-chain proof, call a
Coinbase reward agent, or operate a production wallet.

Design a cohesive, implementation-ready system for the current product before
exploring future bounty-platform concepts. Preserve every working flow and API
boundary. Clearly label future routes and wallet/payment flows as Concept.

Visual direction:
- deep black canvas and layered plum surfaces;
- restrained electric-purple depth;
- acid lime only for the primary action, focus, actual live state, or confirmed
  success;
- readable operations-dashboard hierarchy;
- central match and quest focus;
- Geist and Geist Mono;
- Lucide icons only, never emoji;
- original compositions inspired by, but not copied from, the supplied wallet
  and operations-dashboard references.

State requirements:
- distinguish connecting, live, replay, local replay, and unavailable;
- distinguish available, selected, submitting, locked, settled, expired, error;
- distinguish receipt from verified evidence and proof;
- distinguish disabled/test/approval-required intent from submitted/confirmed
  payment;
- never use color alone or fabricate runtime confirmation.

Accessibility requirements:
- WCAG 2.2 AA contrast;
- keyboard-complete flow and visible focus;
- 44px primary targets and no essential text below 12px;
- semantic landmarks, groups, lists, and tables;
- restrained live-region announcements;
- reduced-motion behavior;
- deliberate 1440, 1180, 768, 390, and 320px layouts.

Deliver:
1. information architecture and state map;
2. semantic token sheet using the exact --cq-* names;
3. primitive and product-component inventory with every interaction state;
4. high-fidelity current-product frames for match room, selected answer,
   submitting, settlement, timeout, API fallback, completion, and receipts;
5. desktop, tablet, and mobile versions;
6. accessible HTML prototypes or exports with data-od-id annotations;
7. a route-by-route implementation map to shadcn/Radix/Lucide;
8. a critique against DESIGN.md with unresolved issues listed honestly.

Do not edit or deploy /opt/crowdquest. Do not copy secrets. Do not mount the
Docker socket or host credentials. Export review artifacts separately and wait
for implementation approval.
```

## 7. Required frames

### Current product frames

Create these first:

1. **Room / initial replay** — source disclosure, score, event, first quest, leaderboard.
2. **Answer selected** — selection remains editable and the lock action is primary.
3. **Submitting** — one pending action, protected from duplicate submission.
4. **Settlement correct** — source, resolution condition, points, receipt level.
5. **Settlement missed** — nonpunitive copy and next quest.
6. **Window expired** — restart path in replay mode.
7. **Orchestrator failure** — disclosed local fallback and changed receipt authority.
8. **Completion** — final settlement, total points, source mode, receipts, restart.
9. **Receipts & controls** — tool state, receipt levels, guardrails, commercial boundary.
10. **Design-system reference** — foundations, states, components, accessibility.

For frames 1–9, produce at least 1440px desktop and 390px mobile. Add 768px when reflow materially changes hierarchy.

### Concept frames

Only after current frames pass review, optional concept work may cover:

- contributor bounty discovery and detail;
- eligibility and submission;
- judging/review and dispute;
- sponsor campaign and budget;
- payout-intent review and transaction state;
- contributor reputation;
- operations source/agent/policy monitoring.

Every concept frame includes a persistent `Concept — not implemented` label.

## 8. Output contract

Each Open Design run should export a self-contained review package, not application code scattered through the repository.

Recommended review-package structure:

```text
design/open-design/<run-id>/
  README.md
  manifest.json
  tokens.css
  tokens.json
  components.md
  state-matrix.md
  route-map.md
  critique.md
  prototypes/
    room-desktop.html
    room-mobile.html
    receipts-desktop.html
    receipts-mobile.html
  screenshots/
    room-initial-1440.png
    room-selected-390.png
    room-fallback-390.png
    completion-1440.png
```

`manifest.json` records:

- Open Design version and project/run identifier;
- generation date;
- model/provider name without credentials;
- input document commit;
- output files and their purpose;
- current-product versus concept classification;
- unresolved accessibility and truth-claim issues.

HTML prototypes use `data-od-id` on major regions and controls. They do not call production APIs, wallets, or payment endpoints.

## 9. Component handoff map

| Open Design element | Repository target | Behavior owner |
| --- | --- | --- |
| Brand/action button | `components/ui/button.tsx` | Local shadcn/CVA + Radix Slot |
| Status badge | `components/ui/badge.tsx` | Local CVA; semantic SourceStatus wrapper |
| Panel/card | `components/ui/card.tsx` | Local semantic wrappers |
| Replay progress | `components/ui/progress.tsx` | Radix Progress |
| Room/receipts switch | `components/ui/tabs.tsx` | Radix Tabs or route links based on behavior |
| Match and quest surfaces | `app/components/` product components | React state model + primitives |
| Icons | `app/components/icons.tsx` | Central Lucide adapter |
| Dialog/confirmation | New local shadcn components after review | Radix Dialog / AlertDialog |
| Tooltip/popover/sheet | New local shadcn components after review | Matching Radix primitives |
| Leaderboard/table | Semantic HTML product component | No dependency required |
| Toast/status | Reviewed local component | Inline status + Radix-compatible behavior |

Generated HTML class names are illustrative. Implementation maps visual intent to semantic tokens and repository components rather than copying unreviewed CSS wholesale.

## 10. Critique rubric

Score every run from 1–5 on each axis and include evidence:

| Axis | Pass condition |
| --- | --- |
| Product truth | No live/proof/paid/usage overclaim; source and evidence level visible |
| Task clarity | Source, current moment, decision, and next action understood in five seconds |
| Hierarchy | Match and active quest dominate; operations context remains readable |
| State completeness | Loading, selected, pending, settled, expired, fallback, error, completion included |
| Accessibility | AA contrast, semantics, focus, keyboard, targets, reduced motion addressed |
| Responsiveness | Desktop/tablet/mobile are deliberately composed, not merely stacked |
| System consistency | Exact tokens, type scale, radii, icon rules, and components reused |
| Originality | References influence principles without copied composition or branding |
| Implementation fit | Maps to current React/Radix/shadcn/Lucide architecture without unnecessary dependencies |
| Security | No secrets, real transactions, unsafe links, or automatic production writes |

A visual average does not override a failure in product truth, accessibility, or security. Any of those failures blocks implementation approval.

## 11. Review and implementation workflow

1. Confirm Open Design health and persistence through the protected loopback gateway.
2. Record the source commit and attach canonical inputs.
3. Generate the information architecture and state matrix before high-fidelity screens.
4. Generate current-product frames before concept frames.
5. Run the critique rubric and revise obvious failures within Open Design.
6. Export a review package to a new branch or separate workspace.
7. Inspect all files for secrets, remote scripts, unsafe URLs, and invented claims.
8. Compare frame behavior with the current API/replay flow.
9. Obtain implementation approval.
10. Implement through local components and semantic tokens; do not paste the prototype wholesale.
11. Run lint, build, the complete repository check, browser tests, axe, and visual snapshots.
12. Present route-by-route changes and screenshots before merge or deployment approval.

## 12. Security checklist

- Open Design remains bound to VPS loopback.
- Edge authentication stays enabled.
- No Docker socket or broad host directory mount.
- No `/opt/crowdquest` write mount.
- No AWS, provider, database, wallet, Polar, TxLINE, or Coinbase secret in input/output.
- Prototype links do not execute production mutations.
- Remote fonts, scripts, images, and analytics are removed or explicitly reviewed.
- Exported HTML is treated as untrusted until inspected.
- Generated dependency changes require human review.
- No automatic merge or deployment.

## 13. Acceptance checklist

Before handing a design to implementation, confirm:

- [ ] Current and concept surfaces are visibly separated.
- [ ] Live/replay/local/unavailable are explicit at every breakpoint.
- [ ] Answer selection, commitment, and settlement are separate states.
- [ ] Receipt, verified evidence, and proof are not conflated.
- [ ] Intent, approval, submission, confirmation, and payment are not conflated.
- [ ] No emoji icons or copied reference artwork/composition.
- [ ] All UI maps to exact semantic tokens and named components.
- [ ] Desktop and mobile critical frames exist.
- [ ] Empty, loading, error, fallback, timeout, and completion states exist.
- [ ] Contrast, focus, keyboard, target, semantics, and reduced motion are documented.
- [ ] No secrets or production mutation paths are present.
- [ ] Unresolved risks are listed rather than hidden by the critique score.
