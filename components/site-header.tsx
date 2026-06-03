"use client";

import Link from "next/link";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Magnetic } from "./magnetic";
import { useStore } from "./store";
import {
  SearchIcon,
  BagIcon,
  MenuIcon,
  CloseIcon,
  ArrowUpRight,
} from "./icons";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "New In", href: "/new" },
  { label: "Collections", href: "/#collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "About", href: "/about" },
];

const TICKER = [
  "SS26 Collection — Now Live",
  "Fast Nationwide Delivery — 58 Wilayas",
  "30-Day Easy Returns",
  "Monochrome Essentials",
];

/** Text that vertically flips to a serif italic copy on hover of the parent `group`. */
function FlipText({ text }: { text: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full font-editorial italic transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {text}
      </span>
    </span>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <Magnetic strength={0.25}>
      <Link
        href={href}
        className="group relative inline-flex flex-col px-1 py-1 text-[0.8rem] font-medium uppercase tracking-[0.14em]"
      >
        <FlipText text={label} />
        <span className="mt-1 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
      </Link>
    </Magnetic>
  );
}

function Ticker() {
  return (
    <ul className="flex shrink-0 items-center">
      {TICKER.map((item) => (
        <li
          key={item}
          className="flex items-center whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.2em]"
        >
          <span className="px-6">{item}</span>
          <span aria-hidden className="text-paper/50">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSearch, openCart, count } = useStore();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 32);
  });

  return (
    <>
      {/* Announcement marquee */}
      <div className="group/marquee relative z-40 overflow-hidden bg-ink py-2 text-paper">
        <div
          className="flex w-max animate-marquee"
          style={{ "--marquee-duration": "34s" } as React.CSSProperties}
        >
          <Ticker />
          <Ticker />
        </div>
      </div>

      {/* Sticky nav bar */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`sticky top-0 z-40 border-b transition-[border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-ink/10 backdrop-blur-xl"
            : "border-transparent backdrop-blur-0"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[110rem] items-center justify-between px-5 transition-[padding] duration-500 lg:px-10 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="NexWear home"
            className="group relative z-10 select-none text-2xl font-extrabold uppercase leading-none tracking-[-0.04em]"
          >
            <FlipText text="NexWear" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              type="button"
              aria-label="Search"
              onClick={openSearch}
              className="grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <SearchIcon className="h-[1.15rem] w-[1.15rem]" />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="group relative grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <BagIcon className="h-[1.15rem] w-[1.15rem] transition-transform duration-300 group-hover:-rotate-6" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[0.6rem] font-bold text-paper group-hover:bg-paper group-hover:text-ink"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-ink hover:text-paper lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-ink text-paper lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="text-2xl font-extrabold uppercase tracking-[-0.04em]">
                NexWear
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-paper hover:text-ink"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-5">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between border-b border-paper/15 py-5 font-display text-4xl font-bold uppercase tracking-tight"
                  >
                    {link.label}
                    <ArrowUpRight className="h-7 w-7 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between px-5 py-8 text-xs uppercase tracking-[0.2em] text-paper/60">
              <span>Algiers · Worldwide</span>
              <span>Est. 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
