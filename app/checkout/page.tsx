import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout — NexWear",
  description: "Securely complete your NexWear order.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
