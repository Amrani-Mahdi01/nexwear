/** Build an optimized Unsplash URL. All ids below are verified to resolve. */
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

/** Format an integer DZD amount, e.g. 18900 -> "18 900 DZD". */
export const formatPrice = (n: number) =>
  `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} DZD`;

export type Category = {
  name: string;
  count: string;
  href: string;
  image: string;
};

export const categories: Category[] = [
  { name: "Outerwear", count: "48", href: "/shop?category=Outerwear", image: img("photo-1551028719-00167b16eac5", 900) },
  { name: "Knitwear", count: "32", href: "/shop?category=Knitwear", image: img("photo-1520975954732-35dd22299614", 900) },
  { name: "Denim", count: "26", href: "/shop?category=Denim", image: img("photo-1542272604-787c3835535d", 900) },
  { name: "Tailoring", count: "19", href: "/shop?category=Tailoring", image: img("photo-1521223890158-f9f7c3d5d504", 900) },
  { name: "Footwear", count: "23", href: "/shop?category=Footwear", image: img("photo-1460353581641-37baddab0fa2", 900) },
  { name: "Accessories", count: "41", href: "/shop?category=Accessories", image: img("photo-1525450824786-227cbef70703", 900) },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  tag?: "New" | "Sale";
  colors: string[];
  image: string;
  href: string;
};

export const products: Product[] = [
  { id: "p1", name: "Heavyweight Hooded Parka", category: "Outerwear", price: 18900, tag: "New", colors: ["Black", "Charcoal"], href: "/shop/p1", image: img("photo-1544022613-e87ca75a784a", 800) },
  { id: "p2", name: "Ribbed Wool Sweater", category: "Knitwear", price: 9500, colors: ["Charcoal", "Stone", "Off-White"], href: "/shop/p2", image: img("photo-1602810318383-e386cc2a3ccf", 800) },
  { id: "p3", name: "Selvedge Denim — Raw", category: "Denim", price: 12500, oldPrice: 16000, tag: "Sale", colors: ["Black", "Charcoal"], href: "/shop/p3", image: img("photo-1542272604-787c3835535d", 800) },
  { id: "p4", name: "Boxy Cotton Tee", category: "Essentials", price: 3200, tag: "New", colors: ["Black", "Off-White", "Stone"], href: "/shop/p4", image: img("photo-1521572163474-6864f9cf17ab", 800) },
  { id: "p5", name: "Oversized Denim Jacket", category: "Outerwear", price: 14500, colors: ["Black", "Stone"], href: "/shop/p5", image: img("photo-1554568218-0f1715e72254", 800) },
  { id: "p6", name: "Pleated Wide Trouser", category: "Tailoring", price: 8900, colors: ["Black", "Charcoal", "Stone"], href: "/shop/p6", image: img("photo-1591047139829-d91aecb6caea", 800) },
  { id: "p7", name: "Leather Derby Shoe", category: "Footwear", price: 16900, colors: ["Black"], href: "/shop/p7", image: img("photo-1460353581641-37baddab0fa2", 800) },
  { id: "p8", name: "Canvas Tote — Mono", category: "Accessories", price: 4500, tag: "New", colors: ["Off-White", "Black"], href: "/shop/p8", image: img("photo-1525450824786-227cbef70703", 800) },
  { id: "p9", name: "Wool Overcoat", category: "Outerwear", price: 24900, tag: "New", colors: ["Charcoal", "Black"], href: "/shop/p9", image: img("photo-1434389677669-e08b4cac3105", 800) },
  { id: "p10", name: "Cashmere Crewneck", category: "Knitwear", price: 13900, colors: ["Stone", "Off-White", "Charcoal"], href: "/shop/p10", image: img("photo-1593030761757-71fae45fa0e7", 800) },
  { id: "p11", name: "Straight-Leg Jean", category: "Denim", price: 10500, colors: ["Black", "Charcoal"], href: "/shop/p11", image: img("photo-1487412720507-e7ab37603c6f", 800) },
  { id: "p12", name: "Cropped Bomber", category: "Outerwear", price: 15900, oldPrice: 19900, tag: "Sale", colors: ["Black"], href: "/shop/p12", image: img("photo-1551232864-3f0890e580d9", 800) },
  { id: "p13", name: "Relaxed Linen Shirt", category: "Essentials", price: 5900, colors: ["Off-White", "Stone"], href: "/shop/p13", image: img("photo-1576871337622-98d48d1cf531", 800) },
  { id: "p14", name: "Tailored Blazer", category: "Tailoring", price: 19500, colors: ["Black", "Charcoal"], href: "/shop/p14", image: img("photo-1492707892479-7bc8d5a4ee93", 800) },
  { id: "p15", name: "Suede Chelsea Boot", category: "Footwear", price: 17900, tag: "New", colors: ["Charcoal", "Stone"], href: "/shop/p15", image: img("photo-1556306535-0f09a537f0a3", 800) },
  { id: "p16", name: "Woven Leather Belt", category: "Accessories", price: 3900, colors: ["Black", "Charcoal"], href: "/shop/p16", image: img("photo-1483118714900-540cf339fd46", 800) },
];

export const productCategories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export type ColorOption = { name: string; hex: string };

/** Monochrome palette — the whole brand is black & white. */
export const DEFAULT_COLORS: ColorOption[] = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "Charcoal", hex: "#3f3f3f" },
  { name: "Stone", hex: "#b7b1a7" },
  { name: "Off-White", hex: "#efece4" },
];

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const SHOE_SIZES = ["40", "41", "42", "43", "44", "45"];

export function productSizes(p: Product): string[] {
  if (p.category === "Accessories") return ["One Size"];
  if (p.category === "Footwear") return SHOE_SIZES;
  return APPAREL_SIZES;
}

const GALLERY_POOL = [
  "photo-1485462537746-965f33f7f6a7",
  "photo-1490481651871-ab68de25d43d",
  "photo-1469334031218-e382a71b716b",
  "photo-1539109136881-3be0616acf4b",
  "photo-1576566588028-4147f3842f27",
  "photo-1445205170230-053b83016050",
];

/** Main image + two editorial detail shots (deterministic per product). */
export function productGallery(p: Product): string[] {
  const n = Number(p.id.replace(/\D/g, "")) || 0;
  return [
    p.image,
    img(GALLERY_POOL[n % GALLERY_POOL.length], 1000),
    img(GALLERY_POOL[(n + 2) % GALLERY_POOL.length], 1000),
  ];
}

export function productDescription(p: Product): string {
  return `The ${p.name} is a considered ${p.category.toLowerCase()} piece from the SS26 collection. Cut from heavyweight, responsibly sourced fabric in a strict monochrome palette — built to layer, made to last.`;
}

export const PRODUCT_DETAILS = [
  "Heavyweight, GOTS-certified organic fabric",
  "Relaxed, true-to-size fit",
  "Designed in Algiers — worn worldwide",
  "Machine wash cold, line dry",
];

export function relatedProducts(p: Product, count = 4): Product[] {
  const sameCat = products.filter(
    (x) => x.category === p.category && x.id !== p.id,
  );
  const others = products.filter(
    (x) => x.category !== p.category && x.id !== p.id,
  );
  return [...sameCat, ...others].slice(0, count);
}
