/**
 * SiteHeader — shared navigation for all inner pages (journal, over-ons, etc.).
 * Server Component. Reuses Wordmark and Button from the design system.
 * Per DESIGN_SYSTEM.md: restrained, premium, no heavy shadows.
 */
import { Button } from "./Button";
import { Wordmark } from "./Wordmark";

const NAV_LINKS = [
  { label: "Journal", href: "/journal" },
  { label: "Methodologie", href: "/methodologie" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "Over ons", href: "/over-ons" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-bone-200 bg-bone-50">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-12">
        <a href="/" aria-label="PiekAI — terug naar home">
          <Wordmark />
        </a>

        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-bone-500 transition-colors hover:text-bone-800"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="/#audit" size="md">
          Gratis audit
        </Button>
      </div>
    </header>
  );
}
