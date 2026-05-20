# PiekAI — Phase 0 Plan

> **Goal of Phase 0**: lay foundation so Phase 1 (autonomous loop on M's sites) can begin Week 4.
> **Duration**: 3 weeks.
> **Owner**: M + Claude Code.

Phase 0 has two parallel tracks: **Foundation** (infrastructure, monorepo, design system, deploy pipeline) and **Marketing Bootstrap** (landing page, free audit funnel, PiekAI Journal launch).

Read `VISION.md` for context. Read `DESIGN_SYSTEM.md` for visual identity. This file is the execution plan.

---

## Workflow rules (CLAUDE.md doctrine)

These are non-negotiable for every task in this plan:

1. **Plan before doing.** Before any non-trivial task, write the plan to `tasks/todo.md` and wait for M's approval.
2. **Subagent for research.** Use focused subagents when exploring an unfamiliar API or library.
3. **Log lessons.** After every correction or surprise, append to `tasks/lessons.md`.
4. **Never mark complete without verification.** A task is done only when the change is observable in the deployed environment or in tests passing.
5. **Elegant over hacky.** If a solution feels like a workaround, stop and find the right architecture.
6. **Bug reports get fixed directly.** When M reports a bug, fix it without back-and-forth questions.

---

## Week 1 — Infrastructure & Monorepo

### Day 1-2: Repo skeleton

- [ ] Initialize Turborepo + pnpm workspaces at the repo root (`pnpm-workspace.yaml`, `turbo.json`)
- [ ] Configure `apps/web` (Next.js 16, App Router, React 19, Tailwind 4, shadcn/ui)
- [ ] Configure `apps/agents` (Python 3.12, uv package manager, pyproject.toml)
- [ ] Configure `apps/crawler` (Python, Playwright)
- [ ] Configure `packages/db` (Drizzle ORM, Postgres schemas)
- [ ] Configure `packages/connectors` (TypeScript abstract connector interface)
- [ ] Configure `packages/types` (shared TypeScript types via Zod schemas)
- [ ] Configure `packages/design-tokens` (CSS variables, Tailwind config extension)
- [ ] Configure `packages/ui` (shadcn/ui base + custom components)
- [ ] Add Biome (formatter + base linter, faster than ESLint+Prettier) — plus a minimal ESLint config retained ONLY for `eslint-plugin-react-hooks` + `@next/eslint-plugin-next` (Biome does not yet cover these React/Next rules; React Compiler correctness depends on the hooks rule)
- [ ] Add Vitest (testing)
- [ ] Add Lefthook (pre-commit hooks) — Go-based, runs hooks in parallel; preferred over Husky+lint-staged for a Turborepo monorepo, single binary, no Node dependency
- [ ] Add `.env.example` template, `.gitignore` complete

### Day 3: Supabase setup

- [ ] M creates Supabase project named `piekai-prod` (region: Frankfurt/EU)
- [ ] M creates Supabase project named `piekai-dev` (region: Frankfurt/EU)
- [ ] Capture connection strings into 1Password and `.env.local` (not committed)
- [ ] Initialize Drizzle config pointing at Supabase Postgres. Drizzle owns the schema (schema-as-code) and is the **single migration owner** — do not also run Supabase CLI migrations. Set `schemaFilter` to exclude Supabase-managed schemas (`auth`, `storage`, `realtime`) and `entities.roles.provider: "supabase"` so Drizzle recognizes Supabase roles.
- [ ] Write initial DB migration: `organizations`, `users`, `sites`, `site_connectors` (encrypted), `keyword_targets`, `keyword_rankings`, `pages`, `actions`, `action_diffs`, `action_outcomes`, `cycle_runs`, `audit_logs`, `api_spend`
- [ ] Run migration against `piekai-dev`
- [ ] Enable Row Level Security for multi-tenant isolation: define policies via Drizzle `pgPolicy()`; store `organization_id` as a custom JWT claim (app_metadata) — NOT a members-table subquery; index `organization_id` on every table; wrap `(SELECT auth.uid())` in policies for per-statement caching; add explicit `WHERE organization_id = ...` to queries even though RLS filters anyway (planner uses indexes better). Critical: wrap every end-user query in a transaction that sets the role/JWT — RLS context only persists inside a transaction; outside it queries silently return nothing
- [ ] Seed M as `organization_id: 1` with placeholder `users` record

### Day 4: Cloudflare wiring

- [ ] M confirms `piekai.nl` is in Cloudflare DNS
- [ ] Set up Cloudflare **Workers** project named `piekai-web` for `apps/web`, deployed via the OpenNext adapter (`@opennextjs/cloudflare`). In `wrangler.jsonc`: enable `nodejs_compat`, set compatibility date ≥ 2024-09-23. Deploy from GitHub Actions via `opennextjs-cloudflare build && opennextjs-cloudflare deploy` (Cloudflare Pages' Next.js path and `next-on-pages` are deprecated — do not use them)
- [ ] Configure environment variables for production (Supabase URL/anon key, Sentry DSN placeholder, etc.)
- [ ] Configure Cloudflare Email Routing on `piekai.nl`:
  - `hello@piekai.nl` → M's master inbox
  - `m@piekai.nl` → M's master inbox
  - `support@piekai.nl` → M's master inbox
  - Catch-all → M's master inbox
- [ ] Create Cloudflare R2 bucket named `piekai-assets` (for PDF reports, archived snapshots)
- [ ] (No separate Workers project — the `apps/web` Worker above IS it; tRPC API routes run inside the same Worker)
- [ ] Confirm `piekai.nl` resolves to the Cloudflare Worker and shows a placeholder page

### Day 5: Auth + observability

- [ ] Configure Supabase Auth (email + password initially; magic link Phase 1; OAuth providers Phase 3)
- [ ] Build `auth/sign-in`, `auth/sign-up`, `auth/sign-out` routes in `apps/web`
- [ ] Wire Sentry (error tracking) — free tier — into `apps/web` and `apps/agents`
- [ ] Wire Axiom (logging) or simpler stdout-to-Better-Stack — free tier — for centralized logs
- [ ] Set up Brevo account for transactional email
- [ ] Configure SPF, DKIM, DMARC for `piekai.nl` (via Cloudflare)
- [ ] Verify email send from `hello@piekai.nl` via Brevo

### Day 6-7: GitHub Actions + deployment

- [ ] CI workflow: typecheck, lint, test on every PR
- [ ] CD workflow: deploy `apps/web` to Cloudflare Pages on merge to `main`
- [ ] Branch protection on `main`: require passing CI, require 1 review (M can self-approve in solo phase)
- [ ] Secrets stored in GitHub Actions secrets (Supabase service role key, Sentry DSN, Brevo API key, Cloudflare API token)
- [ ] Verify end-to-end: push a change → CI runs → deploys → visible on `piekai.nl`

---

## Week 2 — Landing Page + Free Audit Funnel

### Day 8-10: Landing page v1

The landing page is M's primary marketing surface and serves as a demo of PiekAI's craft. Read `DESIGN_SYSTEM.md` before starting.

Page structure (single page, scroll-driven):

1. **Hero**
   - Headline: *"Word de standaard. In Google. In ChatGPT. Overal."*
   - Sub: *"PiekAI is een autonome AI-agent die jouw bedrijf naar #1 brengt — en daar houdt. In Google én in elke AI-zoekmachine."*
   - Two CTAs: "Vraag gratis audit aan" (primary) | "Lees hoe het werkt" (secondary, scrolls down)
   - Visual: subtle animated SVG of a graph climbing, or a typed conversation showing "Welke is het beste reclamebureau in Rotterdam?" → "Alfa Reclame in Rotterdam wordt aanbevolen vanwege..."

2. **Problem statement**
   - Title: *"40% van je klanten begint nu in ChatGPT. Niet in Google."*
   - Three short paragraphs: how search is bifurcating, why traditional SEO isn't enough, what's at stake
   - Optional: a small live counter ("Aantal AI-zoekopdrachten vandaag: ...") — fake-ish but compelling

3. **What PiekAI does** (three steps)
   - **Ziet** — *"PiekAI bewaakt je positie in Google én in alle 5 grote AI-engines, uur per uur."*
   - **Diagnostiseert** — *"Waarom sta je niet bovenaan? PiekAI analyseert exact wat ontbreekt en waarom concurrenten wel worden aanbevolen."*
   - **Doet** — *"Geen rapporten die je zelf moet uitvoeren. PiekAI past je website autonoom aan — content, schema, links — en meet de impact."*
   - Each step illustrated by a small animation or visual

4. **The differentiator** (vs. Klusio implicitly, never named)
   - Side-by-side comparison: "Traditional SEO tools" / "AI visibility monitors" / "PiekAI"
   - Bullets show: read-only vs. action-taking, single-source vs. multi-source, blue-link-only vs. blue-link-plus-AI-plus-voice

5. **Voice integration**
   - Title: *"Als de klant je vindt, neemt onze AI op."*
   - Brief description of PiekAI + ElevenLabs voice agent integration
   - Single short paragraph; this is a teaser for Phase 2

6. **Trust signals**
   - "Een product van AanloopAI" with subtle attribution
   - "Gebouwd in Rotterdam. Data in de EU. AVG-compliant by design."
   - Logos: Cloudflare, Supabase, Hetzner (the stack itself signals quality)

7. **Free Audit CTA**
   - *"Wil je weten waar je nu staat? Vraag een gratis AI-zichtbaarheidsrapport aan. 90 seconden, geen verkoper."*
   - Form: business name, website URL, sector (dropdown: hand-curated NL sectors), email, optional phone
   - Submit → confirmation page

8. **Footer**
   - `hello@piekai.nl`
   - "Een product van AanloopAI"
   - Privacy policy / Terms / Cookies (placeholder links Phase 0; real Phase 1)

Implementation notes:
- Server components by default; client components only where needed (form, animations)
- Use Framer Motion for the few animations
- Tailwind 4: scope CSS scanning — `@import "tailwindcss" source(none);` + explicit `@source` for `app`/`src` dirs — to avoid the v4.1.x bug that crawls `.md`/non-source files and crashes the build
- Lighthouse target: 95+ on all four metrics
- No external trackers in Phase 0. Plausible added Phase 1.
- Form submissions go to Supabase `audit_requests` table + trigger Brevo email to M

### Day 11-13: Free Audit funnel v1 (manual version)

**Important**: The fully automated audit (live LLM queries, multi-platform sampling) is a Phase 1 build. For Phase 0, we ship a **manual-fulfilled** version that captures leads and signals demand.

- [ ] Create `audit_requests` table in Supabase
- [ ] Build form submission endpoint via Supabase Edge Function or tRPC route
- [ ] On submit:
  - Insert into `audit_requests`
  - Send Brevo email to M: "New audit request: [name] @ [domain]"
  - Send Brevo email to submitter: confirmation + "We send your report within 24 hours"
- [ ] Build a simple admin view at `/admin/audits` (Supabase auth-gated, M only) showing pending audit requests
- [ ] Build a simple "deliver audit" workflow: M opens an audit request, fills in findings manually (using Claude + ChatGPT + DataForSEO probes), generates a PDF via React-PDF, and the system emails it to the submitter
- [ ] Track conversion: how many audit recipients reply / book a call

### Day 14: Quality pass on landing page

- [ ] Lighthouse audit 95+ across all metrics
- [ ] Accessibility audit: WCAG 2.2 AA minimum
- [ ] Cross-browser test (Safari, Firefox, Chrome, Edge)
- [ ] Mobile responsive: iPhone SE → iPad Pro range
- [ ] Copy proofread (M reviews Dutch copy)
- [ ] OG image + Twitter card images
- [ ] favicon, manifest.json
- [ ] robots.txt + sitemap.xml
- [ ] Schema.org Organization markup
- [ ] llms.txt file at root (table of contents for AI crawlers) — low-ROI in 2026 (no major AI crawler is confirmed to read it yet), but harmless and cheap; ship it, don't over-invest

---

## Week 3 — PiekAI Journal + Foundation Polish

### Day 15-17: PiekAI Journal infrastructure

The Journal is the "build-in-public" content engine. M documents real SEO work being done (on Alfa Reclame initially), creating both an audience and future case-study material.

- [ ] Build `/journal` index page (Next.js App Router, MDX-powered)
- [ ] Build `/journal/[slug]` post template
- [ ] Configure MDX with code highlighting (Shiki), inline images, and custom components
- [ ] Build a simple admin view at `/admin/journal` for M to draft posts
- [ ] RSS feed at `/journal/rss.xml`
- [ ] First post: draft template ready ("Welkom bij PiekAI Journal — wat we hier publiceren, en waarom") — M finalizes copy
- [ ] LinkedIn company page setup: PiekAI page created, M has admin
- [ ] Set up a simple workflow: M writes post in MDX, commits to repo, Cloudflare Pages auto-deploys, M cross-posts to LinkedIn manually

Posts to plan for Phase 0/1 (M writes; Claude Code provides scaffolding):

1. *"Wat is PiekAI eigenlijk?"* — launch post, vision, why
2. *"Ahrefs, Semrush, ChatGPT, en de toekomst van zoeken"* — context-setting
3. *"Hoe een Rotterdams reclamebureau #1 wordt in Google én ChatGPT"* — Alfa Reclame case study, week 1
4. *"De 10 vragen die jouw klanten al aan ChatGPT stellen — zonder dat jij het weet"* — educational hook
5. Continue weekly minimum

### Day 18-19: Status page + brand polish

- [ ] Build `/status` page (custom, not Atlassian). For Phase 0, hard-coded "All systems operational" — wire up real health checks in Phase 1.
- [ ] Build `/over-ons` page: M's story + AanloopAI relationship
- [ ] Build `/methodologie` page: how PiekAI works (open positioning)
- [ ] Build `/prijzen` page: teaser pricing (Phase 3 reveal of full tiers)
- [ ] Build `/contact` page
- [ ] Configure `404` and `500` pages with brand
- [ ] Verify all internal links work

### Day 20-21: Foundation handoff to Phase 1

- [ ] Confirm: `piekai.nl` live, fast, beautiful, lighthouse 95+, mobile-perfect
- [ ] Confirm: free audit funnel collecting submissions
- [ ] Confirm: at least 1 Journal post live
- [ ] Confirm: Supabase schema, Cloudflare Pages, GitHub Actions, Sentry, Axiom all wired
- [ ] Document Phase 1 starting state in `docs/phase-1-kickoff.md`:
  - Stack inventory
  - Environment variable list
  - Deployment runbook
  - Open issues / known gaps
- [ ] Update `tasks/lessons.md` with everything learned in Phase 0
- [ ] Tag `v0.1.0-phase0-complete` in git

---

## Files that exist by end of Phase 0

```
piekai/
├── apps/
│   ├── web/                      # ✅ Built
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx              # Landing
│   │   │   │   ├── audit/
│   │   │   │   ├── journal/
│   │   │   │   ├── methodologie/
│   │   │   │   ├── prijzen/
│   │   │   │   ├── over-ons/
│   │   │   │   ├── contact/
│   │   │   │   └── status/
│   │   │   ├── (admin)/
│   │   │   │   ├── audits/
│   │   │   │   └── journal/
│   │   │   ├── api/                       # tRPC routes
│   │   │   ├── auth/
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   └── ...
│   ├── agents/                   # ⏳ Scaffolded only, no logic yet
│   │   ├── core/
│   │   │   └── (empty placeholder modules)
│   │   └── pyproject.toml
│   └── crawler/                  # ⏳ Scaffolded only
├── packages/
│   ├── db/                       # ✅ Built (migrations, Drizzle schema)
│   ├── connectors/               # ⏳ Abstract base class only
│   ├── types/                    # ✅ Built (Zod schemas, shared types)
│   ├── design-tokens/            # ✅ Built (see DESIGN_SYSTEM.md)
│   └── ui/                       # ✅ shadcn/ui base + 5-10 custom components
├── docs/
│   ├── phase-1-kickoff.md        # Written end of Phase 0
│   ├── architecture.md           # Living doc
│   └── runbooks/                 # Deployment, rollback, incidents
├── tasks/
│   ├── todo.md                   # Maintained continuously
│   └── lessons.md                # Maintained continuously
├── CLAUDE.md                     # Workflow rules
├── VISION.md
├── PHASE_0_PLAN.md               # This file
├── DESIGN_SYSTEM.md              # Visual identity
└── README.md
```

---

## CLAUDE.md content for the repo

Claude Code creates this file early. Content template:

```markdown
# CLAUDE.md — PiekAI

## Workflow

1. For non-trivial tasks: plan in `tasks/todo.md` first, get M approval, then execute.
2. Use focused subagents for research-heavy steps (e.g. learning a new API, comparing libraries).
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

## Stack

- Next.js 16 (App Router, React 19) + Tailwind 4 + shadcn/ui — apps/web
- Cloudflare Workers + OpenNext adapter (`@opennextjs/cloudflare`) — apps/web deploy target
- pnpm workspaces + Turborepo — monorepo
- Python 3.12 + uv + LangGraph + Claude SDK — apps/agents (Phase 1+)
- Supabase (Postgres + Auth + Storage) — DB + auth
- Cloudflare (Workers + R2 + Email Routing) — edge + storage + email
- Hetzner CPX22 (existing M infra) — agent workers + crawler (Phase 1+)
- BullMQ + Redis — queue (Phase 1+)
- Drizzle ORM — schema + migrations (single migration owner; do NOT also use Supabase CLI migrations)
- Biome — format + base lint; minimal ESLint for `eslint-plugin-react-hooks` + `@next/eslint-plugin-next` only
- Lefthook — git pre-commit hooks
- Vitest — testing
- Sentry — errors
- Axiom — logs
- Brevo — transactional email
- DataForSEO — SEO + AI visibility data (Phase 1+)

## Forbidden

- Don't use Prettier (we use Biome). ESLint is allowed ONLY for `eslint-plugin-react-hooks` + `@next/eslint-plugin-next` — no other ESLint rules or plugins
- Don't use `@cloudflare/next-on-pages` or Cloudflare Pages for `apps/web` (deprecated path — use Workers + OpenNext)
- Don't use Jest (we use Vitest)
- Don't add Clerk or NextAuth (we use Supabase Auth)
- Don't use a CMS (MDX in repo is sufficient for Journal)
- Don't add analytics scripts in Phase 0
- Don't deploy without lighthouse 95+
- Don't write to main branch without CI passing
- Don't use any LLM other than Claude Sonnet/Haiku in Phase 0-1 (multi-model orchestration is Phase 3)
```

---

## What M does in parallel (not coding)

- [ ] Confirm AanloopAI legal status — eenmanszaak or BV? If BV needed for invoicing, schedule notaris.
- [ ] Set up Brevo account (use `hello@piekai.nl`)
- [ ] Set up Sentry account (free tier)
- [ ] Set up Axiom account (free tier)
- [ ] Set up Supabase account (free tier)
- [ ] Update LinkedIn personal profile mentioning PiekAI in headline
- [ ] Create LinkedIn PiekAI company page (M as admin)
- [ ] Collect notes/screenshots from manual SEO work on Alfa Reclame — raw material for Journal post #3
- [ ] Decide: keep `piek.ai` domain too? Recommend yes if available; ~€100/yr brand protection
- [ ] Review and finalize Dutch copy on landing page before Day 14 deploy
- [ ] Block a 90-minute slot in week 2 for the first Loom walkthrough (recording, no editing)

---

## End of Phase 0 success criteria

By end of Week 3:

1. `piekai.nl` live, professional, fast (Lighthouse 95+), mobile-perfect, accessible (WCAG 2.2 AA)
2. Free audit funnel accepting submissions, sending confirmation emails, M can manually deliver
3. PiekAI Journal launched with 1+ live post; LinkedIn page active; M committed to weekly cadence
4. Monorepo scaffolded, CI/CD working, Supabase migrated, Cloudflare wired, observability live
5. Phase 1 plan written in `docs/phase-1-kickoff.md` with no open foundational questions

---

*Phase 0 ends. Phase 1 begins with the Scout agent and the first autonomous loop on alfareclame.nl.*
