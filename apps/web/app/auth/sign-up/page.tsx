import type { Metadata } from "next";
import { Wordmark } from "@/components/Wordmark";
import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = {
  title: "Account aanmaken — PiekAI",
  description: "Maak een PiekAI-account aan.",
  robots: { index: false, follow: false },
};

/**
 * /auth/sign-up — new account registration page.
 *
 * Server Component wrapper; the interactive form is a Client Component.
 * Styled per DESIGN_SYSTEM.md: bone background, forest-green accent,
 * Cormorant Garamond headings, Inter body.
 */
export default function SignUpPage() {
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
            Account aanmaken
          </h1>
          <p className="font-body text-sm text-bone-500 mb-8">
            Registreer je met e-mailadres en wachtwoord om te beginnen.
          </p>

          <SignUpForm />
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center font-body text-sm text-bone-500">
          Al een account?{" "}
          <a
            href="/auth/sign-in"
            className="text-accent-500 hover:text-accent-700 underline underline-offset-2 transition-colors duration-150"
          >
            Log in hier
          </a>
        </p>
      </div>
    </div>
  );
}
