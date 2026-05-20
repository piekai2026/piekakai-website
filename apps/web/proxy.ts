/**
 * Next.js proxy (was: middleware) — runs on every matching request.
 *
 * Role: refresh the Supabase session (rotate the access-token cookie when
 * it is near expiry). This keeps Server Components from seeing a stale or
 * missing session. The supabase-js library handles the refresh silently;
 * we just need to call getUser() on each request so the cookies are
 * updated in the response.
 *
 * Named "proxy" per Next.js 16 convention (previously "middleware").
 * Matcher: all routes EXCEPT static assets, images, and the Next.js
 * internals (/_next/*). The auth routes themselves (/auth/sign-in etc.)
 * are included so a freshly signed-in user gets their session cookie
 * immediately.
 */

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    // biome-ignore lint/style/noNonNullAssertion: required env vars — app won't start without them
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: required env vars — app won't start without them
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // First pass: update the request cookies so subsequent proxy
          // reads are consistent.
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          // Rebuild the response so Next.js forwards the updated cookies.
          supabaseResponse = NextResponse.next({ request });
          // Second pass: write cookies into the outgoing response.
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // IMPORTANT: do NOT add any logic between createServerClient and
  // getUser(). The session is refreshed as a side-effect of getUser().
  // Skipping it causes session tokens to expire silently.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *  - _next/static  (static files)
     *  - _next/image   (image optimisation)
     *  - favicon.ico, sitemap.xml, robots.txt
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
