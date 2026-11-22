import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, FileText, FlaskConical, RotateCcw, Star, Zap } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/data/products";
import { isEdible } from "@/data/products";

interface ScrollableTabsHeaderProps {
  product: Product;
}

export function ScrollableTabsHeader({ product }: ScrollableTabsHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth > clientWidth + 4;
    setHasOverflow(overflow);
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    const ro = new ResizeObserver(() => checkScroll());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const handleScroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    const tabsList = el.querySelector('[role="tablist"]');
    const tabs = tabsList ? (Array.from(tabsList.children) as HTMLElement[]) : [];
    if (tabs.length === 0) return;

    const visibleLeft = el.scrollLeft;
    const visibleRight = el.scrollLeft + el.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction === "right") {
      // Find the first tab whose right edge extends beyond visibleRight
      const unseenTab = tabs.find((t) => t.offsetLeft + t.offsetWidth > visibleRight - 4);
      if (unseenTab) {
        const targetScroll = unseenTab.offsetLeft + unseenTab.offsetWidth - el.clientWidth + 16;
        const nextLeft = Math.min(maxScroll, Math.max(el.scrollLeft + 220, targetScroll));
        el.scrollTo({ left: nextLeft, behavior: "smooth" });
      } else {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      }
    } else {
      // Find the first tab to the left whose left edge is hidden behind visibleLeft
      const reversedTabs = [...tabs].reverse();
      const unseenTab = reversedTabs.find((t) => t.offsetLeft < visibleLeft + 4);
      if (unseenTab) {
        const targetScroll = unseenTab.offsetLeft - 16;
        const nextLeft = Math.max(0, Math.min(el.scrollLeft - 220, targetScroll));
        el.scrollTo({ left: nextLeft, behavior: "smooth" });
      } else {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  };

  // Scroll active tab into view when clicked if clipped
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const el = containerRef.current;
    if (!el || !target) return;

    const visibleLeft = el.scrollLeft;
    const visibleRight = el.scrollLeft + el.clientWidth;

    if (target.offsetLeft < visibleLeft + 16) {
      el.scrollTo({ left: Math.max(0, target.offsetLeft - 16), behavior: "smooth" });
    } else if (target.offsetLeft + target.offsetWidth > visibleRight - 16) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      el.scrollTo({
        left: Math.min(maxScroll, target.offsetLeft + target.offsetWidth - el.clientWidth + 16),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 w-full mb-6">
      {/* Left Minimalist Arrow Button (Appears only when there is unseen content to the left) */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          aria-label="Scroll tabs left"
          className={`shrink-0 grid size-8 sm:size-9 place-items-center rounded-full bg-white text-stone-800 shadow-sm border border-stone-200/90 transition-all duration-200 hover:bg-[#D9622B] hover:text-white hover:border-[#D9622B] active:scale-90 ${
            canScrollLeft
              ? "opacity-100 scale-100 pointer-events-auto cursor-pointer"
              : "opacity-0 scale-75 pointer-events-none cursor-default w-0 -mr-1.5 sm:-mr-2.5 overflow-hidden p-0 border-0 shadow-none"
          }`}
        >
          <ChevronLeft className="size-4 sm:size-4.5" />
        </button>
      )}

      {/* Horizontal Scrollable Tabs Container */}
      <div
        ref={containerRef}
        className="flex-1 min-w-0 overflow-x-auto scrollbar-none scroll-smooth py-1"
        style={{ scrollbarWidth: "none" }}
      >
        <TabsList
          className={`flex w-max lg:w-full items-center justify-start lg:grid ${
            product.labReport ? "lg:grid-cols-5" : "lg:grid-cols-4"
          } gap-2 p-1.5 bg-[#FAF7F2] border border-stone-200/90 rounded-2xl shadow-xs`}
        >
          <TabsTrigger
            value="overview"
            onClick={handleTabClick}
            className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 lg:px-3 text-xs sm:text-[11px] lg:text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[42px] border border-transparent data-[state=active]:border-[#D9622B] data-[state=active]:bg-[#D9622B] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-stone-700 data-[state=inactive]:border-stone-200 hover:text-stone-900 hover:border-stone-300"
          >
            <FileText className="size-3.5 shrink-0" />
            <span>Overview</span>
          </TabsTrigger>

          {product.labReport && (
            <TabsTrigger
              value="lab"
              onClick={handleTabClick}
              className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 lg:px-3 text-xs sm:text-[11px] lg:text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[42px] border border-transparent data-[state=active]:border-[#D9622B] data-[state=active]:bg-[#D9622B] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-stone-700 data-[state=inactive]:border-stone-200 hover:text-stone-900 hover:border-stone-300"
            >
              <FlaskConical className="size-3.5 shrink-0" />
              <span>Lab Report</span>
            </TabsTrigger>
          )}

          <TabsTrigger
            value="nutrition"
            onClick={handleTabClick}
            className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 lg:px-3 text-xs sm:text-[11px] lg:text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[42px] border border-transparent data-[state=active]:border-[#D9622B] data-[state=active]:bg-[#D9622B] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-stone-700 data-[state=inactive]:border-stone-200 hover:text-stone-900 hover:border-stone-300"
          >
            <Zap className="size-3.5 shrink-0" />
            <span>{isEdible(product) ? "Ingredients & Aminos" : "Materials & Specs"}</span>
          </TabsTrigger>

          <TabsTrigger
            value="reviews"
            onClick={handleTabClick}
            className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 lg:px-3 text-xs sm:text-[11px] lg:text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[42px] border border-transparent data-[state=active]:border-[#D9622B] data-[state=active]:bg-[#D9622B] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-stone-700 data-[state=inactive]:border-stone-200 hover:text-stone-900 hover:border-stone-300"
          >
            <Star className="size-3.5 shrink-0" />
            <span>Reviews ({product.reviewsCount})</span>
          </TabsTrigger>

          <TabsTrigger
            value="returns"
            onClick={handleTabClick}
            className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 lg:px-3 text-xs sm:text-[11px] lg:text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[42px] border border-transparent data-[state=active]:border-[#D9622B] data-[state=active]:bg-[#D9622B] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-stone-700 data-[state=inactive]:border-stone-200 hover:text-stone-900 hover:border-stone-300"
          >
            <RotateCcw className="size-3.5 shrink-0" />
            <span>10-Day Returns</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Right Minimalist Arrow Button (Appears only when there is unseen content to the right) */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          aria-label="Scroll tabs right"
          className={`shrink-0 grid size-8 sm:size-9 place-items-center rounded-full bg-white text-stone-800 shadow-sm border border-stone-200/90 transition-all duration-200 hover:bg-[#D9622B] hover:text-white hover:border-[#D9622B] active:scale-90 ${
            canScrollRight
              ? "opacity-100 scale-100 pointer-events-auto cursor-pointer"
              : "opacity-0 scale-75 pointer-events-none cursor-default w-0 -ml-1.5 sm:-ml-2.5 overflow-hidden p-0 border-0 shadow-none"
          }`}
        >
          <ChevronRight className="size-4 sm:size-4.5" />
        </button>
      )}
    </div>
  );
}
