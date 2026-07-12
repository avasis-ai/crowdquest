# CrowdQuest design-system specification

- Status: implementation target
- Brand and product rules: [`../DESIGN.md`](../DESIGN.md)
- Open Design handoff: [`OPEN_DESIGN_HANDOFF.md`](OPEN_DESIGN_HANDOFF.md)

This document translates the CrowdQuest design contract into tokens, component APIs, states, responsive behavior, and acceptance criteria. It describes the target system; it does not claim that every item is already implemented. The `/design-system` route is a rendered reference and may lag this specification during migration.

## 1. System layers

Use four layers and keep their responsibilities separate:

1. **Raw palette and metrics** contain literal values.
2. **Semantic tokens** describe purpose and are the only tokens product components consume.
3. **Primitives** implement accessible behavior: Button, Badge, Card, Progress, Tabs, and future form/overlay primitives.
4. **Product components** compose primitives around CrowdQuest state: SourceStatus, MatchHero, QuestCard, SettlementBanner, ReceiptList, and related surfaces.

Do not make route-specific CSS the source of truth for a reusable component.

## 2. Token contract

### 2.1 Target CSS variables

The target token names use the `--cq-` prefix. Existing variables such as `--ink`, `--panel`, and `--lime` may temporarily alias these values during migration.

```css
:root {
  color-scheme: dark;

  /* Raw color */
  --cq-night-950: #08070d;
  --cq-night-900: #0e0a16;
  --cq-plum-900: #171024;
  --cq-plum-850: #211633;
  --cq-plum-800: #2d1d46;
  --cq-chalk: #faf8ff;
  --cq-touchline: #b8b1c7;
  --cq-lime: #cfff5a;
  --cq-violet: #8b5cf6;
  --cq-violet-soft: #b9a1ff;
  --cq-blue: #7cb8ff;
  --cq-amber: #ffd166;
  --cq-red: #ff807a;

  /* Canvas and surfaces */
  --cq-bg-canvas: var(--cq-night-950);
  --cq-bg-canvas-subtle: var(--cq-night-900);
  --cq-bg-surface: var(--cq-plum-900);
  --cq-bg-surface-raised: var(--cq-plum-850);
  --cq-bg-surface-strong: var(--cq-plum-800);
  --cq-bg-overlay: rgb(8 6 15 / 0.88);

  /* Content */
  --cq-text-primary: var(--cq-chalk);
  --cq-text-secondary: var(--cq-touchline);
  --cq-text-inverse: var(--cq-night-950);
  --cq-text-disabled: #756b84;

  /* Lines */
  --cq-border-subtle: rgb(224 216 255 / 0.14);
  --cq-border-default: rgb(224 216 255 / 0.24);
  --cq-border-strong: rgb(224 216 255 / 0.36);

  /* Actions */
  --cq-action-primary-bg: var(--cq-lime);
  --cq-action-primary-fg: var(--cq-night-950);
  --cq-action-secondary-bg: rgb(255 255 255 / 0.04);
  --cq-action-secondary-fg: var(--cq-chalk);
  --cq-action-danger-bg: rgb(255 125 120 / 0.12);
  --cq-action-danger-fg: var(--cq-red);
  --cq-focus-ring: var(--cq-lime);

  /* Product states */
  --cq-source-live: var(--cq-lime);
  --cq-source-replay: var(--cq-blue);
  --cq-source-local: var(--cq-amber);
  --cq-source-unavailable: var(--cq-red);
  --cq-state-selected: var(--cq-violet);
  --cq-state-pending: var(--cq-amber);
  --cq-state-success: var(--cq-lime);
  --cq-state-danger: var(--cq-red);
  --cq-state-receipt: var(--cq-violet);

  /* Typography */
  --cq-font-sans: var(--font-geist-sans), Inter, system-ui, sans-serif;
  --cq-font-mono: var(--font-geist-mono), ui-monospace, monospace;

  /* Space */
  --cq-space-0: 0;
  --cq-space-1: 0.25rem;
  --cq-space-2: 0.5rem;
  --cq-space-3: 0.75rem;
  --cq-space-4: 1rem;
  --cq-space-5: 1.25rem;
  --cq-space-6: 1.5rem;
  --cq-space-8: 2rem;
  --cq-space-10: 2.5rem;
  --cq-space-12: 3rem;
  --cq-space-16: 4rem;
  --cq-space-20: 5rem;

  /* Radius */
  --cq-radius-sm: 0.5rem;
  --cq-radius-control: 0.75rem;
  --cq-radius-card: 1rem;
  --cq-radius-panel: 1.25rem;
  --cq-radius-dialog: 1.5rem;
  --cq-radius-pill: 999px;

  /* Elevation */
  --cq-shadow-card: 0 18px 50px rgb(0 0 0 / 0.18);
  --cq-shadow-panel: 0 24px 70px rgb(0 0 0 / 0.28);
  --cq-shadow-overlay: 0 32px 90px rgb(0 0 0 / 0.52);

  /* Motion */
  --cq-duration-fast: 120ms;
  --cq-duration-standard: 180ms;
  --cq-duration-slow: 280ms;
  --cq-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --cq-ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* Layering */
  --cq-z-base: 0;
  --cq-z-sticky: 20;
  --cq-z-dock: 40;
  --cq-z-overlay: 60;
  --cq-z-toast: 80;
}
```

