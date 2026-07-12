import assert from "node:assert/strict";
import test from "node:test";
import type { MatchEvent } from "../src/domain.js";
import { projectFixture } from "../src/projection.js";

const event = (partial: Partial<MatchEvent>): MatchEvent => ({
  id: `event-${partial.txlineSeq}`,
  minute: 0,
  minuteLabel: "00′",
  title: "Update",
  detail: "Normalized",
  kind: "kickoff",
  homeScore: 0,
  awayScore: 0,
  marketHome: 0,
  ...partial,
});

test("derives every demo resolution from normalized TxLINE events", () => {
  const projection = projectFixture([
    event({ txlineSeq: 1 }),
    event({ minute: 28, minuteLabel: "28′", txlineSeq: 2, txlineAction: "penalty_saved", kind: "chance" }),
    event({ minute: 45, minuteLabel: "HT", txlineSeq: 3, txlineAction: "half_time", kind: "break" }),
    event({ minute: 60, minuteLabel: "60′", txlineSeq: 4, txlineAction: "goal", kind: "goal", homeScore: 1 }),
    event({ minute: 66, minuteLabel: "66′", txlineSeq: 5, txlineAction: "goal", kind: "goal", homeScore: 2 }),
    event({ minute: 90, minuteLabel: "FT", txlineSeq: 6, txlineAction: "game_finalised", kind: "final", homeScore: 2 }),
  ]);

  assert.equal(projection.resolutions.get("penalty-result")?.choiceId, "no");
  assert.equal(projection.resolutions.get("before-break")?.choiceId, "no");
  assert.equal(projection.resolutions.get("opener-window")?.choiceId, "yes");
  assert.equal(projection.resolutions.get("quick-followup")?.choiceId, "yes");
  assert.equal(projection.resolutions.get("final-margin")?.choiceId, "two-plus");
  assert.equal(projection.resolutions.get("final-margin")?.sourceSequence, 6);
});

test("omits resolutions when the feed has insufficient evidence", () => {
  const projection = projectFixture([event({ txlineSeq: 1 })]);
  assert.equal(projection.resolutions.has("penalty-result"), false);
  assert.equal(projection.resolutions.has("final-margin"), false);
});
