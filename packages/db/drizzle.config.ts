import { defineConfig } from "drizzle-kit";

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
