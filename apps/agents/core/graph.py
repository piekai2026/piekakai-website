"""LangGraph wiring for one autonomous optimization cycle."""

from __future__ import annotations

from langgraph.graph import END, START, StateGraph

from agents.swarm import Analyst, Diagnostician, Operator, Perception, Strategist
from core.state import CycleState


def build_cycle_graph():
    """Build and compile the recurring cycle graph.

    Flow: Perception -> Diagnostician -> Strategist -> Operator -> Analyst.
    Scout (onboarding) and Conductor (budget allocation) sit outside this
    linear cycle and are invoked separately.
    """
    graph = StateGraph(CycleState)

    graph.add_node("perception", Perception())
    graph.add_node("diagnostician", Diagnostician())
    graph.add_node("strategist", Strategist())
    graph.add_node("operator", Operator())
    graph.add_node("analyst", Analyst())

    graph.add_edge(START, "perception")
    graph.add_edge("perception", "diagnostician")
    graph.add_edge("diagnostician", "strategist")
    graph.add_edge("strategist", "operator")
    graph.add_edge("operator", "analyst")
    graph.add_edge("analyst", END)

    return graph.compile()
