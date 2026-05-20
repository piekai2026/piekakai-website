/**
 * lib/journal.ts — utilities for listing and loading Journal MDX posts.
 * Posts live in apps/web/content/journal/*.mdx.
 * Uses Node.js fs at build time (server-only; no client bundle impact).
 */
import fs from "node:fs";
import path from "node:path";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601 date string, e.g. "2026-05-20"
  author: string;
  draft: boolean;
  readingTime: number; // minutes, estimated
}

export interface Post extends PostMeta {
  /** File path, used internally for dynamic import. */
  filePath: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "journal");

/** Parse frontmatter from MDX file content (minimal, no external dep). */
function parseFrontmatter(source: string): Record<string, string | boolean | number> {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string | boolean | number> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const raw = line.slice(colonIdx + 1).trim();
    if (raw === "true") fm[key] = true;
    else if (raw === "false") fm[key] = false;
    else if (!Number.isNaN(Number(raw))) fm[key] = Number(raw);
    else fm[key] = raw.replace(/^["']|["']$/g, "");
  }
  return fm;
}

/** Estimate reading time: 200 words/min. */
function estimateReadingTime(source: string): number {
  const text = source.replace(/---[\s\S]*?---/, "").replace(/[#*`_[\]]/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Return all published (non-draft) posts, sorted newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts: Post[] = files
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, "");
      const filePath = path.join(CONTENT_DIR, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const fm = parseFrontmatter(source);

      return {
        slug,
        title: (fm.title as string) ?? slug,
        description: (fm.description as string) ?? "",
        date: (fm.date as string) ?? "2026-01-01",
        author: (fm.author as string) ?? "M. Dogan",
        draft: (fm.draft as boolean) ?? false,
        readingTime: estimateReadingTime(source),
        filePath,
      };
    })
    .filter((p) => !p.draft);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Return a single post's meta (or undefined if not found / is draft). */
export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Format a date string to Dutch long form, e.g. "20 mei 2026". */
export function formatDateNL(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00Z`);
  return date.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Amsterdam",
  });
}
