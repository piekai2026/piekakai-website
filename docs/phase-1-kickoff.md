# PiekAI — Phase 1 Kickoff

Starting state for Phase 1 (Core Loop MVP). Written at the close of Phase 0
(`v0.1.0-phase0-complete`). Phase 0 delivered the public-facing foundation:
marketing site, Free Audit funnel, Journal, and the full infra/CI scaffold.

> Phase 1 scope (per `VISION.md`): Scout + Perception + Diagnostician +
> Strategist + Operator + Guardian + Analyst agents running Tier-2 autonomous
> cycles on `alfareclame.nl`, `fleettrackholland.nl`, `aanloopai.nl`.

---

## 1. Stack inventory (as built in Phase 0)

| Layer | Choice | Notes |
|---|---|---|
| Monorepo | Turborepo layout + pnpm workspaces | `turbo` itself **fails to spawn on Windows/OneDrive** — root scripts use `pnpm -r`. |
| Package manager | pnpm 11.1.3 | `allowBuilds` gates `esbuild`/`lefthook`/`sharp`/`workerd`. |
| Node | >= 22 | |
| Web framework | Next.js 16.2.6 + React 19.2.4 | App Router. |
| Styling | Tailwind 4 (`@tailwindcss/postcss`) | Biome excludes `*.css` (no Tailwind 4 at-rule support). |
| Animation | `motion` v12 | LazyMotion `m` breaks `whileInView` — use full `motion`. |
| Content | MDX (`@next/mdx`, `next-mdx-remote`, `shiki`, `remark-gfm`) | Journal posts. |
| Validation | Zod 4 | |
| DB | Supabase Postgres + Drizzle ORM | Drizzle is the single migration owner. |
| Auth | Supabase Auth + `@supabase/ssr` | `proxy.ts` (Next 16 middleware) refreshes sessions; survives missing env. |
| Hosting | Cloudflare Workers via OpenNext (`@opennextjs/cloudflare` v1) | **Not** Pages, **not** `next-on-pages`. |
| Email | Brevo (transactional) | |
| Lint/format | Biome 2.3 + minimal ESLint (`@next/eslint-plugin-next`) | |
| Git hooks | Lefthook | |
| Tests | Vitest 3 | |
| CI/CD | GitHub Actions (`ci.yml`, `deploy.yml`) | |

### Workspace layout

```
apps/web         — Next.js marketing site + Free Audit funnel + Journal (built)
apps/agents      — Phase 1: Python 3.12 + uv + LangGraph agent workers (empty scaffold)
apps/crawler     — Phase 1: Playwright crawler (empty scaffold)
packages/db      — Drizzle schema (13 tables) + RLS + migrations + seed
packages/types   — shared TypeScript types
packages/ui      — shared React components
packages/connectors — external-API connector stubs
packages/design-tokens — design tokens (see DESIGN_SYSTEM.md)
```

---

## 2. Environment variables

Template: `.env.example`. App-local file: `apps/web/.env.local` (gitignored).
DB package reads its own `packages/db/.env` (gitignored).

| Var | Used by | Phase | Set? |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | web (auth, audit) | 0 | M |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | web | 0 | M |
| `SUPABASE_SERVICE_ROLE_KEY` | web (server actions) | 0 | M |
| `DATABASE_URL` | db (migrate/seed), web | 0 | `packages/db/.env` set; web pending |
| `CLOUDFLARE_ACCOUNT_ID` | deploy | 0 | GitHub secret pending |
| `CLOUDFLARE_API_TOKEN` | deploy | 0 | GitHub secret pending |
| `SENTRY_DSN` | observability | 0 | M account pending |
| `AXIOM_TOKEN` / `AXIOM_DATASET` | observability | 0 | M account pending |
| `BREVO_API_KEY` | audit funnel email | 0 | M account pending |
| `BREVO_TEMPLATE_AUDIT_INTERNAL` | audit funnel | 0 | numeric template ID, M |
| `BREVO_TEMPLATE_AUDIT_CONFIRM` | audit funnel | 0 | numeric template ID, M |
| `ANTHROPIC_API_KEY` | agents | 1 | not yet |
| `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` | data layer | 1 | not yet |

