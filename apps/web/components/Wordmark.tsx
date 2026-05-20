/**
 * Wordmark — Phase 0 placeholder logo per DESIGN_SYSTEM.md.
 * "PiekAI" in display serif, weight 400, tight tracking, with a small
 * forest-green peak triangle micro-mark hinting at the brand motif.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 font-display text-bone-800 ${className}`}
      style={{ letterSpacing: "-0.04em" }}
    >
      <span className="text-xl leading-none">PiekAI</span>
      {/* Peak micro-mark — decorative. */}
      <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true" className="translate-y-px">
        <title>PiekAI</title>
        <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--accent-500)" />
      </svg>
    </span>
  );
}
