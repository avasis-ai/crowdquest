import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Icon } from "../components/icons";

const colors = [
  { token: "canvas", value: "#08070D", role: "Application background", dark: true },
  { token: "surface-panel", value: "#171024", role: "Primary panels", dark: true },
  { token: "surface-raised", value: "#211633", role: "Raised controls", dark: true },
  { token: "signal", value: "#CFFF5A", role: "Primary action", dark: false },
  { token: "accent", value: "#8B5CF6", role: "System structure", dark: false },
  { token: "info", value: "#7CB8FF", role: "Replay / information", dark: false },
  { token: "warning", value: "#FFD166", role: "Time / approval", dark: false },
  { token: "danger", value: "#FF807A", role: "Failure / destructive", dark: false },
  { token: "text-primary", value: "#FAF8FF", role: "Primary text", dark: false },
  { token: "text-secondary", value: "#B8B1C7", role: "Supporting text", dark: false },
];

const principles = [
  { icon: "target", title: "One decisive moment", copy: "The score establishes context; the active quest owns the strongest hierarchy and only primary action." },
  { icon: "eye", title: "Truth before theatre", copy: "Live, API replay, and local replay are visibly different. The UI never implies verification it cannot prove." },
  { icon: "lock", title: "Guard every value move", copy: "Points settle from explicit events. Money remains an approval-gated intent until policy permits execution." },
  { icon: "layers", title: "Complexity stays backstage", copy: "Fans get one workspace while adapters, agents, bounty logic, and payment rails remain inspectable context." },
];

const stateRows = [
  ["Source", "Live", "API replay", "Local replay", "Checking"],
  ["Quest", "Available", "Selected", "Submitting", "Closed"],
  ["Settlement", "Pending", "Correct", "Missed", "Fallback"],
  ["Money", "Not requested", "Intent", "Approval", "Executed"],
];

const inspiration = [
  { title: "Wallet-grade decisiveness", source: "Reference mobile finance UI", note: "Large numeric hierarchy, contained actions, and acid signal color for the one thing users can do next." },
  { title: "Operations-dashboard rhythm", source: "Reference workforce dashboard", note: "Clear work zones, dense context at the edges, and a spacious active surface in the center." },
  { title: "Sports-room immediacy", source: "Open Design research set", note: "Score first, time pressure second, and competitive context without visualizing play as wagering." },
];

