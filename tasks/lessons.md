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
