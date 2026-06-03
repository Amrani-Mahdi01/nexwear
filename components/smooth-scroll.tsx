"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Momentum-based smooth scrolling for the whole page (Lenis, root mode).
 * Drives motion's useScroll/parallax off the same smoothed scroll position.
 * Falls back to native scrolling when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: reduce ? 1 : 0.09,
        smoothWheel: !reduce,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
