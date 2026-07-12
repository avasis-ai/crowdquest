export type MatchEvent = {
  id: string;
  minute: number;
  minuteLabel: string;
  title: string;
  detail: string;
  kind: "kickoff" | "chance" | "break" | "goal" | "final";
  homeScore: number;
  awayScore: number;
  marketHome: number;
};

export type Quest = {
  id: string;
  opensAtEvent: number;
  prompt: string;
  context: string;
  choices: { id: string; label: string; hint: string }[];
  correctChoice: string;
  points: number;
  settlesOn: string;
};

export const match = {
  id: "18209181",
  competition: "World Cup · Quarter-final",
  status: "Historical replay",
  home: { name: "France", code: "FRA", flagCode: "fr" },
  away: { name: "Morocco", code: "MAR", flagCode: "ma" },
  startedAt: "09 Jul · 20:00 UTC",
  sponsorPool: 20,
};

export const events: MatchEvent[] = [
  {
    id: "kickoff",
    minute: 0,
    minuteLabel: "00′",
    title: "Replay ready",
    detail: "The replay has opened the first deterministic quest.",
    kind: "kickoff",
    homeScore: 0,
    awayScore: 0,
    marketHome: 63,
  },
  {
    id: "penalty-save",
    minute: 28,
    minuteLabel: "28′",
    title: "Penalty saved",
    detail: "Morocco survive the biggest chance of the first half.",
    kind: "chance",
    homeScore: 0,
    awayScore: 0,
    marketHome: 58,
  },
  {
    id: "halftime",
    minute: 45,
    minuteLabel: "HT",
    title: "Level at the break",
    detail: "France have the pressure; Morocco still have the clean sheet.",
    kind: "break",
    homeScore: 0,
    awayScore: 0,
    marketHome: 61,
  },
  {
    id: "france-opener",
    minute: 60,
    minuteLabel: "60′",
    title: "France break through",
    detail: "The opener moves the market and closes the third quest.",
    kind: "goal",
    homeScore: 1,
    awayScore: 0,
    marketHome: 88,
  },
  {
    id: "france-second",
    minute: 66,
    minuteLabel: "66′",
    title: "Second goal, six minutes later",
    detail: "The rapid follow-up triggers an instant quest settlement.",
    kind: "goal",
    homeScore: 2,
    awayScore: 0,
    marketHome: 97,
  },
  {
    id: "fulltime",
    minute: 90,
    minuteLabel: "FT",
    title: "France advance",
    detail: "Final replay state loaded. The demo board is now settled.",
    kind: "final",
    homeScore: 2,
    awayScore: 0,
    marketHome: 100,
  },
];

export const quests: Quest[] = [
  {
    id: "penalty-result",
    opensAtEvent: 0,
    prompt: "Does France convert the next penalty?",
    context: "A spot kick has just been awarded. Lock your call before the kick.",
    choices: [
      { id: "yes", label: "Goal", hint: "France score" },
      { id: "no", label: "No goal", hint: "Saved or missed" },
    ],
    correctChoice: "no",
    points: 140,
    settlesOn: "TxLINE score state at 28′",
  },
  {
    id: "before-break",
    opensAtEvent: 1,
    prompt: "Will either side score before half-time?",
    context: "The missed penalty changed the price. Read the moment, not the badge.",
    choices: [
      { id: "yes", label: "Yes", hint: "A first-half goal" },
      { id: "no", label: "No", hint: "0–0 at the break" },
    ],
    correctChoice: "no",
    points: 110,
    settlesOn: "TxLINE half-time event",
  },
  {
    id: "opener-window",
    opensAtEvent: 2,
    prompt: "Will the opener arrive before 65′?",
    context: "France remain favoured, but the clock is compressing the window.",
    choices: [
      { id: "yes", label: "Before 65′", hint: "Early second half" },
      { id: "no", label: "65′ or later", hint: "Or no opener" },
    ],
    correctChoice: "yes",
    points: 125,
    settlesOn: "First goal timestamp",
  },
  {
    id: "quick-followup",
    opensAtEvent: 3,
    prompt: "Another goal in the next 10 minutes?",
    context: "The opener caused a 27-point probability jump. Momentum quest active.",
    choices: [
      { id: "yes", label: "Yes", hint: "By the 70th minute" },
      { id: "no", label: "No", hint: "The score holds" },
    ],
    correctChoice: "yes",
    points: 165,
    settlesOn: "Next score event or 70′",
  },
  {
    id: "final-margin",
    opensAtEvent: 4,
    prompt: "How does this match finish?",
    context: "One final quest. The result settles from the configured fixture source.",
    choices: [
      { id: "two-plus", label: "France by 2+", hint: "Current margin holds" },
      { id: "one", label: "France by 1", hint: "Morocco pull one back" },
      { id: "other", label: "Draw / Morocco", hint: "A late turn" },
    ],
    correctChoice: "two-plus",
    points: 90,
    settlesOn: "TxLINE game_finalised event",
  },
];

export const leaderboard = [
  { rank: 1, name: "Nisha", points: 1280, streak: 8, avatar: "NI" },
  { rank: 2, name: "Arjun", points: 1195, streak: 6, avatar: "AR" },
  { rank: 3, name: "Maya", points: 1050, streak: 5, avatar: "MA" },
  { rank: 4, name: "Vik", points: 940, streak: 4, avatar: "VI" },
];

export const toolTrace = [
  {
    name: "TxLINE",
    role: "Match truth",
    detail: "Fixture, scores and StablePrice updates through the configured adapter",
    state: "connected",
  },
  {
    name: "Host agent",
    role: "Quest director",
    detail: "Chooses a safe challenge from match state",
    state: "configured",
  },
  {
    name: "Bounty engine",
    role: "Scoring",
    detail: "Locks entries and produces the winner set",
    state: "ready",
  },
  {
    name: "Coinbase agent",
    role: "Reward rail",
    detail: "Creates an approval-gated USDC payout intent",
    state: "test mode",
  },
];
