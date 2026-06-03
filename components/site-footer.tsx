"use client";

import Link from "next/link";
import { useState } from "react";
import { Magnetic } from "./magnetic";
import { FlipText } from "./flip-text";
import { MaskText, Reveal } from "./reveal";
import { ArrowRight } from "./icons";

type FooterLinkItem = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLinkItem[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "New In", href: "/new" },
      { label: "Outerwear", href: "/shop?category=Outerwear" },
      { label: "Knitwear", href: "/shop?category=Knitwear" },
      { label: "Denim", href: "/shop?category=Denim" },
      { label: "Accessories", href: "/shop?category=Accessories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Lookbook", href: "/lookbook" },
      { label: "Stores", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "Pinterest", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
];

function FooterLink({ label, href }: FooterLinkItem) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-block text-sm text-paper/70 transition-colors hover:text-paper"
      >
        <FlipText text={label} />
      </Link>
    </li>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* ── Newsletter ── */}
      <div className="border-b border-paper/15">
        <div className="mx-auto grid max-w-[110rem] grid-cols-1 gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-10 lg:py-24">
          <div>
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-paper/50">
              Newsletter
            </span>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
              <MaskText>Join the</MaskText>
              <MaskText delay={0.08}>
                NexWear list
                <span className="font-editorial font-normal italic">.</span>
              </MaskText>
            </h2>
          </div>

          <Reveal delay={0.1} className="w-full">
            <p className="max-w-md text-sm leading-relaxed text-paper/60">
              First access to drops, restocks and private sales. No noise — just
              the next thing worth wearing.
            </p>

            {sent ? (
              <p className="mt-8 font-display text-xl font-bold uppercase tracking-tight">
                You&rsquo;re on the list <span className="text-paper/60">✦</span>
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="group/form mt-8 flex max-w-md items-center gap-4 border-b border-paper/30 pb-3 transition-colors focus-within:border-paper"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="w-full bg-transparent text-base text-paper placeholder:text-paper/40 focus:outline-none"
                />
                <Magnetic strength={0.5}>
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 hover:scale-105"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Magnetic>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      {/* ── Link columns ── */}
      <div className="mx-auto grid max-w-[110rem] grid-cols-2 gap-10 px-5 py-16 sm:grid-cols-3 lg:grid-cols-5 lg:px-10">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <span className="font-display text-2xl font-extrabold uppercase tracking-[-0.04em]">
            NexWear
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
            Monochrome essentials engineered for the city. Designed in Algiers,
            worn worldwide.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-paper/40">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Giant wordmark ── */}
      <div className="px-5 lg:px-10">
        <div className="overflow-hidden border-t border-paper/15 pt-8">
          <MaskText className="text-outline-light font-display text-[20vw] font-extrabold uppercase leading-[0.78] tracking-[-0.04em]">
            NexWear
          </MaskText>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="mx-auto flex max-w-[110rem] flex-col items-center justify-between gap-3 px-5 py-8 text-[0.7rem] uppercase tracking-[0.18em] text-paper/45 sm:flex-row lg:px-10">
        <span>© 2026 NexWear — All rights reserved</span>
        <div className="flex gap-6">
          <Link href="#" className="transition-colors hover:text-paper">
            Privacy
          </Link>
          <Link href="#" className="transition-colors hover:text-paper">
            Terms
          </Link>
          <span>Made for the next.</span>
        </div>
      </div>
    </footer>
  );
}
