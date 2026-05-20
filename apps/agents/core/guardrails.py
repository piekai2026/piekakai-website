"""Universal hard guardrails — no agent may violate these.

Mirrors the safety model in VISION.md. This module is pure (stdlib only) so it
is trivially testable; the Guardian agent wraps `check_action` as its circuit
breaker.
"""

from __future__ import annotations

# Human-readable rules, mirrored from VISION.md §Safety model. Kept for logs
# and audit surfaces.
HARD_GUARDRAILS: tuple[str, ...] = (
    "No page deletion",
    "No URL/slug changes",
    "No edits blocking AI crawlers or search bots",
    "No removal of canonical or hreflang tags",
    "24-hour pause after any Google algorithm update announcement",
    "Per-site daily action cap",
    "Every action logged with full diff and reversible within 30 days",
    "No bulk AI-generated pages without editorial review",
    "No tactics that manipulate AI answers or search rankings",
)

# Action types that no tier may ever perform.
FORBIDDEN_ACTION_TYPES: frozenset[str] = frozenset(
    {
        "page_deletion",
        "url_change",
        "slug_change",
        "canonical_removal",
        "hreflang_removal",
        "crawler_block",
    }
)

# Categories auto-executable at Tier 2 (auto-safe).
TIER_2_SAFE_CATEGORIES: frozenset[str] = frozenset(
    {"meta", "schema", "alt_text", "internal_link", "sitemap"}
)

# Categories that additionally require Tier 3 (full auto).
TIER_3_CATEGORIES: frozenset[str] = frozenset({"content", "body_rewrite"})


def check_action(
    action_type: str,
    category: str,
    *,
    tier: int,
    daily_action_count: int,
    daily_action_cap: int,
    algo_update_active: bool,
) -> list[str]:
    """Return the list of guardrail violations for a proposed action.

    An empty list means the action is cleared to execute. Any non-empty result
    means the Guardian circuit breaker must block the action.
    """
    violations: list[str] = []

    if action_type in FORBIDDEN_ACTION_TYPES:
        violations.append(f"forbidden action type: {action_type}")

    if algo_update_active:
        violations.append("24h pause active after algorithm update announcement")

    if daily_action_count >= daily_action_cap:
        violations.append(
            f"daily action cap reached ({daily_action_count}/{daily_action_cap})"
        )

    if category in TIER_3_CATEGORIES:
        if tier < 3:
            violations.append(
                f"category '{category}' requires Tier 3, site is Tier {tier}"
            )
    elif category in TIER_2_SAFE_CATEGORIES:
        if tier < 2:
            violations.append(
                f"category '{category}' requires Tier 2, site is Tier {tier}"
            )
    else:
        violations.append(f"unknown action category: {category}")

    return violations
