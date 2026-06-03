"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useStore } from "./store";
import { products, categories, formatPrice } from "@/lib/data";
import { SearchIcon, CloseIcon, ArrowUpRight } from "./icons";

const POPULAR = ["Outerwear", "Denim", "Knitwear", "Tee", "Tote"];

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [query]);

  const trimmed = query.trim();

  return (
    <AnimatePresence onExitComplete={() => setQuery("")}>
      {searchOpen && (
        <motion.div
          role="dialog"
          aria-label="Search"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[70] flex flex-col bg-paper text-ink"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-5 lg:px-10">
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
              Search
            </span>
            <button
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              Close
              <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 transition-colors group-hover:bg-ink group-hover:text-paper">
                <CloseIcon className="h-4 w-4" />
              </span>
            </button>
          </div>

          {/* Search input */}
          <div className="mx-auto w-full max-w-[110rem] px-5 lg:px-10">
            <div className="flex items-center gap-4 border-b-2 border-ink py-4">
              <SearchIcon className="h-7 w-7 shrink-0" />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                aria-label="Search products"
                className="w-full bg-transparent font-display text-2xl font-bold uppercase tracking-tight placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-ink/30 focus:outline-none sm:text-4xl"
              />
              {trimmed && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="shrink-0 text-xs uppercase tracking-[0.16em] text-ash transition-colors hover:text-ink"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div
            data-lenis-prevent
            className="mx-auto w-full max-w-[110rem] flex-1 overflow-y-auto px-5 py-8 lg:px-10"
          >
            {!trimmed ? (
              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-ash">
                    Popular searches
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {POPULAR.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-ink/20 px-5 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-ash">
                    Trending now
                  </h3>
                  <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                    {products.slice(0, 4).map((p) => (
                      <SearchResult key={p.id} product={p} onSelect={closeSearch} />
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div>
                <p className="mb-6 text-sm text-ash">
                  {results.length} result{results.length === 1 ? "" : "s"} for
                  &ldquo;<span className="text-ink">{trimmed}</span>&rdquo;
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                  {results.map((p, i) => (
                    <SearchResult
                      key={p.id}
                      product={p}
                      index={i}
                      onSelect={closeSearch}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-2 py-10">
                <p className="font-display text-2xl font-bold uppercase tracking-tight">
                  No results for &ldquo;{trimmed}&rdquo;
                </p>
                <p className="text-sm text-ash">
                  Try a category like Outerwear, Denim or Knitwear.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchResult({
  product,
  index = 0,
  onSelect,
}: {
  product: (typeof products)[number];
  index?: number;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      <Link href={product.href} onClick={onSelect} className="group block">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-smoke">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
          <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-paper/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold leading-snug">{product.name}</h4>
            <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.14em] text-ash">
              {product.category}
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold">
            {formatPrice(product.price)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
