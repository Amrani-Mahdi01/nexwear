import { Hero } from "@/components/hero";
import { Categories } from "@/components/sections/categories";
import { NewArrivals } from "@/components/sections/new-arrivals";
import { Lookbook } from "@/components/sections/lookbook";
import { Values } from "@/components/sections/values";
import { Marquee } from "@/components/marquee";

const DIVIDER_ITEMS = [
  "New Drop — SS26",
  "Fast Nationwide Delivery",
  "Members Get Early Access",
  "Monochrome Only",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />

      {/* Marquee divider */}
      <div className="border-y border-ink/10 bg-ink py-4 text-paper">
        <Marquee duration={26}>
          {DIVIDER_ITEMS.map((item) => (
            <span key={item} className="flex items-center">
              <span className="px-8 font-display text-lg font-semibold uppercase tracking-[0.1em]">
                {item}
              </span>
              <span aria-hidden className="text-paper/40">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <Lookbook />
      <Values />
    </>
  );
}
