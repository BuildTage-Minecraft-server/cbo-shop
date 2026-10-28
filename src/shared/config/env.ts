import "server-only";
import { z } from "zod";

const schema = z.object({
  SESSION_SECRET: z.string().min(32),
  DRASL_URL: z.string().url(),
  YOOKASSA_SHOP_ID: z.string().min(1).optional(),
  YOOKASSA_SECRET_KEY: z.string().min(1).optional(),
  GAME_API_URL: z.string().url().optional(),
  GAME_API_TOKEN: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof schema>;

let cached: ServerEnv | undefined;

function definedEnv(): Record<string, string> {
  const entries = Object.entries(process.env).filter(
    (entry): entry is [string, string] => entry[1] !== undefined && entry[1] !== "",
  );
  return Object.fromEntries(entries);
}

export function serverEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = schema.safeParse(definedEnv());
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Invalid server environment: ${fields}`);
  }

  cached = parsed.data;
  return cached;
}

export type PaymentsConfig = { shopId: string; secretKey: string };

export function paymentsConfig(): PaymentsConfig | null {
  const env = serverEnv();
  if (!env.YOOKASSA_SHOP_ID || !env.YOOKASSA_SECRET_KEY) return null;
  return { shopId: env.YOOKASSA_SHOP_ID, secretKey: env.YOOKASSA_SECRET_KEY };
}

export type GameServerConfig = { url: string; token: string };

export function gameServerConfig(): GameServerConfig {
  const env = serverEnv();
  if (!env.GAME_API_URL || !env.GAME_API_TOKEN) {
    throw new Error("Game server API is not configured");
  }
  return { url: env.GAME_API_URL.replace(/\/+$/, ""), token: env.GAME_API_TOKEN };
}
