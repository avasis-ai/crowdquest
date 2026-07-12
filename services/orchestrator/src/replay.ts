import type { MatchEvent, Quest } from "./domain.js";

export const fixture = {
  id: 18209181,
  competition: "World Cup · Quarter-final",
  home: { name: "France", code: "FRA", flagCode: "fr" },
  away: { name: "Morocco", code: "MAR", flagCode: "ma" },
  sponsorPoolUsdc: 20,
};

export const replayEvents: MatchEvent[] = [
  { id: "kickoff", minute: 0, minuteLabel: "00′", title: "Replay ready", detail: "The host agent has opened the first live quest.", kind: "kickoff", homeScore: 0, awayScore: 0, marketHome: 63 },
  { id: "penalty-save", minute: 28, minuteLabel: "28′", title: "Penalty saved", detail: "Morocco survive the biggest chance of the first half.", kind: "chance", homeScore: 0, awayScore: 0, marketHome: 58 },
  { id: "halftime", minute: 45, minuteLabel: "HT", title: "Level at the break", detail: "France have the pressure; Morocco still have the clean sheet.", kind: "break", homeScore: 0, awayScore: 0, marketHome: 61 },
  { id: "france-opener", minute: 60, minuteLabel: "60′", title: "France break through", detail: "The opener moves the market and closes the third quest.", kind: "goal", homeScore: 1, awayScore: 0, marketHome: 88 },
  { id: "france-second", minute: 66, minuteLabel: "66′", title: "Second goal, six minutes later", detail: "The rapid follow-up triggers an instant quest settlement.", kind: "goal", homeScore: 2, awayScore: 0, marketHome: 97 },
  { id: "fulltime", minute: 90, minuteLabel: "FT", title: "France advance", detail: "Final score verified. The bounty board is now settled.", kind: "final", homeScore: 2, awayScore: 0, marketHome: 100 },
];

export const replayQuests: Quest[] = [
  { id: "penalty-result", prompt: "Does France convert the next penalty?", context: "A spot kick has just been awarded. Lock your call before the kick.", choices: [{ id: "yes", label: "Goal", hint: "France score" }, { id: "no", label: "No goal", hint: "Saved or missed" }], correctChoice: "no", points: 140, settlesOn: "TxLINE score state at 28′" },
  { id: "before-break", prompt: "Will either side score before half-time?", context: "The missed penalty changed the price. Read the moment, not the badge.", choices: [{ id: "yes", label: "Yes", hint: "A first-half goal" }, { id: "no", label: "No", hint: "0–0 at the break" }], correctChoice: "no", points: 110, settlesOn: "TxLINE half-time event" },
  { id: "opener-window", prompt: "Will the opener arrive before 65′?", context: "France remain favoured, but the clock is compressing the window.", choices: [{ id: "yes", label: "Before 65′", hint: "Early second half" }, { id: "no", label: "65′ or later", hint: "Or no opener" }], correctChoice: "yes", points: 125, settlesOn: "First goal timestamp" },
  { id: "quick-followup", prompt: "Another goal in the next 10 minutes?", context: "The opener caused a 27-point probability jump. Momentum quest active.", choices: [{ id: "yes", label: "Yes", hint: "By the 70th minute" }, { id: "no", label: "No", hint: "The score holds" }], correctChoice: "yes", points: 165, settlesOn: "Next score event or 70′" },
  { id: "final-margin", prompt: "How does this match finish?", context: "One final quest. The result is settled only from the verified feed.", choices: [{ id: "two-plus", label: "France by 2+", hint: "Current margin holds" }, { id: "one", label: "France by 1", hint: "Morocco pull one back" }, { id: "other", label: "Draw / Morocco", hint: "A late turn" }], correctChoice: "two-plus", points: 90, settlesOn: "TxLINE game_finalised event" },
];
