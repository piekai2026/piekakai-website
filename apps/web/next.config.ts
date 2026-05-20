import createMDX from "@next/mdx";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

/*
 * @next/mdx — enables .mdx as page components.
 * Remark/rehype plugins are NOT passed here because Turbopack (Next.js 16 default)
 * requires serializable loader options. Instead, plugins are applied per-render
 * inside the next-mdx-remote/rsc call in app/journal/[slug]/page.tsx.
 */
const withMDX = createMDX({});

const nextConfig: NextConfig = {
  /* Allow .mdx extensions as pages/components. */
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);

// Makes Cloudflare bindings available during `next dev` via the OpenNext adapter.
initOpenNextCloudflareForDev();