Supabase project: `piekai-prod` (`bbjygjcfpaggpuvnaiuc`, eu-central-1 Frankfurt).
**Prod-only** — no `piekai-dev` (free-plan 2-project limit). Connection via
Session Pooler IPv4 `aws-1-eu-central-1.pooler.supabase.com`.

---

## 3. Deployment runbook

### Local dev

```bash
pnpm install
pnpm --filter web dev          # http://localhost:3000
```

### Build / typecheck / test (all via pnpm -r, not turbo)

```bash
pnpm -r run build
pnpm -r run typecheck
pnpm test
pnpm lint                      # biome check .
```

### Database migrations

```bash
pnpm --filter @piekai/db db:migrate   # applies pending migrations
```

Drizzle owns all schema. Migration `0000` applied (13 tables + 13 RLS policies +
seed org `AanloopAI` `354deec1-09dd-479c-b4ac-21e5fb5f4cb2`).
Migration `0001` (`audit_requests`) **pending — M must run `db:migrate`.**

### Cloudflare Workers deploy

```bash
pnpm --filter web preview      # local OpenNext preview
pnpm --filter web deploy       # opennextjs-cloudflare build && deploy
```

Or push to `main` → GitHub Actions `deploy.yml` (needs `CLOUDFLARE_API_TOKEN` +
`CLOUDFLARE_ACCOUNT_ID` secrets).

---

## 4. Open issues / known gaps

### Blocking — needs M (manual / accounts)

- [ ] `pnpm --filter @piekai/db db:migrate` — apply migration `0001` (`audit_requests`)
- [ ] Brevo account + 2 transactional templates → IDs into env
- [ ] `apps/web/.env.local` populated (`DATABASE_URL`, Supabase keys, `BREVO_*`)
- [ ] Sentry + Axiom accounts wired (Day 5 observability)
- [ ] R2 bucket `piekai-assets` (deferred Day 4 — card OTP)
- [ ] Cloudflare Workers env vars + first deploy
- [ ] GitHub secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

Until these land, the Free Audit funnel cannot persist submissions or send mail,
and the site is not live on Cloudflare.

### Technical gaps / caveats

- **Performance not prod-measured.** Lighthouse perf = 88 on localhost
  `next start` with 4x CPU throttle. Re-measure on Cloudflare prod / CI.
  Lighthouse CLI has an EPERM temp-cleanup defect on Windows.
- **LazyMotion bundle-trim reverted** — `whileInView` does not fire under
  `LazyMotion` + `m` (both `domAnimation` and `domMax`). Web ships full `motion`.
- `turbo` cannot run on Windows/OneDrive — keep using `pnpm -r`. Linux CI is fine.
- OneDrive tries to sync git-ignored `node_modules` — build-corruption risk.

### Deferred to Phase 1+ (intentional, per VISION.md)

- Knowledge graph tech (Postgres JSONB Phase 1; Neo4j / Apache AGE assessed Phase 3)
- Multi-model LLM fallback (Phase 1 Claude-only with retry)
- Owned Media Network sites (Phase 2-3)

---

## 5. First Phase 1 tasks

1. Scaffold `apps/agents` — Python 3.12 + uv + LangGraph; agent skeletons
   (Scout, Perception, Diagnostician, Strategist, Operator, Guardian, Analyst).
2. Scaffold `apps/crawler` — Playwright on Hetzner CPX22.
3. Stand up BullMQ + Redis queue on Hetzner.
4. Wire DataForSEO connector in `packages/connectors`.
5. Run first Tier-2 autonomous cycle against `alfareclame.nl`.

Phase 1 success gate (week 9): 3+ keywords up 5+ positions on alfareclame.nl,
M's sites cited by 2+ of 5 LLM platforms, 95%+ cycle reliability, 30+ audit requests.
