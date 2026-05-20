"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reveal — staggered fade-in on scroll (Approved motion pattern #2).
 * Fades + lifts content into view once. Respects prefers-reduced-motion:
 * when reduced, content renders immediately with no transform.
 */

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  /** Render as a different element (default div). */
  as?: "div" | "li" | "section";
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  /*
   * `reveal-anim` lets a <noscript> stylesheet (see app/layout.tsx) force
   * content visible when JS is disabled — without it the SSR'd initial
   * `opacity: 0` would leave content permanently invisible for no-JS users.
   */
  return (
    <MotionTag
      className={className ? `${className} reveal-anim` : "reveal-anim"}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
}
