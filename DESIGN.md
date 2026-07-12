# CrowdQuest design contract

- Status: canonical product and brand contract
- Applies to: CrowdQuest web product, generated prototypes, screenshots, demos, and future contributor/operator surfaces
- Implementation detail: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
- Open Design workflow: [`docs/OPEN_DESIGN_HANDOFF.md`](docs/OPEN_DESIGN_HANDOFF.md)

This file is the first design input for humans and design agents. When a prototype, implementation, or generated artifact conflicts with this contract, this contract wins until an intentional review changes it.

## Product definition

CrowdQuest turns a covered football match into a sequence of short, sponsor-funded questions. A fan reads the current match moment, selects one answer, locks it before the window closes, and receives points only after the next qualifying event resolves the quest.

The present product is a hackathon MVP with two public routes:

- `/` contains the match room and the receipts-and-controls view.
- `/design-system` renders the complete visual reference for the current product system.

The MVP supports an optional server orchestrator and a deterministic browser replay. It does **not** accept fan stakes, execute cryptocurrency transfers, verify Solana proofs, operate a production wallet, or call a Coinbase reward agent. Polar is an optional outbound checkout path for the private-room business concept, not an implemented subscription lifecycle.

Future bounty discovery, submission, judging, treasury, organization, reputation, wallet, and operator workflows are design proposals until their routes, contracts, and tests exist. Never present a proposal as shipped functionality.

## Product promise

> One moment. One decision. One visible source of truth.

The experience should feel alive without making the user decode a sports terminal, wallet, feed API, or agent workflow. Operational detail is available, but the next safe action is always obvious.

## Design principles

1. **Match first.** Team identity, score, minute, source mode, and current event establish context before analytics or rewards.
2. **One decision at a time.** One prompt, short supporting context, two or three mutually exclusive answers, and one explicit lock action.
3. **Truth before spectacle.** Live, replay, local, pending, settled, intent, and payout are different states with different language and visuals.
4. **Security is visible.** High-impact actions show the actor, scope, network, amount, consequence, and approval boundary before commitment.
5. **Wallets stay secondary.** Fans enter through play. Wallet and payment controls belong to sponsor or operator tasks and must not block the basic fan loop.
6. **Dense, not cramped.** Use an operations-dashboard hierarchy with readable type, clear grouping, and generous interaction targets.
7. **Accessible by construction.** Keyboard, screen reader, contrast, reduced motion, and touch requirements are component contracts, not a final audit step.
8. **Original, not derivative.** Reference the confidence, depth, and hierarchy of the supplied wallet and operations-dashboard images without copying their composition, artwork, brand, or content.

## Brand character

CrowdQuest is:

- precise, energetic, trustworthy, and slightly competitive;
- premium and technical without looking like a trading terminal;
- dark by default, with restrained purple depth and rare acid-lime signals;
- candid about uncertainty, simulation, and incomplete integrations.

CrowdQuest is not:

- a casino, exchange, meme product, or neon arcade;
- an opaque “AI magic” interface;
- a wall of undifferentiated glass cards;
- a place where decorative green implies that data or money is verified.

## Truthful product language

Visible text is part of the security model. Use these terms exactly.

| Term | It means | It must not mean |
| --- | --- | --- |
| **Live** | A current upstream connection has been accepted and the displayed fixture is receiving current activity | The web app is reachable, the API process is healthy, or a demo is playing |
| **Replay** | The orchestrator is serving a disclosed historical fixture | A live match |
| **Local replay** | The browser is using its bundled deterministic fixture because the orchestrator is unavailable | Server-verified data |
| **Selected** | The user has chosen an option and may still change it | Submitted or locked |
| **Locked** | The answer was accepted for resolution | Correct, settled, or paid |
| **Settled** | The answer was evaluated against the declared resolution condition | Cryptographically proven |
| **Receipt** | A product record of a decision or result | An immutable ledger or on-chain proof |
| **Verified** | A named verification step completed and exposes its verifier or evidence | A generic positive state |
| **Payout intent** | Metadata describing a proposed reward action | A transaction was signed, submitted, confirmed, or paid |
| **Paid / confirmed** | The relevant payment network has returned confirmation and reconciliation exists | Test mode, approval required, or an intent was created |

### Forbidden current-product claims

Do not show the following without new runtime evidence and supporting implementation:

- “Streaming live from TxLINE.”
- “On-chain verified.”
- “Append-only proof.”
- “USDC paid.”
- “Coinbase agent sent the reward.”
- Presentation-only audience counts as real usage.
- Local replay results as server-verified results.

