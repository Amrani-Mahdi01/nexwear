"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";

const TITLE = "Shop";

export function ShopHeader() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-paper pt-14 pb-12 lg:pt-20 lg:pb-16">
      {/* Faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(10,10,10,0.035) 0 1px, transparent 1px 12.5%)",
        }}
      />

      <div className="relative mx-auto max-w-[110rem] px-5 lg:px-10">
        {/* Breadcrumb */}
        <Reveal>
          <nav className="mb-7 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-ash">
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink">Shop</span>
          </nav>
        </Reveal>

        {/* Kicker */}
        <Reveal delay={0.05}>
          <div className="mb-3 flex items-center gap-4">
            <span className="h-px w-12 bg-ink" />
            <span className="font-editorial text-lg italic">
              Spring — Summer &rsquo;26
            </span>
          </div>
        </Reveal>

        {/* Big animated SHOP title */}
        <h1 className="font-display text-[clamp(5rem,22vw,18rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.045em]">
          <span className="block overflow-hidden pb-[0.12em]">
            {Array.from(TITLE).map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.12 + i * 0.07,
                }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Intro */}
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ash">
            The full SS26 collection — monochrome, considered, and built to
            layer. Filter by category or sort to your taste.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
