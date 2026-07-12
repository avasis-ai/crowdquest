import { randomUUID } from "node:crypto";
import pg from "pg";
import type { RoomState } from "./domain.js";

export interface RoomStore {
  create(displayName: string): Promise<RoomState>;
  get(id: string): Promise<RoomState | null>;
  save(state: RoomState): Promise<void>;
  close(): Promise<void>;
}

export class MemoryRoomStore implements RoomStore {
  private rooms = new Map<string, RoomState>();
  async create(displayName: string) { const state = newRoom(displayName); this.rooms.set(state.id, state); return structuredClone(state); }
  async get(id: string) { const state = this.rooms.get(id); return state ? structuredClone(state) : null; }
  async save(state: RoomState) { this.rooms.set(state.id, structuredClone(state)); }
  async close() {}
}

export class PostgresRoomStore implements RoomStore {
  private pool: pg.Pool;
  private constructor(connectionString: string) { this.pool = new pg.Pool({ connectionString, max: 8, idleTimeoutMillis: 30_000 }); }
  static async connect(connectionString: string) {
    const store = new PostgresRoomStore(connectionString);
    await store.pool.query(`CREATE TABLE IF NOT EXISTS crowdquest_room_sessions (
      id uuid PRIMARY KEY,
      display_name text NOT NULL,
      state jsonb NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`);
    return store;
  }
  async create(displayName: string) { const state = newRoom(displayName); await this.save(state); return state; }
  async get(id: string) { const result = await this.pool.query<{ state: RoomState }>("SELECT state FROM crowdquest_room_sessions WHERE id = $1", [id]); return result.rows[0]?.state ?? null; }
  async save(state: RoomState) {
    await this.pool.query(
      `INSERT INTO crowdquest_room_sessions (id, display_name, state, created_at, updated_at)
       VALUES ($1, $2, $3::jsonb, $4, $5)
       ON CONFLICT (id) DO UPDATE SET display_name = EXCLUDED.display_name, state = EXCLUDED.state, updated_at = EXCLUDED.updated_at`,
      [state.id, state.displayName, JSON.stringify(state), state.createdAt, state.updatedAt],
    );
  }
  async close() { await this.pool.end(); }
}

export async function createStore(databaseUrl?: string): Promise<RoomStore> {
  return databaseUrl ? PostgresRoomStore.connect(databaseUrl) : new MemoryRoomStore();
}

function newRoom(displayName: string): RoomState {
  const now = new Date().toISOString();
  return { id: randomUUID(), displayName, eventIndex: 0, points: 860, streak: 3, answers: [], createdAt: now, updatedAt: now };
}
