"use client";
/**
 * app/error.tsx — Branded error page (500-class errors).
 * Must be a Client Component per Next.js App Router convention.
 * Instruction: "Branded 404 (not-found.tsx) and 500 (error.tsx) pages."
 */

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-bone-50">
      {/* Minimal header — Client Component can't import Server Components safely */}
      <header className="border-b border-bone-200 bg-bone-50">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-12">
          <a
            href="/"
            aria-label="PiekAI — terug naar home"
            className="inline-flex items-baseline gap-1.5 font-display text-bone-800"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="text-xl leading-none">PiekAI</span>
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              aria-hidden="true"
              className="translate-y-px"
            >
              <title>PiekAI</title>
              <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--accent-500)" />
            </svg>
          </a>
        </div>
      </header>

      <main id="hoofdinhoud" className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-[480px] px-6 py-20 text-center sm:px-12">
          <p className="font-mono text-sm text-danger">500</p>
          <h1 className="mt-4 text-4xl leading-tight text-bone-800">Iets ging mis.</h1>
          <p className="mt-5 font-body text-base leading-[1.7] text-bone-500">
            We hebben het gemeld en kijken ernaar. Probeer het opnieuw of ga terug naar de homepage.
          </p>

          {error.digest && (
            <p className="mt-3 font-mono text-xs text-bone-300">Foutcode: {error.digest}</p>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-accent-700 bg-accent-500 px-6 py-2.5 font-body text-sm font-medium text-bone-50 transition-all duration-150 hover:bg-accent-700 hover:-translate-y-px"
            >
              Opnieuw proberen
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-bone-300 px-6 py-2.5 font-body text-sm font-medium text-bone-800 transition-all duration-150 hover:border-bone-500 hover:bg-bone-50"
            >
              Terug naar home
            </a>
          </div>

          <p className="mt-8 font-body text-sm text-bone-400">
            Probleem aanhoudt?{" "}
            <a
              href="mailto:hello@piekai.nl"
              className="text-accent-700 underline underline-offset-2 hover:text-accent-500"
            >
              Mail ons
            </a>
            .
          </p>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-bone-200">
        <div className="mx-auto max-w-[1200px] px-6 py-6 sm:px-12">
          <p className="font-body text-xs text-bone-400">
            &copy; {new Date().getFullYear()} PiekAI — een product van AanloopAI.
          </p>
        </div>
      </footer>
    </div>
  );
}
