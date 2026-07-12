"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  events,
  leaderboard,
  match,
  quests,
  toolTrace,
} from "@/lib/demo-data";
import { Icon } from "./icons";

type View = "room" | "trace";

type SettledAnswer = {
  questId: string;
  choice: string;
  correct: boolean;
  points: number;
};

type ApiRoom = {
  session: { id: string; points: number; streak: number };
  eventIndex: number;
  source: { connected: boolean; mode: "live" | "replay" };
  answers: Array<{ questId: string; choiceId: string; correct: boolean; points: number }>;
};

const API_BASE = process.env.NEXT_PUBLIC_CROWDQUEST_API_URL ?? "";
const POLAR_CHECKOUT_URL = process.env.NEXT_PUBLIC_POLAR_CHECKOUT_URL;

const EVENT_COLORS = {
  kickoff: "event-neutral",
  chance: "event-amber",
  break: "event-neutral",
  goal: "event-lime",
  final: "event-violet",
};

export function MatchRoom() {
  const [view, setView] = useState<View>("room");
  const [eventIndex, setEventIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(24);
  const [points, setPoints] = useState(860);
  const [streak, setStreak] = useState(3);
  const [answers, setAnswers] = useState<SettledAnswer[]>([]);
  const [lastResult, setLastResult] = useState<SettledAnswer | null>(null);
  const [apiSessionId, setApiSessionId] = useState<string | null>(null);
  const [apiAvailable, setApiAvailable] = useState(false);
  const [sourceConnected, setSourceConnected] = useState(false);

  const event = events[eventIndex];
  const quest = eventIndex < quests.length ? quests[eventIndex] : null;
  const finished = eventIndex === events.length - 1;
  const timedOut = seconds === 0 && !choice;

  useEffect(() => {
    if (!quest || choice) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [quest, choice, eventIndex]);

  useEffect(() => {
    let cancelled = false;
    async function createSession() {
      try {
        const response = await fetch(`${API_BASE}/v1/sessions`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ displayName: "Guest fan" }),
        });
        if (!response.ok) throw new Error(`session request failed: ${response.status}`);
        const room = await response.json() as ApiRoom;
        if (cancelled) return;
        setApiSessionId(room.session.id);
        setApiAvailable(true);
        setSourceConnected(room.source.connected);
      } catch {
        if (!cancelled) setApiAvailable(false);
      }
    }
    void createSession();
    return () => { cancelled = true; };
  }, []);

  const userRank = useMemo(() => {
    const above = leaderboard.filter((player) => player.points > points).length;
    return above + 1;
  }, [points]);

  async function advanceReplay() {
    if (!quest || !choice) return;
    if (apiSessionId) {
      try {
        const response = await fetch(`${API_BASE}/v1/rooms/${apiSessionId}/answers`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ questId: quest.id, choiceId: choice }),
        });
        if (!response.ok) throw new Error(`answer request failed: ${response.status}`);
        const payload = await response.json() as { room: ApiRoom; settlement: { questId: string; choiceId: string; correct: boolean; points: number } };
        const settlement = { questId: payload.settlement.questId, choice: payload.settlement.choiceId, correct: payload.settlement.correct, points: payload.settlement.points };
        setEventIndex(payload.room.eventIndex);
        setPoints(payload.room.session.points);
        setStreak(payload.room.session.streak);
        setAnswers(payload.room.answers.map((answer) => ({ questId: answer.questId, choice: answer.choiceId, correct: answer.correct, points: answer.points })));
        setLastResult(settlement);
        setSourceConnected(payload.room.source.connected);
        setChoice(null);
        setSeconds(24);
        return;
      } catch {
        setApiAvailable(false);
      }
    }
    const correct = choice === quest.correctChoice;
    const settlement = {
      questId: quest.id,
      choice,
      correct,
      points: correct ? quest.points : 0,
    };

    setAnswers((current) => [...current, settlement]);
    setLastResult(settlement);
    setPoints((current) => current + settlement.points);
    setStreak((current) => (correct ? current + 1 : 0));
    setEventIndex((current) => Math.min(current + 1, events.length - 1));
    setChoice(null);
    setSeconds(24);
  }

  async function resetReplay() {
    if (apiSessionId) {
      try {
        await fetch(`${API_BASE}/v1/rooms/${apiSessionId}/reset`, { method: "POST" });
      } catch {
        setApiAvailable(false);
      }
    }
    setEventIndex(0);
    setChoice(null);
    setSeconds(24);
    setPoints(860);
    setStreak(3);
    setAnswers([]);
    setLastResult(null);
    setView("room");
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="CrowdQuest home">
          <span className="brand-mark"><Icon name="bolt" /></span>
          <span>CrowdQuest</span>
        </a>

        <div className="topbar-status">
          <span className="status-pulse" />
          <span>{sourceConnected ? "TxLINE live connected" : apiAvailable ? "TxLINE adapter · replay mode" : "Local replay mode"}</span>
          <span className="status-divider" />
          <span>Fixture {match.id}</span>
        </div>

        <div className="topbar-actions">
          <Button variant="panel" size="icon" className="icon-button" aria-label="How CrowdQuest works" onClick={() => setView("trace")}>
            <Icon name="info" />
          </Button>
          <button className="profile-button" type="button">
            <span>AB</span>
            <span className="profile-copy"><b>Guest fan</b><small>{points.toLocaleString()} pts</small></span>
          </button>
        </div>
      </header>

      <nav className="mode-switch" aria-label="Workspace view">
        <button className={view === "room" ? "active" : ""} onClick={() => setView("room")}>
          <Icon name="play" /> Match room
        </button>
        <button className={view === "trace" ? "active" : ""} onClick={() => setView("trace")}>
          <Icon name="shield" /> Proof & tools
        </button>
      </nav>

      {view === "room" ? (
        <div className="workspace" id="top">
          <aside className="left-rail">
            <section className="panel compact-panel replay-panel">
              <div className="eyebrow-row">
                <span className="eyebrow"><Icon name="radio" /> Demo replay</span>
                <span>{eventIndex + 1}/{events.length}</span>
              </div>
              <Progress value={(eventIndex / (events.length - 1)) * 100} className="replay-progress" aria-label={`Replay progress ${eventIndex + 1} of ${events.length}`} />
              <p>Walk judges through a real completed fixture even when no match is live.</p>
              <button className="text-button" onClick={resetReplay}>Restart replay <Icon name="refresh" /></button>
            </section>

            <section className="panel compact-panel">
              <div className="panel-title-row">
                <h2>Match pulse</h2>
                <Badge variant="neutral">normalized</Badge>
              </div>
              <div className="probability-card">
                <div>
                  <span>France win signal</span>
                  <strong>{event.marketHome}%</strong>
                </div>
                <div className="probability-bar"><span style={{ width: `${event.marketHome}%` }} /></div>
                <small>StablePrice direction · display-only</small>
              </div>
              <div className="stat-grid">
                <div><span>Quests</span><b>{answers.length}/{quests.length}</b></div>
                <div><span>Streak</span><b>{streak}×</b></div>
                <div><span>Rank</span><b>#{userRank}</b></div>
                <div><span>Pool</span><b>${match.sponsorPool}</b></div>
              </div>
            </section>

            <section className="panel compact-panel sponsor-card">
              <div className="sponsor-icon"><Icon name="users" /></div>
              <div>
                <h3>Run a club room</h3>
                <p>Sponsor free quests for your community. No fan stake required.</p>
              </div>
              <a
                href={POLAR_CHECKOUT_URL || "#business-model"}
                rel={POLAR_CHECKOUT_URL ? "noreferrer" : undefined}
                target={POLAR_CHECKOUT_URL ? "_blank" : undefined}
              >
                {POLAR_CHECKOUT_URL ? "Start with Polar" : "See the model"} <Icon name="arrow" />
              </a>
            </section>
          </aside>

          <section className="match-column">
            <section className="match-hero panel">
              <div className="stadium-lines" />
              <div className="match-meta">
                <span>{match.competition}</span>
                <span className="dot-separator" aria-hidden="true" />
                <span>{match.startedAt}</span>
              </div>
              <div className="scoreboard">
                <div className="team team-home">
                  <span className="flag"><Image alt="France flag" height={28} src={`/flags/${match.home.flagCode}.svg`} width={28} /></span>
                  <div><b>{match.home.name}</b><small>{match.home.code}</small></div>
                </div>
                <div className="score-block">
                  <div className="score"><strong>{event.homeScore}</strong><span>—</span><strong>{event.awayScore}</strong></div>
                  <span className={`minute-pill ${finished ? "finished" : ""}`}>{event.minuteLabel}</span>
                </div>
                <div className="team team-away">
                  <div><b>{match.away.name}</b><small>{match.away.code}</small></div>
                  <span className="flag"><Image alt="Morocco flag" height={28} src={`/flags/${match.away.flagCode}.svg`} width={28} /></span>
                </div>
              </div>
              <div className={`event-strip ${EVENT_COLORS[event.kind]}`}>
                <span className="event-icon"><Icon name={event.kind === "goal" ? "goal" : event.kind === "chance" ? "target" : event.kind === "final" ? "circle-check" : "clock"} /></span>
                <div><b>{event.title}</b><span>{event.detail}</span></div>
                <span className="event-time">{event.minuteLabel}</span>
              </div>
            </section>

            {!finished && quest ? (
              <section className="quest-card panel">
                {lastResult && (
                  <div className={`settlement-banner ${lastResult.correct ? "won" : "missed"}`}>
                    <span><Icon name={lastResult.correct ? "check" : "info"} /></span>
                    <div>
                      <b>{lastResult.correct ? `Correct · +${lastResult.points} points` : "Settled · not this time"}</b>
                      <small>Previous quest closed from the next TxLINE event.</small>
                    </div>
                    <span className="proof-chip">receipt saved</span>
                  </div>
                )}

                <div className="quest-heading">
                  <div>
                    <span className="eyebrow"><Icon name="spark" /> Host quest · #{eventIndex + 1}</span>
                    <h1>{quest.prompt}</h1>
                    <p>{quest.context}</p>
                  </div>
                  <div className={`countdown ${seconds < 8 ? "urgent" : ""}`}>
                    <span>{choice ? "LOCKED" : timedOut ? "CLOSED" : "LOCKS"}</span>
                    <strong>{choice ? <Icon name="check" /> : `0:${seconds.toString().padStart(2, "0")}`}</strong>
                  </div>
                </div>

                <div className="choice-grid">
                  {quest.choices.map((option, index) => (
                    <button
                      className={`choice-card ${choice === option.id ? "selected" : ""}`}
                      disabled={Boolean(choice) || seconds === 0}
                      key={option.id}
                      onClick={() => setChoice(option.id)}
                      type="button"
                    >
                      <span className="choice-key">{String.fromCharCode(65 + index)}</span>
                      <span><b>{option.label}</b><small>{option.hint}</small></span>
                      <span className="choice-check"><Icon name="check" /></span>
                    </button>
                  ))}
                </div>

                <div className="quest-footer">
                  <div className="reward-copy">
                    <span className="reward-icon"><Icon name="trophy" /></span>
                    <div><b>+{quest.points} points</b><small>Sponsor reward leaderboard</small></div>
                  </div>
                  <div className="settles-copy"><Icon name="shield" /><span>Settles from<br/><b>{quest.settlesOn}</b></span></div>
                  <Button
                    className="primary-button"
                    disabled={!choice && !timedOut}
                    onClick={timedOut ? () => setSeconds(24) : advanceReplay}
                  >
                    {timedOut ? "Restart answer window" : choice ? "Reveal next update" : "Pick an answer"} <Icon name={timedOut ? "refresh" : "arrow"} />
                  </Button>
                </div>
              </section>
            ) : (
              <section className="finish-card panel">
                <span className="finish-burst"><Icon name="trophy" /></span>
                <span className="eyebrow">Replay complete</span>
                <h1>{points.toLocaleString()} points</h1>
                <p>You completed {answers.length} live quests with a {streak}× finishing streak. Every result has a replayable settlement receipt.</p>
                <div className="finish-actions">
                  <Button className="primary-button" onClick={() => setView("trace")}>Inspect proof trail <Icon name="shield" /></Button>
                  <Button variant="panel" className="secondary-button" onClick={resetReplay}>Play again</Button>
                </div>
              </section>
            )}

            <p className="demo-disclosure">Replay mode demonstrates the live product loop using a completed covered fixture. Production mode consumes the TxLINE snapshot and SSE endpoints server-side.</p>
          </section>

          <aside className="right-rail">
            <section className="panel leaderboard-panel">
              <div className="panel-title-row">
                <div><span className="eyebrow">Match room</span><h2>Leaderboard</h2></div>
                <span className="people-live"><span /> demo cohort · 248</span>
              </div>
              <div className="podium-row">
                {leaderboard.slice(0, 3).map((player) => (
                  <div className={`podium podium-${player.rank}`} key={player.name}>
                    <span className="avatar">{player.avatar}</span>
                    <b>{player.name}</b>
                    <small>{player.points.toLocaleString()}</small>
                    <span className="rank-badge">{player.rank}</span>
                  </div>
                ))}
              </div>
              <div className="ranking-list">
                <div className="ranking-row you-row">
                  <span className="row-rank">{userRank}</span><span className="avatar small">AB</span>
                  <span className="player-name"><b>You</b><small>{streak}× streak</small></span><strong>{points.toLocaleString()}</strong>
                </div>
                {leaderboard.slice(3).map((player) => (
                  <div className="ranking-row" key={player.name}>
                    <span className="row-rank">{player.rank}</span><span className="avatar small">{player.avatar}</span>
                    <span className="player-name"><b>{player.name}</b><small>{player.streak}× streak</small></span><strong>{player.points.toLocaleString()}</strong>
                  </div>
                ))}
              </div>
              <div className="pool-note">
                <Icon name="wallet" />
                <div><b>$20 USDC demo sponsor pool</b><small>Top 3 test payout intents created after final verification</small></div>
              </div>
            </section>

            <section className="panel compact-panel activity-panel">
              <div className="panel-title-row"><h2>Agent activity</h2><button onClick={() => setView("trace")}>View trace</button></div>
              <div className="activity-item"><span className="activity-dot lime"/><div><b>Quest #{Math.min(eventIndex + 1, quests.length)} opened</b><small>Rule selected from current match phase</small></div><time>now</time></div>
              <div className="activity-item"><span className="activity-dot violet"/><div><b>Feed normalized</b><small>No raw TxLINE payload exposed</small></div><time>2s</time></div>
              <div className="activity-item"><span className="activity-dot amber"/><div><b>Payout guard active</b><small>Test mode · approval required</small></div><time>3s</time></div>
            </section>
          </aside>
        </div>
      ) : (
        <TraceView onBack={() => setView("room")} answers={answers} apiAvailable={apiAvailable} sourceConnected={sourceConnected} />
      )}

      <footer className="product-footer" id="business-model">
        <span>CrowdQuest · Built for the TxODDS World Cup Hackathon</span>
        <a href="/design-system">Design system <Icon name="external" /></a>
        <span>Free-to-play · sponsor-funded · human-owned submission</span>
      </footer>
    </main>
  );
}