### 2.2 Legacy alias map

| Existing token | Target alias |
| --- | --- |
| `--ink` | `--cq-bg-canvas` |
| `--ink-soft` | `--cq-bg-canvas-subtle` |
| `--panel` | `--cq-bg-surface` plus opacity only at the component level |
| `--panel-strong` | `--cq-bg-surface-strong` |
| `--line` | `--cq-border-subtle` |
| `--line-strong` | `--cq-border-default` |
| `--text` | `--cq-text-primary` |
| `--muted` | `--cq-text-secondary` |
| `--lime` | `--cq-lime` |
| `--violet` | `--cq-violet` |
| `--amber` | `--cq-amber` |
| `--red` | `--cq-red` |

Do not introduce additional raw colors while this migration is underway. If a new semantic need appears, add a reviewed semantic token and contrast-test it.

## 3. Typography

| Token | Desktop | Compact | Use |
| --- | --- | --- | --- |
| Display | 64/64, 650, `-0.06em` | 40/44 | Design-system or completion hero only |
| Heading 1 | 36/40, 650, `-0.045em` | 28/32 | Active quest or page title |
| Heading 2 | 24/30, 650, `-0.03em` | 22/28 | Panel group title |
| Heading 3 | 18/24, 620, `-0.02em` | 18/24 | Card title |
| Body | 16/24, 400 | 16/24 | Primary explanation |
| Body small | 14/20, 400 | 14/20 | Secondary explanation |
| Label | 13/16, 650 | 13/16 | Button, field, and navigation label |
| Metadata | 12/16, 500 mono | 12/16 | Time, fixture, network, hash, status code |

Use tabular numerals for scores, countdowns, balances, points, and ranks. Do not place essential copy below 12px.

## 4. State model

### 4.1 Source state

Use a discriminated state; do not derive the label from color or general app health.

```ts
type SourceMode =
  | "connecting"
  | "live"
  | "replay"
  | "local"
  | "unavailable";
```

| Mode | Visible label | Icon | Color | Required behavior |
| --- | --- | --- | --- | --- |
| `connecting` | Connecting to source | `LoaderCircle` | secondary | Announce once; no live pulse |
| `live` | TxLINE live connected | `Radio` | live lime | Allowed only with accepted current upstream activity |
| `replay` | TxLINE replay | `History` | amber | Show historical fixture and replay progress |
| `local` | Local deterministic replay | `HardDrive` | local lavender | Explain that the orchestrator is unavailable |
| `unavailable` | Source unavailable | `CircleOff` | red | Disable source-dependent commitment or offer disclosed replay |

The SourceStatus component is persistent above the first quest on every viewport. A small dot is optional and never the only signifier.

### 4.2 Answer state

```ts
type AnswerState =
  | "available"
  | "selected"
  | "submitting"
  | "locked"
  | "settled-correct"
  | "settled-missed"
  | "expired"
  | "error";
```

| State | Interaction | Visual treatment | Announcement |
| --- | --- | --- | --- |
| Available | Select one answer | Neutral surface and border | None |
| Selected | Change selection or lock | Violet border, check icon, `aria-pressed=true` | “{label} selected. Lock answer to submit.” |
| Submitting | No duplicate action | Spinner, disabled commit only | “Locking answer…” |
| Locked | Wait for resolution | Lock icon and timestamp | “Answer locked.” |
| Settled correct | Review outcome | Lime check plus text | Correct and points added |
| Settled missed | Review outcome | Red/neutral icon plus text | Settled and no points added |
| Expired | Restart in replay | Amber clock | Window closed; restart offered |
| Error | Retry or continue locally | Red alert with recovery action | Error and safe next step |

Selection is reversible until the explicit lock action. The timer continues after selection and pauses only for a genuine submission operation if the product requires it.

