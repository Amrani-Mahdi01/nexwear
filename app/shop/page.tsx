import type { Metadata } from "next";
import { ShopView } from "@/components/shop/shop-view";

export const metadata: Metadata = {
  title: "Shop — NexWear",
  description:
    "Shop the full NexWear SS26 collection. Monochrome outerwear, knitwear, denim, tailoring and accessories. Filter by category and sort by price.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const sp = await searchParams;
  const category = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  return <ShopView initialCategory={category} />;
}