export default function DesignSystemPage() {
  return (
    <main className="ds-page">
      <header className="ds-nav">
        <Link className="brand" href="/" aria-label="CrowdQuest product">
          <span className="brand-mark"><Icon name="bolt" /></span>
          <span>CrowdQuest</span>
        </Link>
        <Badge variant="proof">Signal OS · 1.0</Badge>
        <Button asChild variant="panel" size="sm"><Link href="/">Open workspace <Icon name="external" /></Link></Button>
      </header>

      <section className="ds-hero">
        <div className="ds-hero-copy">
          <span className="eyebrow"><Icon name="wand" /> Open Design system</span>
          <h1>Fast moments.<br/><em>Visible truth.</em></h1>
          <p>CrowdQuest Signal OS is a production design language for sponsor-funded sports quests. It combines the certainty of a financial interface with the rhythm of a live operations room.</p>
          <div className="ds-hero-actions"><Button asChild><Link href="/">Experience the replay <Icon name="arrow" /></Link></Button><a href="#foundations">Read the specification</a></div>
        </div>
        <div className="ds-hero-board" aria-label="Design system summary">
          <div className="ds-signal-orbit"><span><Icon name="bolt" /></span><i /><i /><i /></div>
          <div className="ds-summary-grid"><span><b>10</b><small>semantic colors</small></span><span><b>4</b><small>truth layers</small></span><span><b>44px</b><small>minimum target</small></span><span><b>AA</b><small>contrast floor</small></span></div>
        </div>
      </section>

      <section className="ds-section" id="foundations">
        <div className="ds-section-heading"><span>01</span><div><h2>Product principles</h2><p>The system is designed around decisions, source clarity, and guarded execution—not decorative dashboard density.</p></div></div>
        <div className="principle-grid">
          {principles.map((principle) => <article className="principle-card" key={principle.title}><span><Icon name={principle.icon} /></span><h3>{principle.title}</h3><p>{principle.copy}</p></article>)}
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>02</span><div><h2>Color and surfaces</h2><p>Near-black canvas and purple depth create calm structure. Signal lime is reserved for commitment, success, and the current point of attention.</p></div></div>
        <div className="swatch-grid">
          {colors.map((color) => (
            <article className="swatch" key={color.token}>
              <span className="swatch-color" style={{ backgroundColor: color.value, color: color.dark ? "#FAF8FF" : "#08070D" }}><code>{color.value}</code></span>
              <div><b>--{color.token}</b><small>{color.role}</small></div>
            </article>
          ))}
        </div>
        <div className="foundation-grid">
          <Card>
            <CardHeader><Badge variant="proof">Typography</Badge><CardTitle>Geist + Geist Mono</CardTitle><CardDescription>A compact product voice with machine-readable evidence where precision matters.</CardDescription></CardHeader>
            <CardContent className="type-samples"><span className="type-display">Match moment</span><span className="type-title">Does France convert?</span><span className="type-body">Enough context to decide without leaving the room.</span><span className="type-mono">FIXTURE 18209181 · API REPLAY</span></CardContent>
          </Card>
          <Card>
            <CardHeader><Badge variant="neutral">Spacing + radius</Badge><CardTitle>4px rhythm, soft containment</CardTitle><CardDescription>Spacing grows by intent. Corners communicate nesting without turning every control into a pill.</CardDescription></CardHeader>
            <CardContent><div className="geometry-samples"><span>8</span><span>12</span><span>18</span><span>24</span></div><div className="space-scale"><i style={{ width: 8 }}/><i style={{ width: 16 }}/><i style={{ width: 24 }}/><i style={{ width: 32 }}/><i style={{ width: 48 }}/></div></CardContent>
          </Card>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>03</span><div><h2>Owned primitives</h2><p>shadcn-style composition, Radix behavior, Tailwind tokens, and Lucide icons—kept inside the product repository and governed by this contract.</p></div></div>
        <Card className="component-stage">
          <CardContent>
            <div className="component-row"><span>Actions</span><div><Button>Lock answer <Icon name="arrow" /></Button><Button variant="panel">Inspect receipts</Button><Button variant="ghost">Reset</Button><Button variant="danger">Stop payout</Button></div></div>
            <div className="component-row"><span>Statuses</span><div><Badge variant="live">Live source</Badge><Badge variant="replay">API replay</Badge><Badge variant="offline">Local replay</Badge><Badge variant="proof">Guarded</Badge><Badge variant="warning">Approval required</Badge><Badge variant="danger">Failed</Badge></div></div>
            <div className="component-row"><span>Progress</span><div className="progress-examples"><Progress value={18} aria-label="18 percent complete"/><Progress value={63} aria-label="63 percent complete"/><Progress value={100} aria-label="Complete"/></div></div>
            <div className="component-row"><span>Iconography</span><div className="icon-stage"><span><Icon name="radio"/><small>source</small></span><span><Icon name="target"/><small>quest</small></span><span><Icon name="shield"/><small>policy</small></span><span><Icon name="database"/><small>record</small></span><span><Icon name="wallet"/><small>reward</small></span></div></div>
          </CardContent>
          <CardFooter><span className="ds-note"><Icon name="shield" /> Every interactive primitive includes visible focus, disabled, loading, error, and reduced-motion behavior.</span></CardFooter>
        </Card>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>04</span><div><h2>State language</h2><p>Every high-consequence object declares its state in words and color. Color is reinforcement, never the only signal.</p></div></div>
        <div className="state-matrix" role="table" aria-label="CrowdQuest product state matrix">
          {stateRows.map((row, rowIndex) => <div className="matrix-row" role="row" key={row[0]}>{row.map((cell, cellIndex) => <div role={cellIndex === 0 ? "rowheader" : "cell"} className={cellIndex === 0 ? "matrix-label" : `matrix-cell matrix-tone-${cellIndex}`} key={`${rowIndex}-${cellIndex}`}>{cell}</div>)}</div>)}
        </div>
        <div className="answer-state-demo" aria-label="Quest answer interaction states">
          <div><span className="state-label">Available</span><button className="choice-card" type="button"><span className="choice-key">A</span><span><b>Goal</b><small>Ready to select</small></span><span className="choice-check"><Icon name="check" /></span></button></div>
          <div><span className="state-label">Selected</span><button className="choice-card selected" type="button" aria-pressed="true"><span className="choice-key">B</span><span><b>No goal</b><small>Editable until lock</small></span><span className="choice-check"><Icon name="check" /></span></button></div>
          <div><span className="state-label">Closed</span><button className="choice-card" type="button" disabled><span className="choice-key">C</span><span><b>Window closed</b><small>Restart is explicit</small></span><span className="choice-check"><Icon name="lock" /></span></button></div>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>05</span><div><h2>Responsive contract</h2><p>The active decision stays first at every size. Supporting information reflows; it never steals target size or truth disclosure.</p></div></div>
        <div className="responsive-contract">
          <div><Icon name="monitor"/><Badge variant="neutral">≥ 1180px</Badge><b>Operations room</b><p>Replay context, match decision, and competitive room remain visible in three purposeful columns.</p></div>
          <div><Icon name="layers"/><Badge variant="neutral">821–1179px</Badge><b>Focused command view</b><p>Quest and source remain primary. Leaderboard and workflow context move into a full-width supporting row.</p></div>
          <div><Icon name="smartphone"/><Badge variant="live">≤ 820px</Badge><b>One-thumb quest flow</b><p>Source disclosure precedes the score, choices become a single column, and the primary action stays in a safe-area dock.</p></div>
        </div>
        <div className="a11y-contract">
          <div><span className="eyebrow">Accessibility contract</span><h3>Readable under pressure.</h3></div>
          <ul><li>44px minimum targets</li><li>Visible 2px focus ring</li><li>Radio-key navigation</li><li>Polite status announcements</li><li>AA text contrast floor</li><li>Reduced-motion fallback</li></ul>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>06</span><div><h2>Inspiration, translated</h2><p>The supplied finance and operations references informed hierarchy and contrast. Open Design translated those principles into an original system for CrowdQuest.</p></div></div>
        <div className="influence-grid">
          {inspiration.map((item, index) => <article className="influence-card" key={item.title}><span className="influence-arrow">0{index + 1}</span><b>{item.title}</b><small>{item.source}</small><p>{item.note}</p></article>)}
        </div>
      </section>

      <section className="ds-manifesto">
        <span className="eyebrow">CrowdQuest interaction rule</span>
        <h2>One moment. One decision. One visible source of truth.</h2>
        <Button asChild size="lg"><Link href="/">Open the match room <Icon name="arrow" /></Link></Button>
      </section>
    </main>
  );
}
