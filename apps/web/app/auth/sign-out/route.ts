/**
 * /auth/sign-out — Route Handler (POST + GET).
 *
 * Role: sign the current user out via Supabase Auth and redirect to the
 * home page. Accepts both POST (from a `<form method="post">` button) and
 * GET (direct link / JS fetch) for maximum compatibility.
 *
 * After signOut() the Supabase session cookie is cleared by the client;
 * the middleware will then see an anonymous request on subsequent pages.
 */

import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function handleSignOut(_req: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export { handleSignOut as GET, handleSignOut as POST };
