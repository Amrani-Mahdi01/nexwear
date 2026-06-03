"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { img } from "@/lib/data";
import { Reveal, MaskText } from "@/components/reveal";
import { Parallax } from "@/components/parallax";
import { SectionKicker } from "@/components/section-bits";
import { Magnetic } from "@/components/magnetic";
import { ArrowUpRight } from "@/components/icons";

const MAIN = img("photo-1485462537746-965f33f7f6a7", 1100);
const SECONDARY = img("photo-1496747611176-843222e1e57c", 700);

export function Lookbook() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -70]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -50, reduce ? 0 : 90]);

  return (
    <section
      id="lookbook"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden border-t border-ink/10 bg-paper py-20 lg:py-28"
    >
      {/* Oversized decorative year — drifts on scroll */}
      <Parallax
        axis="y"
        from={-60}
        to={60}
        className="text-outline pointer-events-none absolute -right-4 top-10 select-none font-display text-[22vw] font-extrabold leading-none tracking-tighter opacity-[0.07]"
      >
        2026
      </Parallax>

      <div className="relative mx-auto grid max-w-[110rem] grid-cols-1 items-center gap-12 px-5 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* Imagery */}
        <div className="relative lg:col-span-7">
          <motion.div
            style={{ y: yMain }}
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-smoke sm:aspect-[16/11]"
          >
            <Image
              src={MAIN}
              alt="NexWear SS26 lookbook — editorial campaign image"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
            />
            <span className="absolute left-4 top-4 bg-paper/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
              Campaign / SS26
            </span>
          </motion.div>

          {/* Overlapping secondary */}
          <motion.div
            style={{ y: ySecondary }}
            className="group absolute -bottom-8 right-4 hidden aspect-[3/4] w-40 overflow-hidden rounded-[2px] border-4 border-paper bg-smoke shadow-[0_20px_60px_-25px_rgba(0,0,0,0.45)] sm:block lg:-right-6 lg:w-52"
          >
            <Image
              src={SECONDARY}
              alt="NexWear SS26 lookbook — styling detail"
              fill
              sizes="13rem"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
            />
          </motion.div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-5 lg:pl-6">
          <SectionKicker index="03" label="Editorial" />
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
            <MaskText>The SS26</MaskText>
            <MaskText delay={0.08}>Lookbook</MaskText>
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ash">
              Twelve looks shot on the streets at first light. A study in
              proportion, weight and restraint — every piece built to layer,
              every layer built to last. No colour. No compromise.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-9">
            <Magnetic strength={0.4}>
              <Link
                href="/lookbook"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                  Explore the Lookbook
                </span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-ink" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
