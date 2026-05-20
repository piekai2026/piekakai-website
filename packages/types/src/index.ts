import { z } from "zod";

/**
 * Shared domain types for PiekAI, expressed as Zod schemas so a single
 * definition validates at runtime and infers a TypeScript type.
 * Expanded as the data model lands in Phase 0 Day 3 / Phase 1.
 */

/** Agent autonomy tiers — see VISION.md "Safety model". */
export const SafetyTier = z.enum(["shadow", "auto_safe", "full_auto"]);
export type SafetyTier = z.infer<typeof SafetyTier>;

/** The seven consolidated agents — see VISION.md "The agent system". */
export const AgentKind = z.enum([
  "scout",
  "perception",
  "diagnostician",
  "strategist",
  "operator",
  "guardian",
  "analyst",
]);
export type AgentKind = z.infer<typeof AgentKind>;
