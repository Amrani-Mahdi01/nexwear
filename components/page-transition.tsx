"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

type Phase = "idle" | "cover" | "reveal";

/**
 * Full-screen curtain page transition. A global capture-phase click listener
 * intercepts same-origin link navigations: the ink panel sweeps up to cover
 * the viewport, we navigate under cover, then the panel lifts to reveal the new
 * page. Ignores buttons, hash links, modified/new-tab clicks, and externals.
 * No-ops under prefers-reduced-motion.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<string | null>(null);
  const busy = useRef(false);
  const firstRender = useRef(true);

  // Intercept internal link clicks.
  useEffect(() => {
    if (reduce) return;

    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        busy.current
      ) {
        return;
      }

      const el = e.target as HTMLElement | null;
      // Let interactive controls (quick-add, steppers, filters) handle themselves.
      if (el?.closest("button")) return;

      const a = el?.closest("a");
      if (!a) return;

      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (!href || target === "_blank") return;
      if (a.hasAttribute("download")) return;
      if (!href.startsWith("/")) return; // internal absolute paths only
      if (href.includes("#")) return; // let anchor links scroll normally

      const dest = new URL(href, location.href);
      if (dest.pathname === location.pathname) return; // same page

      e.preventDefault();
      busy.current = true;
      pending.current = dest.pathname + dest.search;
      setPhase("cover");
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce]);

  // After the route changes, reset scroll under cover and lift the curtain.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    setPhase("reveal");
  }, [pathname, lenis]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink"
      initial={false}
      variants={{
        idle: { scaleY: 0, transformOrigin: "bottom" },
        cover: { scaleY: 1, transformOrigin: "bottom" },
        reveal: { scaleY: 0, transformOrigin: "top" },
      }}
      animate={phase}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      style={{ willChange: "transform" }}
      onAnimationComplete={(def) => {
        if (def === "cover" && pending.current) {
          router.push(pending.current);
          pending.current = null;
        }
        if (def === "reveal") {
          setPhase("idle");
          busy.current = false;
        }
      }}
    >
      <motion.span
        className="font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-paper"
        animate={{ opacity: phase === "cover" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        NexWear
      </motion.span>
    </motion.div>
  );
}
