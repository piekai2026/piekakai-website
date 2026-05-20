/**
 * mdx-components.tsx — required by @next/mdx for App Router.
 * Maps raw MDX elements to styled PiekAI design-system components.
 * Per DESIGN_SYSTEM.md: code blocks use bone-900 bg, vesper-like warm coloring.
 */
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    /* Headings — display serif per design system. */
    h1: ({ children }) => (
      <h1 className="font-display text-4xl font-[400] leading-tight text-bone-800 mt-12 mb-6 tracking-[-0.02em]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-3xl font-[400] leading-tight text-bone-800 mt-10 mb-4 tracking-[-0.02em]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl font-[400] leading-snug text-bone-700 mt-8 mb-3 tracking-[-0.02em]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-xl font-[400] leading-snug text-bone-700 mt-6 mb-2 tracking-[-0.02em]">
        {children}
      </h4>
    ),

    /* Body — generous line-height, premium feel. */
    p: ({ children }) => (
      <p className="font-body text-base leading-[1.7] text-bone-600 mb-6">{children}</p>
    ),

    /* Lists. */
    ul: ({ children }) => (
      <ul className="font-body text-base leading-[1.7] text-bone-600 mb-6 list-disc pl-6 space-y-1.5">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="font-body text-base leading-[1.7] text-bone-600 mb-6 list-decimal pl-6 space-y-1.5">
        {children}
      </ol>
    ),

    /* Blockquote — subtle left border in accent. */
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-500 pl-6 my-6 text-bone-500 italic font-body text-base leading-[1.7]">
        {children}
      </blockquote>
    ),

    /* Links. */
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent-700 underline underline-offset-2 decoration-accent-300 hover:text-accent-500 transition-colors"
      >
        {children}
      </a>
    ),

    /* Inline code — mono, subtle background. */
    code: ({ children }) => (
      <code className="font-mono text-sm bg-bone-100 text-bone-800 rounded-sm px-1.5 py-0.5 border border-bone-200">
        {children}
      </code>
    ),

    /* Code block — bone-900 background per DESIGN_SYSTEM. */
    pre: ({ children }) => (
      <pre className="font-mono text-sm bg-bone-900 text-bone-100 rounded-[6px] p-6 my-6 overflow-x-auto leading-relaxed">
        {children}
      </pre>
    ),

    /* Horizontal rule. */
    hr: () => <hr className="border-none border-t border-bone-200 my-10" />,

    /* Strong — use weight, not italic, per design system. */
    strong: ({ children }) => <strong className="font-medium text-bone-800">{children}</strong>,

    /* Tables. */
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm text-bone-600 border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left font-medium text-bone-700 px-4 py-2.5 border-b border-bone-200 bg-bone-100">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="px-4 py-2.5 border-b border-bone-200">{children}</td>,

    ...components,
  };
}
