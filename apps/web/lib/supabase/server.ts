/**
 * Server-side Supabase client (App Router / RSC compatible).
 *
 * Role: creates a Supabase client that reads and writes cookies via the
 * Next.js `cookies()` API (async, React 19 / Next.js 16 pattern).
 * Must only be called inside Server Components, Server Actions, or
 * Route Handlers — never in client components.
 *
 * Usage:
 *   const supabase = await createClient();
 *   const { data: { user } } = await supabase.auth.getUser();
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    // biome-ignore lint/style/noNonNullAssertion: required env vars — app won't start without them
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: required env vars — app won't start without them
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll is called from Server Components where cookies are
            // read-only. Middleware handles the actual refresh — safe to ignore.
          }
        },
      },
    },
  );
}
