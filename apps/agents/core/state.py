"""Shared state threaded through one autonomous optimization cycle."""

from __future__ import annotations

from datetime import UTC, datetime
from typing import Any

from pydantic import BaseModel, Field


class Signal(BaseModel):
    """A fresh data point pulled by Perception."""

    source: str  # gsc | dataforseo | llm_citation | server_log | competitor
    kind: str
    payload: dict[str, Any] = Field(default_factory=dict)


class Diagnosis(BaseModel):
    """Why the site is not #1 for a target query."""

    keyword: str
    issue: str
    severity: str = "medium"  # low | medium | high
    evidence: dict[str, Any] = Field(default_factory=dict)


class CandidateMove(BaseModel):
    """A ranked optimization the Strategist proposes."""

    action_type: str
    category: str  # meta | schema | alt_text | internal_link | sitemap | content | body_rewrite
    target_page: str
    rationale: str
    predicted_lift: float = 0.0
    citation_score_delta: float = 0.0


class ExecutedAction(BaseModel):
    """An action the Operator carried out (or was blocked from carrying out)."""

    move: CandidateMove
    status: str  # executed | blocked | failed | rolled_back
    diff: str = ""
    guardrail_violations: list[str] = Field(default_factory=list)


class CycleState(BaseModel):
    """LangGraph state threaded through one cycle of the swarm.

    Each agent node receives this and returns a dict of fields to merge back.
    """

    # --- Inputs ---
    org_id: str
    site_id: str
    site_url: str
    tier: int = 2
    started_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    # --- Working data, filled stage by stage ---
    keywords: list[str] = Field(default_factory=list)
    signals: list[Signal] = Field(default_factory=list)
    diagnoses: list[Diagnosis] = Field(default_factory=list)
    candidate_moves: list[CandidateMove] = Field(default_factory=list)
    executed_actions: list[ExecutedAction] = Field(default_factory=list)

    # --- Bookkeeping ---
    daily_action_count: int = 0
    algo_update_active: bool = False
    errors: list[str] = Field(default_factory=list)
