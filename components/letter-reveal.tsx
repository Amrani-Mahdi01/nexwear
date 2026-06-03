"use client";

import { motion } from "motion/react";

/**
 * Eager per-letter rise — each character springs up from below the line.
 * Animates on mount (use for above-the-fold page titles). Single words only
 * (spaces are preserved but won't wrap).
 */
export function LetterReveal({
  text,
  className,
  delay = 0.12,
  stagger = 0.05,
  duration = 0.65,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] ${className ?? ""}`}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{
            duration,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * stagger,
          }}
          className="inline-block whitespace-pre"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
