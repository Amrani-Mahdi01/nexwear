import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreProvider } from "@/components/store";
import { CartDrawer } from "@/components/cart-drawer";
import { SearchOverlay } from "@/components/search-overlay";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PageTransition } from "@/components/page-transition";

const display = Bricolage_Grotesque({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const editorial = Fraunces({
  variable: "--ff-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const body = Hanken_Grotesk({
  variable: "--ff-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexWear — Wear What's Next",
  description:
    "NexWear is a monochrome wardrobe engineered for the city. Considered cuts, heavyweight cottons and zero noise. Discover the SS26 collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${editorial.variable} ${body.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink">
        <div className="grain-overlay" aria-hidden />
        <SmoothScroll>
          <StoreProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <CartDrawer />
            <SearchOverlay />
            <PageTransition />
          </StoreProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
