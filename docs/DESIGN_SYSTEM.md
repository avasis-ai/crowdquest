# Design system

CrowdQuest is designed around one rule: **one moment, one decision, one visible source of truth**. The interface should feel energetic enough for a live match while making replay, settlement, and money-related states difficult to confuse.

The rendered reference is available at `/design-system`.

## Principles

1. **Match first.** Score, teams, minute, and the latest event remain the strongest hierarchy.
2. **One decision at a time.** A quest presents one prompt, short context, and two or three mutually exclusive choices.
3. **State before spectacle.** Live/replay, open/locked/settled, and intent/payout language must remain explicit.
4. **Wallet mechanics stay secondary.** Fans enter through play; sponsor and reward mechanics are explanatory, not blocking.
5. **Replay must feel honest.** Historical demonstrations are labeled and never styled as evidence of a current match.

## Foundations

### Color

| Token | Hex/value | Use |
| --- | --- | --- |
| `--ink` | `#08060F` | Canvas |
| `--ink-soft` | `#100B1D` | Secondary dark surface |
| `--panel-strong` | `#25164A` | Emphasized panel |
| `--lime` | `#D2FF52` | Primary action, success, active signal |
| `--violet` | `#9A63FF` | Proof and system state |
| `--amber` | `#FFD052` | Urgency and approval-required state |
| `--red` | `#FF7D78` | Missed/negative state |
| `--text` | `#F7F4FF` | Primary type |
| `--muted` | `#A99FBA` | Secondary type |

Lime must not imply an upstream connection merely because the app is healthy. Text labels carry the semantic distinction.

### Type

- **Geist** for product copy and high-impact match typography.
- **Geist Mono** for fixture IDs, timestamps, counts, and receipt-like states.
- Large headings use tight tracking; supporting copy remains compact but should not fall below a readable size on production surfaces.

### Geometry

The system uses a soft shell and sharp signals: panels use 15–21 px radii, compact controls use 8–13 px radii, and status marks are small circles or square chips. This keeps dense match data calm while preserving urgency in the active choice.

## Semantic states

| Dimension | States | Rule |
| --- | --- | --- |
| Source | `live`, `replay`, `unavailable` | “Live” requires an accepted current upstream connection; replay is the default demonstration state |
| Answer | `open`, `locked`, `settled` | Selection locks before a result; points appear only after resolution |
| Outcome | `correct`, `missed` | Never communicate outcome by color alone |
| Money | `disabled`, `test`, `approval required`, `submitted` | The present product only creates intent metadata and does not display “paid” |
| Evidence | `receipt`, `proof` | Product receipts are not called on-chain proofs unless verification exists |

## Components

- **Match hero:** team identity, score, minute, and current event.
- **Quest card:** prompt, timer, answer choices, reward points, resolution condition, and primary action.
- **Settlement banner:** prior outcome and saved receipt state.
- **Leaderboard:** local/presentation rank and points; never a payout ledger.
- **Source panel:** replay progress and normalized signal display.
- **Proof & tools view:** composition trace, receipts, guardrails, and business model.
- **Buttons, badges, cards, and progress:** local primitives under `components/ui/`.

## Responsive behavior

- Above 1180 px: three-column match workspace.
- 821–1180 px: two-column workspace with the right rail below.
- 521–820 px: single-column workspace and visible room/trace mode switch.
- Up to 520 px: condensed scoreboard, single-column choices, and reduced secondary detail.

The product supports a 320 px minimum viewport. Core interactions are native buttons and links, and keyboard focus uses a visible lime outline.

## Accessibility contract

- Every interactive control must remain keyboard reachable.
- Disabled choices use the native `disabled` attribute.
- Icons support text rather than replacing critical labels.
- Team flags have descriptive `alt` text.
- Progress exposes an accessible label.
- Color is never the sole outcome indicator.
- Motion should remain subtle; a future production pass should add `prefers-reduced-motion` handling for pulse and transition effects.
- Compact text in the hackathon UI should be enlarged and contrast-tested before broad consumer release.

## Inspiration and originality

The design-system route links to three public Dribbble references for hierarchy, decision clarity, and free-to-play motivation. No artwork from those references is bundled. CrowdQuest’s layouts, tokens, components, copy, and SVG assets are implemented locally. See [Third-party notices](../THIRD_PARTY_NOTICES.md).
