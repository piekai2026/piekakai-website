"use server";

/**
 * Server Actions for the sign-up page.
 *
 * Role: handle new account creation via Supabase Auth (email + password).
 * Returns a discriminated union; on success the user is redirected to a
 * confirmation page asking them to verify their email.
 */

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SignUpResult = { ok: false; error: string };

export async function signUp(formData: FormData): Promise<SignUpResult | never> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    // Supabase returns a generic message for existing accounts to prevent
    // user enumeration. Surface a friendly Dutch message.
    return { ok: false, error: "Registratie mislukt. Controleer je gegevens en probeer opnieuw." };
  }

  redirect("/auth/sign-up/bevestig");
}
