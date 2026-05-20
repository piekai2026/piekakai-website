/**
 * /contact — Contact page with hello@piekai.nl.
 * Instruction: "Build /contact — contact page (hello@piekai.nl)."
 */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact — PiekAI",
  description:
    "Neem contact op met PiekAI via hello@piekai.nl. Vragen over het product, samenwerking, of early access.",
  openGraph: {
    title: "Contact — PiekAI",
    description: "Neem contact op met PiekAI via hello@piekai.nl.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main id="hoofdinhoud" className="flex-1">
        {/* Page header */}
        <section className="border-b border-bone-200 bg-bone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-20">
            <p className="font-mono text-xs tracking-wide text-accent-700">Contact</p>
            <h1 className="mt-4 text-4xl leading-tight text-bone-800 sm:text-5xl">
              Goed gesprek over <span className="block mt-1">AI-zichtbaarheid?</span>
            </h1>
            <p className="mt-5 max-w-[40rem] font-body text-lg leading-[1.65] text-bone-500">
              We reageren op werkdagen binnen 24 uur.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[720px] px-6 py-16 sm:px-12">
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Email */}
            <div className="rounded-[6px] border border-bone-200 bg-bone-50 p-8">
              <p className="font-mono text-xs text-bone-400">E-mail</p>
              <a
                href="mailto:hello@piekai.nl"
                className="mt-3 block font-mono text-base text-accent-700 transition-colors hover:text-accent-500"
              >
                hello@piekai.nl
              </a>
              <p className="mt-3 font-body text-sm leading-[1.65] text-bone-500">
                Voor product-vragen, samenwerking, early access en partnerships.
              </p>
            </div>

            {/* Gratis audit */}
            <div className="rounded-[6px] border border-bone-200 bg-bone-50 p-8">
              <p className="font-mono text-xs text-bone-400">Gratis audit</p>
              <h3 className="mt-3 text-base text-bone-800">Wil je weten waar je nu staat?</h3>
              <p className="mt-2 font-body text-sm leading-[1.65] text-bone-500">
                Vraag een gratis AI-zichtbaarheidsrapport aan. 90 seconden, geen verkoper.
              </p>
              <a
                href="/#audit"
                className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-accent-700 transition-colors hover:text-accent-500"
              >
                Audit aanvragen
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
          </div>

          {/* Context info */}
          <div className="mt-10 space-y-5 font-body text-base leading-[1.7] text-bone-600">
            <p>
              PiekAI is een product van AanloopAI, gevestigd in Rotterdam. We zijn bereikbaar op
              werkdagen van 09:00–18:00 CET.
            </p>
            <p>
              Voor urgente technische zaken (klanten in productie): vermeld{" "}
              <span className="font-mono text-sm text-bone-800">[URGENT]</span> in het onderwerp van
              je mail.
            </p>
          </div>

          {/* Social + Journal */}
          <div className="mt-10 border-t border-bone-200 pt-8">
            <p className="font-body text-sm font-medium text-bone-700">Volg PiekAI</p>
            <div className="mt-3 flex gap-4">
              <a
                href="https://linkedin.com/company/piekai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-bone-500 transition-colors hover:text-bone-800"
              >
                LinkedIn
              </a>
              <a
                href="/journal"
                className="font-body text-sm text-bone-500 transition-colors hover:text-bone-800"
              >
                Journal
              </a>
              <a
                href="/journal/rss.xml"
                className="font-body text-sm text-bone-500 transition-colors hover:text-bone-800"
              >
                RSS
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
