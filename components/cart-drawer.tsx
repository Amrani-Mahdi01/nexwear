"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useStore, type CartItem } from "./store";
import { Magnetic } from "./magnetic";
import { formatPrice } from "@/lib/data";
import { CloseIcon, PlusIcon, MinusIcon, BagIcon, ArrowRight } from "./icons";

function QtyStepper({ item }: { item: CartItem }) {
  const { setQty } = useStore();
  return (
    <div className="inline-flex items-center border border-ink/20">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQty(item.id, item.qty - 1)}
        className="grid h-8 w-8 place-items-center transition-colors hover:bg-ink hover:text-paper"
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span className="grid h-8 w-9 place-items-center text-sm font-semibold tabular-nums">
        {item.qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQty(item.id, item.qty + 1)}
        className="grid h-8 w-8 place-items-center transition-colors hover:bg-ink hover:text-paper"
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const { removeItem } = useStore();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex gap-4 border-b border-ink/10 pb-6"
    >
      <div className="relative h-28 w-22 shrink-0 overflow-hidden rounded-[2px] bg-smoke">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="6rem"
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold leading-snug">{item.name}</h3>
            <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.14em] text-ash">
              {item.color && item.size
                ? `${item.color} · ${item.size}`
                : item.category}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${item.name}`}
            onClick={() => removeItem(item.id)}
            className="grid h-7 w-7 shrink-0 place-items-center text-ash transition-colors hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <QtyStepper item={item} />
          <span className="text-sm font-semibold">
            {formatPrice(item.price * item.qty)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

export function CartDrawer() {
  const { cartOpen, closeCart, items, subtotal, count } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink"
          />

          <motion.aside
            role="dialog"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-paper text-ink shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">
                Your Bag{" "}
                <span className="text-ash">({count})</span>
              </h2>
              <button
                type="button"
                aria-label="Close bag"
                onClick={closeCart}
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink hover:text-paper"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <BagIcon className="h-12 w-12 text-ink/30" />
                <div>
                  <p className="font-display text-lg font-bold uppercase tracking-tight">
                    Your bag is empty
                  </p>
                  <p className="mt-1 text-sm text-ash">
                    Add a few pieces to get started.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-ink bg-ink px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full bg-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                  />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                    Continue Shopping
                  </span>
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <ul
                  data-lenis-prevent
                  className="flex-1 space-y-6 overflow-y-auto px-6 py-6"
                >
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartRow key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Footer */}
                <div className="border-t border-ink/10 px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-[0.14em] text-ash">
                      Subtotal
                    </span>
                    <span className="font-display text-xl font-bold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ash">
                    Shipping & taxes calculated at checkout.
                  </p>

                  <Magnetic strength={0.25} className="mt-5">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 translate-y-full bg-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                      />
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                        Checkout
                      </span>
                      <ArrowRight className="relative z-10 h-4 w-4 transition-[transform,color] duration-500 group-hover:translate-x-1 group-hover:text-ink" />
                    </Link>
                  </Magnetic>

                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-xs uppercase tracking-[0.16em] text-ash transition-colors hover:text-ink"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
