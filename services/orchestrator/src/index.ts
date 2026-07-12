import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { loadConfig } from "./config.js";
import type { RoomSnapshot, RoomState } from "./domain.js";
import { PayoutGateway } from "./payout.js";
import { fixture, replayEvents, replayQuests } from "./replay.js";
import { createStore } from "./store.js";
import { TxLineClient } from "./txline.js";

const config = loadConfig();
const app = Fastify({ logger: { level: config.LOG_LEVEL }, trustProxy: true, bodyLimit: 16_384 });
const store = await createStore(config.DATABASE_URL);
const txline = new TxLineClient(config.TXLINE_ORIGIN, config.TXLINE_API_TOKEN, config.TXLINE_FIXTURE_ID);
const payouts = new PayoutGateway(config.PAYOUT_MODE, config.MAX_PAYOUT_USDC, config.COINBASE_AGENT_URL, config.COINBASE_AGENT_TOKEN);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof z.ZodError) return reply.code(400).send({ error: "invalid_request", issues: error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })) });
  request.log.error({ err: error }, "request failed");
  return reply.code(500).send({ error: "internal_error" });
});

await app.register(cors, {
  origin(origin, callback) {
    if (!origin || config.corsOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Origin not allowed"), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  maxAge: 600,
});

app.addHook("onSend", async (_request, reply) => {
  reply.header("X-Content-Type-Options", "nosniff");
  reply.header("Referrer-Policy", "no-referrer");
  reply.header("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  reply.header("Cache-Control", "no-store");
});

app.get("/healthz", async () => ({ status: "ok", service: "crowdquest-orchestrator", txlineConfigured: txline.configured, time: new Date().toISOString() }));

app.get("/v1/source", async () => txline.status());

app.post("/v1/sessions", async (request, reply) => {
  const input = z.object({ displayName: z.string().trim().min(1).max(32).default("Guest fan") }).parse(request.body ?? {});
  const state = await store.create(input.displayName);
  reply.code(201);
  return snapshot(state);
});

app.get<{ Params: { sessionId: string } }>("/v1/rooms/:sessionId", async (request, reply) => {
  const state = await store.get(request.params.sessionId);
  if (!state) return reply.code(404).send({ error: "session_not_found" });
  return snapshot(state);
});

app.post<{ Params: { sessionId: string } }>("/v1/rooms/:sessionId/answers", async (request, reply) => {
  const input = z.object({ questId: z.string().min(1).max(80), choiceId: z.string().min(1).max(40) }).parse(request.body);
  const state = await store.get(request.params.sessionId);
  if (!state) return reply.code(404).send({ error: "session_not_found" });
  const quest = replayQuests[state.eventIndex];
  if (!quest) return reply.code(409).send({ error: "room_finished" });
  if (input.questId !== quest.id) return reply.code(409).send({ error: "stale_quest", activeQuestId: quest.id });
  if (!quest.choices.some((choice) => choice.id === input.choiceId)) return reply.code(400).send({ error: "invalid_choice" });
  const txlineTruth = await txline.resolveQuest(quest.id);
  const correct = input.choiceId === (txlineTruth?.choiceId ?? quest.correctChoice);
  const nextEvent = replayEvents[Math.min(state.eventIndex + 1, replayEvents.length - 1)];
  state.answers.push({
    questId: quest.id,
    choiceId: input.choiceId,
    correct,
    points: correct ? quest.points : 0,
    settledAt: new Date().toISOString(),
    source: txlineTruth ? "txline" : "replay",
    sourceSequence: txlineTruth?.sourceSequence ?? nextEvent.txlineSeq,
  });
  state.points += correct ? quest.points : 0;
  state.streak = correct ? state.streak + 1 : 0;
  state.eventIndex = Math.min(state.eventIndex + 1, replayEvents.length - 1);
  state.updatedAt = new Date().toISOString();
  await store.save(state);
  const room = await snapshot(state);
  const payoutIntent = room.finished ? await payouts.createIntent(state.id, fixture.sponsorPoolUsdc) : null;
  return { room, settlement: state.answers.at(-1), payoutIntent };
});

app.post<{ Params: { sessionId: string } }>("/v1/rooms/:sessionId/reset", async (request, reply) => {
  const state = await store.get(request.params.sessionId);
  if (!state) return reply.code(404).send({ error: "session_not_found" });
  Object.assign(state, { eventIndex: 0, points: 860, streak: 3, answers: [], updatedAt: new Date().toISOString() });
  await store.save(state);
  return snapshot(state);
});

app.post("/v1/admin/txline/refresh", async (request, reply) => {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!config.ADMIN_TOKEN || token !== config.ADMIN_TOKEN) return reply.code(401).send({ error: "unauthorized" });
  const projection = await txline.fixtureProjection(true);
  return {
    fixtureId: config.TXLINE_FIXTURE_ID,
    normalizedEvents: projection.eventCount,
    authoritativeQuests: projection.resolutions.size,
    actions: projection.actions,
    loadedAt: projection.loadedAt,
  };
});

async function snapshot(state: RoomState): Promise<RoomSnapshot> {
  const event = replayEvents[state.eventIndex] ?? replayEvents.at(-1)!;
  return {
    session: { id: state.id, displayName: state.displayName, points: state.points, streak: state.streak },
    match: fixture,
    event,
    eventIndex: state.eventIndex,
    eventCount: replayEvents.length,
    quest: publicQuest(replayQuests[state.eventIndex]),
    finished: state.eventIndex === replayEvents.length - 1,
    answers: state.answers,
    source: await txline.status(),
  };
}

function publicQuest(quest: typeof replayQuests[number] | undefined): RoomSnapshot["quest"] {
  if (!quest) return null;
  return {
    id: quest.id,
    prompt: quest.prompt,
    context: quest.context,
    choices: quest.choices,
    points: quest.points,
    settlesOn: quest.settlesOn,
  };
}

const shutdown = async (signal: string) => { app.log.info({ signal }, "shutting down"); txline.stop(); await app.close(); await store.close(); process.exit(0); };
process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

await app.listen({ host: config.HOST, port: config.PORT });
txline.startScoreStream();
