import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  scrollAmount?: number;
  showGradients?: boolean;
  arrowClassName?: string;
  paddingContainer?: boolean;
}

export function ScrollRow({
  children,
  className = "",
  scrollAmount = 320,
  showGradients = true,
  arrowClassName = "",
  paddingContainer = true,
  ...props
}: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth > clientWidth + 4;
    setHasOverflow(overflow);
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    const observer = new ResizeObserver(() => {
      checkScroll();
    });
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // High sensitivity: scroll 85% of visible container or at least 380px end-to-end
    const distance = Math.max(380, Math.round(el.clientWidth * 0.85));
    if (direction === "right") {
      const remaining = el.scrollWidth - (el.scrollLeft + el.clientWidth);
      const move = remaining < distance * 1.3 ? remaining : distance;
      el.scrollBy({ left: move, behavior: "smooth" });
    } else {
      const move = el.scrollLeft < distance * 1.3 ? el.scrollLeft : distance;
      el.scrollBy({ left: -move, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/scroll isolate w-full" {...props}>
      {/* Left Minimal Arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 flex size-8 sm:size-9 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-[0_2px_8px_rgba(40,30,20,0.12)] border border-stone-200/90 backdrop-blur-md transition-all duration-200 hover:bg-[#D9622B] hover:text-white hover:border-[#D9622B] hover:scale-105 active:scale-95 cursor-pointer ${
            canScrollLeft ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
          } ${arrowClassName}`}
        >
          <ChevronLeft className="size-4 sm:size-4.5" />
        </button>
      )}

      {/* Left Soft Warm Gradient Fade */}
      {hasOverflow && showGradients && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-10 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent transition-opacity duration-200 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* The Scrollable Content Row */}
      <div
        ref={scrollRef}
        className={`flex items-center gap-2.5 sm:gap-4 overflow-x-auto scroll-smooth py-1.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] ${
          hasOverflow && paddingContainer ? "px-6 sm:px-8" : ""
        } ${className}`}
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>

      {/* Right Soft Warm Gradient Fade */}
      {hasOverflow && showGradients && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-10 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent transition-opacity duration-200 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Right Minimal Arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 flex size-8 sm:size-9 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-[0_2px_8px_rgba(40,30,20,0.12)] border border-stone-200/90 backdrop-blur-md transition-all duration-200 hover:bg-[#D9622B] hover:text-white hover:border-[#D9622B] hover:scale-105 active:scale-95 cursor-pointer ${
            canScrollRight ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
          } ${arrowClassName}`}
        >
          <ChevronRight className="size-4 sm:size-4.5" />
        </button>
      )}
    </div>
  );
}
