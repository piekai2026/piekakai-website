import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * PiekAI database schema (Drizzle, schema-as-code).
 * Phase 0 Day 3 expands this to the full multi-tenant model:
 * organizations, users, sites, site_connectors, keyword_targets,
 * keyword_rankings, pages, actions, action_diffs, action_outcomes,
 * cycle_runs, audit_logs, api_spend.
 *
 * Rules (see CLAUDE.md): every tenant table carries `organizationId`;
 * RLS is enforced per tenant; `organization_id` is indexed everywhere.
 */

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
