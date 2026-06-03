import { Reveal } from "@/components/reveal";
import {
  ShippingIcon,
  ReturnsIcon,
  SecureIcon,
  LeafIcon,
} from "@/components/icons";

const VALUES = [
  {
    Icon: ShippingIcon,
    title: "Fast Nationwide Delivery",
    text: "Home delivery & stopdesk pickup across all 58 wilayas.",
  },
  {
    Icon: ReturnsIcon,
    title: "30-Day Easy Returns",
    text: "Changed your mind? Send it back within 30 days, on us.",
  },
  {
    Icon: SecureIcon,
    title: "Secure Checkout",
    text: "Encrypted payments with every major method supported.",
  },
  {
    Icon: LeafIcon,
    title: "100% Organic Cotton",
    text: "Responsibly sourced, GOTS-certified heavyweight fabrics.",
  },
];

export function Values() {
  return (
    <section
      aria-label="Our commitments"
      className="border-y border-ink/10 bg-smoke/60"
    >
      <div className="mx-auto grid max-w-[110rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map(({ Icon, title, text }, i) => (
          <Reveal
            key={title}
            delay={(i % 4) * 0.08}
            className="border-ink/10 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:last-child]:border-r-0"
          >
            <div className="group flex h-full flex-col gap-4 p-8 transition-colors duration-500 hover:bg-ink hover:text-paper lg:p-10">
              <Icon className="h-8 w-8 transition-transform duration-500 group-hover:-translate-y-1" />
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash transition-colors duration-500 group-hover:text-paper/70">
                  {text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
