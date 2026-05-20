import { Wordmark } from "./Wordmark";

/**
 * SiteFooter — section 8. Contact, AanloopAI attribution, placeholder
 * legal links (Privacy / Terms / Cookies — real pages land Phase 1).
 */

const LEGAL_LINKS = [
  { label: "Privacybeleid", href: "/privacy" },
  { label: "Algemene voorwaarden", href: "/voorwaarden" },
  { label: "Cookies", href: "/cookies" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bone-50">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-[32ch] font-body text-sm leading-relaxed text-bone-500">
              Een autonome AI-agent die jouw bedrijf naar #1 brengt — en daar houdt.
            </p>
            <a
              href="mailto:hello@piekai.nl"
              className="mt-4 inline-block font-mono text-sm text-accent-700 transition-colors hover:text-accent-500"
            >
              hello@piekai.nl
            </a>
          </div>

          <nav aria-label="Juridisch" className="flex flex-col gap-2.5">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-bone-500 transition-colors hover:text-bone-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-bone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-bone-400">
            &copy; {year} PiekAI — een product van AanloopAI.
          </p>
          <p className="font-body text-sm text-bone-400">Gebouwd in Rotterdam. Data in de EU.</p>
        </div>
      </div>
    </footer>
  );
}
