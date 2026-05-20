import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { organizations } from "./schema";

/**
 * Seeds the founding tenant — organization 1, AanloopAI (M's own org).
 *
 * The owner `users` row is intentionally NOT seeded here: `users.id` mirrors
 * Supabase `auth.users.id`, which only exists after Supabase Auth is set up
 * (Phase 0 Day 5). Seeding a fake id would collide with the real auth user.
 *
 * Run: `pnpm --filter @piekai/db db:seed` (needs DATABASE_URL).
 */

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is required to seed — set it in packages/db/.env");
}

const client = postgres(url, { prepare: false });
const db = drizzle(client);

async function seed(): Promise<void> {
  const existing = await db.select().from(organizations).limit(1);
  if (existing.length > 0) {
    console.log("Seed skipped — organizations already populated.");
    return;
  }

  const [org] = await db.insert(organizations).values({ name: "AanloopAI" }).returning();
  console.log(`Seeded founding organization: ${org?.name} (${org?.id})`);
}

seed()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(() => client.end());
