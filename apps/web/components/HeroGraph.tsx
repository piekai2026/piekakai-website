"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * HeroGraph — hand-coded animated SVG line graph (Approved motion #3).
 * A hairline line climbs from bottom-left to top-right; the final point
 * sits in accent green with a soft glow. The line draws itself once on
 * mount. Respects prefers-reduced-motion: when reduced, the line and
 * point render fully drawn with no animation.
 *
 * Coded directly (not exported from Figma) — lightweight, theme-able.
 */

const VIEW_W = 520;
const VIEW_H = 320;

/* Climbing path: bottom-left -> top-right, gently rising with small dips. */
const PATH_D = "M 24 280 L 110 248 L 188 256 L 262 196 L 338 168 L 414 108 L 488 44";
/* Final data point at the path's end. */
const PEAK = { x: 488, y: 44 };
/* Intermediate vertices for subtle hairline dot markers. */
const VERTICES = [
  { x: 110, y: 248 },
  { x: 188, y: 256 },
  { x: 262, y: 196 },
  { x: 338, y: 168 },
  { x: 414, y: 108 },
];

export function HeroGraph() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Een lijngrafiek die stijgt van linksonder naar rechtsboven, met het hoogste punt gemarkeerd."
    >
      <defs>
        <filter id="peak-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="area-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-500)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="var(--accent-500)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Hairline baseline + faint gridlines. */}
      <g stroke="var(--bone-200)" strokeWidth="1">
        <line x1="24" y1="280" x2="496" y2="280" />
        <line x1="24" y1="200" x2="496" y2="200" />
        <line x1="24" y1="120" x2="496" y2="120" />
      </g>

      {/* Soft area fill beneath the line. */}
      <motion.path
        d={`${PATH_D} L ${PEAK.x} 280 L 24 280 Z`}
        fill="url(#area-fade)"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduceMotion ? 0 : 1.4 }}
      />

      {/* The climbing hairline — draws itself on mount. */}
      <motion.path
        d={PATH_D}
        fill="none"
        stroke="var(--bone-400)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Intermediate vertex markers — subtle hairline dots. */}
      {VERTICES.map((v, i) => (
        <motion.circle
          key={`v-${v.x}`}
          cx={v.x}
          cy={v.y}
          r="3"
          fill="var(--bone-50)"
          stroke="var(--bone-400)"
          strokeWidth="1.25"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.3 + i * 0.25 }}
        />
      ))}

      {/* Final point — accent green with soft glow. */}
      <motion.circle
        cx={PEAK.x}
        cy={PEAK.y}
        r="7"
        fill="var(--accent-500)"
        filter="url(#peak-glow)"
        initial={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: reduceMotion ? 0 : 1.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${PEAK.x}px ${PEAK.y}px` }}
      />
      <circle cx={PEAK.x} cy={PEAK.y} r="2.5" fill="var(--bone-50)" />
    </svg>
  );
}
