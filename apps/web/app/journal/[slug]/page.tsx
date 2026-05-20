/**
 * /journal/[slug] — Individual post page.
 * Reads MDX from content/journal/{slug}.mdx, compiles server-side via next-mdx-remote/rsc.
 * Code blocks styled bone-900 per DESIGN_SYSTEM.md.
 * Instruction: "Build /journal/[slug] post template — MDX content, Shiki code highlighting."
 */

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatDateNL, getAllPosts, getPostBySlug } from "@/lib/journal";
import { useMDXComponents } from "@/mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — PiekAI Journal`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "nl_NL",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const filePath = path.join(process.cwd(), "content", "journal", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const source = fs.readFileSync(filePath, "utf-8");
  /* Strip frontmatter before passing to MDXRemote. */
  const content = source.replace(/^---\n[\s\S]*?\n---\n/, "");

  const components = useMDXComponents({});

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "PiekAI",
      url: "https://piekai.nl",
    },
  };

  return (
    <>
      <SiteHeader />

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static trusted JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main id="hoofdinhoud" className="flex-1">
        {/* Post header */}
        <header className="border-b border-bone-200 bg-bone-50">
          <div className="mx-auto max-w-[720px] px-6 py-12 sm:px-12 sm:py-16">
            <a
              href="/journal"
              className="inline-flex items-center gap-1.5 font-body text-sm text-bone-500 transition-colors hover:text-bone-800"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M11 7H3M6 10L3 7l3-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              Journal
            </a>

            <h1 className="mt-6 text-4xl leading-tight text-bone-800 sm:text-5xl">{post.title}</h1>

            {post.description && (
              <p className="mt-4 font-body text-lg leading-[1.65] text-bone-500">
                {post.description}
              </p>
            )}

            <div className="mt-6 flex items-center gap-4 font-mono text-xs text-bone-500">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDateNL(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min leestijd</span>
            </div>
          </div>
        </header>

        {/* Post body */}
        <article className="mx-auto max-w-[720px] px-6 py-12 sm:px-12 sm:py-16">
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </article>

        {/* Post footer — back link + CTA */}
        <div className="border-t border-bone-200 bg-bone-100">
          <div className="mx-auto max-w-[720px] px-6 py-10 sm:px-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-body text-sm font-medium text-bone-700">Meer lezen?</p>
                <a
                  href="/journal"
                  className="font-body text-sm text-bone-500 transition-colors hover:text-bone-800 underline underline-offset-2"
                >
                  Terug naar het Journal
                </a>
              </div>
              <a
                href="/#audit"
                className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-accent-700 bg-accent-500 px-6 py-2.5 font-body text-sm font-medium text-bone-50 transition-all duration-150 hover:bg-accent-700 hover:-translate-y-px"
              >
                Vraag een gratis audit aan
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
