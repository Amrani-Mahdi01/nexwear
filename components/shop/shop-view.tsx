"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  products,
  productCategories,
  productSizes,
  DEFAULT_COLORS,
} from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ShopHeader } from "./shop-header";
import { SortDropdown, type SortOption } from "./sort-dropdown";

const SORT_OPTIONS: SortOption[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];

export function ShopView({ initialCategory }: { initialCategory?: string }) {
  const [category, setCategory] = useState(
    initialCategory && productCategories.includes(initialCategory)
      ? initialCategory
      : "All",
  );
  const [sort, setSort] = useState("featured");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const toggleColor = (c: string) =>
    setColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  const toggleSize = (s: string) =>
    setSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  const clearAll = () => {
    setCategory("All");
    setColors([]);
    setSizes([]);
  };

  const filtered = useMemo(() => {
    let list =
      category === "All"
        ? [...products]
        : products.filter((p) => p.category === category);

    if (colors.length) {
      list = list.filter((p) => p.colors.some((c) => colors.includes(c)));
    }
    if (sizes.length) {
      list = list.filter((p) =>
        productSizes(p).some((s) => sizes.includes(s)),
      );
    }

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "newest":
        return list.sort(
          (a, b) => (a.tag === "New" ? -1 : 0) - (b.tag === "New" ? -1 : 0),
        );
      default:
        return list;
    }
  }, [category, sort, colors, sizes]);

  const hasFilters = category !== "All" || colors.length > 0 || sizes.length > 0;

  return (
    <>
      <ShopHeader />

      <section className="bg-paper py-10 lg:py-14">
        <div className="mx-auto max-w-[110rem] px-5 lg:px-10">
          {/* Toolbar */}
          <div className="space-y-5 border-b border-ink/10 pb-6">
            {/* Row 1 — categories + count + sort */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1">
                {productCategories.map((c) => {
                  const active = c === category;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                        active
                          ? "border-ink bg-ink text-paper"
                          : "border-ink/20 text-ink hover:border-ink"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-4 lg:justify-end">
                <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ash">
                  {filtered.length} product{filtered.length === 1 ? "" : "s"}
                </span>
                <SortDropdown
                  value={sort}
                  onChange={setSort}
                  options={SORT_OPTIONS}
                />
              </div>
            </div>

            {/* Row 2 — refinements: color + size */}
            <div className="flex flex-col gap-4 border-t border-ink/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-4">
              {/* Color */}
              <div className="flex items-center gap-3">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ash">
                  Color
                </span>
                <div className="flex gap-2.5">
                  {DEFAULT_COLORS.map((c) => {
                    const active = colors.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => toggleColor(c.name)}
                        title={c.name}
                        aria-label={c.name}
                        aria-pressed={active}
                        className={`h-7 w-7 rounded-full border transition-all duration-300 ${
                          active
                            ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                            : "border-ink/20 hover:border-ink"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Size */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ash">
                  Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map((s) => {
                    const active = sizes.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSize(s)}
                        aria-pressed={active}
                        className={`min-w-9 border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                          active
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/20 hover:border-ink"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[0.7rem] uppercase tracking-[0.14em] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline sm:ml-auto"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 lg:grid-cols-4 lg:gap-x-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(i, 8) * 0.03,
                  }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-ash">No products match these filters.</p>
              <button
                type="button"
                onClick={clearAll}
                className="text-sm font-semibold uppercase tracking-[0.12em] underline-offset-4 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
