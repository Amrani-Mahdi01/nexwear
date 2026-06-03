"use client";

import Link from "next/link";
import { useStore } from "./store";
import { ParallaxImage } from "./parallax";
import { PlusIcon } from "./icons";
import { formatPrice, type Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useStore();

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });
  }

  return (
    <Link href={product.href} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-smoke">
        <ParallaxImage
          src={product.image}
          alt={product.name}
          sizes="(max-width: 1024px) 50vw, 25vw"
          amount={26}
          imgClassName="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
        />

        {product.tag && (
          <span
            className={`absolute left-3 top-3 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] ${
              product.tag === "Sale" ? "bg-paper text-ink" : "bg-ink text-paper"
            }`}
          >
            {product.tag}
          </span>
        )}

        {/* Quick add — slides up on hover, adds without navigating */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${product.name} to bag`}
          className="absolute inset-x-3 bottom-3 flex translate-y-[140%] items-center justify-center gap-2 bg-ink py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-paper opacity-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:bg-ink/90 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Bag
          <PlusIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold leading-snug transition-colors group-hover:text-ash">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-ash">
            {product.category}
          </p>
        </div>
        <div className="shrink-0 text-right text-sm">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="ml-2 text-ash line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
