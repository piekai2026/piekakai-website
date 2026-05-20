# PiekAI — Lessons Log

Append every correction or surprise here (`CLAUDE.md` workflow rule 3).

## Phase 0 Day 1-2 — scaffold (2026-05-20)

- `create-next-app` drops a nested `pnpm-workspace.yaml` inside the app — delete it,
  it conflicts with the root workspace.
- Biome's CSS parser does not understand Tailwind 4 `@theme` / `@source` at-rules.
  Excluded `*.css` from Biome (`files.includes: ["**", "!**/*.css"]`); Tailwind +
  PostCSS handle CSS.
- Biome flags a `$schema` version mismatch as an error — keep `biome.json` `$schema`
  pinned to the installed Biome CLI version.
- Cloudflare deploy for Next.js: Workers + OpenNext (`@opennextjs/cloudflare`), not
  Pages and not `next-on-pages` (both deprecated for Next.js).
- pnpm 11 gates package build scripts — approve `esbuild` / `lefthook` / `sharp` /
  `workerd` under `allowBuilds` in `pnpm-workspace.yaml`.

## Phase 0 Day 3-19 — wrap-up (2026-05-20)

- `turbo` spawn-fails on Windows/OneDrive. Root scripts switched to `pnpm -r` /
  `pnpm -r --parallel`; `turbo.json` kept for Linux CI only.
- Supabase free plan caps at 2 projects — went **prod-only** (`piekai-prod`), no
  separate dev project. Migrations apply straight to prod; discipline matters.
- Supabase direct connection needs IPv4 — use the **Session Pooler** host
  (`aws-1-eu-central-1.pooler.supabase.com`), not the direct DB host.
- Next 16 renamed `middleware.ts` → `proxy.ts`. Guard it: when Supabase env is
  absent, skip session refresh so the site still renders instead of 500-ing.
- Drizzle is the single migration owner — never hand-edit Supabase schema in the
  dashboard, or migration state desyncs.
- `motion` v12 `LazyMotion` + `m` does not fire `whileInView` (tried both
  `domAnimation` and `domMax`). Bundle-trim reverted; web ships full `motion`.
- No-JS hardening: `Reveal` needs a `reveal-anim` class + a `<noscript>`
  stylesheet so content is visible when JS is disabled.
- Lighthouse CLI has an EPERM temp-cleanup defect on Windows — measure
  performance on Cloudflare prod / CI, not localhost.
