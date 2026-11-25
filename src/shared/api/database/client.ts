import "server-only";
import { Pool } from "pg";
import type { PoolClient, QueryResult, QueryResultRow } from "pg";
import { serverEnv } from "@/shared/config/env";
import { schemaSql } from "./schema";

const SCHEMA_LOCK_ID = 727001;

export type Db = {
  query<T extends QueryResultRow>(text: string, params?: readonly unknown[]): Promise<QueryResult<T>>;
};

type Store = { pool: Pool; ready?: Promise<void> };

const globalStore = globalThis as typeof globalThis & { cboDatabase?: Store };

function store(): Store {
  if (globalStore.cboDatabase) return globalStore.cboDatabase;

  const url = serverEnv().DATABASE_URL;
  if (!url) {
    throw new Error("Database is not configured");
  }

  const pool = new Pool({ connectionString: url, max: 5, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000 });
  pool.on("error", (error) => console.error("Database pool error", error));

  globalStore.cboDatabase = { pool };
  return globalStore.cboDatabase;
}

async function migrate(pool: Pool): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query("select pg_advisory_xact_lock($1)", [SCHEMA_LOCK_ID]);
    await client.query(schemaSql);
    await client.query("commit");
  } catch (error) {
    await client.query("rollback").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

async function readyPool(): Promise<Pool> {
  const state = store();
  if (!state.ready) {
    state.ready = migrate(state.pool).catch((error: unknown) => {
      state.ready = undefined;
      throw error;
    });
  }
  await state.ready;
  return state.pool;
}

function forClient(client: PoolClient): Db {
  return {
    query: <T extends QueryResultRow>(text: string, params?: readonly unknown[]) =>
      client.query<T>(text, params ? [...params] : undefined),
  };
}

export const db: Db = {
  async query<T extends QueryResultRow>(text: string, params?: readonly unknown[]) {
    const pool = await readyPool();
    return pool.query<T>(text, params ? [...params] : undefined);
  },
};

export async function withTransaction<T>(run: (tx: Db) => Promise<T>): Promise<T> {
  const pool = await readyPool();
  const client = await pool.connect();
  try {
    await client.query("begin");
    const result = await run(forClient(client));
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}
