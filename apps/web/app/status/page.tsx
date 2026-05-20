/**
 * /status — System status page.
 * Phase 0: hardcoded "Alle systemen operationeel". Real health checks in Phase 1.
 * Instruction: "Build /status — hardcoded 'Alle systemen operationeel' (real health checks are Phase 1)."
 */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Status — PiekAI",
  description: "Actuele systeemstatus van PiekAI. Alle systemen operationeel.",
  openGraph: {
    title: "Status — PiekAI",
    description: "Actuele systeemstatus van PiekAI.",
    type: "website",
    locale: "nl_NL",
  },
};

/* Phase 0: hardcoded. Real health endpoints wired in Phase 1. */
const SYSTEMS = [
  { name: "Web (piekai.nl)", status: "operational" },
  { name: "API", status: "operational" },
  { name: "Agent runner", status: "operational" },
  { name: "Database", status: "operational" },
  { name: "E-mail (Brevo)", status: "operational" },
  { name: "AI-engines monitoring", status: "operational" },
];

const STATUS_LABELS: Record<string, string> = {
  operational: "Operationeel",
  degraded: "Verminderd",
  outage: "Storing",
};

const STATUS_COLORS: Record<string, string> = {
  operational: "bg-accent-500",
  degraded: "bg-warning",
  outage: "bg-danger",
};

export default function StatusPage() {
  const allOperational = SYSTEMS.every((s) => s.status === "operational");

  return (
    <>
      <SiteHeader />

      <main id="hoofdinhoud" className="flex-1">
        {/* Page header */}
        <section className="border-b border-bone-200 bg-bone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-20">
            <p className="font-mono text-xs tracking-wide text-accent-700">Status</p>
            <div className="mt-4 flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${allOperational ? "bg-accent-500" : "bg-warning"}`}
                aria-hidden="true"
              />
              <h1 className="text-4xl leading-tight text-bone-800 sm:text-5xl">
                {allOperational ? "Alle systemen operationeel." : "Verminderde beschikbaarheid."}
              </h1>
            </div>
            <p className="mt-5 font-mono text-xs text-bone-400">
              Laatste controle:{" "}
              <time dateTime={new Date().toISOString()}>
                {new Date().toLocaleString("nl-NL", {
                  timeZone: "Europe/Amsterdam",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>{" "}
              CET
            </p>
          </div>
        </section>

        {/* System list */}
        <section className="mx-auto max-w-[720px] px-6 py-12 sm:px-12">
          <ul className="divide-y divide-bone-200">
            {SYSTEMS.map((system) => (
              <li key={system.name} className="flex items-center justify-between py-4">
                <span className="font-body text-sm text-bone-700">{system.name}</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${STATUS_COLORS[system.status]}`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-bone-500">
                    {STATUS_LABELS[system.status]}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-body text-sm leading-[1.65] text-bone-400">
            Real-time health checks worden toegevoegd in Fase 1. Storingen worden gemeld via{" "}
            <a
              href="mailto:hello@piekai.nl"
              className="text-accent-700 underline underline-offset-2 hover:text-accent-500"
            >
              hello@piekai.nl
            </a>
            .
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
