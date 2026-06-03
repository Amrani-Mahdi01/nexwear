import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, MaskText } from "@/components/reveal";
import { LetterReveal } from "@/components/letter-reveal";
import { ParallaxImage } from "@/components/parallax";
import { Magnetic } from "@/components/magnetic";
import { ArrowUpRight } from "@/components/icons";
import { img } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — NexWear",
  description:
    "NexWear is an independent label born in Algiers. We make monochrome essentials — considered cuts, heavyweight fabrics and zero noise.",
};

const STATS = [
  ["2026", "Founded"],
  ["100%", "Organic cotton"],
  ["58", "Wilayas shipped"],
  ["12", "Looks per season"],
];

const PRINCIPLES = [
  ["01", "Monochrome by design", "A strict black-and-white palette that never goes out of style."],
  ["02", "Built to last", "Heavyweight, GOTS-certified fabrics chosen for longevity, not landfill."],
  ["03", "Made responsibly", "Small batches, ethical production and zero overstock."],
  ["04", "Designed in Algiers", "Drawn in our studio, shipped across all 58 wilayas and worldwide."],
];

export default function AboutPage() {
  return (
    <>
      {/* ── Intro ── */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper pt-14 pb-16 lg:pt-20 lg:pb-24">
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
              <span className="text-ink">About</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-12 bg-ink" />
              <span className="font-editorial text-lg italic">Our Story</span>
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
                Est. 2026
              </span>
            </div>
          </Reveal>

          <h1 className="font-display text-[clamp(4.5rem,20vw,16rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.045em]">
            <LetterReveal text="About" />
          </h1>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ash">
              NexWear is an independent label born in Algiers in 2026. We make
              monochrome essentials — considered cuts, heavyweight fabrics and
              zero noise — designed to be worn on repeat, season after season.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Full-bleed image ── */}
      <section className="bg-paper">
        <div className="group relative aspect-[16/11] w-full overflow-hidden sm:aspect-[16/8]">
          <ParallaxImage
            src={img("photo-1441984904996-e0b6ba687e04", 1600)}
            alt="Inside the NexWear studio"
            sizes="100vw"
            amount={70}
            overscan={22}
            imgClassName="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
          />
          <span className="absolute bottom-5 left-5 z-10 bg-paper/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm lg:bottom-8 lg:left-10">
            The Studio — Algiers
          </span>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="border-b border-ink/10 bg-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-[110rem] grid-cols-1 gap-10 px-5 lg:grid-cols-12 lg:gap-12 lg:px-10">
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-editorial text-lg italic">(01)</span>
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
                Philosophy
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
              <MaskText>Wear less.</MaskText>
              <MaskText delay={0.08}>Wear better.</MaskText>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-ash lg:col-span-6 lg:col-start-7 lg:pt-4">
            <Reveal>
              <p>
                We believe a wardrobe should be edited, not endless. Every piece
                we release earns its place: black, white, and the greys in
                between — nothing louder than it needs to be.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                From the first sketch to the final stitch, we obsess over
                proportion, weight and longevity — clothes built to outlast the
                trend cycle, not feed it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-ink/10 bg-smoke/50">
        <div className="mx-auto grid max-w-[110rem] grid-cols-2 lg:grid-cols-4">
          {STATS.map(([stat, label], i) => (
            <Reveal
              key={label}
              delay={(i % 4) * 0.08}
              className="border-ink/10 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 [&:nth-child(odd)]:border-r lg:border-r lg:[&:last-child]:border-r-0 [&:nth-child(3)]:border-b-0"
            >
              <div className="p-8 lg:p-10">
                <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-none tracking-tight">
                  {stat}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.18em] text-ash">
                  {label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Materials ── */}
      <section className="border-b border-ink/10 bg-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-[110rem] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-12 lg:gap-12 lg:px-10">
          <div className="group relative order-2 aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-smoke lg:order-1 lg:col-span-6">
            <ParallaxImage
              src={img("photo-1520975954732-35dd22299614", 1100)}
              alt="NexWear heavyweight fabric detail"
              sizes="(max-width: 1024px) 100vw, 50vw"
              amount={50}
              imgClassName="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-editorial text-lg italic">(02)</span>
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
                The Fabric
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
              <MaskText>Material</MaskText>
              <MaskText delay={0.08}>first.</MaskText>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-md text-base leading-relaxed text-ash">
                Heavyweight organic cottons, brushed wools and dry-handle denim —
                sourced responsibly and chosen to age well. The kind of cloth
                that softens with every wash and only looks better with time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="border-b border-ink/10 bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[110rem] px-5 lg:px-10">
          <div className="mb-12 flex items-center gap-4">
            <span className="font-editorial text-lg italic">(03)</span>
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
              What we stand for
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(([n, title, text], i) => (
              <Reveal key={n} delay={(i % 4) * 0.08}>
                <div className="border-t border-ink pt-5">
                  <span className="font-display text-2xl font-bold">{n}</span>
                  <h3 className="mt-4 font-display text-lg font-bold uppercase leading-tight tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-ink py-24 text-paper lg:py-36">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-10">
          <Reveal>
            <p className="font-editorial text-[clamp(1.75rem,4vw,3.25rem)] italic leading-[1.15]">
              &ldquo;Wear less. Wear better. Wear what&rsquo;s next.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-paper/50">
              — The NexWear Studio
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-paper py-20 text-center lg:py-28">
        <div className="mx-auto max-w-2xl px-5 lg:px-10">
          <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
            <MaskText>See it</MaskText>
            <MaskText delay={0.08}>
              in motion<span className="font-editorial font-normal italic">.</span>
            </MaskText>
          </h2>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
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
                    Shop the Collection
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
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