## Visual direction

### Composition

- Use deep black as the canvas and purple as depth, not as a full-page wash.
- Keep the active match and quest in the visual center.
- Use panels to group tasks, not to decorate every piece of text.
- Prefer one dominant panel, two supporting rails on large screens, and a deliberate single-column sequence on small screens.
- Use subtle grid, stadium, or signal motifs only when they preserve text contrast.
- Preserve whitespace around the active decision even in dense operational layouts.

### Color

The canonical raw palette is:

| Name | Value | Purpose |
| --- | --- | --- |
| Night 950 | `#08070D` | Main canvas |
| Night 900 | `#0E0A16` | Secondary canvas |
| Plum 900 | `#171024` | Standard surface |
| Plum 850 | `#211633` | Raised surface |
| Plum 800 | `#2D1D46` | Strong or selected surface |
| Chalk | `#FAF8FF` | Primary content |
| Touchline | `#B8B1C7` | Secondary content |
| Signal lime | `#CFFF5A` | Primary action, focus, confirmed success, actual live signal |
| System violet | `#8B5CF6` | Structure, receipt, and selected state; not proof by itself |
| Replay blue | `#7CB8FF` | Disclosed API replay and informational state |
| Moment amber | `#FFD166` | Local fallback, urgency, pending approval, warning |
| Miss red | `#FF807A` | Error, failed, destructive, missed |
| Soft violet | `#B9A1FF` | Secondary system emphasis |

Acid lime is scarce. Reserve it for the primary action, keyboard focus, actual live status, or confirmed success. A screen should normally have one dominant lime action. Do not use lime for replay or local mode.

Color never carries state alone. Pair it with a plain-language label and a Lucide icon.

### Typography

- Use **Geist** for interface and editorial copy.
- Use **Geist Mono** for fixture identifiers, timestamps, state codes, network names, hashes, and compact receipts.
- Primary body copy is at least `14px/20px`; supporting copy is at least `12px/18px`.
- Essential instructions are at least `12px/16px`. Dense labels may use `10–11px` only with strong contrast and short wording; never use 7–9px essential text.
- Headings use tight tracking but never sacrifice letter recognition.
- Uppercase labels are short, normally 10–12px, and use restrained tracking.
- Align numbers with tabular figures where values update in place.

### Geometry and elevation

- Use a 4px spacing grid.
- Controls: 10–12px radius.
- Compact cards: 16px radius.
- Primary panels: 20px radius.
- Modal and mobile sheet: 24px radius.
- Pills are reserved for status, filters, and short metadata.
- Depth comes from surface contrast, border, and one soft shadow. Do not stack blur, glow, gradient, and shadow on every card.

### Icons

- Use Lucide React icons exclusively for product controls unless a licensed brand mark is required.
- Default size is 18px, stroke width 1.75. Use 16px in compact metadata and 20–24px for primary actions.
- Icons that repeat adjacent text are decorative and use `aria-hidden="true"`.
- Icon-only controls require an accessible name and tooltip.
- Do not use emoji as product icons.
- Do not substitute arbitrary icons for chain, payment, or verification brands.

### Motion

- Motion explains state change, hierarchy, or location. It is never required to understand the outcome.
- Fast feedback: 120ms. Standard state transition: 180ms. Layout transition: at most 280ms.
- Use opacity and small transforms; avoid parallax, continuous floating, and large spring effects.
- A live pulse may run only in actual live mode.
- Loading rotation must stop when the operation ends.
- Under `prefers-reduced-motion: reduce`, remove loops, smooth scrolling, and nonessential transforms.

## Information architecture

### Current product

1. **Match room** — source mode, score, event, quest, points, leaderboard, and replay controls.
2. **Receipts & controls** — tool composition, decision receipts, guardrails, and disclosed commercial model.
3. **Design system** — rendered foundations and component states.

Use “Receipts & controls” in navigation unless the surface contains independently verifiable proof. “Proof & tools” may remain only as a legacy label during migration.

### Future product proposals

Future work may add three role-based spaces:

- **Contributor workspace:** discover bounty, review eligibility, submit work, track review, and receive a confirmed reward.
- **Sponsor workspace:** create campaign, fund budget, define deterministic rules, review results, and approve intents.
- **Operations workspace:** monitor sources, agents, queues, policies, disputes, and reconciliations.

Every future mockup must carry a `Concept` label until the corresponding product route and data contract exist.

## Critical interaction contracts

### Source state

