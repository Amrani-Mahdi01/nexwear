import Link from "next/link";
import { categories } from "@/lib/data";
import { Reveal, MaskText } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax";
import { SectionKicker, ViewAllLink } from "@/components/section-bits";
import { ArrowUpRight } from "@/components/icons";

export function Categories() {
  return (
    <section
      id="collections"
      className="relative scroll-mt-24 border-t border-ink/10 bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[110rem] px-5 lg:px-10">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-14">
          <div>
            <SectionKicker index="01" label="Categories" />
            <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em]">
              <MaskText>Shop by</MaskText>
              <MaskText delay={0.08}>Category</MaskText>
            </h2>
          </div>
          <ViewAllLink href="/shop">All categories</ViewAllLink>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.08}>
              <Link
                href={c.href}
                className="group relative block overflow-hidden rounded-[2px] bg-smoke"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <ParallaxImage
                    src={c.image}
                    alt={`${c.name} category`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    amount={85}
                    overscan={26}
                    imgClassName="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-paper lg:p-6">
                  <div className="overflow-hidden">
                    <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1 lg:text-3xl">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-paper/70">
                      {c.count} pieces
                    </p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/40 transition-all duration-500 group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
