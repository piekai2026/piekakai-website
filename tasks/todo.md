# PiekAI — Task List

Working task list. Per `CLAUDE.md`: plan non-trivial work here first, get M
approval, then execute.

## Done

- [x] Planning docs revised (VISION / PHASE_0_PLAN / DESIGN_SYSTEM) — 2026 stack
- [x] Day 1-2 — monorepo scaffold (Turborepo→pnpm, Next 16, Tailwind 4, Biome, Vitest)
- [x] Day 3 — Supabase `piekai-prod`, 13-table Drizzle schema + RLS, migration, seed org
- [x] Day 4 — Cloudflare: NS + email routing done (NS propagating); R2 deferred (card OTP)
- [x] Day 5 — Supabase Auth (sign-in/up/out, proxy session refresh). Sentry/Axiom = M accounts
- [x] Day 6-7 — GitHub Actions CI/CD workflows (`ci.yml`, `deploy.yml`)
- [x] Day 8-10 — Landing page v1 (8 sections, verified desktop + mobile)
- [~] Day 11-13 — Free Audit funnel backend (`audit_requests`, migration `0001`, submit
      action, Brevo helper). Pending: M runs `db:migrate`, creates Brevo templates
- [x] Day 15-17 — PiekAI Journal (MDX, RSS, starter post)
- [x] Day 18-19 — Static pages (over-ons, methodologie, prijzen, contact, status, 404/500)

## Remaining (code)

- [ ] Day 14 — Quality pass: Lighthouse 95+, WCAG 2.2 AA audit, no-JS `Reveal` hardening,
      OG images, robots.txt + sitemap.xml + llms.txt
- [ ] Day 20-21 — Phase 1 kickoff doc, `lessons.md` wrap-up, tag `v0.1.0-phase0-complete`

## Needs M (manual / accounts)

- [ ] `pnpm --filter @piekai/db db:migrate` — apply migration `0001` (audit_requests)
- [ ] Brevo account + 2 transactional templates → IDs into env
- [ ] `apps/web/.env.local`: `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL` + `ANON_KEY`, `BREVO_*`
- [ ] Sentry + Axiom accounts (Day 5 observability)
- [ ] R2 bucket `piekai-assets` (card OTP)
- [ ] Cloudflare Workers env vars + first deploy (or via `deploy.yml`)
- [ ] GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
