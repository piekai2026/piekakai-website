import type { Metadata } from "next";
import { Wordmark } from "@/components/Wordmark";
import { SignInForm } from "./SignInForm";

export const metadata: Metadata = {
  title: "Inloggen — PiekAI",
  description: "Log in op je PiekAI-dashboard.",
  robots: { index: false, follow: false },
};

/**
 * /auth/sign-in — email + password login page.
 *
 * Server Component wrapper; the interactive form is a Client Component.
 * Styled per DESIGN_SYSTEM.md: bone background, forest-green accent,
 * Cormorant Garamond headings, Inter body, restrained layout.
 */
export default function SignInPage() {
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
        <div className="bg-bone-50 border border-bone-200 rounded-[6px] px-8 py-10">
          <h1 className="font-display text-[28px] leading-[36px] text-bone-700 tracking-[-0.02em] mb-2">
            Welkom terug
          </h1>
          <p className="font-body text-sm text-bone-500 mb-8">
            Log in met je e-mailadres en wachtwoord.
          </p>

          <SignInForm />
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center font-body text-sm text-bone-500">
          Nog geen account?{" "}
          <a
            href="/auth/sign-up"
            className="text-accent-500 hover:text-accent-700 underline underline-offset-2 transition-colors duration-150"
          >
            Registreer je hier
          </a>
        </p>
      </div>
    </div>
  );
}
