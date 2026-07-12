import assert from "node:assert/strict";
import test from "node:test";
import { normalizeScoreRecord } from "../src/txline.js";

test("normalizes a TxLINE soccer goal without exposing raw data", () => {
  const event = normalizeScoreRecord({
    fixtureId: 18209181,
    action: "goal",
    seq: 404,
    dataSoccer: { Minutes: 60 },
    scoreSoccer: {
      Participant1: { Total: { Goals: 1 } },
      Participant2: { Total: { Goals: 0 } },
    },
  }, 18209181);
  assert.deepEqual(event, {
    id: "txline-404",
    minute: 60,
    minuteLabel: "60′",
    title: "Goal",
    detail: "Normalized from the TxLINE scores feed.",
    kind: "goal",
    homeScore: 1,
    awayScore: 0,
    marketHome: 0,
    txlineSeq: 404,
    txlineAction: "goal",
  });
});

test("rejects a record from another fixture", () => {
  assert.equal(normalizeScoreRecord({ fixtureId: 1 }, 18209181), null);
});
