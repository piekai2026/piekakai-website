# PiekAI — Vision

> **The autonomous AI-era visibility & revenue platform for European businesses.**
> *Klusio gets you started. PiekAI gets you serious.*

This document is the long-term north star. It is referenced by Claude Code during planning. It is not an execution checklist — see `PHASE_0_PLAN.md` for that.

---

## What PiekAI is

PiekAI is an autonomous agent system that:

1. Monitors a website's position across both traditional Google search AND AI engines (ChatGPT, Claude, Gemini, Perplexity, Google AI Overviews).
2. Detects competitive moves and ranking gaps in real time.
3. Diagnoses why the customer is not #1 for their target queries.
4. Executes the necessary changes directly on the customer's website — content, schema, internal linking, meta, technical fixes — without requiring per-action approval (with reversibility guarantees).
5. Measures revenue impact via closed-loop attribution.
6. Learns continuously what works for each customer and compounds.

It runs forever, defending the #1 position against every competitor move.

## Why this exists

Search behavior is bifurcating. By 2026, ~40% of consumer queries that used to start on Google now start on ChatGPT or another LLM. Traditional SEO tools (Ahrefs, Semrush) optimize for the old game. New monitoring tools (Profound, Otterly, Peec) measure the new game but don't act. Klusio (NL, direct competitor) does both but at MKB-entry tier with limited depth.

PiekAI's lane: the **growth-stage to mid-market** layer. Customers who outgrew Klusio's chatbot-plus-blog product and need:
- Real revenue attribution, not just visibility metrics
- Production-grade voice ecosystem integration (voice agents that actually handle inbound)
- Deeper technical SEO + GEO unified
- EU-first compliance, sectoral configurability
- Custom CRM and operational integrations
- Demo-driven sales motion, dedicated onboarding

## Positioning

> *Klusio gets you started. PiekAI gets you serious.*

We are not competing with Klusio on price for MKB self-service. We are the upgrade path. Pricing tiers €497-1997/mo. ARPU 3-5x Klusio. Different sales motion (demo-driven, mid-market).

Three genuine moats:
1. **Voice depth** — M's existing ElevenLabs production deployments (Marco, Lars) integrated as the customer's inbound voice channel
2. **Revenue attribution** — closed-loop tracking from AI visibility → site behavior → CRM → revenue
3. **EU compliance from day one** — built ground-up for AVG/GDPR, EU AI Act, sectoral compliance modules

## Architecture summary

- **Frontend & marketing site**: Next.js 16 + Tailwind 4 + shadcn/ui on Cloudflare Workers (static assets), deployed via the OpenNext adapter (`@opennextjs/cloudflare`)
- **Edge API**: tRPC route handlers running inside the `apps/web` Worker itself (OpenNext Node.js runtime) — no separate Edge API Worker needed in Phase 0-1; split out only if an independent scaling boundary is required later
- **Database**: Supabase (Phase 1-2) → migration assessed Phase 3
- **Auth**: Supabase Auth (integrated with DB, RLS for multi-tenancy)
- **Agent workers**: Python + LangGraph on Hetzner CPX22 (existing M infra)
- **Queue**: BullMQ on Redis (Hetzner)
- **Crawler**: Playwright (Hetzner)
- **Primary LLM**: Claude Sonnet 4.6 (reasoning), Haiku 4.5 (classification/parsing)
  > Note: an earlier draft said "Sonnet 4.7" — no such model. Sonnet's current version is 4.6; 4.7 exists only for Opus.
- **SEO data**: DataForSEO (primary), GSC + GA4 (free)
- **LLM visibility data**: DataForSEO AI Optimization API (LLM Responses / Scraper / AI Keyword Data / LLM Mentions — covers ChatGPT, Claude, Perplexity, Gemini) as the cheap infrastructure layer. Caveat: DataForSEO runs its own prompts, so it does not reflect a customer's real end-user query distribution, and Bing Copilot is out of scope. Ground-truth citation tracking still requires direct LLM polling with PiekAI's own per-customer prompt sets. Treat DataForSEO as the breadth layer, own polling as the accuracy layer.
- **Object storage**: Cloudflare R2
- **Email**: Cloudflare Email Routing (receiving) + Brevo (sending, EU-based)
- **Analytics**: Plausible (marketing site), PostHog (product, Phase 2)
- **Monitoring**: Sentry (errors), Axiom (logs)
- **Status page**: piekai.nl/status (custom-built, not Atlassian)

