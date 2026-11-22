import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpDown,
  Filter,
  FlaskConical,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/site/ProductCard";
import {
  CATEGORIES,
  GOAL_LABELS,
  PRODUCTS,
  type Category,
  type Diet,
  type Goal,
  type Product,
} from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
    category: typeof search.category === "string" ? (search.category as Category) : undefined,
    goal: typeof search.goal === "string" ? (search.goal as Goal) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Official Store Catalog — D&S Sports Club" },
      { name: "description", content: "Explore real branded supplements (Optimum Nutrition, MuscleBlaze, Creapure) and gym gear with certified lab reports and 10-day returns." },
    ],
  }),
  component: ShopPage,
});

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

function ShopPage() {
  const searchParams = Route.useSearch();
  const { profile, saveProfile } = useStore();

  // Search & Filters state
  const [query, setQuery] = useState(searchParams.q || "");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    searchParams.category || "all"
  );
  const [selectedGoal, setSelectedGoal] = useState<Goal | "all">(
    searchParams.goal || (profile ? profile.goal : "all")
  );
  const [onlyLabTested, setOnlyLabTested] = useState(false);
  const [onlyBeginner, setOnlyBeginner] = useState(
    profile ? profile.level === "beginner" : false
  );
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<Diet | "all">(
    profile ? profile.diet : "all"
  );
  const [maxPrice, setMaxPrice] = useState<number>(12000);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesShort = p.short.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesType = p.type.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesShort && !matchesCategory && !matchesType) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }

      // Goal filter
      if (selectedGoal !== "all" && !p.goals.includes(selectedGoal)) {
        return false;
      }

      // Lab Tested filter
      if (onlyLabTested && !p.labReport) {
        return false;
      }

      // Beginner Friendly filter
      if (onlyBeginner && !p.beginnerFriendly) {
        return false;
      }

      // Stock filter
      if (onlyInStock && p.stock <= 0) {
        return false;
      }

      // Diet filter
      if (selectedDiet !== "all") {
        if (selectedDiet === "vegan" && p.diet !== "vegan" && p.diet !== "na") return false;
        if (selectedDiet === "veg" && p.diet === "non-veg") return false;
      }

      // Price filter
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [
    query,
    selectedCategory,
    selectedGoal,
    onlyLabTested,
    onlyBeginner,
    onlyInStock,
    selectedDiet,
    maxPrice,
    sortBy,
  ]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedGoal !== "all") count++;
    if (onlyLabTested) count++;
    if (onlyBeginner) count++;
    if (onlyInStock) count++;
    if (selectedDiet !== "all") count++;
    if (maxPrice < 12000) count++;
    return count;
  }, [
    selectedCategory,
    selectedGoal,
    onlyLabTested,
    onlyBeginner,
    onlyInStock,
    selectedDiet,
    maxPrice,
  ]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGoal("all");
    setOnlyLabTested(false);
    setOnlyBeginner(false);
    setOnlyInStock(false);
    setSelectedDiet("all");
    setMaxPrice(12000);
    setQuery("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Top Banner & Personalization Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Store Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real branded sports nutrition & training gear with NABL batch reports and 10-day doorstep returns.
          </p>
        </div>

        {/* Personalized Profile Pill */}
        {profile ? (
          <div className="flex items-center gap-3 rounded-2xl border border-sky-400/30 bg-sky-400/10 p-3 sm:px-4">
            <Sparkles className="size-4 text-sky-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">
                Matched for {profile.name} ({profile.goal.toUpperCase()})
              </p>
              <p className="text-slate-400">
                {profile.level} · {profile.diet}
              </p>
            </div>
            <button
              onClick={() => saveProfile(null)}
              className="text-xs text-slate-400 hover:text-white underline ml-2"
              title="Clear saved preferences"
            >
              Reset
            </button>
          </div>
        ) : (
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:border-sky-400 hover:text-sky-400 transition-colors"
          >
            <Sparkles className="size-3.5 text-sky-400" /> Start Fit Guide
          </Link>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search real brands (Optimum Nutrition, MuscleBlaze, Creapure, Rogue)..."
            className="h-10 w-full rounded-xl border border-slate-800 bg-[#0c121e] pl-10 pr-10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Filter Drawer Trigger & Sort */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Sheet */}
          <Sheet open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden flex items-center gap-2 h-10 border-slate-800 bg-[#0c121e] text-xs">
                <SlidersHorizontal className="size-3.5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="grid size-4 place-items-center rounded-full bg-sky-400 text-[10px] font-black text-slate-950">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto bg-[#090d14] border-slate-800 text-white p-5">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl uppercase text-white">Catalog Filters</SheetTitle>
                <SheetDescription className="text-slate-400 text-xs">
                  Filter by department, fitness goal, and dietary safety
                </SheetDescription>
              </SheetHeader>
              <div className="py-5 space-y-5">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Department</p>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`text-left text-xs py-2 px-3 rounded-lg font-semibold ${selectedCategory === "all" ? "bg-sky-400 text-slate-950" : "text-slate-300 hover:bg-slate-900"}`}
                    >
                      All Departments
                    </button>
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`text-left text-xs py-2 px-3 rounded-lg font-semibold ${selectedCategory === c.id ? "bg-sky-400 text-slate-950" : "text-slate-300 hover:bg-slate-900"}`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyLabTested}
                      onChange={(e) => setOnlyLabTested(e.target.checked)}
                      className="size-4 rounded accent-sky-400"
                    />
                    <span>🔬 Lab Tested Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyBeginner}
                      onChange={(e) => setOnlyBeginner(e.target.checked)}
                      className="size-4 rounded accent-sky-400"
                    />
                    <span>⭐ Beginner Friendly</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="size-4 rounded accent-sky-400"
                    />
                    <span>📦 In Stock Only</span>
                  </label>
                </div>

                <Button className="w-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold" onClick={() => setFilterDrawerOpen(false)}>
                  Show {filteredProducts.length} Results
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0c121e] px-3 h-10 text-xs">
            <ArrowUpDown className="size-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-medium outline-none cursor-pointer text-xs text-white"
            >
              <option value="featured" className="bg-slate-900">Best Sellers</option>
              <option value="price-asc" className="bg-slate-900">Price: Low to High</option>
              <option value="price-desc" className="bg-slate-900">Price: High to Low</option>
              <option value="rating" className="bg-slate-900">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Horizontal Quick Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            selectedCategory === "all"
              ? "bg-sky-400 text-slate-950 shadow"
              : "border border-slate-800 bg-[#0c121e] text-slate-400 hover:text-white"
          }`}
        >
          All Items ({PRODUCTS.length})
        </button>
        {CATEGORIES.map((c) => {
          const count = PRODUCTS.filter((p) => p.category === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-sky-400 text-slate-950 shadow"
                  : "border border-slate-800 bg-[#0c121e] text-slate-400 hover:text-white"
              }`}
            >
              {c.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Content Area: Desktop Sidebar + Product Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-5 rounded-2xl border border-slate-800 bg-[#0c121e] p-5 shadow-sm h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-display text-base font-bold uppercase text-white">Filters</span>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-slate-400 hover:text-white underline flex items-center gap-1"
              >
                <RotateCcw className="size-3" /> Reset
              </button>
            )}
          </div>

          {/* Fitness Goals */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Fitness Goal
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedGoal("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  selectedGoal === "all"
                    ? "bg-sky-400 text-slate-950 font-bold"
                    : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                }`}
              >
                All
              </button>
              {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGoal(g)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                    selectedGoal === g
                      ? "bg-sky-400 text-slate-950 font-bold"
                      : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                  }`}
                >
                  {GOAL_LABELS[g].split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Checkboxes */}
          <div className="space-y-2.5 border-t border-slate-800 pt-4 text-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Assurance & Safety
            </p>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={onlyLabTested}
                onChange={(e) => setOnlyLabTested(e.target.checked)}
                className="size-4 rounded accent-sky-400"
              />
              <span className="flex items-center gap-1">
                <FlaskConical className="size-3 text-sky-400" /> Lab Tested Only
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={onlyBeginner}
                onChange={(e) => setOnlyBeginner(e.target.checked)}
                className="size-4 rounded accent-sky-400"
              />
              <span>⭐ Beginner Friendly</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="size-4 rounded accent-sky-400"
              />
              <span>📦 In Stock Only</span>
            </label>
          </div>

          {/* Diet Preferences */}
          <div className="border-t border-slate-800 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Diet Filter
            </p>
            <div className="grid grid-cols-3 gap-1 text-xs">
              {[
                { id: "all", label: "Any" },
                { id: "veg", label: "Veg" },
                { id: "vegan", label: "Vegan" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDiet(d.id as Diet | "all")}
                  className={`rounded-lg py-1 font-semibold text-center transition-colors cursor-pointer ${
                    selectedDiet === d.id
                      ? "bg-sky-400 text-slate-950 font-bold"
                      : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Filters Pill Bar */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Active:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-200">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {selectedGoal !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-200">
                  Goal: {selectedGoal}
                  <button onClick={() => setSelectedGoal("all")}>
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {onlyLabTested && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-200">
                  Lab Tested
                  <button onClick={() => setOnlyLabTested(false)}>
                    <X className="size-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-sky-400 font-bold hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Showing {filteredProducts.length} verified products</span>
            <span>Covered by Amazon-style 10-day returns</span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center space-y-3">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-slate-900 text-slate-400">
                <Search className="size-6" />
              </div>
              <p className="font-display text-lg font-bold uppercase text-white">No items found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try loosening your filters or search keywords to view the catalog.
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters} className="border-slate-800 text-xs">
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
