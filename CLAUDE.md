# CLAUDE.md — PiekAI

## Workflow

1. For non-trivial tasks: plan in `tasks/todo.md` first, get M approval, then execute.
2. Use focused subagents for research-heavy steps (learning a new API, comparing libraries).
3. Log every correction or surprise in `tasks/lessons.md`.
4. Never mark a task complete unless the change is verifiable (deployed, tests passing, M confirms).
5. If a solution feels hacky, stop and find the elegant one.
6. Bug reports → fix directly without back-and-forth.

## Project-specific rules

- Every database table has `organization_id` FK. No exceptions.
- Every action by an agent gets logged to `actions` and `audit_logs` with full diff.
- Never write to a customer site without first capturing a reversibility snapshot.
- Respect daily action caps configured per site.
- Every Brevo email send must use template ID + dynamic data (no inline HTML).
- All Dutch copy reviewed by M before deploy.
- No external trackers in Phase 0. Plausible considered Phase 1.
- Lighthouse score must be 95+ before deploy.
- Test coverage minimum 80%; every new module ships with Vitest (TS) or pytest (Python) tests.
- RLS: wrap every end-user query in a transaction that sets the JWT/role; `organization_id`
  lives in JWT claims (app_metadata) and is indexed on every table.

## Stack

- Next.js 16 (App Router, React 19) + Tailwind 4 + shadcn/ui — apps/web
- Cloudflare Workers + OpenNext adapter (`@opennextjs/cloudflare`) — apps/web deploy target
- pnpm workspaces + Turborepo — monorepo
- Python 3.12 + uv + LangGraph + Claude SDK — apps/agents (Phase 1+)
- Supabase (Postgres + Auth + Storage) — DB + auth
- Cloudflare (Workers + R2 + Email Routing) — edge + storage + email
- Hetzner CPX22 (existing M infra) — agent workers + crawler (Phase 1+)
- BullMQ + Redis — queue (Phase 1+)
- Drizzle ORM — schema + migrations (single migration owner; not Supabase CLI)
- Biome — format + base lint; minimal ESLint for react-hooks + next plugins only
- Lefthook — git pre-commit hooks
- Vitest — testing
- Sentry — errors; Axiom — logs
- Brevo — transactional email
- DataForSEO — SEO + AI visibility data (Phase 1+)

## Forbidden

- Don't use Prettier (we use Biome). ESLint only for `eslint-plugin-react-hooks` +
  `@next/eslint-plugin-next` — no other ESLint rules.
- Don't use `@cloudflare/next-on-pages` or Cloudflare Pages for apps/web
  (deprecated path — use Workers + OpenNext).
- Don't use Jest (we use Vitest).
- Don't add Clerk or NextAuth (we use Supabase Auth).
- Don't use a CMS (MDX in repo is sufficient for the Journal).
- Don't add analytics scripts in Phase 0.
- Don't deploy without Lighthouse 95+.
- Don't write to the main branch without CI passing.
- Don't use any LLM other than Claude Sonnet/Haiku in Phase 0-1
  (multi-model orchestration is Phase 3).

## Commands

- `pnpm dev` — run all apps in dev
- `pnpm build` — turbo build
- `pnpm lint` — biome check
- `pnpm test` — vitest run
- `pnpm --filter web dev` — run only the web app
