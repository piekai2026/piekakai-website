/**
 * app/not-found.tsx — Branded 404 page.
 * Next.js App Router convention: rendered for 404 responses.
 * Instruction: "Branded 404 (not-found.tsx) and 500 (error.tsx) pages."
 */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Pagina niet gevonden — PiekAI",
  description: "Deze pagina bestaat niet of is verplaatst.",
};

export default function NotFoundPage() {
  return (
    <>
      <SiteHeader />

      <main id="hoofdinhoud" className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-[480px] px-6 py-20 text-center sm:px-12">
          <p className="font-mono text-sm text-accent-700">404</p>
          <h1 className="mt-4 text-4xl leading-tight text-bone-800">Pagina niet gevonden.</h1>
          <p className="mt-5 font-body text-base leading-[1.7] text-bone-500">
            Deze pagina bestaat niet of is verplaatst. Misschien is een van de links hieronder wat
            je zoekt.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-accent-700 bg-accent-500 px-6 py-2.5 font-body text-sm font-medium text-bone-50 transition-all duration-150 hover:bg-accent-700 hover:-translate-y-px"
            >
              Terug naar home
            </a>
            <a
              href="/journal"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-bone-300 px-6 py-2.5 font-body text-sm font-medium text-bone-800 transition-all duration-150 hover:border-bone-500 hover:bg-bone-50"
            >
              Bekijk het Journal
            </a>
          </div>

          <nav aria-label="Nuttige links" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { label: "Over ons", href: "/over-ons" },
                { label: "Methodologie", href: "/methodologie" },
                { label: "Prijzen", href: "/prijzen" },
                { label: "Contact", href: "/contact" },
                { label: "Status", href: "/status" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-bone-400 transition-colors hover:text-bone-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
