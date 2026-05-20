"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * CountUp — counts a number up from 0 to `value` on first view only
 * (Approved motion pattern #4). Respects prefers-reduced-motion: when
 * reduced, the final value renders immediately.
 *
 * Dutch number formatting: thousands separator is a dot (12.847).
 */

type CountUpProps = {
  value: number;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
  /** Text appended after the number, e.g. "%". */
  suffix?: string;
  /** Text prepended before the number. */
  prefix?: string;
};

function formatNL(n: number): string {
  return Math.round(n).toLocaleString("nl-NL");
}

export function CountUp({
  value,
  duration = 1.6,
  className,
  suffix = "",
  prefix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNL(display)}
      {suffix}
    </span>
  );
}
