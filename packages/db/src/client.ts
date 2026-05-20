/**
 * @piekai/db — Drizzle client (service-role / direct connection).
 *
 * Server-side only. Uses the DATABASE_URL env var which must point to the
 * Supabase direct (non-pooler) or Transaction Mode pooler connection string
 * that carries service-role privileges. Never expose this to the browser.
 *
 * `prepare: false` is required for Supabase's PgBouncer (transaction-mode
 * pooler) — prepared statements are not supported there.
 *
 * Next.js HMR safety: we cache the postgres.js client on `globalThis` so that
 * hot-module-reloads in development do not open a new pool on every reload.
 * In production, the module is imported once and this guard is a no-op.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error(
    "[PiekAI] DATABASE_URL is not set. " +
      "Add it to your .env.local (see .env.example). " +
      "This is the service-role direct connection string from Supabase.",
  );
}

// HMR-safe singleton: reuse the existing postgres.js pool across hot reloads.
const globalForDb = globalThis as typeof globalThis & {
  __piekaiPostgresClient?: ReturnType<typeof postgres>;
};

if (!globalForDb.__piekaiPostgresClient) {
  globalForDb.__piekaiPostgresClient = postgres(DATABASE_URL, {
    prepare: false, // Required for Supabase PgBouncer (transaction-mode pooler)
  });
}

const sql = globalForDb.__piekaiPostgresClient;

/**
 * Drizzle database instance with the full PiekAI schema attached.
 * Import this wherever you need to query the DB from server-side code.
 *
 * @example
 * import { db } from "@piekai/db";
 * import { auditRequests } from "@piekai/db";
 * const rows = await db.select().from(auditRequests);
 */
export const db = drizzle(sql, { schema });
