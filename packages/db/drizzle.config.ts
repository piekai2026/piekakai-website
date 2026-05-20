import { defineConfig } from "drizzle-kit";

// Load packages/db/.env so DATABASE_URL reaches drizzle-kit (migrate / studio).
try {
  process.loadEnvFile();
} catch {
  // No .env present — fine for `generate`, which needs no DB connection.
}

/**
 * Drizzle is the SINGLE migration owner for PiekAI — do not also run Supabase
 * CLI migrations. `schemaFilter` keeps Drizzle off Supabase-managed schemas
 * (auth, storage, realtime); `entities.roles.provider` teaches it Supabase roles.
 */
export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  schemaFilter: ["public"],
  entities: {
    roles: {
      provider: "supabase",
    },
  },
});