Multi-tenant from day 1. M's three sites = `organization_id: 1`. Every table has `organization_id` FK.

## The agent system (consolidated to 7 agents)

| Agent | Job | Trigger |
|---|---|---|
| Scout | Onboarding: discovers target keywords autonomously | New site connects |
| Perception | Pulls fresh data hourly (GSC, DataForSEO, LLM citations, server logs, competitors) | Cron |
| Diagnostician | Analyzes why site isn't #1 for target queries | Signal from Perception |
| Strategist | Generates ranked candidate moves with predicted lift, Citation Score, persona simulation | After Diagnostician |
| Operator | Executes via CMS connector (GitHub PR / WordPress / Sanity) | After Strategist |
| Guardian | Real-time circuit breaker on hard guardrails | During Operator execution |
| Analyst | Attribution + auto-rollback + memory updates | Daily aggregate |

Plus a **Conductor** orchestrator that allocates budget across the swarm.

## Safety model

- **Tier 1 (Shadow)**: agent proposes, M/customer approves — default for first 2 weeks per new site
- **Tier 2 (Auto-safe)**: agent auto-executes safe categories (meta, schema, alt text, internal links, sitemap) — default after Tier 1 graduation
- **Tier 3 (Full auto)**: includes new content + body rewrites — only after 60+ days at Tier 2 without incident

For M's three sites: **start at Tier 2 directly** — M is already manually doing the work; no need to bottleneck the agent with approval.

Universal hard guardrails (no agent can violate):
- No page deletion
- No URL/slug changes
- No edits blocking AI crawlers or search bots
- No removal of canonical or hreflang tags
- 24-hour pause after any Google algorithm update announcement
- Per-site daily action cap
- Every action logged with full diff and reversible within 30 days
- No bulk AI-generated pages without editorial review — every published page passes quality + originality gates (scaled-content-abuse guard)
- No tactics that manipulate AI answers or search rankings — PiekAI performs assistive, human-reviewable optimization, never manipulation

Auto-rollback fires when an action's measured outcome is negative AND statistically significant AND not explained by external factors (algorithm updates, competitor moves, seasonality).

**Regulatory posture (2026).** Google's May 2026 spam-policy update extends spam rules to cover attempts to manipulate AI-generated search answers, and scaled content abuse (mass low-oversight AI pages) is an active penalty category. PiekAI is therefore designed as an *assistive autonomous operator*: the agent does the labor, but quality/originality gates and human-reviewable diffs keep every change defensible. Autonomy means "no manual busywork," never "no oversight." This is consistent with "What PiekAI is NOT" below — not a content mill, not a black-hat tool.

## Phased timeline

- **Phase 0** (Weeks 1-3): Foundation — domain live, landing page v1 deployed, monorepo scaffolded, DB schema, Cloudflare + Supabase + Hetzner wired, first PiekAI Journal post live
- **Phase 1** (Weeks 4-9): Core Loop MVP on M's three sites — Scout + Perception + Diagnostician + Strategist + Operator + Guardian + Analyst running on alfareclame.nl, fleettrackholland.nl, aanloopai.nl. Tier 2 autonomous. Free Audit funnel live.
- **Phase 2** (Months 3-5): Voice integration, revenue attribution, competitor counter-strike, owned media seed, conversational landing pages, status page
- **Phase 3** (Months 5-7): Productize for paying mid-market clients. Stripe billing. Citation Score™ public launch. Predictive Action Modeling. First 10 paying customers.
- **Phase 4** (Months 8-12): Vertical bundles, BeNeLux expansion, ISO 27001 audit, white-label, PiekAI Academie. 50+ clients.
- **Phase 5** (Year 2+): Category leadership, fine-tuned domain models, optional BV spinoff.

