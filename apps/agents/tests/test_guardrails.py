"""Tests for the universal hard guardrails."""

from core.guardrails import (
    FORBIDDEN_ACTION_TYPES,
    TIER_2_SAFE_CATEGORIES,
    check_action,
)


def _check(**overrides):
    """Run check_action against a safe Tier-2 baseline, with overrides."""
    base = {
        "action_type": "update_meta_title",
        "category": "meta",
        "tier": 2,
        "daily_action_count": 0,
        "daily_action_cap": 10,
        "algo_update_active": False,
    }
    base.update(overrides)
    return check_action(base.pop("action_type"), base.pop("category"), **base)


def test_safe_tier2_action_passes():
    assert _check() == []


def test_forbidden_action_type_is_blocked():
    violations = _check(action_type="page_deletion")
    assert any("forbidden" in v for v in violations)


def test_every_forbidden_type_is_caught():
    for action_type in FORBIDDEN_ACTION_TYPES:
        assert _check(action_type=action_type) != []


def test_algo_update_pauses_all_actions():
    violations = _check(algo_update_active=True)
    assert any("pause" in v for v in violations)


def test_daily_cap_blocks_when_reached():
    violations = _check(daily_action_count=10, daily_action_cap=10)
    assert any("cap" in v for v in violations)


def test_tier3_category_blocked_at_tier2():
    violations = _check(category="body_rewrite", tier=2)
    assert any("Tier 3" in v for v in violations)


def test_tier3_category_allowed_at_tier3():
    assert _check(category="body_rewrite", tier=3) == []


def test_unknown_category_is_blocked():
    violations = _check(category="delete_everything")
    assert any("unknown" in v for v in violations)


def test_all_tier2_categories_pass_at_tier2():
    for category in TIER_2_SAFE_CATEGORIES:
        assert _check(category=category) == []
