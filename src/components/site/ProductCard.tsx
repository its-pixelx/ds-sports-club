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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0c121e] shadow-md hover:border-slate-700 transition-colors"
    >
      {/* Product Image Link */}
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-slate-900"
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
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/90 border border-slate-700/80 px-2.5 py-0.5 text-[10px] font-bold text-sky-400 backdrop-blur-sm shadow">
              <FlaskConical className="size-3" /> Lab tested
            </span>
          )}
          {match && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-400 px-2.5 py-0.5 text-[10px] font-black text-slate-950 shadow">
              <Sparkles className="size-3" /> For you
            </span>
          )}
        </div>

        <span className="absolute right-2.5 top-2.5 rounded-full bg-slate-950/80 border border-slate-800 px-2 py-0.5 text-[10px] font-black text-slate-200">
          -{discount(product)}%
        </span>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col gap-1 p-3.5 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {product.brand}
        </p>

        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-xs sm:text-sm font-bold text-white hover:text-sky-300 transition-colors leading-snug"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 my-0.5">
          <Stars rating={product.rating} />
          <span>{product.rating} ({product.reviewsCount.toLocaleString("en-IN")})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-sm sm:text-base font-black text-white">
              {formatINR(product.price)}{" "}
              <span className="text-[11px] font-normal text-slate-500 line-through">
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
            className="grid size-8 sm:size-9 place-items-center rounded-xl bg-slate-800 border border-slate-700 text-white transition-all hover:bg-sky-400 hover:text-slate-950 hover:border-sky-400 disabled:opacity-30 cursor-pointer"
          >
            <Plus className="size-4" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
