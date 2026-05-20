"use client";

/**
 * SignInForm — Client Component.
 *
 * Role: interactive email+password form for /auth/sign-in.
 * Calls the `signIn` Server Action; surfaces errors without full page reload.
 * Styled per DESIGN_SYSTEM.md inputs + Button spec.
 */

import { useActionState } from "react";
import { Button } from "@/components/Button";
import { type SignInResult, signIn } from "./actions";

const initialState: SignInResult | null = null;

export function SignInForm() {
  const [state, formAction, isPending] = useActionState<SignInResult | null, FormData>(
    async (_prev, formData) => {
      const result = await signIn(formData);
      return result ?? null;
    },
    initialState,
  );

  const hasError = !!state && !state.ok;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* Error banner */}
      {hasError && (
        <div
          id="signin-error"
          role="alert"
          className="rounded-[4px] border border-danger bg-danger/5 px-4 py-3 font-body text-sm text-danger"
        >
          {state.error}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-body text-sm font-medium text-bone-600">
          E-mailadres
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="jij@bedrijf.nl"
          aria-invalid={hasError ? true : undefined}
          aria-describedby={hasError ? "signin-error" : undefined}
          className="rounded-[4px] border border-bone-300 bg-bone-50 px-4 py-3 font-body text-sm text-bone-800 placeholder:text-bone-400 focus-visible:border-accent-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent-500 transition-colors duration-150"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-body text-sm font-medium text-bone-600">
          Wachtwoord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          aria-invalid={hasError ? true : undefined}
          aria-describedby={hasError ? "signin-error" : undefined}
          className="rounded-[4px] border border-bone-300 bg-bone-50 px-4 py-3 font-body text-sm text-bone-800 placeholder:text-bone-400 focus-visible:border-accent-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent-500 transition-colors duration-150"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isPending}
        className="w-full mt-1"
      >
        {isPending ? "Bezig met inloggen…" : "Inloggen"}
      </Button>
    </form>
  );
}
