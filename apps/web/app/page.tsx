import { Differentiator } from "@/components/Differentiator";
import { FreeAuditCta } from "@/components/FreeAuditCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProblemStatement } from "@/components/ProblemStatement";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustSignals } from "@/components/TrustSignals";
import { VoiceTeaser } from "@/components/VoiceTeaser";

/* Schema.org Organization markup — helps both search and AI crawlers. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PiekAI",
  description:
    "Autonome AI-agent voor zichtbaarheid in Google en AI-zoekmachines. Een product van AanloopAI.",
  url: "https://piekai.nl",
  email: "hello@piekai.nl",
  foundingLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressLocality: "Rotterdam", addressCountry: "NL" },
  },
  parentOrganization: { "@type": "Organization", name: "AanloopAI" },
};

/**
 * Landing page — single-page, scroll-driven. The 8 Phase 0 sections in order.
 * Server Component; interactive/animated pieces are isolated Client Components.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, trusted JSON-LD — required for structured data.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <a
        href="#hoofdinhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[6px] focus:border focus:border-accent-700 focus:bg-accent-500 focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-bone-50"
      >
        Ga naar hoofdinhoud
      </a>

      <main id="hoofdinhoud" className="flex-1">
        {/* 1 — Hero */}
        <Hero />
        {/* 2 — Problem statement */}
        <ProblemStatement />
        {/* 3 — What PiekAI does */}
        <HowItWorks />
        {/* 4 — The differentiator */}
        <Differentiator />
        {/* 5 — Voice integration teaser */}
        <VoiceTeaser />
        {/* 6 — Trust signals */}
        <TrustSignals />
        {/* 7 — Free Audit CTA */}
        <FreeAuditCta />
      </main>

      {/* 8 — Footer */}
      <SiteFooter />
    </>
  );
}