### 4.3 Evidence state

| State | Allowed label | Prohibited label |
| --- | --- | --- |
| Browser record | Local receipt | Verified proof, append-only |
| Orchestrator room record | Session receipt | Immutable, on-chain |
| External evidence checked | Verified receipt, with verifier named | Generic “verified” |
| Cryptographic proof checked | Proof verified, with network/signature link | “Proof” without verification |

### 4.4 Reward and transaction state

The current system may expose only `disabled`, `test`, or `approval_required` payout intents. The following complete vocabulary is reserved for future sponsor/operator controls and may render only when backend contracts support it:

| State | Label | Required content |
| --- | --- | --- |
| `disconnected` | Wallet not connected | Why connection is needed and non-wallet alternative |
| `wrong_network` | Switch network | Current and required network |
| `insufficient_funds` | Insufficient funds | Asset, required amount, available amount |
| `signing` | Review in wallet | Exact asset, amount, destination, and network |
| `pending` | Transaction submitted | Explorer reference when available |
| `confirmed` | Transaction confirmed | Confirmation and reconciliation reference |
| `failed` | Transaction failed | Reason and retry/recovery action |
| `refunded` | Refunded | Amount, asset, destination, reference |
| `disputed` | Disputed | Owner, next review step, timeline |

Never simulate `pending` to `confirmed` with a timer alone.

## 5. Primitive components

### Button

Variants:

- `primary`: lime background, night foreground; one dominant instance per panel.
- `secondary`: raised dark surface, primary text, visible border.
- `ghost`: no persistent surface; use for low-risk contextual actions.
- `danger`: red-tinted surface and red text; destructive confirmation required where impact is irreversible.

Sizes: `sm` 36px, `md` 44px, `lg` 48px, icon 44px. Text is at least 13px. Every async Button owns idle, pending, success handoff, and error behavior. A pending Button preserves its width.

Implementation note: global element resets belong in Tailwind's base layer so they do not override utility colors. Confirm that primary text computes to night on lime.

### Badge / StatusBadge

Badge is for short metadata. StatusBadge adds icon, semantic label, and state token. Do not use a green Badge merely because a subsystem is healthy. Compact badge text is 10–12px with tested contrast and never carries a full instruction.

### Card / Panel

- Card groups one concept and may be interactive only when the whole surface has one destination.
- Panel groups a product task and may contain multiple controls.
- Interactive cards use a real link/button element and expose hover, focus, active, disabled, and selected states.
- Nested borders are limited to one level.

### Progress

Pass `value` to the Radix root, not only to the visual indicator. Require an accessible name and render `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`. Use determinate progress only for measurable completion; use a spinner for an unknown wait.

### Tabs / View switcher

Use Radix Tabs when content behaves as one tabbed surface. A route destination remains a link. Arrow-key navigation, selected state, focus, and associated tabpanel are required.

### Input, Select, Checkbox, Switch, Textarea

These are target primitives for sponsor/operator workflows. Use shadcn/Radix behavior, persistent labels, descriptions, error messages connected with `aria-describedby`, and 44px control height. Placeholder text is an example, not a label.

### Dialog, AlertDialog, Sheet, Popover, Tooltip

- Use Dialog for focused reversible tasks.
- Use AlertDialog for destructive or irreversible confirmation.
- Use Sheet for compact-screen secondary detail, not the primary quest.
- Use Popover for lightweight controls that can be dismissed safely.
- Tooltips supplement icon-only controls and never contain essential task instructions.

Focus must enter, remain within, and return from modal surfaces correctly.

### Toast / operation status

Use a polite status region for routine success and source changes. Use an alert only when immediate attention is necessary. A toast never replaces an inline error beside the failed action and must not disappear before it can be read.

### Table and data visualization

Use semantic tables for comparable rows such as bounties, transactions, or operator queues. Mobile may switch to labeled row cards while preserving every field. Charts require a text summary and an accessible table or list. No chart library is currently part of the frontend; review any new dependency before adoption.

## 6. Product components

### AppHeader

Anatomy: brand link, persistent SourceStatus, current fixture identifier, receipts/controls destination, guest/session identity. The profile affordance is a button only when it opens a real menu or route.

### SourceStatus

Props: `mode`, `provider`, `fixtureId`, optional `lastUpdated`, optional `detail`. It maps only through the source-state table. On compact screens it becomes a full-width status strip directly beneath the header.

### MatchHero

