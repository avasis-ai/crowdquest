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
  { name: "Night 950", value: "#08060F", role: "Canvas" },
  { name: "Plum 800", value: "#25164A", role: "Panels" },
  { name: "Signal Lime", value: "#D2FF52", role: "Primary action" },
  { name: "Proof Violet", value: "#9A63FF", role: "Verification" },
  { name: "Moment Amber", value: "#FFD052", role: "Time-sensitive" },
  { name: "Miss Red", value: "#FF7D78", role: "Negative state" },
  { name: "Chalk", value: "#F7F4FF", role: "Primary type" },
  { name: "Touchline", value: "#A99FBA", role: "Secondary type" },
];

const influences = [
  {
    title: "Live score hierarchy",
    source: "Paperpillar · Football Live Score",
    href: "https://dribbble.com/shots/26660059-Football-Live-Score-App-UI",
    note: "Keep match state central and readable before exposing deeper analytics.",
  },
  {
    title: "Decision clarity",
    source: "Lumio · Prediction Companion",
    href: "https://dribbble.com/shots/27525997-Lumio-Data-driven-prediction-companion",
    note: "Compress complex market information into one actionable card at a time.",
  },
  {
    title: "Free-to-play motivation",
    source: "Lebi · Sports Prediction App",
    href: "https://dribbble.com/shots/25928190-Lebi-Sports-Prediction-App",
    note: "Use streaks, points and prizes without making wallet mechanics the entry point.",
  },
];

export default function DesignSystemPage() {
  return (
    <main className="ds-page">
      <header className="ds-nav">
        <Link className="brand" href="/">
          <span className="brand-mark"><Icon name="bolt" /></span>
          <span>CrowdQuest</span>
        </Link>
        <Badge variant="proof">Design system · v0.1</Badge>
        <Button asChild variant="panel" size="sm"><Link href="/">Open product <Icon name="external" /></Link></Button>
      </header>

      <section className="ds-hero">
        <div>
          <span className="eyebrow"><Icon name="spark" /> The CrowdQuest system</span>
          <h1>Calm enough to trust.<br/><em>Alive enough to play.</em></h1>
        </div>
        <p>A product system for fast-moving match moments. It makes live state, answer windows, settlement truth and reward risk legible in under a second.</p>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>01</span><div><h2>Foundations</h2><p>Semantic tokens keep live, proof, urgency and error states consistent across every surface.</p></div></div>
        <div className="swatch-grid">
          {colors.map((color) => (
            <article className="swatch" key={color.name}>
              <span className="swatch-color" style={{ backgroundColor: color.value }} />
              <div><b>{color.name}</b><small>{color.role}</small><code>{color.value}</code></div>
            </article>
          ))}
        </div>
        <div className="foundation-grid">
          <Card>
            <CardHeader><Badge variant="live">Typography</Badge><CardTitle>Geist + Geist Mono</CardTitle><CardDescription>Humanist product copy paired with machine-readable timestamps, IDs and receipts.</CardDescription></CardHeader>
            <CardContent className="type-samples"><span className="type-display">Live moments</span><span className="type-title">Does France convert?</span><span className="type-body">One focused question, with enough context to act.</span><span className="type-mono">FIXTURE 18209181 · 60′</span></CardContent>
          </Card>
          <Card>
            <CardHeader><Badge variant="neutral">Geometry</Badge><CardTitle>Soft shell, sharp signal</CardTitle><CardDescription>Rounded surfaces reduce dashboard noise; square signal elements make actions feel immediate.</CardDescription></CardHeader>
            <CardContent className="geometry-samples"><span>8</span><span>12</span><span>18</span><span>28</span></CardContent>
          </Card>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>02</span><div><h2>Primitives</h2><p>Open-source shadcn patterns, Radix behavior and Lucide icons—fully owned and themed in the repository.</p></div></div>
        <Card className="component-stage">
          <CardContent>
            <div className="component-row"><span>Actions</span><div><Button>Reveal update <Icon name="arrow" /></Button><Button variant="panel">Inspect proof</Button><Button variant="ghost">Skip</Button><Button variant="danger">Stop payout</Button></div></div>
            <div className="component-row"><span>Statuses</span><div><Badge variant="live">Live feed</Badge><Badge variant="proof">Verified</Badge><Badge variant="warning">Approval required</Badge><Badge variant="neutral">Replay</Badge></div></div>
            <div className="component-row"><span>Progress</span><div className="progress-examples"><Progress value={18}/><Progress value={63}/><Progress value={100}/></div></div>
          </CardContent>
          <CardFooter><span className="ds-note"><Icon name="shield" /> Keyboard focus, disabled states and semantic labels are part of the component contract.</span></CardFooter>
        </Card>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>03</span><div><h2>Product states</h2><p>The interface always distinguishes data freshness, user commitment and financial risk.</p></div></div>
        <div className="state-grid">
          <Card><CardHeader><Badge variant="live">Feed</Badge><CardTitle>Live / replay</CardTitle></CardHeader><CardContent><p>“Live” is reserved for an accepted SSE connection with current fixture activity. Historical demonstrations are always labeled replay.</p></CardContent></Card>
          <Card><CardHeader><Badge variant="proof">Truth</Badge><CardTitle>Pending / settled</CardTitle></CardHeader><CardContent><p>Answers lock first. Points appear only after the matching TxLINE event closes the quest.</p></CardContent></Card>
          <Card><CardHeader><Badge variant="warning">Money</Badge><CardTitle>Intent / payout</CardTitle></CardHeader><CardContent><p>Agents create payout intents. Testnet or an explicit human approval gate precedes value transfer.</p></CardContent></Card>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-section-heading"><span>04</span><div><h2>Inspiration, translated</h2><p>We studied current Dribbble patterns, then turned their useful principles into an original, buildable system.</p></div></div>
        <div className="influence-grid">
          {influences.map((item) => (
            <a className="influence-card" href={item.href} key={item.title} rel="noreferrer" target="_blank">
              <span className="influence-arrow"><Icon name="external" /></span><b>{item.title}</b><small>{item.source}</small><p>{item.note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="ds-manifesto">
        <span className="eyebrow">Interaction rule</span>
        <h2>One moment. One decision. One visible source of truth.</h2>
        <Button asChild><Link href="/">Experience the replay <Icon name="arrow" /></Link></Button>
      </section>
    </main>
  );
}