## Differentiator features (phase introduced)

| Feature | Phase | Why it matters |
|---|---|---|
| Scout (autonomous keyword discovery) | 1 | Customer doesn't need to know SEO. Klusio-killer onboarding. |
| Closed-loop revenue attribution | 2 | "We earned you €X" — Klusio can't say this |
| Voice ecosystem integration | 2 | M's unique production ElevenLabs deployments |
| Conversational Landing Pages | 2 | Embedded Claude on customer sites; converts harder |
| Competitor Citation Hijacking | 2 | Aggressive offensive play; reported monthly |
| AI Crawl Bot Intelligence | 2 | Server-log analysis no other tool does |
| Owned Media Network seed | 3 | Niche review sites we own; long-game moat |
| Citation Score™ public launch | 3 | Category-defining proprietary metric |
| Predictive Action Modeling | 3 | "Expected rank delta +1.4 ± 0.8" before action |
| Performance pricing tier | 3 | €497 base + 5% of attributed revenue |
| AI Persona Simulation | 3 | Pre-publish testing across 5 LLMs |
| Original Data Publishing Engine | 4 | Quarterly sector reports per client |
| Wikipedia + Wikidata pipeline | 4 | Entity authority for qualifying clients |
| Digital PR Pipeline | 4 | Press-mention generation |
| Vertical bundles (Bouw, Zorg, etc.) | 4 | Sector-specific knowledge + compliance |
| Domain fine-tuned models | 5 | Proprietary moat no API-only competitor can match |
| White-label for agencies | 4 | B2B2B channel |

## Pricing model

- **Starter €497/mo**: 1 site, ~50 keywords tracked, Tier 1 or 2, monthly reports
- **Growth €997/mo**: 3 sites, ~150 keywords, all tiers, competitor tracking, voice integration
- **Scale €1997/mo**: 5 sites, ~500 keywords, dedicated success, custom integrations
- **Performance**: €497 base + 5% of attributed revenue (requires Phase 2 attribution stack)
- **Enterprise**: custom (€2.5k-15k/mo) — data sovereignty, sectoral compliance, white-label

## North Star metrics

**Phase 1 success (week 9)**
- alfareclame.nl: 3+ target keywords moved up 5+ positions through agent action
- LLM citation: M's sites mentioned by 2+ of 5 platforms (was 0 at Phase 0)
- Cycle reliability: 95%+ successful runs
- 30+ Free Audit requests from landing page

**Phase 2 success (month 5)**
- All 3 M sites: 1+ keyword each in top 3
- alfareclame.nl: #1 for at least 1 competitive keyword
- 100+ Free Audit completions
- 20+ qualified inbound leads

**Phase 3 success (month 7)**
- 10+ paying clients
- €5-8k MRR
- Citation Score™ launched publicly
- 1+ conference talk delivered

**Phase 4 success (month 12)**
- 50+ paying clients
- €25-35k MRR
- 3+ vertical bundles live
- ISO 27001 audit complete

## What PiekAI is NOT

- Not a Klusio competitor at €99/mo
- Not a content mill (every published page must pass quality + originality gates)
- Not a black-hat tool (no link schemes, no anchor stuffing, no AI-generated thin content)
- Not a dashboard product (the agent doing the work is the product; the dashboard is observability)
- Not US-focused (NL/EU first, BeNeLux + DACH expansion, never US compliance)

## Open architectural decisions deferred to Phase 1+

These are intentionally NOT decided in Phase 0:
- Knowledge graph technology (Postgres JSONB for Phase 1; Neo4j / Apache AGE evaluated Phase 3 if needed)
- Multi-model LLM fallback (Phase 1 Claude-only with retry; fallback chain Phase 3 if outage data justifies)
- Owned Media Network sites (seed in Phase 2-3, scale in Phase 4)
- ISO 27001 audit timing (target Phase 4, but ISMS disciplined documentation from Phase 0)

---

*End of Vision. See `PHASE_0_PLAN.md` for current execution.*
