import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FlaskConical, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { discount, formatINR, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { matchesProfile } from "@/lib/recommend";
import { Stars } from "./Stars";
import { StockBadge } from "./StockBadge";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, profile } = useStore();
  const match = matchesProfile(product, profile);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_2px_12px_-2px_rgba(40,30,20,0.05)] hover:border-stone-300 hover:shadow-[0_8px_24px_-4px_rgba(40,30,20,0.09)] transition-all"
    >
      {/* Product Image Link */}
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-[#F5F0E8]"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges on Image */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {product.labReport && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 border border-emerald-600/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 backdrop-blur-sm shadow-sm">
              <FlaskConical className="size-3" /> Lab tested
            </span>
          )}
          {match && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#D9622B] px-2.5 py-0.5 text-[10px] font-black text-white shadow-sm">
              <Sparkles className="size-3" /> For you
            </span>
          )}
        </div>

        <span className="absolute right-2.5 top-2.5 rounded-full bg-stone-900/90 border border-stone-800 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
          -{discount(product)}%
        </span>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col gap-1 p-3.5 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
          {product.brand}
        </p>

        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-xs sm:text-sm font-bold text-stone-900 hover:text-[#D9622B] transition-colors leading-snug"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] text-stone-500 my-0.5">
          <Stars rating={product.rating} />
          <span>{product.rating} ({product.reviewsCount.toLocaleString("en-IN")})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-sm sm:text-base font-black text-stone-950">
              {formatINR(product.price)}{" "}
              <span className="text-[11px] font-normal text-stone-400 line-through">
                {formatINR(product.mrp)}
              </span>
            </p>
            <StockBadge stock={product.stock} />
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            disabled={product.stock <= 0}
            onClick={() => {
              add(product.slug, product.options?.values[0]);
              toast.success("Added to cart", { description: product.name });
            }}
            aria-label={`Add ${product.name} to cart`}
            className="grid size-8 sm:size-9 place-items-center rounded-xl bg-stone-100 border border-stone-200 text-stone-800 transition-all hover:bg-[#D9622B] hover:text-white hover:border-[#D9622B] disabled:opacity-30 cursor-pointer shadow-sm"
          >
            <Plus className="size-4" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
