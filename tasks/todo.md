# PiekAI — Task List

Working task list. Per `CLAUDE.md`: plan non-trivial work here first, get M
approval, then execute.

## Done

- [x] Planning docs revised (VISION / PHASE_0_PLAN / DESIGN_SYSTEM) — aligned to the
      2026 stack
- [x] Phase 0 Day 1-2 — monorepo scaffold (commit `4558a33`)
- [x] Phase 0 Day 3 — Supabase `piekai-prod`, 13-table Drizzle schema + RLS, migration
      applied, seed org `AanloopAI`, custom_access_token_hook enabled. (Note:
      prod-only — `piekai-dev` skipped, free-plan 2-project limit.)

## Phase 0 — remaining (see `PHASE_0_PLAN.md`)

### Week 1

- [ ] Day 4 — Cloudflare: Workers project, env vars, Email Routing, R2 bucket
- [ ] Day 5 — Supabase Auth, Sentry, Axiom, Brevo, SPF/DKIM/DMARC
- [ ] Day 6-7 — GitHub Actions CI/CD, branch protection, secrets

### Week 2

- [x] Day 8-10 — Landing page v1 — 8 sections, NL, verified desktop + mobile (commit `e58b9a8`)
- [~] Day 11-13 — Free Audit funnel BACKEND done (commit `9edb892`): `audit_requests`
      table + migration `0001`, submit Server Action, Brevo helper. Pending: M runs
      `db:migrate`, creates 2 Brevo templates. `/admin/audits` deferred to Day 5+ (needs Auth).
- [ ] Day 14 — Quality pass: Lighthouse 95+, WCAG 2.2 AA, OG images, robots/sitemap/llms.txt

### Week 3

- [ ] Day 15-17 — PiekAI Journal infra (MDX)
- [ ] Day 18-19 — Status page, /over-ons, /methodologie, /prijzen, /contact, 404/500
- [ ] Day 20-21 — Phase 1 kickoff doc, lessons.md wrap-up, tag `v0.1.0-phase0-complete`

## Blocked / needs M

- [ ] First `git push` — repo auth failed (401); M pushes or provides a PAT
- [ ] Repo name `piekakai-website` — likely a typo (PiekAI → "piekakai")
