"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";

export type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  qty: number;
  color?: string;
  size?: string;
};

type StoreContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}

const STORAGE_KEY = "nexwear-cart";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const lenis = useLenis();

  // Load persisted cart after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex((p) => p.id === item.id);
        if (idx > -1) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { ...item, qty }];
      });
      setSearchOpen(false);
      setCartOpen(true);
    },
    [],
  );

  const removeItem = useCallback(
    (id: string) => setItems((prev) => prev.filter((p) => p.id !== id)),
    [],
  );

  const setQty = useCallback(
    (id: string, qty: number) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((p) => p.id !== id)
          : prev.map((p) => (p.id === id ? { ...p, qty } : p)),
      ),
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  // Body scroll lock (incl. pausing Lenis) + Escape to close while open.
  useEffect(() => {
    const open = cartOpen || searchOpen;
    document.body.style.overflow = open ? "hidden" : "";
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setCartOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen, lenis]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = useMemo<StoreContextValue>(
    () => ({
      items,
      count,
      subtotal,
      hydrated,
      addItem,
      removeItem,
      setQty,
      clear,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
    }),
    [items, count, subtotal, hydrated, addItem, removeItem, setQty, clear, cartOpen, searchOpen],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
