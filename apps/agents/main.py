"""Run one optimization cycle for a single site.

Usage:
    python main.py <org_id> <site_id> <site_url>
"""

from __future__ import annotations

import asyncio
import sys

from core.config import configure_logging, get_logger
from core.graph import build_cycle_graph
from core.state import CycleState

log = get_logger("main")


async def run_cycle(org_id: str, site_id: str, site_url: str) -> CycleState:
    """Build the cycle graph and execute one full cycle for the site."""
    graph = build_cycle_graph()
    initial = CycleState(org_id=org_id, site_id=site_id, site_url=site_url)
    result = await graph.ainvoke(initial)
    return CycleState.model_validate(result)


def main() -> int:
    configure_logging()
    if len(sys.argv) != 4:
        print(__doc__)
        return 1

    _, org_id, site_id, site_url = sys.argv
    state = asyncio.run(run_cycle(org_id, site_id, site_url))
    log.info(
        "cycle.complete",
        site=state.site_url,
        executed=len(state.executed_actions),
        errors=len(state.errors),
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
