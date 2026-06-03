"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useStore } from "@/components/store";
import { Magnetic } from "@/components/magnetic";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { ViewAllLink } from "@/components/section-bits";
import { PlusIcon, MinusIcon } from "@/components/icons";
import {
  formatPrice,
  productGallery,
  productSizes,
  productDescription,
  DEFAULT_COLORS,
  PRODUCT_DETAILS,
  relatedProducts,
  type Product,
} from "@/lib/data";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useStore();

  const gallery = productGallery(product);
  const sizes = productSizes(product);
  const colors = product.colors.length
    ? DEFAULT_COLORS.filter((c) => product.colors.includes(c.name))
    : DEFAULT_COLORS;
  const related = relatedProducts(product);

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(colors[0].name);
  const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    setError(false);
    addItem(
      {
        id: `${product.id}__${color}__${size}`,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        color,
        size,
      },
      qty,
    );
  }

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[110rem] px-5 pt-10 lg:px-10 lg:pt-14">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-ash">
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition-colors hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── Gallery ── */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[88px_1fr] sm:gap-4">
              {/* Thumbnails */}
              <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-[2px] bg-smoke transition-opacity sm:w-full ${
                      activeImage === i
                        ? "ring-2 ring-ink ring-offset-2 ring-offset-paper"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="88px"
                      className="object-cover grayscale"
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="group relative order-1 aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-smoke sm:order-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={gallery[activeImage]}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
                    />
                  </motion.div>
                </AnimatePresence>

                {product.tag && (
                  <span
                    className={`absolute left-4 top-4 z-10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] ${
                      product.tag === "Sale"
                        ? "bg-paper text-ink"
                        : "bg-ink text-paper"
                    }`}
                  >
                    {product.tag}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Info ── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
                {product.category}
              </span>
              <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight lg:text-5xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-semibold">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-ash line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="bg-ink px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-paper">
                    Save {formatPrice(product.oldPrice - product.price)}
                  </span>
                )}
              </div>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-ash">
                {productDescription(product)}
              </p>

              {/* Color */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Color
                  </span>
                  <span className="text-xs text-ash">{color}</span>
                </div>
                <div className="mt-3 flex gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColor(c.name)}
                      aria-label={c.name}
                      title={c.name}
                      aria-pressed={color === c.name}
                      className={`h-9 w-9 rounded-full border transition-all duration-300 ${
                        color === c.name
                          ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                          : "border-ink/20 hover:border-ink"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Size
                  </span>
                  <button
                    type="button"
                    className="text-xs text-ash underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    Size guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSize(s);
                        setError(false);
                      }}
                      aria-pressed={size === s}
                      className={`min-w-12 border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                        size === s
                          ? "border-ink bg-ink text-paper"
                          : "border-ink/20 hover:border-ink"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-xs font-medium text-ink"
                    >
                      Please select a size first.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Quantity + Add to bag */}
              <div className="mt-8 flex items-stretch gap-3">
                <div className="inline-flex items-center border border-ink/20">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-full w-11 place-items-center transition-colors hover:bg-ink hover:text-paper"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="grid w-10 place-items-center text-sm font-semibold tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => q + 1)}
                    className="grid h-full w-11 place-items-center transition-colors hover:bg-ink hover:text-paper"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>

                <Magnetic strength={0.2} className="flex-1">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-ink bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 translate-y-full bg-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                    />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                      Add to Bag — {formatPrice(product.price * qty)}
                    </span>
                  </button>
                </Magnetic>
              </div>

              {/* Details */}
              <ul className="mt-10 space-y-3 border-t border-ink/10 pt-6">
                {PRODUCT_DETAILS.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 text-sm text-ash"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" />
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-ash">
                Free express shipping over 15 000 DZD · 30-day returns
              </p>
            </div>
          </div>
        </div>

        {/* ── Related ── */}
        <div className="mt-24 border-t border-ink/10 pt-14 lg:mt-32">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight lg:text-4xl">
              You may also like
            </h2>
            <ViewAllLink href="/shop">All products</ViewAllLink>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.07}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="h-20 lg:h-28" />
    </section>
  );
}