function TraceView({
  onBack,
  answers,
  apiAvailable,
  sourceConnected,
}: {
  onBack: () => void;
  answers: SettledAnswer[];
  apiAvailable: boolean;
  sourceConnected: boolean;
}) {
  const trace = toolTrace.map((tool, index) => index === 0
    ? { ...tool, state: sourceConnected ? "live connected" : apiAvailable ? "replay adapter" : "local replay" }
    : tool);

  return (
    <section className="trace-page">
      <div className="trace-intro">
        <span className="eyebrow"><Icon name="shield" /> Execution proof</span>
        <h1>One fan experience.<br/><em>Four tools, safely composed.</em></h1>
        <p>CrowdQuest is a vertical test of the AI operating-system idea: fans never learn feed APIs, bounty infrastructure, wallets, or payment workflows. They play; the workspace routes the work.</p>
        <Button variant="panel" className="secondary-button" onClick={onBack}><Icon name="arrow-left" /> Back to match room</Button>
      </div>

      <div className="trace-grid">
        {trace.map((tool, index) => (
          <article className="trace-card panel" key={tool.name}>
            <span className="trace-number">0{index + 1}</span>
            <span className={`trace-state state-${tool.state.replace(" ", "-")}`}>{tool.state}</span>
            <h2>{tool.name}</h2>
            <b>{tool.role}</b>
            <p>{tool.detail}</p>
            {index < toolTrace.length - 1 && <span className="trace-connector"><Icon name="arrow" /></span>}
          </article>
        ))}
      </div>

      <div className="proof-layout">
        <section className="panel proof-panel">
          <div className="panel-title-row"><div><span className="eyebrow">Decision log</span><h2>Replayable receipts</h2></div><Badge variant="proof">append-only</Badge></div>
          <div className="receipt-list">
            <div className="receipt-row"><span className="receipt-icon feed">TX</span><div><b>Fixture loaded</b><small>fixtures/snapshot · fixture {match.id}</small></div><code>source_verified</code></div>
            {answers.length ? answers.map((answer, index) => (
              <div className="receipt-row" key={answer.questId}>
                <span className={`receipt-icon ${answer.correct ? "pass" : "fail"}`}><Icon name={answer.correct ? "check" : "minus"} /></span>
                <div><b>Quest #{index + 1} settled</b><small>Choice sealed before the next event</small></div>
                <code>{answer.correct ? `+${answer.points}_points` : "settled"}</code>
              </div>
            )) : <div className="empty-receipt">Complete a quest to add its settlement receipt.</div>}
          </div>
        </section>

        <section className="panel guardrail-panel">
          <span className="eyebrow">Security policy</span>
          <h2>Agents propose. Policies decide.</h2>
          <div className="guardrail"><Icon name="check"/><span><b>Read actions</b><small>TxLINE access is server-side and scoped.</small></span></div>
          <div className="guardrail"><Icon name="check"/><span><b>Quest actions</b><small>Only deterministic templates may publish automatically.</small></span></div>
          <div className="guardrail"><Icon name="check"/><span><b>Money actions</b><small>Testnet by default; real payouts require limits and approval.</small></span></div>
          <div className="guardrail"><Icon name="check"/><span><b>Data handling</b><small>The public API returns normalized product state, not raw feeds.</small></span></div>
        </section>
      </div>

      <section className="business-strip panel">
        <div><span className="eyebrow">Commercial path</span><h2>Fan clubs and sponsors fund the fun.</h2></div>
        <p>Free public rooms drive reach. Polar powers paid private leagues and sponsor campaigns; optional USDC rewards create measurable activation without asking fans to wager.</p>
        <div className="business-metrics"><span><b>₹0</b><small>fan entry fee</small></span><span><b>2.5%</b><small>campaign fee</small></span><span><b>104</b><small>match inventory</small></span></div>
      </section>
    </section>
  );
}
