/**
 * /methodologie — How PiekAI works: agent system, safety tiers, open positioning.
 * Content from VISION.md. Server Component.
 * Instruction: "Build /methodologie — how PiekAI works, open positioning (the agent system, safety tiers)."
 */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Methodologie — PiekAI",
  description:
    "Hoe PiekAI werkt: het autonome agentsysteem, veiligheidstiers, en de gesloten-lus attributie. Transparantie over de aanpak.",
  openGraph: {
    title: "Methodologie — PiekAI",
    description: "Het autonome agentsysteem, veiligheidstiers, en hoe PiekAI meet.",
    type: "website",
    locale: "nl_NL",
  },
};

const AGENTS = [
  {
    name: "Scout",
    role: "Onboarding: ontdekt doelzoekwoorden autonoom",
    trigger: "Nieuwe site verbonden",
  },
  {
    name: "Perception",
    role: "Haalt elk uur verse data op: GSC, AI-citaties, concurrenten",
    trigger: "Cron",
  },
  {
    name: "Diagnostician",
    role: "Analyseert waarom de site niet #1 staat voor doelqueries",
    trigger: "Signaal van Perception",
  },
  {
    name: "Strategist",
    role: "Genereert gerangschikte acties met verwachte lift",
    trigger: "Na Diagnostician",
  },
  {
    name: "Operator",
    role: "Voert uit via CMS-connector (GitHub PR / WordPress / Sanity)",
    trigger: "Na Strategist",
  },
  {
    name: "Guardian",
    role: "Real-time circuit breaker op harde guardrails",
    trigger: "Tijdens Operator-uitvoering",
  },
  {
    name: "Analyst",
    role: "Attributie + auto-rollback + memory-updates",
    trigger: "Dagelijks aggregate",
  },
];

const SAFETY_TIERS = [
  {
    tier: "Tier 1 — Shadow",
    description:
      "Agent stelt voor, klant keurt goed. Standaard voor de eerste twee weken per nieuwe site.",
    active: true,
  },
  {
    tier: "Tier 2 — Auto-safe",
    description:
      "Agent voert veilige categorieën autonoom uit: meta, schema, alt-tekst, interne links, sitemap.",
    active: false,
  },
  {
    tier: "Tier 3 — Full auto",
    description:
      "Inclusief nieuwe content en body rewrites. Pas na 60+ dagen Tier 2 zonder incident.",
    active: false,
  },
];

