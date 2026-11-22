import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatINR, type Product } from "@/data/products";
import { useStore } from "@/lib/store";

interface AddToCartButtonProps {
  product: Product;
  selectedOption?: string;
  size?: "sm" | "md" | "xl";
  className?: string;
  showPrice?: boolean;
}

export function AddToCartButton({
  product,
  selectedOption,
  size = "md",
  className = "",
  showPrice = false,
}: AddToCartButtonProps) {
  const { cart, add, setQty, remove } = useStore();

  const activeOption = selectedOption || product.options?.values[0];
  const cartLine = cart.find(
    (line) => line.slug === product.slug && (activeOption ? line.option === activeOption : true)
  );
  const qty = cartLine?.qty || 0;
  const isOutOfStock = product.stock <= 0;

  const handleActivate = () => {
    if (isOutOfStock) return;
    add(product.slug, activeOption, 1);
    toast.success("Added to cart", {
      description: `${product.name} (1 item)`,
    });
  };

  const handleIncrement = () => {
    if (qty >= product.stock) {
      toast.warning("Stock limit reached", {
        description: `Only ${product.stock} units available in stock.`,
      });
      return;
    }
    setQty(product.slug, activeOption, qty + 1);
  };

  const handleDecrement = () => {
    if (qty <= 1) {
      remove(product.slug, activeOption);
      toast.info("Removed from cart", {
        description: product.name,
      });
    } else {
      setQty(product.slug, activeOption, qty - 1);
    }
  };

  if (isOutOfStock) {
    return (
      <button
        disabled
        className="rounded-xl border border-stone-200 bg-stone-100 text-stone-400 font-bold px-3 py-1.5 text-xs cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  // SIZE: SM (Used in product cards on shop and category grids)
  if (size === "sm") {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <AnimatePresence mode="wait" initial={false}>
          {qty === 0 ? (
            <motion.button
              key="btn-add-sm"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleActivate}
              aria-label={`Add ${product.name} to cart`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 text-white hover:bg-[#D9622B] px-3 py-1.5 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span>Add</span>
            </motion.button>
          ) : (
            <motion.div
              key="stepper-sm"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="inline-flex items-center rounded-xl border border-[#D9622B] bg-[#D9622B] text-white p-0.5 shadow-sm overflow-hidden"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                onClick={handleDecrement}
                className="p-1 hover:bg-black/20 rounded-lg transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="size-3.5" />
              </motion.button>
              <motion.span
                key={qty}
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="min-w-6 px-1.5 text-center font-mono font-black text-xs select-none"
              >
                {qty}
              </motion.span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                disabled={qty >= product.stock}
                onClick={handleIncrement}
                className="p-1 hover:bg-black/20 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="size-3.5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // SIZE: MD (Used in Starter Kit / Recommendation modals)
  if (size === "md") {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <AnimatePresence mode="wait" initial={false}>
          {qty === 0 ? (
            <motion.button
              key="btn-add-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.04 }}
              onClick={handleActivate}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#D9622B] hover:bg-[#C4531E] text-white font-bold text-xs h-8 px-3.5 transition-all shadow-sm cursor-pointer"
            >
              <ShoppingBag className="size-3.5" />
              <span>Add</span>
            </motion.button>
          ) : (
            <motion.div
              key="stepper-md"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              className="inline-flex items-center rounded-xl border border-[#D9622B] bg-[#D9622B] text-white p-1 shadow-sm overflow-hidden"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                onClick={handleDecrement}
                className="p-1.5 hover:bg-black/20 rounded-lg transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="size-3.5" />
              </motion.button>
              <motion.span
                key={qty}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="min-w-7 px-1 text-center font-mono font-black text-xs select-none"
              >
                {qty} in Cart
              </motion.span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                disabled={qty >= product.stock}
                onClick={handleIncrement}
                className="p-1.5 hover:bg-black/20 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="size-3.5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // SIZE: XL (Full width Product Detail Page CTA)
  return (
    <div className={`w-full ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {qty === 0 ? (
          <motion.button
            key="btn-add-xl"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            onClick={handleActivate}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#D9622B] hover:bg-[#C4531E] text-white font-bold py-3.5 px-6 shadow-lg shadow-orange-500/20 text-sm sm:text-base cursor-pointer transition-all min-h-[48px]"
          >
            <ShoppingBag className="size-5" />
            <span>
              Add to Cart {showPrice && `· ${formatINR(product.price)}`}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="stepper-xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="w-full flex items-center justify-between rounded-xl border-2 border-[#D9622B] bg-[#FAF7F2] p-1.5 shadow-md min-h-[48px]"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={handleDecrement}
              className="grid size-10 sm:size-11 place-items-center rounded-lg bg-[#D9622B] text-white hover:bg-[#C4531E] transition-all cursor-pointer shadow-sm shrink-0"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4 sm:size-5" />
            </motion.button>

            <div className="flex flex-col items-center justify-center px-2 text-center flex-1">
              <motion.span
                key={qty}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-mono text-base sm:text-lg font-black text-stone-900 leading-tight"
              >
                {qty} Added in Cart
              </motion.span>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 justify-center">
                <Check className="size-3" /> Total: {formatINR(product.price * qty)}
              </span>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              disabled={qty >= product.stock}
              onClick={handleIncrement}
              className="grid size-10 sm:size-11 place-items-center rounded-lg bg-[#D9622B] text-white hover:bg-[#C4531E] transition-all disabled:opacity-30 cursor-pointer shadow-sm shrink-0"
              aria-label="Increase quantity"
            >
              <Plus className="size-4 sm:size-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
