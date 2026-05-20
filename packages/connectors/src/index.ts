/**
 * CMS connector abstraction. Each concrete connector (GitHub PR, WordPress,
 * Sanity, ...) implements this interface so the Operator agent stays
 * storage-agnostic. Concrete connectors land in Phase 1.
 *
 * Hard rule (VISION.md "Safety model"): capture a reversible snapshot
 * before any write; every change is reversible within 30 days.
 */

export interface PageSnapshot {
  path: string;
  content: string;
  capturedAt: string;
}

export interface ChangeRequest {
  path: string;
  newContent: string;
  reason: string;
}

export interface ApplyResult {
  applied: boolean;
  diff: string;
}

export interface Connector {
  /** Connector kind, e.g. "github" | "wordpress" | "sanity". */
  readonly kind: string;
  /** Capture a reversible snapshot before any write. */
  snapshot(path: string): Promise<PageSnapshot>;
  /** Apply a change. Must be reversible within 30 days. */
  apply(change: ChangeRequest): Promise<ApplyResult>;
  /** Revert to a previously captured snapshot. */
  revert(snapshot: PageSnapshot): Promise<{ reverted: boolean }>;
}
