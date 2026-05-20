"""Base class for every PiekAI swarm agent that runs as a LangGraph node."""

from __future__ import annotations

from abc import ABC, abstractmethod

from core.config import get_logger
from core.state import CycleState


class BaseAgent(ABC):
    """A swarm agent.

    Each agent is a LangGraph node: it receives the shared CycleState and
    returns a dict of fields to merge back into that state. Subclasses
    implement `run`; `__call__` wraps it with logging and a top-level guard.
    """

    name: str = "base"

    def __init__(self) -> None:
        self.log = get_logger(f"agent.{self.name}")

    @abstractmethod
    async def run(self, state: CycleState) -> dict:
        """Do this agent's work and return state updates."""

    async def __call__(self, state: CycleState) -> dict:
        """LangGraph node entrypoint — wraps `run` with logging."""
        self.log.info("agent.start", site=state.site_url, tier=state.tier)
        try:
            updates = await self.run(state)
        except Exception as exc:  # noqa: BLE001 — top-level node guard
            # Record the failure on state instead of crashing the whole cycle;
            # the Analyst surfaces accumulated errors at the end of the run.
            self.log.error("agent.error", error=str(exc))
            return {"errors": [*state.errors, f"{self.name}: {exc}"]}
        self.log.info("agent.done", updates=sorted(updates.keys()))
        return updates
