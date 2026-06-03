"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Magnetic } from "./magnetic";
import { ArrowDown, ArrowUpRight } from "./icons";
import { img } from "@/lib/data";

// Rotating hero slides — the third headline word + imagery swap together every 2s.
const SLIDES = [
  { word: "Next.", label: "Look 01 — Outerwear", image: img("photo-1490481651871-ab68de25d43d", 1200), image2: img("photo-1483985988355-763728e1935b", 900) },
  { word: "New.", label: "Look 02 — Knitwear", image: img("photo-1469334031218-e382a71b716b", 1200), image2: img("photo-1539109136881-3be0616acf4b", 900) },
  { word: "Now.", label: "Look 03 — Tailoring", image: img("photo-1492707892479-7bc8d5a4ee93", 1200), image2: img("photo-1496747611176-843222e1e57c", 900) },
  { word: "Bold.", label: "Look 04 — Denim", image: img("photo-1525507119028-ed4c629a60a3", 1200), image2: img("photo-1487412720507-e7ab37603c6f", 900) },
];
const ROTATE_MS = 2000;

// Static first two lines — eager per-letter rise on mount.
const HEADLINE: { text: string; className?: string }[][] = [
  [{ text: "Wear" }],
  [{ text: "What’s" }],
];
const LETTER_BASE_DELAY = 0.12;
const LETTER_STAGGER = 0.04;
const LETTER_DURATION = 0.55;
const LETTER_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: (delay: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const MARQUEE_WORDS = [
  "Wear What's Next",
  "SS26",
  "Monochrome Only",
  "Engineered For The City",
];

function MarqueeSequence() {
  return (
    <div className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((word) => (
        <span key={word} className="flex items-center">
          <span className="text-outline px-8 font-display text-[2.6rem] font-extrabold uppercase tracking-tight md:text-[3.4rem]">
            {word}
          </span>
          <span className="font-display text-[2.6rem] md:text-[3.4rem]">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const firstWord = useRef(true);

  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  useEffect(() => {
    firstWord.current = false;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yMain = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const yOverlap = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 130]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -45]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-paper"
    >
      {/* Faint editorial grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(10,10,10,0.035) 0 1px, transparent 1px 12.5%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[110rem] grid-cols-1 gap-y-12 px-5 pb-32 pt-12 lg:grid-cols-12 lg:gap-x-8 lg:px-10 lg:pb-36 lg:pt-20">
        {/* ── Left: editorial copy ── */}
        <motion.div
          style={{ y: yText }}
          className="flex flex-col justify-center lg:col-span-7"
        >
          {/* Kicker */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="h-px w-12 bg-ink" />
            <span className="font-editorial text-lg italic">
              Spring — Summer &rsquo;26
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
              Drop 01 / Outerwear
            </span>
          </motion.div>

          {/* Headline — lines 1–2 static, line 3 rotates every 2s */}
          <h1 className="font-display text-[clamp(3.25rem,11.5vw,10.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.035em]">
            {(() => {
              let g = 0;
              return HEADLINE.map((segments, li) => (
                <span key={li} className="block overflow-hidden pb-[0.1em]">
                  {segments.map((seg, si) =>
                    Array.from(seg.text).map((ch, ci) => {
                      const delay = LETTER_BASE_DELAY + g * LETTER_STAGGER;
                      g += 1;
                      return (
                        <motion.span
                          key={`${li}-${si}-${ci}`}
                          initial={{ y: "115%" }}
                          animate={{ y: 0 }}
                          transition={{
                            duration: LETTER_DURATION,
                            ease: LETTER_EASE,
                            delay,
                          }}
                          className={`inline-block ${seg.className ?? ""}`}
                        >
                          {ch}
                        </motion.span>
                      );
                    }),
                  )}
                </span>
              ));
            })()}

            {/* Rotating word */}
            <span className="block overflow-hidden pb-[0.1em]">
              <AnimatePresence mode="wait">
                <motion.span key={slide.word} className="inline-block">
                  {Array.from(slide.word).map((ch, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ y: "115%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-115%" }}
                      transition={{
                        duration: 0.5,
                        ease: LETTER_EASE,
                        delay: (firstWord.current ? 0.55 : 0) + ci * 0.04,
                      }}
                      className={`inline-block ${
                        ch === "." ? "font-editorial font-normal italic" : ""
                      }`}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subcopy */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.9}
            className="mt-8 max-w-md text-base leading-relaxed text-ash"
          >
            A monochrome wardrobe engineered for the city. Considered cuts,
            heavyweight cottons and zero noise — the SS26 collection has landed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.05}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Magnetic strength={0.4}>
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                  Shop New Arrivals
                </span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-ink" />
              </Link>
            </Magnetic>

            <Link
              href="/lookbook"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]"
            >
              <span className="relative">
                View Lookbook
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-0" />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.2}
            className="mt-14 hidden gap-10 border-t border-ink/10 pt-6 sm:flex"
          >
            {[
              ["120+", "Pieces this season"],
              ["24h", "Express dispatch"],
              ["100%", "Organic cotton"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="font-display text-2xl font-bold">{stat}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-ash">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: imagery (swaps with the word) ── */}
        <div className="relative lg:col-span-5">
          <motion.div
            style={{ y: yMain }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="group relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2px] bg-smoke lg:mx-0 lg:ml-auto lg:max-w-none"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                initial={{ y: reduce ? 0 : "16%", opacity: 0, scale: 1.06 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: reduce ? 0 : "-12%", opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt="NexWear SS26 look"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover grayscale transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </motion.div>
            </AnimatePresence>

            {/* Dynamic tag */}
            <div className="absolute left-4 top-4 z-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.label}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-paper/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
                >
                  {slide.label}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pointer-events-none absolute bottom-4 right-4 z-10 text-[0.65rem] uppercase tracking-[0.18em] text-paper mix-blend-difference">
              Hover to reveal
            </div>
          </motion.div>

          {/* Overlapping secondary image */}
          <motion.div
            style={{ y: yOverlap }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="group absolute -left-6 bottom-10 hidden aspect-[3/4] w-40 overflow-hidden rounded-[2px] border-4 border-paper bg-smoke shadow-[0_20px_60px_-25px_rgba(0,0,0,0.45)] sm:block lg:-left-24 lg:w-56"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                initial={{ y: reduce ? 0 : "-18%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: reduce ? 0 : "14%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image2}
                  alt="NexWear SS26 detail"
                  fill
                  sizes="14rem"
                  className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-2 left-2 z-10 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-paper mix-blend-difference">
              Look 0{index + 1}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-28 right-5 z-10 hidden flex-col items-center gap-3 lg:right-10 lg:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </motion.div>

      {/* Outlined-type marquee band */}
      <div className="group/marquee absolute bottom-0 left-0 w-full overflow-hidden border-t border-ink/10 py-4">
        <div
          className="flex w-max animate-marquee whitespace-nowrap"
          style={{ "--marquee-duration": "40s" } as React.CSSProperties}
        >
          <MarqueeSequence />
          <MarqueeSequence />
        </div>
      </div>
    </section>
  );
}
