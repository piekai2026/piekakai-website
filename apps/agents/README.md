# PiekAI Agents

Autonomous agent swarm for the PiekAI optimization cycle (Phase 1+).
Python 3.12+, managed with [uv](https://docs.astral.sh/uv/), orchestrated with
[LangGraph](https://langchain-ai.github.io/langgraph/).

## The swarm

| Agent | Role | In cycle graph? |
|---|---|---|
| Scout | Autonomous keyword discovery on onboarding | No — runs once per new site |
| Perception | Pulls fresh data (GSC, DataForSEO, LLM citations, logs, competitors) | Yes |
| Diagnostician | Analyzes why the site is not #1 | Yes |
| Strategist | Ranks candidate moves with predicted lift + Citation Score | Yes |
| Operator | Executes moves via CMS connector | Yes |
| Guardian | Real-time circuit breaker on hard guardrails | No — invoked by Operator |
| Analyst | Attribution, auto-rollback, memory updates | Yes |
| Conductor | Allocates budget across the swarm | No — orchestrator |

Cycle graph: `Perception → Diagnostician → Strategist → Operator → Analyst`.

> **Scaffold status:** every agent body is a stub that logs and returns empty
> updates so the graph compiles and runs end-to-end. Phase 1 fills them in —
> see `../../docs/phase-1-kickoff.md` §5.

## Layout

```
core/
  config.py      — Settings (pydantic-settings) + structlog logging
  state.py       — CycleState and the models threaded through one cycle
  guardrails.py  — universal hard guardrails (pure, fully tested)
  graph.py       — LangGraph wiring of the recurring cycle
agents/
  base.py        — BaseAgent (every agent is a LangGraph node)
  swarm.py       — the 8 agents (stub bodies for the scaffold)
main.py          — run one cycle for a single site
tests/           — guardrail unit tests + graph smoke test
```

## Setup

```bash
cd apps/agents
uv sync                        # install deps + dev tools
cp .env.example .env.local     # then fill in real values
```

## Run

```bash
uv run python main.py <org_id> <site_id> <site_url>
```

## Test & lint

```bash
uv run pytest
uv run ruff check .
```