Anatomy: competition, disclosed replay/live label, teams, flags, score, minute, and latest event. Score is the strongest numeric hierarchy. Flag alt text may be empty when the adjacent team name already provides the same information; avoid redundant announcements.

### EventStrip

Shows one normalized event with icon, title, detail, and minute. It uses event semantics rather than source semantics: goal/success may be lime, urgency amber, final violet, neutral gray. The event update is announced once.

### QuestCard

Anatomy:

1. Quest number and source/resolution context.
2. Prompt as the page or region heading.
3. Short context.
4. Countdown with open/urgent/closed state.
5. Named AnswerOption group.
6. Points and settlement condition.
7. Explicit lock/restart action.

The card owns answer and operation state. It does not infer verification from visual styling.

### AnswerOption

Use radio semantics or a Button with `aria-pressed`. Anatomy: keyboard index, label, short consequence/hint, selected check. Minimum height 64px desktop and 56px compact, with a 44px effective target. A/B/C and 1/2/3 shortcuts must work if shown.

### Countdown

Displays `M:SS` with tabular mono numerals. Normal uses primary content, under 10 seconds uses amber, closed uses explicit `Closed`. Do not pulse every second. Assistive technology hears thresholds, not every tick.

### SettlementBanner

Appears after each settlement, including the final quest. Anatomy: outcome, points delta, source mode, resolution condition, and receipt label. Use `role=status` for the new outcome. Correct and missed states include both icon and text.

### ReplayPanel

Shows `Historical replay` or `Local deterministic replay`, fixture, event count, progress, and restart. It never uses a live pulse. The restart action is reversible and preserves a clear focus destination.

### StatTile

Label plus one value, optionally a trend or qualifier. Use for quests, streak, rank, sponsor pool, and source freshness. Pool values must say `demo` or `funded` based on actual data.

### Leaderboard

Use an ordered list or semantic table. Show rank, participant, points, and optional streak. The current fan row is clearly identified. Presentation cohorts must say `Demo cohort`; never imply concurrent usage.

### ActivityTimeline

Use a list with action, actor/system, state, and time. Static demo data is labeled `Simulated activity`. Actual times use valid `datetime` values. State dots supplement icons and text.

### ReceiptsList

Use a semantic list. Each row shows event/action, source, timestamp, result, and evidence level. The section title is `Receipts` unless independent proof verification exists. Local and server receipts are visually distinct.

### ToolComposition

Shows TxLINE, host rules, bounty engine, and reward boundary as a sequence. Each step exposes actual runtime state. Connectors describe direction but do not imply every integration executed in the current session.

### GuardrailPanel

Shows read, quest, money, and data policy boundaries in plain language. A check icon means the named control is implemented or currently enforced; use a neutral planned state otherwise.

### CompletionSummary

Shows final score, total points, streak, final settlement result, source mode, and two actions: review receipts and play again. In replay it says `replay quests`, not `live quests`.

### MobileActionDock

Visible at 820px and below. Safe-area-aware, 48px primary control, one secondary receipts/control destination. It mirrors the QuestCard's action state and never creates a second submission request.

### Empty, loading, error, and offline states

Every data-bearing component defines:

- skeleton or spinner for initial wait;
- empty explanation with a relevant next action;
- inline error with cause when safe and a recovery action;
- offline/local fallback label;
- stale-data state with last updated time.

## 7. Layout and responsive behavior

### Desktop: over 1180px

- Container: maximum 1560px, 24px minimum outer gutter.
- Grid: left context `minmax(240px, 0.75fr)`, active column `minmax(600px, 1.75fr)`, right context `minmax(300px, 0.9fr)`.
- Gap: 16px minimum, 20px preferred at wider widths.
- MatchHero and QuestCard share one central column and consistent edges.

### Tablet: 821–1180px

- Keep match and quest together in the dominant column.
- Move leaderboard and activity below in a readable two-column region where space permits.
- Do not reduce type or targets to preserve three columns.

### Mobile: 521–820px

Order:

1. Header.
2. SourceStatus.
3. Room / Receipts & controls switcher.
4. MatchHero.
5. QuestCard or CompletionSummary.
6. Replay context.
7. Leaderboard.
8. Sponsor/business context.
9. Footer.
10. Fixed MobileActionDock outside document flow with reserved bottom padding.

### Compact: 320–520px

- Single-column AnswerOptions.
- Condensed team names are allowed; source and settlement copy are not hidden.
- Use 15px side gutters.
- Truncate only secondary event detail and provide the full text accessibly.
- Do not hide match pulse when it contains the only rank/streak/source information; consolidate instead.

## 8. Accessibility implementation details

Target WCAG 2.2 AA.

