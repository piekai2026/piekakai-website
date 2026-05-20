"use server";

/**
 * Server Actions for the sign-in page.
 *
 * Role: handle email+password login via Supabase Auth (server-side).
 * Returns a discriminated union so the client can branch without
 * catching exceptions.
 */

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SignInResult = { ok: false; error: string };

export async function signIn(formData: FormData): Promise<SignInResult | never> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, error: "E-mailadres of wachtwoord is onjuist." };
  }

  redirect("/dashboard");
}
