import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronRight,
  Download,
  Dumbbell,
  FileText,
  FlaskConical,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabReportView } from "@/components/site/LabReportDialog";
import { Stars } from "@/components/site/Stars";
import { StockBadge } from "@/components/site/StockBadge";
import { discount, formatINR, getProduct, PRODUCTS, type Product } from "@/data/products";
import { matchesProfile } from "@/lib/recommend";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — D&S Sports Club` : "Product Not Found" },
        { name: "description", content: p?.short || "D&S Sports Club sports and fitness gear." },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const { add, profile } = useStore();

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-black uppercase text-white">Product Not Found</h1>
        <p className="mt-2 text-xs text-slate-400">The item you are looking for may have been moved or removed from our catalog.</p>
        <Button asChild className="mt-6 bg-sky-400 text-slate-950 font-bold">
          <Link to="/shop">Back to Store Catalog</Link>
        </Button>
      </div>
    );
  }

  const [selectedOption, setSelectedOption] = useState<string>(
    product.options?.values[0] || ""
  );
  const [qty, setQty] = useState(1);
  const match = matchesProfile(product, profile);

  const handleAddToCart = () => {
    add(product.slug, selectedOption || undefined, qty);
    toast.success(`Added ${qty}x ${product.name} to cart!`, {
      description: selectedOption ? `Selected: ${selectedOption}` : undefined,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="size-3 shrink-0" />
        <Link to="/shop" className="hover:text-white transition-colors">Store</Link>
        <ChevronRight className="size-3 shrink-0" />
        <Link to="/shop" search={{ category: product.category }} className="capitalize hover:text-white transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="size-3 shrink-0" />
        <span className="truncate text-white font-semibold max-w-[220px]">{product.name}</span>
      </nav>

      {/* Main Buy Box Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column: Visual Gallery & Key Badges */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#0c121e] shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Overlay Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.labReport && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/90 border border-slate-700 px-3 py-1 text-xs font-bold text-sky-400 shadow backdrop-blur-md">
                  <FlaskConical className="size-3.5" /> NABL Lab Tested
                </span>
              )}
              {match && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400 px-3 py-1 text-xs font-black text-slate-950 shadow">
                  <Sparkles className="size-3.5" /> For Your Goal
                </span>
              )}
              {product.beginnerFriendly && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 border border-slate-700 px-3 py-1 text-xs font-bold text-slate-200 shadow">
                  <BadgeCheck className="size-3.5 text-sky-400" /> Beginner Friendly
                </span>
              )}
            </div>

            <span className="absolute right-3 top-3 rounded-full bg-slate-950/90 border border-slate-800 px-2.5 py-1 text-xs font-black text-white shadow">
              -{discount(product)}% OFF
            </span>
          </div>

          {/* Trust Highlights Grid below image */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-xl border border-slate-800 bg-[#0c121e] p-3 text-center">
              <FlaskConical className="size-4 text-sky-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">NABL Tested</p>
              <p className="text-[10px] text-slate-400">Batch CoA</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0c121e] p-3 text-center">
              <RotateCcw className="size-4 text-sky-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">10-Day Return</p>
              <p className="text-[10px] text-slate-400">Doorstep pickup</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0c121e] p-3 text-center">
              <Truck className="size-4 text-sky-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">Free Delivery</p>
              <p className="text-[10px] text-slate-400">Over ₹999</p>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Options & Buy Box */}
        <div className="flex flex-col space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{product.brand}</p>
            <h1 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">{product.short}</p>

            {/* Amazon-style Rating Summary */}
            <div className="mt-3 flex items-center gap-3 border-y border-slate-800 py-2.5">
              <div className="flex items-center gap-1.5">
                <Stars rating={product.rating} />
                <span className="text-xs sm:text-sm font-bold text-white">{product.rating}</span>
              </div>
              <span className="text-slate-600 text-xs">•</span>
              <span className="text-xs text-slate-400">
                {product.reviewsCount.toLocaleString("en-IN")} verified reviews
              </span>
              <span className="text-slate-600 text-xs">•</span>
              <StockBadge stock={product.stock} />
            </div>
          </div>

          {/* Pricing Box */}
          <div className="rounded-2xl border border-slate-800 bg-[#0c121e] p-4 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl sm:text-4xl font-black text-white">
                {formatINR(product.price)}
              </span>
              <span className="text-xs sm:text-sm text-slate-500 line-through">
                {formatINR(product.mrp)}
              </span>
              <span className="rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold">
                Save {formatINR(product.mrp - product.price)} ({discount(product)}%)
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Inclusive of all taxes · 100% genuine drop-shipped brand item with safety seal
            </p>
          </div>

          {/* Option Variant Selector (Flavor, Size, Weight, Color) */}
          {product.options && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select {product.options.label}: <strong className="text-white">{selectedOption}</strong>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.options.values.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setSelectedOption(val)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all border cursor-pointer ${
                      selectedOption === val
                        ? "border-sky-400 bg-sky-400 text-slate-950 shadow"
                        : "border-slate-800 bg-[#0c121e] text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Add to Cart Controls */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quantity:</span>
              <div className="flex items-center rounded-xl border border-slate-800 bg-[#0c121e]">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="p-2 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-xs text-white">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  disabled={qty >= product.stock}
                  className="p-2 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                size="xl"
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-sky-500/20"
              >
                <ShoppingBag className="size-4 mr-2" /> Add to Cart
              </Button>

              {/* Disabled Buy Button (catalog demonstration mode) */}
              <div className="w-full sm:flex-1 relative group">
                <Button
                  size="xl"
                  variant="outline"
                  disabled
                  className="w-full border-slate-800 bg-slate-900/40 text-slate-500 cursor-not-allowed font-bold rounded-xl"
                >
                  Buy Now (Catalog Preview)
                </Button>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:block w-64 rounded-lg bg-slate-900 border border-slate-700 text-white p-2 text-[11px] text-center shadow-xl z-20 pointer-events-none">
                  Direct instant checkout is paused in catalog demonstration mode. Please add items to cart!
                </div>
              </div>
            </div>

            {/* Amazon-style Dropship & 10-day return notice */}
            <div className="rounded-xl border border-slate-800 bg-[#0b101c] p-3 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <RotateCcw className="size-4 text-emerald-400" /> 10-Day Doorstep Returns & Exchanges
              </div>
              <p className="text-[11px]">
                Fulfilled through verified sports brand suppliers. Free doorstep pickup on all return requests.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Product Specs, Lab Report, Ingredients, Reviews, Returns */}
      <div className="mt-12 border-t border-slate-800 pt-8">
        <Tabs defaultValue={product.labReport ? "lab" : "overview"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1 bg-[#0c121e] border border-slate-800 rounded-2xl mb-6">
            <TabsTrigger value="overview" className="py-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              Overview
            </TabsTrigger>
            {product.labReport && (
              <TabsTrigger value="lab" className="py-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                🔬 Lab Report (CoA)
              </TabsTrigger>
            )}
            <TabsTrigger value="nutrition" className="py-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              Ingredients & Use
            </TabsTrigger>
            <TabsTrigger value="reviews" className="py-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              Reviews ({product.reviewsCount})
            </TabsTrigger>
            <TabsTrigger value="returns" className="py-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              10-Day Returns
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-display text-xl font-black uppercase text-white">Product Highlights</h3>
                <ul className="space-y-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-sky-400/20 text-sky-400 font-bold text-[10px] mt-0.5">
                        ✓
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-xl font-black uppercase text-white">Full Description</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{product.description}</p>
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase text-slate-400">Target Fitness Goals:</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {product.goals.map((g) => (
                      <span key={g} className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs font-semibold capitalize text-slate-300">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: LAB REPORT (CoA) */}
          {product.labReport && (
            <TabsContent value="lab">
              <div className="rounded-2xl border border-slate-800 p-5 sm:p-6 bg-[#0c121e] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase flex items-center gap-2 text-white">
                      <FlaskConical className="size-5 text-sky-400" /> NABL Certificate of Analysis (CoA)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Batch tested by Equinox Labs (ISO/IEC 17025:2017 Accredited & FSSAI Recognized).
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1 text-xs font-bold w-fit">
                    ✓ 100% AUTHENTICATED
                  </span>
                </div>
                <LabReportView report={product.labReport} productName={product.name} />
              </div>
            </TabsContent>
          )}

          {/* TAB 3: INGREDIENTS & NUTRITION */}
          <TabsContent value="nutrition" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.nutrition && (
                <div className="space-y-2.5">
                  <h3 className="font-display text-xl font-black uppercase text-white">Nutritional Facts (Per Serving)</h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0b101c]">
                    <table className="w-full text-xs sm:text-sm">
                      <thead className="bg-slate-900/80 text-[11px] uppercase text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="p-3 text-left">Nutrient</th>
                          <th className="p-3 text-right">Value Per Scoop</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {product.nutrition.map((n) => (
                          <tr key={n.label}>
                            <td className="p-3 font-medium text-slate-200">{n.label}</td>
                            <td className="p-3 text-right font-bold text-white font-mono">{n.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {product.ingredients && (
                  <div>
                    <h3 className="font-display text-xl font-black uppercase text-white mb-2">Ingredients List</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0b101c] border border-slate-800 p-4 rounded-xl">
                      {product.ingredients.join(", ")}.
                    </p>
                  </div>
                )}
                {product.usage && (
                  <div className="rounded-xl border border-slate-800 bg-[#0b101c] p-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-sky-400 mb-1">
                      Beginner Guide: How & When to Use
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{product.usage}</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: REVIEWS */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-800 p-5 bg-[#0c121e] space-y-4 h-fit">
                <h3 className="font-display text-lg font-bold uppercase text-white">Customer Ratings</h3>
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-black text-white">{product.rating}</span>
                  <div>
                    <Stars rating={product.rating} />
                    <p className="text-xs text-slate-400 mt-0.5">{product.reviewsCount} verified ratings</p>
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-slate-800 pt-3">
                  {[
                    ["5 Star", 82],
                    ["4 Star", 14],
                    ["3 Star", 3],
                    ["2 Star", 1],
                  ].map(([label, pct]) => (
                    <div key={label as string} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-10 text-[11px]">{label as string}</span>
                      <div className="h-1.5 flex-1 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-7 text-right text-[11px]">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                {product.reviews.map((rev, i) => (
                  <div key={i} className="rounded-2xl border border-slate-800 p-4 bg-[#0c121e] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-white">{rev.name}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                            <BadgeCheck className="size-3" /> Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500">{rev.date}</span>
                    </div>
                    <Stars rating={rev.rating} />
                    <p className="font-bold text-xs sm:text-sm text-slate-100">{rev.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{rev.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: 10-DAY RETURNS */}
          <TabsContent value="returns" className="space-y-4">
            <div className="rounded-2xl border border-slate-800 p-5 sm:p-6 bg-[#0c121e] space-y-3">
              <h3 className="font-display text-xl font-black uppercase text-white flex items-center gap-2">
                <RotateCcw className="size-5 text-sky-400" /> Amazon-Style 10-Day Doorstep Returns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If this item arrives with a damaged seal, doesn't match your ordered variant, or fails to meet your expectations, schedule a free doorstep pickup in our Returns Center within 10 days of delivery.
              </p>
              <div className="pt-2">
                <Button asChild size="sm" className="bg-sky-400 text-slate-950 font-bold text-xs">
                  <Link to="/returns">Go to Returns & Refunds Center →</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
