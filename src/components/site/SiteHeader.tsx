import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import logoClean from "@/assets/logo-clean.png";

const NAV = [
  { to: "/shop", label: "Store" },
  { to: "/certificates", label: "Lab Reports & Legal" },
  { to: "/returns", label: "10-Day Returns" },
] as const;

export function SiteHeader() {
  const { count, profile } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      setOpen(false);
      setSearchOpen(false);
      void navigate({ to: "/shop", search: { q: q.trim() } });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/90 bg-[#FAF7F2]/95 text-stone-900 backdrop-blur-md shadow-[0_1px_3px_rgba(40,30,20,0.03)]">
      {/* Top Banner - Clean, single-line ticker */}
      <div className="border-b border-stone-200/70 bg-[#F2ECE4] py-1.5 px-3 text-center text-[11px] sm:text-xs font-medium text-stone-700">
        <div className="mx-auto flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="inline-flex items-center gap-1 text-[#D9622B] font-bold">
            <span>⚡</span> Verified Drop-Shipping Hub
          </span>
          <span className="hidden sm:inline text-stone-400">•</span>
          <span className="hidden sm:inline font-medium">Free Delivery Over ₹999</span>
          <span className="text-stone-400">•</span>
          <span className="font-medium">100% Lab-Tested Supplements</span>
          <span className="hidden md:inline text-stone-400">•</span>
          <span className="hidden md:inline font-medium">10-Day Doorstep Returns</span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group focus:outline-none">
          <img
            src={logoClean}
            alt="D&S Sports Club Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-2xl font-black uppercase tracking-tight leading-none text-stone-900 whitespace-nowrap">
              D<span className="text-[#D9622B]">&</span>S <span className="font-semibold text-stone-800">Sports Club</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-stone-500 whitespace-nowrap">
              Verified Sports & Nutrition
            </span>
          </div>
        </Link>

        {/* Desktop Search Bar (Only on large screens to prevent overlap) */}
        <form
          onSubmit={handleSearch}
          className="hidden xl:flex max-w-sm flex-1 items-center rounded-full border border-stone-300/80 bg-white px-3.5 shadow-sm transition-all focus-within:border-[#D9622B] focus-within:ring-2 focus-within:ring-[#D9622B]/20"
        >
          <Search className="size-4 text-stone-400 shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search whey, dumbbells, shakers..."
            className="h-9 flex-1 bg-transparent px-2.5 text-xs text-stone-900 outline-none placeholder:text-stone-400"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="text-[11px] text-stone-400 hover:text-stone-700 font-medium"
            >
              Clear
            </button>
          )}
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-stone-600 transition-colors hover:text-stone-950"
              activeProps={{ className: "text-[#D9622B] font-black" }}
            >
              {n.label}
            </Link>
          ))}

          {/* Fit Guide Pill */}
          <Link
            to="/quiz"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D9622B]/30 bg-[#D9622B]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#D9622B] transition-all hover:bg-[#D9622B] hover:text-white hover:shadow-md hover:shadow-[#D9622B]/20"
          >
            <Sparkles className="size-3.5" />
            {profile ? `Kit: ${profile.name.split(" ")[0]}` : "Fit Guide"}
          </Link>
        </nav>

        {/* Right Action Icons: Search (mobile/tablet), Cart & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Quick Search Toggle for screens < xl */}
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="xl:hidden grid size-9 place-items-center rounded-xl border border-stone-200/90 bg-white text-stone-700 shadow-sm hover:bg-stone-50 hover:text-stone-950 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative grid size-9 place-items-center rounded-xl border border-stone-200/90 bg-white text-stone-800 shadow-sm hover:bg-stone-50 hover:text-stone-950 transition-colors"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="size-4" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1.5 -top-1.5 grid min-w-4 h-4 place-items-center rounded-full bg-[#D9622B] px-1 text-[10px] font-black text-white shadow-sm"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden grid size-9 place-items-center rounded-xl border border-stone-200/90 bg-white text-stone-800 shadow-sm hover:bg-stone-50 hover:text-stone-950 cursor-pointer"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Pop-down Search Bar for Mobile/Tablet */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-stone-200 bg-[#FAF7F2] px-4 py-3 xl:hidden"
          >
            <form onSubmit={handleSearch} className="flex items-center rounded-xl border border-stone-300 bg-white px-3 shadow-sm">
              <Search className="size-4 text-stone-400 mr-2 shrink-0" />
              <input
                value={q}
                autoFocus
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search real branded supplements, gear..."
                className="h-10 w-full bg-transparent text-xs text-stone-900 outline-none placeholder:text-stone-400"
              />
              <button type="submit" className="text-xs font-bold text-[#D9622B] px-2 cursor-pointer">
                Go
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-stone-200 bg-[#FAF7F2] px-4 py-5 lg:hidden shadow-xl"
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-white hover:text-stone-950 transition-colors"
              >
                Store & Products
              </Link>
              <Link
                to="/certificates"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-white hover:text-stone-950 transition-colors"
              >
                Lab Reports & Legal Certificates
              </Link>
              <Link
                to="/returns"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-white hover:text-stone-950 transition-colors"
              >
                10-Day Easy Returns
              </Link>
              <Link
                to="/quiz"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl border border-[#D9622B]/30 bg-[#D9622B]/10 px-4 py-3 text-sm font-bold text-[#D9622B] transition-colors hover:bg-[#D9622B] hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="size-4" />
                  {profile ? `Personalized Starter Kit for ${profile.name}` : "Start Personalized Fit Guide"}
                </span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