The source label remains visible before the first decision on every viewport. If the mode changes, announce it politely and update the label, icon, and color together.

### Answer flow

1. The answer window opens with an explicit resolution condition.
2. The user selects one answer. Selection is visible and reversible.
3. The user activates **Lock answer**. The control enters a single pending state and cannot be submitted twice.
4. The service accepts the lock or the interface reports a failure/fallback.
5. The next qualifying event settles the answer.
6. The result announces correct/missed, points, source mode, and receipt status.

Do not disable every answer immediately after selection. Selection and commitment are different states.

### Replay fallback

If the orchestrator fails, disclose the transition to local replay. Never silently change the authority of a result. The user may continue the deterministic demo, but the receipt must say `Local replay`.

### Money and wallet actions

Money actions use confirmation, not optimism. Before commitment show the asset, amount, network, destination, fee if known, policy/approval state, and whether the action is simulated. Destructive and irreversible actions require explicit confirmation.

The current fan flow has no wallet requirement. Future wallet states must include disconnected, wrong network, signing, pending, confirmed, failed, insufficient funds, refunded, and disputed. These states may not be fabricated from timers.

## Responsive contract

| Range | Layout contract |
| --- | --- |
| `>1180px` | Three-column command center. Supporting rails frame a dominant match-and-quest column. |
| `821–1180px` | Two-column layout. Match and quest remain first; secondary context moves below or beside without shrinking controls. |
| `521–820px` | Single-column product flow with persistent source disclosure and a safe-area-aware action dock. |
| `320–520px` | Compact scoreboard and single-column answers. Never hide source mode, answer condition, settlement outcome, or the primary action. |

Desktop density is not a license to shrink text. Mobile is not a collapsed desktop dashboard. Reorder content by task priority and preserve 44px primary touch targets.

## Accessibility contract

Target WCAG 2.2 AA.

- All features work with keyboard only.
- Focus is visible with a 2px signal-lime ring and 2px offset.
- Normal text reaches 4.5:1 contrast; large text and essential graphics reach 3:1.
- Interactive controls have at least a 24px WCAG target and normally a 44px product target.
- Each landmark has a unique accessible name.
- Answer options are a named group using radio semantics or `aria-pressed` buttons.
- Dynamic operation, source, and settlement messages use restrained live regions.
- Do not announce every timer second. Announce open, under 10 seconds, closed, restarted, locked, and settled.
- Progress components expose a name, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- Visual order and DOM order match.
- Status never depends only on hue, pulse, icon, or position.
- Time-limited interactions provide a restart or extension path in replay mode.
- External links that open a new tab disclose that behavior to assistive technology.
- Reduced-motion mode is tested, not inferred.

## Content voice

- Lead with the current state: “Replay ready,” “Answer selected,” “Waiting for settlement.”
- Use verbs for actions: “Select answer,” “Lock answer,” “Review receipt,” “Create payout intent.”
- Use nouns for destinations: “Match room,” “Receipts & controls,” “Leaderboard.”
- Explain failure and the safe next step in the same message.
- Prefer “fan,” “contributor,” “sponsor,” and “operator” over generic “user” when the role matters.
- Avoid hype: seamless, revolutionary, guaranteed, instant, trustless, risk-free, magic, autonomous.
- Never abbreviate a risk or money state merely to fit a card.

## Anti-patterns

- Green pulse next to replay or local mode.
- White text on lime primary buttons.
- 7–9px essential text or dense labels that carry instructions.
- Generic purple glass cards with equal emphasis.
- A disabled CTA that only repeats an instruction.
- Hidden source status on mobile.
- Selection treated as submission.
- Static demo activity presented as real agent activity.
- “Verified,” “proof,” “append-only,” or “paid” without named evidence.
- Emoji icons, copied Dribbble compositions, or invented partner marks.
- Wallet connection as the first step for a fan.
- Silent API fallback or double-submittable actions.

## Definition of done

A screen is ready for implementation review only when:

1. Its role, source mode, primary task, and primary action are clear in five seconds.
2. Every displayed state exists in the product contract or is labeled as a concept.
3. All money and evidence language passes the truth table above.
4. Keyboard, screen reader, contrast, focus, reduced motion, and 320px layout checks pass.
5. Loading, empty, error, offline/fallback, success, and destructive states are designed.
6. It uses canonical tokens and Lucide icons rather than one-off values or emoji.
7. The implementation preserves API, replay, answer, reset, leaderboard, and receipt behavior.
8. The repository validation suite and browser-level interaction tests pass before deployment.
