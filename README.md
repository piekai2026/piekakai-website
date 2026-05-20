# PiekAI

> The autonomous AI-era visibility & revenue platform for European businesses.

Monorepo for [piekai.nl](https://piekai.nl). Planning docs: [`VISION.md`](./VISION.md),
[`PHASE_0_PLAN.md`](./PHASE_0_PLAN.md), [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

## Structure

```
apps/
  web/       Next.js 16 marketing site + product — Cloudflare Workers (OpenNext)
  agents/    Python 3.12 + LangGraph agent workers (Phase 1+)
  crawler/   Python + Playwright crawler (Phase 1+)
packages/
  db/             Drizzle ORM schema + migrations
  connectors/     CMS connector interfaces
  types/          Shared Zod schemas + TypeScript types
  design-tokens/  CSS variables — single source of truth for the design system
  ui/             shadcn/ui base + custom components
```

## Develop

```bash
pnpm install
pnpm dev
```

Requires Node 22+ and pnpm 11+.

| Command | Action |
|---|---|
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Turbo build all packages |
| `pnpm lint` | Biome check |
| `pnpm test` | Vitest run |
| `pnpm --filter web dev` | Run only the web app |

## Stack

Next.js 16 · React 19 · Tailwind 4 · shadcn/ui · Cloudflare Workers (OpenNext) ·
Supabase · Drizzle ORM · Turborepo · pnpm · Biome · Lefthook · Vitest

## Status

Phase 0 — Foundation. See `PHASE_0_PLAN.md`.
