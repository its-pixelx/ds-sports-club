import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — D&S Sports Club" },
      { name: "description", content: "View your selected fitness gear, verified supplements, and starter kit order summary." },
    ],
  }),
  component: CartPage,
});

const FREE_SHIPPING_THRESHOLD = 999;

function CartPage() {
  const { lines, count, subtotal, setQty, remove } = useStore();

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = count === 0 || isFreeShipping ? 0 : 99;
  const total = subtotal + shippingFee;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-white border border-stone-200 text-stone-500 mb-5">
          <ShoppingBag className="size-8" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-stone-900">
          Your Cart is Empty
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
          Looks like you haven't added any sports gear or supplements yet. Explore our catalog or take our 2-minute personalized beginner guide!
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-[#D9622B] hover:bg-[#C4531E] text-white font-bold rounded-xl text-xs sm:text-sm">
            <Link to="/quiz">
              <Sparkles className="size-4 mr-2" /> Take Beginner Fit Guide
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100 rounded-xl text-xs sm:text-sm">
            <Link to="/shop">
              Explore All Gear
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-stone-900">
            Shopping Cart
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {count} item{count > 1 ? "s" : ""} selected · Covered by Amazon-style 10-day returns
          </p>
        </div>
        <Link to="/shop" className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors">
          <ArrowLeft className="size-4" /> Continue Shopping
        </Link>
      </div>

      {/* Free Delivery Meter */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="flex items-center gap-1.5 text-stone-900">
            <Truck className="size-4 text-[#D9622B]" />
            {isFreeShipping ? "🎉 You've unlocked FREE Express Delivery!" : `Add ${formatINR(remainingForFree)} more for FREE Delivery`}
          </span>
          <span className="text-stone-500">Threshold: {formatINR(FREE_SHIPPING_THRESHOLD)}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full bg-[#D9622B] transition-all duration-500"
            style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
          />
        </div>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-3.5">
          {lines.map(({ line, product }) => (
            <div
              key={`${line.slug}-${line.option}`}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-3.5">
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="size-16 sm:size-20 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
                >
                  <img src={product.image} alt={product.name} className="size-full object-cover" />
                </Link>

                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {product.brand}
                  </p>
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="font-bold text-stone-900 text-xs sm:text-sm hover:underline line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  {line.option && (
                    <p className="text-[11px] text-stone-500">
                      Option: <strong className="text-stone-900">{line.option}</strong>
                    </p>
                  )}
                  <p className="text-xs font-bold text-[#D9622B] sm:hidden">
                    {formatINR(product.price * line.qty)}
                  </p>
                </div>
              </div>

              {/* Quantity Stepper & Delete */}
              <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t border-stone-200 sm:border-0">
                <div className="flex items-center rounded-xl border border-stone-200 bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={() => setQty(line.slug, line.option, line.qty - 1)}
                    className="p-1.5 text-stone-500 hover:text-stone-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-stone-900">{line.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(line.slug, line.option, line.qty + 1)}
                    className="p-1.5 text-stone-500 hover:text-stone-900"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="font-display text-base font-bold text-stone-900">
                    {formatINR(product.price * line.qty)}
                  </p>
                  <p className="text-[10px] text-stone-400">{formatINR(product.price)} each</p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(line.slug, line.option)}
                  className="text-stone-400 hover:text-rose-400 p-1.5"
                  title="Remove from cart"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Button asChild variant="ghost" className="text-stone-500 hover:text-stone-900 text-xs">
              <Link to="/shop">
                <ArrowLeft className="size-3.5 mr-1.5" /> Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold uppercase text-stone-900">Order Summary</h2>

            <div className="space-y-2 text-xs border-b border-stone-200 pb-3">
              <div className="flex justify-between text-stone-500">
                <span>Items Subtotal ({count}):</span>
                <span className="font-semibold text-stone-900 font-mono">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Estimated Delivery:</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : formatINR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Taxes & Duties:</span>
                <span className="font-semibold text-stone-900">Included</span>
              </div>
            </div>

            <div className="flex justify-between text-sm font-bold">
              <span className="text-stone-900">Total Amount:</span>
              <span className="font-display text-2xl font-black text-stone-900 font-mono">{formatINR(total)}</span>
            </div>

            {/* Disabled Checkout Button with Disclaimer */}
            <div className="pt-1 space-y-2">
              <Button
                size="xl"
                disabled
                className="w-full bg-stone-100 text-stone-400 opacity-60 cursor-not-allowed font-bold text-xs rounded-xl"
              >
                Proceed to Checkout (Demo Mode)
              </Button>
              <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                Direct online purchasing is paused in demonstration mode while drop-shipping accounts finalize.
              </p>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="rounded-2xl border border-stone-200 bg-[#FAF7F2] p-4 space-y-2 text-xs text-stone-500">
            <div className="flex items-center gap-2 text-stone-900 font-semibold">
              <RotateCcw className="size-3.5 text-[#D9622B]" /> 10-Day Doorstep Returns
            </div>
            <p className="text-[11px] leading-relaxed">
              If an item doesn't fit your routine, request a return anytime within 10 days for an easy pickup.
            </p>
            <div className="flex items-center gap-2 text-stone-900 font-semibold pt-1">
              <ShieldCheck className="size-3.5 text-emerald-400" /> NABL Certified Supplements
            </div>
            <p className="text-[11px] leading-relaxed">
              All edible products are lab-authenticated before dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
