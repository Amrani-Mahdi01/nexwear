import type { Metadata } from "next";
import Link from "next/link";
import { products, productDescription, formatPrice } from "@/lib/data";
import { Reveal, MaskText } from "@/components/reveal";
import { LetterReveal } from "@/components/letter-reveal";
import { ParallaxImage } from "@/components/parallax";
import { Marquee } from "@/components/marquee";
import { Magnetic } from "@/components/magnetic";
import { ProductCard } from "@/components/product-card";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "New In — NexWear",
  description:
    "The latest drop from NexWear SS26 — fresh monochrome arrivals in outerwear, knitwear, denim and accessories.",
};

const MARQUEE_WORDS = ["Just Landed", "SS26", "New Arrivals", "Wear What's Next"];

export default function NewInPage() {
  const newItems = products.filter((p) => p.tag === "New");
  const featured =
    [...newItems].sort((a, b) => b.price - a.price)[0] ?? products[0];
  const arrivals = newItems.filter((p) => p.id !== featured.id);
  const more = products.filter((p) => p.tag !== "New");

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
              <span className="text-ink">New In</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-12 bg-ink" />
              <span className="font-editorial text-lg italic">Just Landed</span>
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
                SS26 Drop 01
              </span>
            </div>
          </Reveal>

          <h1 className="font-display text-[clamp(3rem,15vw,13rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.045em]">
            <LetterReveal text="New In" stagger={0.05} />
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ash">
              The freshest pieces from the SS26 collection — straight off the
              cutting table and into rotation. Monochrome, considered, and ready
              to layer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured drop ── */}
      <section className="border-b border-ink/10 bg-paper py-16 lg:py-24">
        <div className="mx-auto grid max-w-[110rem] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-12 lg:gap-12 lg:px-10">
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-smoke lg:col-span-7">
            <ParallaxImage
              src={featured.image}
              alt={featured.name}
              sizes="(max-width: 1024px) 100vw, 58vw"
              amount={60}
              overscan={20}
              imgClassName="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <span className="absolute left-4 top-4 z-10 bg-ink px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-paper">
              New
            </span>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
              Drop Highlight · {featured.category}
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
              <MaskText>{featured.name}</MaskText>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-3 text-xl font-semibold">
                {formatPrice(featured.price)}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ash">
                {productDescription(featured)}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8">
                <Magnetic strength={0.4}>
                  <Link
                    href={featured.href}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 translate-y-full bg-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                    />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                      Shop This Piece
                    </span>
                    <ArrowUpRight className="relative z-10 h-4 w-4 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-ink" />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── This week's arrivals ── */}
      {arrivals.length > 0 && (
        <section className="bg-paper py-16 lg:py-24">
          <div className="mx-auto max-w-[110rem] px-5 lg:px-10">
            <div className="mb-10 lg:mb-14">
              <div className="mb-5 flex items-center gap-4">
                <span className="font-editorial text-lg italic">(01)</span>
                <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
                  This week&rsquo;s arrivals
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em]">
                <MaskText>Fresh</MaskText>
                <MaskText delay={0.08}>
                  drops<span className="font-editorial font-normal italic">.</span>
                </MaskText>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-12 lg:grid-cols-4 lg:gap-x-4">
              {arrivals.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.07}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Marquee ── */}
      <div className="border-y border-ink/10 py-6">
        <Marquee duration={32}>
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

      {/* ── More from SS26 ── */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-[110rem] px-5 lg:px-10">
          <div className="mb-10 lg:mb-14">
            <div className="mb-5 flex items-center gap-4">
              <span className="font-editorial text-lg italic">(02)</span>
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
                More from SS26
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em]">
              <MaskText>The full</MaskText>
              <MaskText delay={0.08}>season.</MaskText>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 lg:grid-cols-4 lg:gap-x-4">
            {more.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.07}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-paper pb-24 pt-4 text-center lg:pb-32">
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
              Shop the Full Collection
            </span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-ink" />
          </Link>
        </Magnetic>
      </section>
    </>
  );
}
