import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, Sparkles, X, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import logoWhite from "@/assets/logo-white.png";

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
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090d14]/95 text-slate-100 backdrop-blur-md">
      {/* Top Banner - Clean, single-line ticker */}
      <div className="border-b border-slate-800/50 bg-[#0b101c] py-1.5 px-3 text-center text-[11px] sm:text-xs font-medium text-slate-300">
        <div className="mx-auto flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="inline-flex items-center gap-1 text-sky-400 font-semibold">
            <span>⚡</span> Verified Drop-Shipping Hub
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline">Free Delivery Over ₹999</span>
          <span className="text-slate-600">•</span>
          <span>100% Lab-Tested Supplements</span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline">10-Day Doorstep Returns</span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group focus:outline-none">
          <img
            src={logoWhite}
            alt="D&S Sports Club Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-2xl font-black uppercase tracking-tight leading-none text-white whitespace-nowrap">
              D<span className="text-sky-400">&</span>S <span className="font-semibold text-slate-200">Sports Club</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 whitespace-nowrap">
              Verified Sports & Nutrition
            </span>
          </div>
        </Link>

        {/* Desktop Search Bar (Only on large screens to prevent overlap) */}
        <form
          onSubmit={handleSearch}
          className="hidden xl:flex max-w-sm flex-1 items-center rounded-full border border-slate-700/60 bg-slate-900/80 px-3.5 transition-all focus-within:border-sky-400/80 focus-within:ring-1 focus-within:ring-sky-400/30"
        >
          <Search className="size-4 text-slate-400 shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search whey, dumbbells, shakers..."
            className="h-9 flex-1 bg-transparent px-2.5 text-xs text-slate-100 outline-none placeholder:text-slate-500"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="text-[11px] text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-slate-300 transition-colors hover:text-white"
              activeProps={{ className: "text-sky-400 font-bold" }}
            >
              {n.label}
            </Link>
          ))}

          {/* Fit Guide Pill */}
          <Link
            to="/quiz"
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 transition-all hover:bg-sky-400 hover:text-slate-950"
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
            className="xl:hidden grid size-9 place-items-center rounded-xl border border-slate-700/60 bg-slate-900 text-slate-300 hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative grid size-9 place-items-center rounded-xl border border-slate-700/60 bg-slate-900 text-slate-200 hover:text-white transition-colors"
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
                  className="absolute -right-1 -top-1 grid min-w-4 h-4 place-items-center rounded-full bg-sky-400 px-1 text-[10px] font-black text-slate-950 shadow"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden grid size-9 place-items-center rounded-xl border border-slate-700/60 bg-slate-900 text-slate-200 hover:text-white"
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
            className="overflow-hidden border-t border-slate-800 bg-[#090d14] px-4 py-3 xl:hidden"
          >
            <form onSubmit={handleSearch} className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3">
              <Search className="size-4 text-slate-400 mr-2 shrink-0" />
              <input
                value={q}
                autoFocus
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search real branded supplements, gear..."
                className="h-10 w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
              />
              <button type="submit" className="text-xs font-bold text-sky-400 px-2">
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
            className="overflow-hidden border-t border-slate-800 bg-[#090d14]/98 px-4 py-5 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 transition-colors"
              >
                Store & Products
              </Link>
              <Link
                to="/certificates"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 transition-colors"
              >
                Lab Reports & Legal Certificates
              </Link>
              <Link
                to="/returns"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 transition-colors"
              >
                10-Day Easy Returns
              </Link>
              <Link
                to="/quiz"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl border border-sky-400/40 bg-sky-400/10 px-4 py-3 text-sm font-bold text-sky-400 transition-colors hover:bg-sky-400 hover:text-slate-950"
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