export default function MethodologiePage() {
  return (
    <>
      <SiteHeader />

      <main id="hoofdinhoud" className="flex-1">
        {/* Page header */}
        <section className="border-b border-bone-200 bg-bone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-20">
            <p className="font-mono text-xs tracking-wide text-accent-700">Methodologie</p>
            <h1 className="mt-4 text-4xl leading-tight text-bone-800 sm:text-5xl">
              PiekAI is geen rapport. <span className="block mt-1">Het is een operatie.</span>
            </h1>
            <p className="mt-5 max-w-[40rem] font-body text-lg leading-[1.65] text-bone-500">
              We leggen precies uit hoe het systeem werkt. Geen black box.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12">
          {/* How it works — 3 steps */}
          <section>
            <h2 className="text-3xl text-bone-800">Hoe het werkt</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Ziet",
                  body: "PiekAI bewaakt je positie in Google én in de vijf grote AI-engines, uur per uur. Niet alleen de blauwe links — ook wie wordt aanbevolen in ChatGPT, Claude, Gemini, Perplexity en Google AI Overviews.",
                },
                {
                  step: "02",
                  title: "Diagnostiseert",
                  body: "Waarom sta je niet bovenaan? PiekAI analyseert exact wat ontbreekt, welke concurrenten wel worden aanbevolen, en waarom. Geen vage aanbevelingen — concrete oorzaken.",
                },
                {
                  step: "03",
                  title: "Doet",
                  body: "Geen rapporten die je zelf moet uitvoeren. PiekAI past je website autonoom aan — content, schema, links, technische fixes — en meet de impact. Elke actie is gelogd en omkeerbaar.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="rounded-[6px] border border-bone-200 bg-bone-50 p-8">
                  <p className="font-mono text-xs text-bone-500">{step}</p>
                  <h3 className="mt-3 text-xl text-bone-800">{title}</h3>
                  <p className="mt-3 font-body text-sm leading-[1.65] text-bone-500">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Agent system */}
          <section className="mt-16">
            <h2 className="text-3xl text-bone-800">Het agentsysteem</h2>
            <p className="mt-4 max-w-[40rem] font-body text-base leading-[1.7] text-bone-500">
              PiekAI bestaat uit 7 gespecialiseerde agents, gecoördineerd door een Conductor. Elk
              agent heeft één verantwoordelijkheid.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full font-body text-sm text-bone-600 border-collapse">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-left font-medium text-bone-700 py-3 pr-4 border-b border-bone-200 bg-bone-100 pl-0"
                    >
                      Agent
                    </th>
                    <th
                      scope="col"
                      className="text-left font-medium text-bone-700 px-4 py-3 border-b border-bone-200 bg-bone-100"
                    >
                      Taak
                    </th>
                    <th
                      scope="col"
                      className="text-left font-medium text-bone-700 px-4 py-3 border-b border-bone-200 bg-bone-100"
                    >
                      Trigger
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AGENTS.map((agent) => (
                    <tr key={agent.name} className="hover:bg-bone-100 transition-colors">
                      <th
                        scope="row"
                        className="text-left py-3 pr-4 border-b border-bone-200 pl-0 font-medium text-bone-800 font-mono text-xs"
                      >
                        {agent.name}
                      </th>
                      <td className="px-4 py-3 border-b border-bone-200">{agent.role}</td>
                      <td className="px-4 py-3 border-b border-bone-200 text-bone-500">
                        {agent.trigger}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Safety model */}
          <section className="mt-16">
            <h2 className="text-3xl text-bone-800">Veiligheidsmodel</h2>
            <p className="mt-4 max-w-[40rem] font-body text-base leading-[1.7] text-bone-500">
              Autonomie betekent niet geen controle. PiekAI werkt in drie tiers — je bepaalt hoeveel
              autonomie je geeft, op basis van vertrouwen dat opgebouwd is.
            </p>
            <div className="mt-8 space-y-4">
              {SAFETY_TIERS.map(({ tier, description, active }) => (
                <div
                  key={tier}
                  className="flex gap-6 rounded-[6px] border border-bone-200 bg-bone-50 p-6"
                >
                  <div className="shrink-0">
                    <div
                      className={`h-2.5 w-2.5 rounded-full mt-1.5 ${active ? "bg-accent-500" : "bg-bone-300"}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-bone-800">{tier}</p>
                    <p className="mt-1 font-body text-sm leading-[1.65] text-bone-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hard guardrails */}
          <section className="mt-16">
            <h2 className="text-3xl text-bone-800">Harde guardrails</h2>
            <p className="mt-4 max-w-[40rem] font-body text-base leading-[1.7] text-bone-500">
              Geen enkele agent kan deze grenzen overschrijden, ongeacht instructies.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Geen pagina-verwijdering",
                "Geen URL- of slug-wijzigingen",
                "Geen bewerkingen die AI-crawlers of zoekbots blokkeren",
                "Geen verwijdering van canonical of hreflang-tags",
                "24-uur pauze na aankondiging van een Google-algoritme-update",
                "Dagelijkse actielimiet per site",
                "Elke actie gelogd met volledig diff en omkeerbaar binnen 30 dagen",
                "Geen bulk-AI-gegenereerde pagina's zonder redactionele review",
              ].map((guardrail) => (
                <li key={guardrail} className="flex items-start gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent-500"
                  >
                    <path
                      d="M3 8l3.5 3.5L13 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  <span className="font-body text-sm leading-[1.65] text-bone-600">
                    {guardrail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="mt-16 border-t border-bone-200 pt-10">
            <p className="font-body text-base text-bone-600">Klaar om te zien waar je nu staat?</p>
            <a
              href="/#audit"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-[6px] border border-accent-700 bg-accent-500 px-6 py-3 font-body text-sm font-medium text-bone-50 transition-all duration-150 hover:bg-accent-700 hover:-translate-y-px"
            >
              Vraag een gratis audit aan
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
