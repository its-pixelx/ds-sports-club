import { cn } from "@/lib/utils";

export function StockBadge({ stock, className }: { stock: number; className?: string }) {
  const [label, tone] =
    stock <= 0 ? ["Out of stock", "text-destructive"] : stock <= 5 ? [`Only ${stock} left`, "text-warning"] : ["In stock", "text-success"];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold", tone, className)}>
      <span className="relative flex size-2">
        {stock > 0 && <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />}
        <span className="relative inline-flex size-2 rounded-full bg-current" />
      </span>
      {label}
    </span>
  );
}
