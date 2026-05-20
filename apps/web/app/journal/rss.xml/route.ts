/**
 * /journal/rss.xml — RSS 2.0 feed for PiekAI Journal.
 * Instruction: "RSS feed at /journal/rss.xml."
 */
import { getAllPosts } from "@/lib/journal";

const SITE_URL = "https://piekai.nl";

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${SITE_URL}/journal/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/journal/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <author>hello@piekai.nl (${post.author})</author>
    </item>`,
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PiekAI Journal</title>
    <description>Bouwen in het openbaar: SEO, GEO, en autonome AI-agents.</description>
    <link>${SITE_URL}/journal</link>
    <atom:link href="${SITE_URL}/journal/rss.xml" rel="self" type="application/rss+xml" />
    <language>nl</language>
    <copyright>PiekAI — een product van AanloopAI</copyright>
    <lastBuildDate>${posts[0] ? new Date(`${posts[0].date}T12:00:00Z`).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