### Semantics

- One `main` landmark for primary route content; header/footer remain outside it when structurally appropriate.
- Name multiple `aside` landmarks uniquely, for example `Match context` and `Room standings`.
- Use `nav` only for navigation, not arbitrary actions.
- Use ordered lists for ranked content and lists for receipts/activity.
- Keep a logical heading outline independent of visual size.

### Focus and keyboard

- Provide a skip link to the active match/quest region.
- All visible shortcuts are functional and avoid input, textarea, select, link, and button focus.
- After a view change, move focus to its heading only when the action changes task context.
- After replay reset, focus the first quest heading or restart control.
- Preserve a visible focus ring against every surface.

### Dynamic content

- One polite, atomic operation-status region announces connection, selection, submission, fallback, and settlement.
- Avoid competing live regions.
- Timer thresholds are announced at open, 10 seconds, closed, and restarted.
- Do not announce decorative market changes continuously.

### Contrast and targets

- Normal text: 4.5:1.
- Large text and essential UI graphics: 3:1.
- Focus indicator: 3:1 against adjacent colors.
- Primary and icon controls: 44px target.
- Compact inline links: at least 24px target or sufficient spacing from neighboring targets.

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Use a scoped production implementation if a global rule interferes with required browser behavior, but preserve the outcome.

## 9. Design-system route requirements

`/design-system` should render the following, with accessible labels and no false product claims:

1. Raw and semantic color tokens with approved foreground pairings.
2. Type scale at desktop and compact sizes.
3. Spacing, radius, elevation, icon, and motion examples.
4. Button, Badge, Card, Progress, Tabs, field, overlay, toast, table, and skeleton states.
5. SourceStatus for connecting/live/replay/local/unavailable.
6. AnswerOption for available/selected/submitting/locked/settled/expired/error.
7. Receipt/evidence levels and payout-intent states.
8. Desktop/tablet/mobile layout diagrams.
9. Focus, keyboard, reduced-motion, and contrast examples.
10. Component do/don't examples.

Every Progress example needs an accessible name. “Verified” examples must name the verification mechanism or use a neutral receipt state.

## 10. Open-source component mapping

| Product need | Preferred implementation | Current availability |
| --- | --- | --- |
| Buttons and badges | Local shadcn-style components + Radix Slot | Present |
| Cards | Local semantic Card primitives | Present |
| Progress | Radix Progress | Present; needs value/name verification |
| View switcher | Radix Tabs | Present; currently unused |
| Dialog / confirmation | shadcn Dialog / AlertDialog over Radix | Target, not installed as local component |
| Tooltip | shadcn Tooltip over Radix | Target |
| Dropdown / Select | shadcn DropdownMenu / Select over Radix | Target |
| Sheet | shadcn Sheet over Radix Dialog | Target |
| Toast | Radix Toast or reviewed shadcn-compatible implementation | Target |
| Command palette | shadcn Command; requires reviewed `cmdk` dependency | Future operator surface |
| Table | Semantic HTML with local styling | Target; no extra dependency required |
| Charts | Accessible SVG/CSS plus data table; review library if complexity requires it | Future operator surface |
| Icons | Lucide React via the centralized Icon adapter | Present |

Do not install a library merely because a prototype used it. Confirm bundle, license, accessibility behavior, maintenance, and need.

## 11. Validation gates

### Automated

- `npm run lint`
- `npm run build`
- `npm run check`
- Browser tests for correct-answer path, missed answer, timeout/restart, API fallback, reset, completion, and receipts view.
- Axe checks on `/` and `/design-system` in active, settled, completion, and error states.
- Visual snapshots at 390, 768, 1180, and 1440 CSS pixels.

### Manual

- Keyboard-only happy path and timeout recovery.
- VoiceOver or equivalent screen-reader path.
- 200% zoom without loss of content or action.
- Reduced-motion mode.
- High latency and request failure.
- 320px viewport and mobile safe-area behavior.
- Claim audit for live/replay/local, verified/proof/receipt, intent/paid.

## 12. Migration order

1. Correct truthful state vocabulary and bind it to runtime state.
2. Introduce semantic token aliases and fix contrast/type-size regressions.
3. Fix Button, Progress, landmarks, dynamic announcements, and answer semantics.
4. Extract state management from the route component and prevent duplicate submission.
5. Extract product components without changing API behavior.
6. Rebuild desktop and mobile hierarchy around persistent source disclosure.
7. Expand `/design-system` and add browser/accessibility tests.
8. Review Open Design prototypes, then implement only approved deltas.
