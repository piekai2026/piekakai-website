/**
 * /journal — Index page listing all published MDX posts.
 * Server Component. Design system: bone palette, display serif headings.
 * Instruction: "Build /journal index page — lists posts, MDX-powered."
 */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatDateNL, getAllPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "PiekAI Journal — Bouwen in het openbaar",
  description:
    "M. Dogan schrijft over SEO, GEO, autonome agents, en het bouwen van PiekAI. Geen theorie — echte cases, echte data.",
  openGraph: {
    title: "PiekAI Journal",
    description: "Bouwen in het openbaar: SEO, GEO, en autonome AI-agents.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function JournalIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />

      <main id="hoofdinhoud" className="flex-1">
        {/* Page header */}
        <section className="border-b border-bone-200 bg-bone-50">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12 sm:py-20">
            <p className="font-mono text-xs tracking-wide text-accent-700">Journal</p>
            <h1 className="mt-4 text-4xl leading-tight text-bone-800 sm:text-5xl">
              Bouwen in het openbaar.
            </h1>
            <p className="mt-5 max-w-[40rem] font-body text-lg leading-[1.65] text-bone-500">
              Hoe PiekAI gebouwd wordt. Wat er werkt in SEO en GEO in 2026. En wat niet. Echte
              cases, eerlijke lessen.
            </p>
          </div>
        </section>

        {/* Post list */}
        <section className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12">
          {posts.length === 0 ? (
            <p className="font-body text-base text-bone-500">
              Eerste post komt snel. Abonneer via{" "}
              <a
                href="/journal/rss.xml"
                className="text-accent-700 underline underline-offset-2 hover:text-accent-500"
              >
                RSS
              </a>
              .
            </p>
          ) : (
            <ol className="divide-y divide-bone-200">
              {posts.map((post) => (
                <li key={post.slug} className="py-8 first:pt-0 last:pb-0">
                  <article>
                    <a
                      href={`/journal/${post.slug}`}
                      className="group block"
                      aria-label={post.title}
                    >
                      <div className="flex items-baseline gap-4">
                        <time
                          dateTime={post.date}
                          className="shrink-0 font-mono text-xs text-bone-500"
                        >
                          {formatDateNL(post.date)}
                        </time>
                        <span className="font-mono text-xs text-bone-400" aria-hidden="true">
                          ·
                        </span>
                        <span className="font-mono text-xs text-bone-500">
                          {post.readingTime} min
                        </span>
                      </div>

                      <h2 className="mt-3 text-2xl text-bone-800 transition-colors group-hover:text-accent-700">
                        {post.title}
                      </h2>

                      {post.description && (
                        <p className="mt-2 font-body text-base leading-[1.65] text-bone-500">
                          {post.description}
                        </p>
                      )}

                      <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-accent-700 transition-colors group-hover:text-accent-500">
                        Lees meer
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          aria-hidden="true"
                          className="translate-y-px transition-transform group-hover:translate-x-0.5"
                        >
                          <path
                            d="M3 7h8M8 4l3 3-3 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                    </a>
                  </article>
                </li>
              ))}
            </ol>
          )}

          {/* RSS link */}
          <div className="mt-12 border-t border-bone-200 pt-6">
            <a
              href="/journal/rss.xml"
              className="inline-flex items-center gap-2 font-body text-sm text-bone-500 transition-colors hover:text-bone-800"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <circle cx="3" cy="11" r="1.5" fill="currentColor" />
                <path
                  d="M2 7.5A4.5 4.5 0 0 1 9.5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M2 3.5A8.5 8.5 0 0 1 13.5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              Abonneer via RSS
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
