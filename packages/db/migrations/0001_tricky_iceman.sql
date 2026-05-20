CREATE TABLE "audit_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_name" text NOT NULL,
	"website_url" text NOT NULL,
	"sector" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
-- Enable RLS so the table is protected at the Postgres level.
-- NO policy is defined: only the service-role connection (which bypasses RLS
-- entirely) may read or write rows. The Supabase anon key is locked out.
-- TODO Day 5+: add a policy scoped to the owner role once admin auth is wired.
ALTER TABLE "audit_requests" ENABLE ROW LEVEL SECURITY;
