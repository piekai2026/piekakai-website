/**
 * /prijzen — Teaser pricing page. Full reveal Phase 3.
 * Tiers from VISION.md: Starter €497, Growth €997, Scale €1997, Enterprise custom.
 * Instruction: "Build /prijzen — teaser pricing (VISION.md pricing tiers — present as teaser, full reveal Phase 3)."
 */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Prijzen — PiekAI",
  description:
    "PiekAI-abonnementen vanaf €497/maand. Starter, Growth, Scale en Enterprise. Volledige prijsopbouw beschikbaar bij de lancering.",
  openGraph: {
    title: "Prijzen — PiekAI",
    description: "Abonnementen vanaf €497/maand. Volledige details bij lancering.",
    type: "website",
    locale: "nl_NL",
  },
};

const TIERS = [
  {
    name: "Starter",
    price: "€497",
    period: "/maand",
    tagline: "Eén site. Serieuze start.",
    features: [
      "1 site",
      "~50 zoekwoorden gevolgd",
      "Tier 1 of 2 autonomie",
      "Maandelijkse rapportage",
      "AI-zichtbaarheid: 5 engines",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "€997",
    period: "/maand",
    tagline: "Drie sites. Alle engines. Stem erbij.",
    features: [
      "3 sites",
      "~150 zoekwoorden gevolgd",
      "Alle tiers beschikbaar",
      "Concurrentietracking",
      "Voice-integratie (fase 2)",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    price: "€1.997",
    period: "/maand",
    tagline: "Vijf sites. Dedicated success.",
    features: [
      "5 sites",
      "~500 zoekwoorden gevolgd",
      "Dedicated customer success",
      "Custom integraties",
      "SLA 99,9%",
      "Maatwerk rapportage",
    ],
    highlight: false,
  },
];

export default function PrijzenPage() {
  return (
    <>
      <SiteHeader />

      <main id="hoofdinhoud" className="flex-1">
        {/* Page header */}
        <section className="border-b border-bone-200 bg-bone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-20">
            <p className="font-mono text-xs tracking-wide text-accent-700">Prijzen</p>
            <h1 className="mt-4 text-4xl leading-tight text-bone-800 sm:text-5xl">
              AI doet het werk. <span className="block mt-1">Wij meten de omzet.</span>
            </h1>
            <p className="mt-5 max-w-[40rem] font-body text-lg leading-[1.65] text-bone-500">
              PiekAI is een abonnementsproduct. Geen setup-kosten, geen contracten. De volledige
              prijsopbouw volgt bij de officiële lancering.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-[6px] border border-bone-200 bg-bone-100 px-4 py-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
              <p className="font-mono text-xs text-bone-600">
                Early access — prijzen en features kunnen wijzigen voor lancering
              </p>
            </div>
          </div>
        </section>

        {/* Pricing grid */}
        <section className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-[6px] border p-8 ${
                  tier.highlight
                    ? "border-accent-500 bg-bone-50 shadow-md"
                    : "border-bone-200 bg-bone-50"
                }`}
              >
                {tier.highlight && (
                  <div
                    className="absolute -top-px left-6 right-6 h-px bg-accent-500"
                    aria-hidden="true"
                  />
                )}

                <p className="font-mono text-xs text-bone-500">{tier.name}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-medium text-bone-800">{tier.price}</span>
                  <span className="font-body text-sm text-bone-500">{tier.period}</span>
                </div>
                <p className="mt-2 font-body text-sm text-bone-500">{tier.tagline}</p>

                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-accent-500"
                      >
                        <path
                          d="M2.5 7l3 3L11.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                      <span className="font-body text-sm text-bone-600">{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:hello@piekai.nl?subject=Interesse%20PiekAI"
                  className={`mt-8 block w-full rounded-[6px] border py-2.5 text-center font-body text-sm font-medium transition-all duration-150 ${
                    tier.highlight
                      ? "border-accent-700 bg-accent-500 text-bone-50 hover:bg-accent-700 hover:-translate-y-px"
                      : "border-bone-300 text-bone-800 hover:border-bone-500 hover:bg-bone-100"
                  }`}
                >
                  Interesse? Meld je aan
                </a>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-8 rounded-[6px] border border-bone-200 bg-bone-50 p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs text-bone-500">Enterprise</p>
                <h2 className="mt-2 text-xl text-bone-800">Maatwerk voor grote organisaties</h2>
                <p className="mt-2 font-body text-sm leading-[1.65] text-bone-500">
                  Data-soevereiniteit, sectorale compliance-modules, white-label, ISO 27001. Prijzen
                  op aanvraag (€2.500–15.000/maand).
                </p>
              </div>
              <a
                href="mailto:hello@piekai.nl?subject=Enterprise%20PiekAI"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-[6px] border border-bone-300 px-6 py-2.5 font-body text-sm font-medium text-bone-800 transition-all duration-150 hover:border-bone-500 hover:bg-bone-100"
              >
                Neem contact op
              </a>
            </div>
          </div>

          {/* FAQ teaser */}
          <div className="mt-12">
            <h2 className="text-2xl text-bone-800">Veelgestelde vragen</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  q: "Wanneer is PiekAI beschikbaar?",
                  a: "We zijn nu in gesloten early access. Schrijf je in via hello@piekai.nl om als eerste op de hoogte te zijn.",
                },
                {
                  q: "Zijn er contracten?",
                  a: "Nee. Maand-op-maand, opzegbaar per direct.",
                },
                {
                  q: "Werkt PiekAI met elk CMS?",
                  a: "Bij lancering: WordPress, GitHub (statische sites), Sanity. Uitbreiding volgt op basis van klantbehoefte.",
                },
                {
                  q: "Is mijn data veilig?",
                  a: "Alle data wordt verwerkt en opgeslagen in Europa. AVG-compliant by design. We verkopen nooit klantdata.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-[6px] border border-bone-200 bg-bone-50 p-6">
                  <p className="font-body text-sm font-medium text-bone-800">{q}</p>
                  <p className="mt-2 font-body text-sm leading-[1.65] text-bone-500">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
