"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * An image that drifts vertically *inside* its frame as the section scrolls
 * through the viewport. The inner layer is oversized (top/bottom -16%) so the
 * drift never reveals an edge. Composes with group-hover scale/grayscale on the
 * image itself. Disabled under prefers-reduced-motion.
 *
 * Render inside a positioned, `overflow-hidden` frame (e.g. an aspect box).
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  imgClassName,
  amount = 30,
  overscan = 16,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  imgClassName?: string;
  /** Vertical drift in px (image travels from +amount to -amount). */
  amount?: number;
  /** How far the image layer extends past the frame, as a % of frame height.
   *  Keep it comfortably larger than `amount` so edges never show. */
  overscan?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : amount, reduce ? 0 : -amount],
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y, top: `-${overscan}%`, bottom: `-${overscan}%` }}
        className="absolute inset-x-0 will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imgClassName}
        />
      </motion.div>
    </div>
  );
}

/**
 * Generic scroll-linked translate for any element (text, decorative marks).
 */
export function Parallax({
  children,
  axis = "y",
  from = 60,
  to = -60,
  className,
}: {
  children: ReactNode;
  axis?: "x" | "y";
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const value = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : from, reduce ? 0 : to],
  );

  return (
    <motion.div
      ref={ref}
      style={axis === "x" ? { x: value } : { y: value }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
