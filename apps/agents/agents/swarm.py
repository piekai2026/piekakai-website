"""The PiekAI agent swarm — stub implementations for the Phase 1 scaffold.

Each cycle agent's `run` currently returns empty/passthrough updates so the
cycle graph compiles and executes end-to-end. Phase 1 fills these in; see
docs/phase-1-kickoff.md §5 for the build order.
"""

from __future__ import annotations

from agents.base import BaseAgent
from core.config import get_logger, get_settings
from core.guardrails import check_action
from core.state import CandidateMove, CycleState, ExecutedAction

# --- Cycle agents (LangGraph nodes) ---------------------------------------


class Perception(BaseAgent):
    """Pulls fresh data: GSC, DataForSEO, LLM citations, server logs, competitors."""

    name = "perception"

    async def run(self, state: CycleState) -> dict:
        # TODO(phase-1): query GSC + DataForSEO + LLM-citation polling.
        self.log.warning("stub", note="Perception returns no signals yet")
        return {"signals": []}


class Diagnostician(BaseAgent):
    """Analyzes why the site is not #1 for its target queries."""

    name = "diagnostician"

    async def run(self, state: CycleState) -> dict:
        # TODO(phase-1): reason over state.signals to produce diagnoses.
        self.log.warning("stub", note="Diagnostician returns no diagnoses yet")
        return {"diagnoses": []}


class Strategist(BaseAgent):
    """Generates ranked candidate moves with predicted lift + Citation Score."""

    name = "strategist"

    async def run(self, state: CycleState) -> dict:
        # TODO(phase-1): turn diagnoses into a ranked CandidateMove list.
        self.log.warning("stub", note="Strategist returns no candidate moves yet")
        return {"candidate_moves": []}


class Operator(BaseAgent):
    """Executes moves via the CMS connector, vetted by the Guardian first."""

    name = "operator"

    async def run(self, state: CycleState) -> dict:
        settings = get_settings()
        guardian = Guardian()
        executed: list[ExecutedAction] = []
        count = state.daily_action_count

        for move in state.candidate_moves:
            violations = guardian.vet(
                move,
                tier=state.tier,
                daily_action_count=count,
                daily_action_cap=settings.daily_action_cap,
                algo_update_active=state.algo_update_active,
            )
            if violations:
                executed.append(
                    ExecutedAction(
                        move=move, status="blocked", guardrail_violations=violations
                    )
                )
                continue
            # TODO(phase-1): apply the move via CMS connector (GitHub PR / WP / Sanity).
            executed.append(ExecutedAction(move=move, status="executed"))
            count += 1

        return {"executed_actions": executed, "daily_action_count": count}


class Analyst(BaseAgent):
    """Attribution, auto-rollback, and memory updates."""

    name = "analyst"

    async def run(self, state: CycleState) -> dict:
        # TODO(phase-1): measure outcomes, fire auto-rollback, persist memory.
        executed = sum(a.status == "executed" for a in state.executed_actions)
        blocked = sum(a.status == "blocked" for a in state.executed_actions)
        self.log.info("cycle.summary", executed=executed, blocked=blocked)
        return {}


# --- Non-node agents -------------------------------------------------------


class Guardian:
    """Real-time circuit breaker on the universal hard guardrails.

    Not a graph node — the Operator invokes it before every action.
    """

    name = "guardian"

    def __init__(self) -> None:
        self.log = get_logger("agent.guardian")

    def vet(
        self,
        move: CandidateMove,
        *,
        tier: int,
        daily_action_count: int,
        daily_action_cap: int,
        algo_update_active: bool,
    ) -> list[str]:
        """Return guardrail violations for a move. Empty list == cleared."""
        violations = check_action(
            move.action_type,
            move.category,
            tier=tier,
            daily_action_count=daily_action_count,
            daily_action_cap=daily_action_cap,
            algo_update_active=algo_update_active,
        )
        if violations:
            self.log.warning(
                "circuit.break", move=move.action_type, violations=violations
            )
        return violations


class Scout:
    """Onboarding agent — autonomously discovers target keywords for a new site.

    Runs once when a site connects, not part of the recurring cycle.
    """

    name = "scout"

    def __init__(self) -> None:
        self.log = get_logger("agent.scout")

    async def discover(self, site_url: str) -> list[str]:
        """Return discovered target keywords for the site."""
        # TODO(phase-1): crawl site + DataForSEO keyword expansion.
        self.log.warning("stub", note="Scout returns no keywords yet", site=site_url)
        return []


class Conductor:
    """Orchestrator — allocates the daily action / API budget across sites."""

    name = "conductor"

    def __init__(self) -> None:
        self.log = get_logger("agent.conductor")

    def allocate(self, site_ids: list[str], total_budget: int) -> dict[str, int]:
        """Allocate budget across sites.

        Even split for the scaffold. TODO(phase-1): weight by opportunity size.
        """
        if not site_ids:
            return {}
        share = total_budget // len(site_ids)
        allocation = {sid: share for sid in site_ids}
        self.log.info("budget.allocated", sites=len(site_ids), share=share)
        return allocation
