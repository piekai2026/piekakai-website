"use client";

/**
 * SignUpForm — Client Component.
 *
 * Role: interactive email+password registration form for /auth/sign-up.
 * Calls the `signUp` Server Action; surfaces errors inline.
 * Includes a password confirmation field (client-side validation only —
 * Supabase enforces length server-side).
 */

import { useActionState } from "react";
import { Button } from "@/components/Button";
import { type SignUpResult, signUp } from "./actions";

const initialState: SignUpResult | null = null;

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState<SignUpResult | null, FormData>(
    async (_prev, formData) => {
      const password = formData.get("password") as string;
      const confirm = formData.get("confirm_password") as string;

      if (password !== confirm) {
        return { ok: false, error: "Wachtwoorden komen niet overeen." };
      }
      if (password.length < 8) {
        return { ok: false, error: "Wachtwoord moet minimaal 8 tekens bevatten." };
      }

      const result = await signUp(formData);
      return result ?? null;
    },
    initialState,
  );

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* Error banner */}
      {state && !state.ok && (
        <div
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
          autoComplete="new-password"
          required
          placeholder="Minimaal 8 tekens"
          className="rounded-[4px] border border-bone-300 bg-bone-50 px-4 py-3 font-body text-sm text-bone-800 placeholder:text-bone-400 focus-visible:border-accent-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent-500 transition-colors duration-150"
        />
      </div>

      {/* Confirm password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirm_password" className="font-body text-sm font-medium text-bone-600">
          Herhaal wachtwoord
        </label>
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
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
        {isPending ? "Account aanmaken…" : "Account aanmaken"}
      </Button>
    </form>
  );
}
