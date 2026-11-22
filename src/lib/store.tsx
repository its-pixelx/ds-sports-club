import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "@/data/products";
import type { Profile } from "./recommend";

export interface CartLine { slug: string; option?: string; qty: number }
interface StoreCtx {
  cart: CartLine[];
  lines: { line: CartLine; product: Product }[];
  count: number;
  subtotal: number;
  add: (slug: string, option?: string, qty?: number) => void;
  setQty: (slug: string, option: string | undefined, qty: number) => void;
  remove: (slug: string, option?: string) => void;
  profile: Profile | null;
  saveProfile: (p: Profile | null) => void;
  ready: boolean;
}
const Ctx = createContext<StoreCtx | null>(null);
const CART_KEY = "bs-cart";
const PROFILE_KEY = "bs-profile";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const p = localStorage.getItem(PROFILE_KEY);
      if (c) setCart(JSON.parse(c) as CartLine[]);
      if (p) setProfile(JSON.parse(p) as Profile);
    } catch { /* ignore corrupt storage */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart, ready]);

  const add = useCallback((slug: string, option?: string, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((l) => l.slug === slug && l.option === option);
      if (i >= 0) return c.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
      return [...c, option ? { slug, option, qty } : { slug, qty }];
    });
  }, []);
  const setQty = useCallback((slug: string, option: string | undefined, qty: number) => {
    setCart((c) => c.map((l) => (l.slug === slug && l.option === option ? { ...l, qty: Math.max(1, qty) } : l)));
  }, []);
  const remove = useCallback((slug: string, option?: string) => {
    setCart((c) => c.filter((l) => !(l.slug === slug && l.option === option)));
  }, []);
  const saveProfile = useCallback((p: Profile | null) => {
    setProfile(p);
    if (p) localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    else localStorage.removeItem(PROFILE_KEY);
  }, []);

  const value = useMemo(() => {
    const lines = cart.flatMap((line) => {
      const product = getProduct(line.slug);
      return product ? [{ line, product }] : [];
    });
    return {
      cart, lines, add, setQty, remove, profile, saveProfile, ready,
      count: lines.reduce((s, l) => s + l.line.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.line.qty * l.product.price, 0),
    };
  }, [cart, profile, ready, add, setQty, remove, saveProfile]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be inside StoreProvider");
  return c;
}
