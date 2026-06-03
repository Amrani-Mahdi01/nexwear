import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, MaskText } from "@/components/reveal";
import { LetterReveal } from "@/components/letter-reveal";
import { ParallaxImage } from "@/components/parallax";
import { Marquee } from "@/components/marquee";
import { Magnetic } from "@/components/magnetic";
import { ViewAllLink } from "@/components/section-bits";
import { ArrowUpRight } from "@/components/icons";
import { img } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lookbook — NexWear",
  description:
    "The NexWear SS26 lookbook. Twelve monochrome looks shot at first light — outerwear, tailoring, knitwear, denim and essentials.",
};

const LOOKS = [
  { n: "01", title: "The Layered Coat", category: "Outerwear", blurb: "Heavyweight wool over raw denim. Built for first-light city walks.", image: "photo-1485462537746-965f33f7f6a7" },
  { n: "02", title: "Sharp Tailoring", category: "Tailoring", blurb: "A relaxed blazer cut clean, worn with pleated wide trousers.", image: "photo-1492707892479-7bc8d5a4ee93" },
  { n: "03", title: "Soft Knits", category: "Knitwear", blurb: "Brushed wool and cashmere in stone, charcoal and off-white.", image: "photo-1469334031218-e382a71b716b" },
  { n: "04", title: "Raw Denim", category: "Denim", blurb: "Selvedge denim, dry-handle and made to fade with you.", image: "photo-1487412720507-e7ab37603c6f" },
  { n: "05", title: "Quiet Essentials", category: "Essentials", blurb: "The boxy tee and linen shirt — the foundation of it all.", image: "photo-1496747611176-843222e1e57c" },
  { n: "06", title: "On Foot", category: "Footwear", blurb: "Leather derbies and suede chelsea boots, in monochrome.", image: "photo-1503342217505-b0a15ec3261c" },
];

const MARQUEE_WORDS = ["Wear What's Next", "SS26", "Monochrome Only", "Shot at First Light"];

export default function LookbookPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper pt-14 pb-14 lg:pt-20 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(10,10,10,0.035) 0 1px, transparent 1px 12.5%)",
          }}
        />
        <div className="relative mx-auto max-w-[110rem] px-5 lg:px-10">
          <Reveal>
            <nav className="mb-7 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-ash">
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
              <span>/</span>
              <span className="text-ink">Lookbook</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-12 bg-ink" />
              <span className="font-editorial text-lg italic">SS26 Campaign</span>
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
                12 Looks
              </span>
            </div>
          </Reveal>

          <h1 className="font-display text-[clamp(3rem,13vw,12rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.045em]">
            <LetterReveal text="Lookbook" stagger={0.045} />
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ash">
              Twelve looks shot on the streets at first light — a study in
              proportion, weight and restraint. The SS26 collection, styled to
              layer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Looks ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[110rem] px-5 lg:px-10">
          {LOOKS.map((look, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={look.n}
                className="grid grid-cols-1 items-center gap-8 border-b border-ink/10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24"
              >
                {/* Image */}
                <div
                  className={`group relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-smoke lg:col-span-7 ${
                    flipped ? "lg:order-2 lg:col-start-6" : "lg:order-1"
                  }`}
                >
                  <ParallaxImage
                    src={img(look.image, 1200)}
                    alt={`${look.title} — ${look.category}`}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    amount={60}
                    overscan={20}
                    imgClassName="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <span className="absolute left-4 top-4 z-10 bg-paper/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
                    Look {look.n} — {look.category}
                  </span>
                </div>

                {/* Caption */}
                <div
                  className={`lg:col-span-4 ${
                    flipped ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-9"
                  }`}
                >
                  <span className="text-outline block font-display text-[clamp(4rem,10vw,9rem)] font-extrabold leading-none tracking-tighter opacity-25">
                    {look.n}
                  </span>
                  <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
                    <MaskText>{look.title}</MaskText>
                  </h2>
                  <Reveal delay={0.1}>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-ash">
                      {look.blurb}
                    </p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <div className="mt-6">
                      <ViewAllLink
                        href={`/shop?category=${encodeURIComponent(look.category)}`}
                      >
                        Shop the look
                      </ViewAllLink>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Outlined marquee ── */}
      <div className="border-b border-ink/10 py-6">
        <Marquee duration={36}>
          {MARQUEE_WORDS.map((word) => (
            <span key={word} className="flex items-center">
              <span className="text-outline px-8 font-display text-[2.6rem] font-extrabold uppercase tracking-tight md:text-[3.4rem]">
                {word}
              </span>
              <span className="font-display text-[2.6rem] md:text-[3.4rem]">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── CTA ── */}
      <section className="bg-paper py-20 text-center lg:py-28">
        <div className="mx-auto max-w-2xl px-5 lg:px-10">
          <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
            <MaskText>Shop the</MaskText>
            <MaskText delay={0.08}>
              collection<span className="font-editorial font-normal italic">.</span>
            </MaskText>
          </h2>
          <Reveal delay={0.2}>
            <div className="mt-8">
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
                    Shop All
                  </span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-ink" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
