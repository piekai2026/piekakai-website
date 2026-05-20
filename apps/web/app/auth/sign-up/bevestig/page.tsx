import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Bevestig je e-mail — PiekAI",
  description: "Controleer je inbox om je PiekAI-account te activeren.",
  robots: { index: false, follow: false },
};

/**
 * /auth/sign-up/bevestig — email confirmation instruction page.
 *
 * Shown after a successful signUp() call. Supabase sends a verification
 * email; the user clicks the link which lands them on the Supabase
 * callback URL, then they are redirected to the dashboard.
 *
 * No interactivity needed — static Server Component.
 */
export default function BevestigPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bone-50 px-6 py-16">
      <div className="w-full max-w-[440px]">
        {/* Wordmark */}
        <div className="mb-10 flex justify-center">
          <a href="/" aria-label="Terug naar PiekAI homepagina">
            <Wordmark />
          </a>
        </div>

        {/* Card */}
        <div className="bg-bone-50 border border-bone-200 rounded-[6px] px-8 py-10 text-center">
          {/* Icon: envelope */}
          <div
            aria-hidden="true"
            className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-bone-200 bg-bone-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-accent-500"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>

          <h1 className="font-display text-[28px] leading-[36px] text-bone-700 tracking-[-0.02em] mb-3">
            Controleer je inbox
          </h1>
          <p className="font-body text-sm text-bone-500 mb-8 leading-relaxed">
            We hebben een bevestigingslink gestuurd naar je e-mailadres. Klik op de link om je
            account te activeren.
          </p>

          <Button href="/auth/sign-in" variant="secondary" size="md" className="w-full">
            Terug naar inloggen
          </Button>
        </div>

        <p className="mt-6 text-center font-body text-xs text-bone-400">
          Geen e-mail ontvangen? Controleer je spamfolder of{" "}
          <a
            href="/auth/sign-up"
            className="text-bone-500 hover:text-bone-700 underline underline-offset-2 transition-colors duration-150"
          >
            probeer opnieuw
          </a>
          .
        </p>
      </div>
    </div>
  );
}
