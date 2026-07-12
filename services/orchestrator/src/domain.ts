export type Choice = { id: string; label: string; hint: string };

export type Quest = {
  id: string;
  prompt: string;
  context: string;
  choices: Choice[];
  correctChoice: string;
  points: number;
  settlesOn: string;
};

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
  txlineSeq?: number;
  txlineAction?: string;
};

export type SettledAnswer = {
  questId: string;
  choiceId: string;
  correct: boolean;
  points: number;
  settledAt: string;
  source: "txline" | "replay";
  sourceSequence?: number;
};

export type RoomState = {
  id: string;
  displayName: string;
  eventIndex: number;
  points: number;
  streak: number;
  answers: SettledAnswer[];
  createdAt: string;
  updatedAt: string;
};

export type SourceStatus = {
  provider: "TxLINE";
  mode: "live" | "replay";
  connected: boolean;
  fixtureId: number;
  lastCheckedAt: string;
  endpoints: string[];
  normalizedEvents: number;
  authoritativeQuests: number;
  streaming: boolean;
};

export type RoomSnapshot = {
  session: Pick<RoomState, "id" | "displayName" | "points" | "streak">;
  match: {
    id: number;
    competition: string;
    home: { name: string; code: string; flagCode: string };
    away: { name: string; code: string; flagCode: string };
    sponsorPoolUsdc: number;
  };
  event: MatchEvent;
  eventIndex: number;
  eventCount: number;
  quest: Omit<Quest, "correctChoice"> | null;
  finished: boolean;
  answers: SettledAnswer[];
  source: SourceStatus;
};
