"""Smoke test: the cycle graph compiles and runs end-to-end with stub agents."""

from core.graph import build_cycle_graph
from core.state import CycleState


async def test_cycle_graph_runs_end_to_end():
    graph = build_cycle_graph()
    initial = CycleState(
        org_id="org-1", site_id="site-1", site_url="https://example.test"
    )
    result = await graph.ainvoke(initial)
    state = CycleState.model_validate(result)

    # Stub agents produce no work, but the cycle must complete cleanly.
    assert state.errors == []
    assert state.executed_actions == []
    assert state.signals == []
