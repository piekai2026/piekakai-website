"""Runtime configuration and structured logging for the PiekAI agent swarm."""

from __future__ import annotations

import logging

import structlog
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Environment-driven configuration. See .env.example for the full list."""

    model_config = SettingsConfigDict(env_file=".env.local", extra="ignore")

    # --- LLM (Anthropic) ---
    anthropic_api_key: str = ""
    claude_model_reasoning: str = "claude-sonnet-4-6"
    claude_model_fast: str = "claude-haiku-4-5-20251001"

    # --- Data sources ---
    database_url: str = ""
    dataforseo_login: str = ""
    dataforseo_password: str = ""

    # --- Safety (see core.guardrails) ---
    default_tier: int = 2
    daily_action_cap: int = 10
    algo_update_pause_hours: int = 24

    # --- Ops ---
    log_level: str = "INFO"


_settings: Settings | None = None


def get_settings() -> Settings:
    """Return the process-wide Settings singleton."""
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings


def configure_logging(level: str | None = None) -> None:
    """Configure structlog. Call once at process start (see main.py)."""
    log_level = (level or get_settings().log_level).upper()
    logging.basicConfig(format="%(message)s", level=log_level)
    structlog.configure(
        processors=[
            structlog.processors.add_log_level,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.dev.ConsoleRenderer(),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(
            logging.getLevelName(log_level)
        ),
    )


def get_logger(name: str) -> structlog.stdlib.BoundLogger:
    """Return a bound structlog logger for the given name."""
    return structlog.get_logger(name)
