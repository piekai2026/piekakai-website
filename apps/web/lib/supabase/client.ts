/**
 * Browser-side Supabase client.
 *
 * Role: thin wrapper around createBrowserClient from @supabase/ssr.
 * Reads NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY at runtime.
 * Call once per component tree; memoised by @supabase/ssr internally.
 *
 * Usage in Client Components:
 *   const supabase = createClient();
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    // biome-ignore lint/style/noNonNullAssertion: required env vars — app won't start without them
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: required env vars — app won't start without them
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
