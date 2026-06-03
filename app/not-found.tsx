import Link from "next/link";
import { Reveal, MaskText } from "@/components/reveal";
import { LetterReveal } from "@/components/letter-reveal";
import { Magnetic } from "@/components/magnetic";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-paper px-5 py-24 text-center lg:px-10">
      {/* Faint editorial grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(10,10,10,0.035) 0 1px, transparent 1px 12.5%)",
        }}
      />

      <div className="relative flex w-full max-w-[110rem] flex-col items-center">
        <Reveal>
          <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
            Error 404
          </span>
        </Reveal>

        <h1 className="font-display text-[clamp(5rem,22vw,18rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.05em]">
          <LetterReveal text="404" stagger={0.09} />
        </h1>

        <h2 className="mt-2 font-display text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
          <MaskText>Off the grid.</MaskText>
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ash">
            The page you&rsquo;re looking for has moved, sold out, or never
            existed. Let&rsquo;s get you back to something in stock.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Magnetic strength={0.4}>
              <Link
                href="/"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                  Back to Home
                </span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-ink" />
              </Link>
            </Magnetic>

            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]"
            >
              <span className="relative">
                Shop the collection
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-0" />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
