CREATE TABLE "action_diffs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"action_id" uuid NOT NULL,
	"page_id" uuid,
	"before" text NOT NULL,
	"after" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "action_diffs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "action_outcomes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"action_id" uuid NOT NULL,
	"metric" text NOT NULL,
	"delta" numeric(14, 4) NOT NULL,
	"significant" boolean DEFAULT false NOT NULL,
	"measured_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "action_outcomes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"site_id" uuid NOT NULL,
	"agent" text NOT NULL,
	"category" text NOT NULL,
	"status" text DEFAULT 'proposed' NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "actions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "api_spend" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"provider" text NOT NULL,
	"cost_usd" numeric(12, 4) NOT NULL,
	"tokens" integer,
	"incurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "api_spend" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"actor" text NOT NULL,
	"event" text NOT NULL,
	"detail" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cycle_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"site_id" uuid NOT NULL,
	"status" text DEFAULT 'running' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "cycle_runs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "keyword_rankings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"keyword_target_id" uuid NOT NULL,
	"engine" text NOT NULL,
	"position" integer,
	"cited" boolean DEFAULT false NOT NULL,
	"measured_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "keyword_rankings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "keyword_targets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"site_id" uuid NOT NULL,
	"keyword" text NOT NULL,
	"locale" text DEFAULT 'nl-NL' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "keyword_targets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "organizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"site_id" uuid NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"last_crawled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "site_connectors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"site_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"encrypted_credentials" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "site_connectors" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "sites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"domain" text NOT NULL,
	"name" text NOT NULL,
	"safety_tier" text DEFAULT 'shadow' NOT NULL,
	"daily_action_cap" integer DEFAULT 20 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sites" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"organization_id" uuid NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "action_diffs" ADD CONSTRAINT "action_diffs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_diffs" ADD CONSTRAINT "action_diffs_action_id_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."actions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_diffs" ADD CONSTRAINT "action_diffs_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_outcomes" ADD CONSTRAINT "action_outcomes_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_outcomes" ADD CONSTRAINT "action_outcomes_action_id_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."actions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "actions" ADD CONSTRAINT "actions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "actions" ADD CONSTRAINT "actions_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_spend" ADD CONSTRAINT "api_spend_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cycle_runs" ADD CONSTRAINT "cycle_runs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cycle_runs" ADD CONSTRAINT "cycle_runs_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keyword_rankings" ADD CONSTRAINT "keyword_rankings_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keyword_rankings" ADD CONSTRAINT "keyword_rankings_keyword_target_id_keyword_targets_id_fk" FOREIGN KEY ("keyword_target_id") REFERENCES "public"."keyword_targets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keyword_targets" ADD CONSTRAINT "keyword_targets_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keyword_targets" ADD CONSTRAINT "keyword_targets_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_connectors" ADD CONSTRAINT "site_connectors_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_connectors" ADD CONSTRAINT "site_connectors_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sites" ADD CONSTRAINT "sites_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "action_diffs_org_idx" ON "action_diffs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "action_outcomes_org_idx" ON "action_outcomes" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "actions_org_idx" ON "actions" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "api_spend_org_idx" ON "api_spend" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "audit_logs_org_idx" ON "audit_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "cycle_runs_org_idx" ON "cycle_runs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "keyword_rankings_org_idx" ON "keyword_rankings" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "keyword_rankings_target_idx" ON "keyword_rankings" USING btree ("keyword_target_id");--> statement-breakpoint
CREATE INDEX "keyword_targets_org_idx" ON "keyword_targets" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "pages_org_idx" ON "pages" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "site_connectors_org_idx" ON "site_connectors" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "sites_org_idx" ON "sites" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "users_org_idx" ON "users" USING btree ("organization_id");--> statement-breakpoint
CREATE POLICY "action_diffs_tenant_isolation" ON "action_diffs" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "action_outcomes_tenant_isolation" ON "action_outcomes" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "actions_tenant_isolation" ON "actions" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "api_spend_tenant_isolation" ON "api_spend" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "audit_logs_tenant_isolation" ON "audit_logs" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "cycle_runs_tenant_isolation" ON "cycle_runs" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "keyword_rankings_tenant_isolation" ON "keyword_rankings" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "keyword_targets_tenant_isolation" ON "keyword_targets" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "organizations_tenant_isolation" ON "organizations" AS PERMISSIVE FOR ALL TO "authenticated" USING (id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "pages_tenant_isolation" ON "pages" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "site_connectors_tenant_isolation" ON "site_connectors" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "sites_tenant_isolation" ON "sites" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));--> statement-breakpoint
CREATE POLICY "users_tenant_isolation" ON "users" AS PERMISSIVE FOR ALL TO "authenticated" USING (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid)) WITH CHECK (organization_id = (select (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid));