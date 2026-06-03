import { products } from "@/lib/data";
import { Reveal, MaskText } from "@/components/reveal";
import { SectionKicker, ViewAllLink } from "@/components/section-bits";
import { ProductCard } from "@/components/product-card";

export function NewArrivals() {
  return (
    <section
      id="new"
      className="relative scroll-mt-24 border-t border-ink/10 bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[110rem] px-5 lg:px-10">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-14">
          <div>
            <SectionKicker index="02" label="New In" />
            <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em]">
              <MaskText>Just</MaskText>
              <MaskText delay={0.08}>
                Landed<span className="font-editorial font-normal italic">.</span>
              </MaskText>
            </h2>
          </div>
          <ViewAllLink href="/new">Shop all new in</ViewAllLink>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {products.slice(0, 8).map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
