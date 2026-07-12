import { z } from "zod";

const Env = z.object({
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().int().min(1).max(65535).default(8788),
  LOG_LEVEL: z.string().default("info"),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string().optional(),
  TXLINE_ORIGIN: z.string().url().default("https://txline-dev.txodds.com"),
  TXLINE_API_TOKEN: z.string().min(8).optional(),
  TXLINE_FIXTURE_ID: z.coerce.number().int().positive().default(18209181),
  COINBASE_AGENT_URL: z.string().url().optional(),
  COINBASE_AGENT_TOKEN: z.string().min(8).optional(),
  PAYOUT_MODE: z.enum(["disabled", "test", "approval"]).default("test"),
  MAX_PAYOUT_USDC: z.coerce.number().min(0).max(100).default(20),
  ADMIN_TOKEN: z.string().min(24).optional(),
});

export type Config = ReturnType<typeof loadConfig>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env) {
  const parsed = Env.parse(env);
  return {
    ...parsed,
    corsOrigins: parsed.CORS_ORIGINS.split(",").map((value) => value.trim()).filter(Boolean),
  };
}
