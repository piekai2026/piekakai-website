import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

/**
 * PiekAI database schema — Drizzle, schema-as-code.
 * Drizzle is the SINGLE migration owner (see drizzle.config.ts; CLAUDE.md).
 *
 * Multi-tenancy: every tenant table carries `organizationId` and is protected
 * by a Row Level Security policy that compares it to the caller's tenant,
 * read from the Supabase JWT custom claim `app_metadata.organization_id`.
 * `organizationId` is indexed on every table (RLS performance — see CLAUDE.md).
 *
 * Enum-like columns (safetyTier, agent, status, ...) are plain `text`;
 * runtime validation lives in `@piekai/types` (Zod). Keeps migrations cheap.
 */

/** Caller's tenant id, taken from the Supabase JWT (app_metadata claim). */
const tenantClaim = sql`(select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)`;

/** Standard per-tenant RLS policy: a row is visible/writable only to its org. */
const tenantPolicy = (table: string) =>
  pgPolicy(`${table}_tenant_isolation`, {
    for: "all",
    to: authenticatedRole,
    using: sql`organization_id = ${tenantClaim}`,
    withCheck: sql`organization_id = ${tenantClaim}`,
  });

const createdAt = timestamp("created_at", { withTimezone: true }).defaultNow().notNull();

// --- organizations -------------------------------------------------------
// Tenant root. RLS keys on `id` itself (it has no `organization_id`).
export const organizations = pgTable(
  "organizations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAt,
  },
  () => [
    pgPolicy("organizations_tenant_isolation", {
      for: "all",
      to: authenticatedRole,
      using: sql`id = ${tenantClaim}`,
      withCheck: sql`id = ${tenantClaim}`,
    }),
  ],
);

// --- users ---------------------------------------------------------------
// Mirrors Supabase `auth.users` (same id); holds tenant membership + role.
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role").notNull().default("member"), // owner | admin | member
    createdAt,
  },
  (t) => [index("users_org_idx").on(t.organizationId), tenantPolicy("users")],
);

// --- sites ---------------------------------------------------------------
export const sites = pgTable(
  "sites",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    domain: text("domain").notNull(),
    name: text("name").notNull(),
    safetyTier: text("safety_tier").notNull().default("shadow"), // shadow | auto_safe | full_auto
    dailyActionCap: integer("daily_action_cap").notNull().default(20),
    createdAt,
  },
  (t) => [index("sites_org_idx").on(t.organizationId), tenantPolicy("sites")],
);

// --- site_connectors -----------------------------------------------------
// CMS credentials, stored encrypted. Never log or expose the blob.
export const siteConnectors = pgTable(
  "site_connectors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    siteId: uuid("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    kind: text("kind").notNull(), // github | wordpress | sanity
    encryptedCredentials: text("encrypted_credentials").notNull(),
    createdAt,
  },
  (t) => [index("site_connectors_org_idx").on(t.organizationId), tenantPolicy("site_connectors")],
);

// --- keyword_targets -----------------------------------------------------
export const keywordTargets = pgTable(
  "keyword_targets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    siteId: uuid("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    keyword: text("keyword").notNull(),
    locale: text("locale").notNull().default("nl-NL"),
    createdAt,
  },
  (t) => [index("keyword_targets_org_idx").on(t.organizationId), tenantPolicy("keyword_targets")],
);

// --- keyword_rankings ----------------------------------------------------
// One measurement per engine per target. `engine` covers Google + AI engines.
export const keywordRankings = pgTable(
  "keyword_rankings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    keywordTargetId: uuid("keyword_target_id")
      .notNull()
      .references(() => keywordTargets.id, { onDelete: "cascade" }),
    engine: text("engine").notNull(), // google | chatgpt | perplexity | gemini | ai_overview
    position: integer("position"), // nullable: not ranked / not cited
    cited: boolean("cited").notNull().default(false),
    measuredAt: timestamp("measured_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("keyword_rankings_org_idx").on(t.organizationId),
    index("keyword_rankings_target_idx").on(t.keywordTargetId),
    tenantPolicy("keyword_rankings"),
  ],
);

