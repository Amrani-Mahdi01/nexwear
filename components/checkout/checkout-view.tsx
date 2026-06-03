"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLenis } from "lenis/react";
import { useStore, type CartItem } from "@/components/store";
import { Magnetic } from "@/components/magnetic";
import { MaskText, Reveal } from "@/components/reveal";
import { BagIcon, CheckIcon, ArrowRight } from "@/components/icons";
import { formatPrice } from "@/lib/data";

// Per-wilaya delivery tariffs (DZD): [name, home delivery, stopdesk pickup].
const WILAYAS: { name: string; home: number; desk: number }[] = [
  { name: "Adrar", home: 1000, desk: 600 },
  { name: "Chlef", home: 600, desk: 350 },
  { name: "Laghouat", home: 750, desk: 450 },
  { name: "Oum El Bouaghi", home: 650, desk: 400 },
  { name: "Batna", home: 650, desk: 400 },
  { name: "Béjaïa", home: 600, desk: 350 },
  { name: "Biskra", home: 700, desk: 400 },
  { name: "Béchar", home: 900, desk: 550 },
  { name: "Blida", home: 450, desk: 250 },
  { name: "Bouira", home: 550, desk: 350 },
  { name: "Tamanrasset", home: 1200, desk: 800 },
  { name: "Tébessa", home: 700, desk: 450 },
  { name: "Tlemcen", home: 700, desk: 400 },
  { name: "Tiaret", home: 650, desk: 400 },
  { name: "Tizi Ouzou", home: 550, desk: 350 },
  { name: "Alger", home: 400, desk: 250 },
  { name: "Djelfa", home: 700, desk: 400 },
  { name: "Jijel", home: 600, desk: 350 },
  { name: "Sétif", home: 600, desk: 350 },
  { name: "Saïda", home: 700, desk: 400 },
  { name: "Skikda", home: 600, desk: 350 },
  { name: "Sidi Bel Abbès", home: 650, desk: 400 },
  { name: "Annaba", home: 650, desk: 400 },
  { name: "Guelma", home: 650, desk: 400 },
  { name: "Constantine", home: 600, desk: 350 },
  { name: "Médéa", home: 500, desk: 300 },
  { name: "Mostaganem", home: 600, desk: 350 },
  { name: "M'Sila", home: 650, desk: 400 },
  { name: "Mascara", home: 650, desk: 400 },
  { name: "Ouargla", home: 850, desk: 500 },
  { name: "Oran", home: 600, desk: 350 },
  { name: "El Bayadh", home: 800, desk: 450 },
  { name: "Illizi", home: 1200, desk: 800 },
  { name: "Bordj Bou Arréridj", home: 600, desk: 350 },
  { name: "Boumerdès", home: 450, desk: 250 },
  { name: "El Tarf", home: 700, desk: 400 },
  { name: "Tindouf", home: 1200, desk: 800 },
  { name: "Tissemsilt", home: 650, desk: 400 },
  { name: "El Oued", home: 800, desk: 450 },
  { name: "Khenchela", home: 700, desk: 450 },
  { name: "Souk Ahras", home: 700, desk: 450 },
  { name: "Tipaza", home: 450, desk: 250 },
  { name: "Mila", home: 600, desk: 350 },
  { name: "Aïn Defla", home: 550, desk: 350 },
  { name: "Naâma", home: 850, desk: 500 },
  { name: "Aïn Témouchent", home: 650, desk: 400 },
  { name: "Ghardaïa", home: 800, desk: 450 },
  { name: "Relizane", home: 600, desk: 350 },
  { name: "Timimoun", home: 1100, desk: 700 },
  { name: "Bordj Badji Mokhtar", home: 1300, desk: 850 },
  { name: "Ouled Djellal", home: 750, desk: 450 },
  { name: "Béni Abbès", home: 1000, desk: 600 },
  { name: "In Salah", home: 1200, desk: 800 },
  { name: "In Guezzam", home: 1300, desk: 850 },
  { name: "Touggourt", home: 850, desk: 500 },
  { name: "Djanet", home: 1300, desk: 850 },
  { name: "El M'Ghair", home: 800, desk: 450 },
  { name: "El Meniaa", home: 900, desk: 550 },
];

const inputCls =
  "w-full border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ash/60 transition-colors focus:border-ink focus:outline-none";

type PlacedOrder = {
  number: string;
  email: string;
  firstName: string;
  wilaya: string;
  delivery: string;
  count: number;
  total: number;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ash">
        {label}
      </span>
      {children}
    </label>
  );
}

function StepHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-editorial text-base italic text-ash">{index}</span>
      <span className="h-px w-8 bg-ink" />
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
        {title}
      </h2>
    </div>
  );
}

function OptionCard({
  active,
  onClick,
  title,
  desc,
  right,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  right?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-between gap-4 border px-5 py-4 text-left transition-colors duration-300 ${
        active ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
            active ? "border-paper" : "border-ink/40"
          }`}
        >
          {active && <span className="h-2.5 w-2.5 rounded-full bg-paper" />}
        </span>
        <span>
          <span className="block text-sm font-semibold">{title}</span>
          <span
            className={`block text-xs ${active ? "text-paper/70" : "text-ash"}`}
          >
            {desc}
          </span>
        </span>
      </span>
      {right && <span className="shrink-0 text-sm font-semibold">{right}</span>}
    </button>
  );
}

function SummaryRow({ item }: { item: CartItem }) {
  return (
    <li className="flex gap-3">
      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-[2px] bg-smoke">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="3.5rem"
          className="object-cover grayscale"
        />
        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[0.6rem] font-bold text-paper">
          {item.qty}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium leading-snug">{item.name}</p>
        <p className="mt-0.5 text-xs text-ash">
          {item.color && item.size
            ? `${item.color} · ${item.size}`
            : item.category}
        </p>
      </div>
      <span className="shrink-0 text-sm font-semibold">
        {formatPrice(item.price * item.qty)}
      </span>
    </li>
  );
}

export function CheckoutView() {
  const { items, subtotal, count, clear, hydrated } = useStore();
  const lenis = useLenis();

  const [delivery, setDelivery] = useState<"home" | "stopdesk">("home");
  const [wilaya, setWilaya] = useState("");
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  const selectedWilaya = WILAYAS.find((w) => w.name === wilaya);
  const baseShipping = selectedWilaya
    ? delivery === "home"
      ? selectedWilaya.home
      : selectedWilaya.desk
    : null;
  const shipping = baseShipping ?? 0;
  const total = subtotal + shipping;

  function rate(method: "home" | "desk") {
    if (!selectedWilaya) return "—";
    return formatPrice(selectedWilaya[method]);
  }

  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const number =
      "NX-" + String(Math.floor(Math.random() * 900000) + 100000);
    setOrder({
      number,
      email: String(data.get("email") ?? ""),
      firstName: String(data.get("firstName") ?? ""),
      wilaya,
      delivery: delivery === "home" ? "Home delivery" : "Stopdesk pickup",
      count,
      total,
    });
    clear();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0 });
  }

  // Avoid flashing the empty state before the cart loads from localStorage.
  if (!hydrated) return <div className="min-h-[60vh]" />;

  // ── Confirmation ──
  if (order) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-paper px-5 py-24 lg:px-10">
        <div className="w-full max-w-xl text-center">
          <Reveal>
            <span className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full border border-ink">
              <CheckIcon className="h-7 w-7" />
            </span>
          </Reveal>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.03em]">
            <MaskText>Order</MaskText>
            <MaskText delay={0.08}>
              Confirmed<span className="font-editorial font-normal italic">.</span>
            </MaskText>
          </h1>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-ash">
              Thank you{order.firstName ? `, ${order.firstName}` : ""} — your
              order{" "}
              <span className="font-semibold text-ink">{order.number}</span> is
              confirmed. A receipt is on its way to{" "}
              <span className="text-ink">{order.email}</span>.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="mx-auto mt-10 max-w-sm divide-y divide-ink/10 border-y border-ink/10 text-sm">
              <div className="flex justify-between py-3">
                <dt className="text-ash">Items</dt>
                <dd className="font-medium">{order.count}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-ash">Deliver to</dt>
                <dd className="font-medium">{order.wilaya}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-ash">Delivery</dt>
                <dd className="font-medium">{order.delivery}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="font-semibold uppercase tracking-[0.14em]">
                  Total
                </dt>
                <dd className="font-display text-lg font-bold">
                  {formatPrice(order.total)}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic strength={0.4}>
                <Link
                  href="/shop"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full bg-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                  />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                    Continue Shopping
                  </span>
                </Link>
              </Magnetic>
              <Link
                href="/"
                className="text-sm font-semibold uppercase tracking-[0.12em] underline-offset-4 hover:underline"
              >
                Back home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // ── Empty cart ──
  if (items.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-paper px-5 text-center">
        <BagIcon className="h-12 w-12 text-ink/30" />
        <div>
          <p className="font-display text-2xl font-bold uppercase tracking-tight">
            Your bag is empty
          </p>
          <p className="mt-1 text-sm text-ash">
            Add a few pieces before checking out.
          </p>
        </div>
        <Magnetic strength={0.4}>
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full bg-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
            />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
              Continue Shopping
            </span>
          </Link>
        </Magnetic>
      </section>
    );
  }

  // ── Checkout form ──
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[110rem] px-5 pt-10 lg:px-10 lg:pt-14">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-ash">
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition-colors hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <span className="text-ink">Checkout</span>
        </nav>

        <h1 className="mb-10 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.035em] lg:mb-14">
          <MaskText>Checkout</MaskText>
        </h1>

        <form
          onSubmit={placeOrder}
          className="grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-12"
        >
          {/* Left: details */}
          <div className="flex flex-col gap-12 lg:col-span-7">
            {/* Contact */}
            <div>
              <StepHeading index="01" title="Contact" />
              <Field label="Email address">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  className={inputCls}
                />
              </Field>
            </div>

            {/* Delivery details */}
            <div>
              <StepHeading index="02" title="Delivery details" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <input
                    name="firstName"
                    required
                    autoComplete="given-name"
                    placeholder="First name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Last name">
                  <input
                    name="lastName"
                    required
                    autoComplete="family-name"
                    placeholder="Last name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="0X XX XX XX XX"
                    className={inputCls}
                  />
                </Field>
                <Field label="Wilaya">
                  <select
                    name="wilaya"
                    required
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select a wilaya</option>
                    {WILAYAS.map((w, i) => (
                      <option key={w.name} value={w.name}>
                        {String(i + 1).padStart(2, "0")} — {w.name} (
                        {formatPrice(w.home)})
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Address">
                    <input
                      name="address"
                      required
                      autoComplete="street-address"
                      placeholder="Street, building, apartment"
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Field label="Commune / City">
                  <input
                    name="city"
                    required
                    autoComplete="address-level2"
                    placeholder="Commune"
                    className={inputCls}
                  />
                </Field>
                <Field label="Postal code (optional)">
                  <input
                    name="postal"
                    autoComplete="postal-code"
                    placeholder="00000"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            {/* Delivery method */}
            <div>
              <StepHeading index="03" title="Delivery method" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <OptionCard
                  active={delivery === "home"}
                  onClick={() => setDelivery("home")}
                  title="Home delivery"
                  desc="To your door · 2–4 days"
                  right={rate("home")}
                />
                <OptionCard
                  active={delivery === "stopdesk"}
                  onClick={() => setDelivery("stopdesk")}
                  title="Stopdesk pickup"
                  desc="Collect at relay · 1–3 days"
                  right={rate("desk")}
                />
              </div>
              {!selectedWilaya && (
                <p className="mt-3 text-xs text-ash">
                  Select your wilaya to see the delivery price.
                </p>
              )}

              <Field label="Order notes (optional)">
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Anything we should know?"
                  className={`${inputCls} mt-6 resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-5">
            <div className="border border-ink/10 bg-smoke/40 p-6 lg:sticky lg:top-28 lg:p-8">
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">
                Order Summary <span className="text-ash">({count})</span>
              </h2>

              <ul className="mt-6 space-y-5">
                {items.map((item) => (
                  <SummaryRow key={item.id} item={item} />
                ))}
              </ul>

              <dl className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ash">Subtotal</dt>
                  <dd className="font-medium">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ash">
                    Shipping{selectedWilaya ? ` · ${selectedWilaya.name}` : ""}
                  </dt>
                  <dd className="font-medium">
                    {selectedWilaya ? formatPrice(shipping) : "Select wilaya"}
                  </dd>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-3">
                  <dt className="font-semibold uppercase tracking-[0.14em]">
                    Total
                  </dt>
                  <dd className="font-display text-2xl font-bold">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              <Magnetic strength={0.2} className="mt-6">
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full bg-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                  />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                    Place Order — {formatPrice(total)}
                  </span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-[transform,color] duration-500 group-hover:translate-x-1 group-hover:text-ink" />
                </button>
              </Magnetic>

              <p className="mt-4 text-center text-xs text-ash">
                Cash on delivery · 30-day returns · Delivery to all 58 wilayas
              </p>
            </div>
          </div>
        </form>
      </div>

      <div className="h-20 lg:h-28" />
    </section>
  );
}
