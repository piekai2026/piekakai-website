/**
 * /over-ons — M's story + AanloopAI relationship.
 * Content from VISION.md + PHASE_0_PLAN.md. Server Component.
 * Instruction: "Build /over-ons — M's story + AanloopAI relationship (use VISION.md; founder context)."
 */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Over ons — PiekAI",
  description:
    "PiekAI is gebouwd door M. Dogan vanuit Rotterdam. Het verhaal achter het product en de relatie met AanloopAI.",
  openGraph: {
    title: "Over ons — PiekAI",
    description: "Het verhaal achter PiekAI en AanloopAI.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function OverOnsPage() {
  return (
    <>
      <SiteHeader />

      <main id="hoofdinhoud" className="flex-1">
        {/* Page header */}
        <section className="border-b border-bone-200 bg-bone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-20">
            <p className="font-mono text-xs tracking-wide text-accent-700">Over ons</p>
            <h1 className="mt-4 text-4xl leading-tight text-bone-800 sm:text-5xl">
              Voor wie het serieus meent.
            </h1>
            <p className="mt-5 max-w-[40rem] font-body text-lg leading-[1.65] text-bone-500">
              PiekAI is gebouwd door iemand die het probleem al jaren van dichtbij ziet.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-[720px] px-6 py-16 sm:px-12">
          <div className="space-y-8 font-body text-base leading-[1.7] text-bone-600">
            <p>
              Ik ben M. Dogan, oprichter van PiekAI en AanloopAI. Ik werk vanuit Rotterdam en bouw
              digitale systemen voor ondernemers die serieuze groeidoelstellingen hebben.
            </p>

            <p>
              De afgelopen jaren heb ik aan tientallen projecten gewerkt waarbij zichtbaarheid in
              Google het verschil maakte tussen groeien en stilstaan. Maar de afgelopen twee jaar
              merkte ik iets nieuws: steeds meer klanten kwamen via een AI-engine in plaats van
              Google. Via ChatGPT. Via Gemini. Via Perplexity.
            </p>

            <p>
              De tools die ik gebruikte — Ahrefs, Semrush, zelfs de nieuwere GEO-tools — konden die
              wereld maar gedeeltelijk meten. En geen enkel tool kon er daadwerkelijk iets aan{" "}
              <em>doen</em> zonder mijn directe betrokkenheid.
            </p>

            <p>Dat is waarom ik PiekAI bouw. Niet als rapport. Als operatie.</p>
          </div>

          {/* AanloopAI relationship */}
          <div className="mt-14 rounded-[6px] border border-bone-200 bg-bone-100 px-8 py-8">
            <h2 className="text-2xl text-bone-800">Een product van AanloopAI</h2>
            <p className="mt-4 font-body text-base leading-[1.7] text-bone-600">
              PiekAI is ontwikkeld onder de vlag van AanloopAI — mijn bestaande digitaal bureau dat
              al actief is voor Nederlandse ondernemers in marketing, automatisering en
              webontwikkeling. AanloopAI is de productiebasis; PiekAI is het gespecialiseerde
              product voor zichtbaarheid in het AI-tijdperk.
            </p>
            <p className="mt-4 font-body text-base leading-[1.7] text-bone-600">
              Dit betekent dat PiekAI niet wordt gebouwd door een startup die op zoek is naar
              product-market fit in het luchtledige. Het is gebouwd door een team dat het werk zelf
              doet — en de tool bouwt die ze zelf willen gebruiken.
            </p>
            <a
              href="https://aanloopai.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-medium text-accent-700 transition-colors hover:text-accent-500"
            >
              Meer over AanloopAI
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
          </div>

          {/* Values */}
          <div className="mt-14">
            <h2 className="text-2xl text-bone-800">Wat we geloven</h2>
            <ul className="mt-6 space-y-5">
              {[
                {
                  title: "Transparantie boven magie",
                  body: "Elke actie die PiekAI uitvoert is gelogd, traceerbaar en omkeerbaar. Geen black box.",
                },
                {
                  title: "EU-first by design",
                  body: "Data blijft in Europa. AVG-compliant van de eerste regel code. Geen compromissen.",
                },
                {
                  title: "Kwaliteit boven snelheid",
                  body: "PiekAI publiceert geen pagina die niet door een kwaliteitscheck is. Autonomie betekent geen rommeltje.",
                },
                {
                  title: "Gebouwd in Rotterdam",
                  body: "Een klein, serieus team dat precies weet wat het bouwt.",
                },
              ].map(({ title, body }) => (
                <li key={title} className="flex gap-4">
                  <div
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-body text-sm font-medium text-bone-800">{title}</p>
                    <p className="mt-1 font-body text-sm leading-[1.65] text-bone-500">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="mt-14 border-t border-bone-200 pt-10">
            <p className="font-body text-base text-bone-600">
              Wil je meer weten, samenwerken, of gewoon een goed gesprek over AI-zichtbaarheid?
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@piekai.nl"
                className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-accent-700 bg-accent-500 px-6 py-2.5 font-body text-sm font-medium text-bone-50 transition-all duration-150 hover:bg-accent-700 hover:-translate-y-px"
              >
                Stuur een mail
              </a>
              <a
                href="/#audit"
                className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-bone-300 px-6 py-2.5 font-body text-sm font-medium text-bone-800 transition-all duration-150 hover:border-bone-500 hover:bg-bone-50"
              >
                Gratis audit aanvragen
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