// --- pages ---------------------------------------------------------------
export const pages = pgTable(
  "pages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    siteId: uuid("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    title: text("title"),
    lastCrawledAt: timestamp("last_crawled_at", { withTimezone: true }),
    createdAt,
  },
  (t) => [index("pages_org_idx").on(t.organizationId), tenantPolicy("pages")],
);

// --- actions -------------------------------------------------------------
// One agent action. `category` drives which safety tier may auto-execute it.
export const actions = pgTable(
  "actions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    siteId: uuid("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    agent: text("agent").notNull(), // scout | perception | ... | analyst
    category: text("category").notNull(), // meta | schema | alt_text | internal_link | sitemap | content
    status: text("status").notNull().default("proposed"), // proposed | approved | executing | applied | rolled_back | failed
    summary: text("summary").notNull(),
    createdAt,
  },
  (t) => [index("actions_org_idx").on(t.organizationId), tenantPolicy("actions")],
);

// --- action_diffs --------------------------------------------------------
// Full before/after for every action — reversibility guarantee (VISION.md).
export const actionDiffs = pgTable(
  "action_diffs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    actionId: uuid("action_id")
      .notNull()
      .references(() => actions.id, { onDelete: "cascade" }),
    pageId: uuid("page_id").references(() => pages.id, { onDelete: "set null" }),
    before: text("before").notNull(),
    after: text("after").notNull(),
    createdAt,
  },
  (t) => [index("action_diffs_org_idx").on(t.organizationId), tenantPolicy("action_diffs")],
);

// --- action_outcomes -----------------------------------------------------
// Measured impact of an action — feeds auto-rollback.
export const actionOutcomes = pgTable(
  "action_outcomes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    actionId: uuid("action_id")
      .notNull()
      .references(() => actions.id, { onDelete: "cascade" }),
    metric: text("metric").notNull(), // position | citations | clicks | revenue
    delta: numeric("delta", { precision: 14, scale: 4 }).notNull(),
    significant: boolean("significant").notNull().default(false),
    measuredAt: timestamp("measured_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("action_outcomes_org_idx").on(t.organizationId), tenantPolicy("action_outcomes")],
);

// --- cycle_runs ----------------------------------------------------------
// One run of the agent loop for a site.
export const cycleRuns = pgTable(
  "cycle_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    siteId: uuid("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("running"), // running | succeeded | failed
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
  },
  (t) => [index("cycle_runs_org_idx").on(t.organizationId), tenantPolicy("cycle_runs")],
);

// --- audit_logs ----------------------------------------------------------
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    actor: text("actor").notNull(), // agent | user | system
    event: text("event").notNull(),
    detail: jsonb("detail"),
    createdAt,
  },
  (t) => [index("audit_logs_org_idx").on(t.organizationId), tenantPolicy("audit_logs")],
);

// --- api_spend -----------------------------------------------------------
// Per-tenant cost tracking (Anthropic, DataForSEO, ...).
export const apiSpend = pgTable(
  "api_spend",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(), // anthropic | dataforseo | ...
    costUsd: numeric("cost_usd", { precision: 12, scale: 4 }).notNull(),
    tokens: integer("tokens"),
    incurredAt: timestamp("incurred_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("api_spend_org_idx").on(t.organizationId), tenantPolicy("api_spend")],
);

// --- audit_requests -------------------------------------------------------
// Phase 0 Free Audit funnel — LEAD table, NOT a tenant table.
// This table has NO `organization_id`: the submitter has no org yet.
//
// RLS: enabled on the table, but NO policy is defined here.
// Only the service-role connection (which bypasses RLS entirely) may
// read or write this table. The submit Server Action and the future
// /admin/audits view (Day 5+) both use the direct/service-role connection.
// Never expose this table over the Supabase anon key.
//
// TODO Day 5+: mount /admin/audits view (depends on Auth).
export const auditRequests = pgTable("audit_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: text("company_name").notNull(),
  websiteUrl: text("website_url").notNull(),
  sector: text("sector").notNull(),
  email: text("email").notNull(),
  phone: text("phone"), // nullable — optional in the form
  status: text("status").notNull().default("pending"), // pending | delivered
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
