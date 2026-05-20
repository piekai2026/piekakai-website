"""PiekAI agent workers.

Phase 1+ — see PHASE_0_PLAN.md and VISION.md ("The agent system").

Planned agents: Scout, Perception, Diagnostician, Strategist, Operator,
Guardian, Analyst, plus a Conductor orchestrator that allocates budget
across the swarm. Built on Python 3.12 + LangGraph; LangGraph state is
persisted with the Postgres checkpointer (never the in-memory saver).
"""
