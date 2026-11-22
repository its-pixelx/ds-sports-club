import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, BadgeCheck, Dumbbell, Flame, FlaskConical, RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useRef } from "react";
import hero from "@/assets/hero-athlete.jpg";
import logoClean from "@/assets/logo-clean.png";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { ScrollRow } from "@/components/site/ScrollRow";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D&S Sports Club — Train Smarter, Fuel Honest" },
      { name: "description", content: "Lab-tested supplements and gym gear, matched to your goals in a personalized questionnaire. Beginner friendly with Amazon-style easy returns." },
      { property: "og:title", content: "D&S Sports Club — Train Smarter, Fuel Honest" },
      { property: "og:description", content: "Take our personalized beginner fitness guide and discover lab-tested supplements and gym gear." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WORDS = ["TRAIN", "SMARTER.", "FUEL", "HONEST."];
const CAT_IMG: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, PRODUCTS.find((p) => p.category === c.id)?.image ?? ""]),
);

// Extended collections for category showcase
const SHOWCASE_COLLECTIONS = [
  ...CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    blurb: c.blurb,
    image: CAT_IMG[c.id],
    search: { category: c.id },
  })),
  {
    id: "bulking-stack",
    label: "Bulking & Mass Stacks",
    blurb: "Caloric dense gainers and pure Creapure creatine for muscle building",
    image: PRODUCTS.find((p) => p.slug === "muscleblaze-super-gainer-xxl")?.image ?? "",
    search: { goal: "bulking" as const },
  },
  {
    id: "mobility-yoga",
    label: "Yoga & Flexibility",
    blurb: "Manduka non-slip mats and loop resistance bands",
    image: PRODUCTS.find((p) => p.slug === "manduka-pro-yoga-mat")?.image ?? "",
    search: { goal: "yoga" as const },
  },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[calc(100svh-4rem)] items-center sm:items-end overflow-hidden bg-[#1A1715] text-white">
      {/* Background Hero Image */}
      <motion.img
        src={hero}
        alt="D&S Sports Club Athlete"
        style={{ y, scale }}
        className="absolute inset-0 -z-10 size-full object-cover object-[55%_center] opacity-35 mix-blend-luminosity"
      />
      {/* Warm rich gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1A1715] via-[#1A1715]/75 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1A1715]/95 via-[#1A1715]/60 to-transparent" />

      <motion.div style={{ opacity: fade }} className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:pb-20">
        {/* Minimalist Warm Welcome Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-stone-600/70 bg-stone-900/80 px-3.5 py-1.5 backdrop-blur-md shadow-md"
        >
          <div className="rounded-full bg-white p-0.5">
            <img src={logoClean} alt="D&S Logo" className="h-3.5 w-auto object-contain" />
          </div>
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-200">
            Welcome to <strong className="text-white">D&S Sports Club</strong>
          </span>
          <span className="size-1.5 rounded-full bg-[#D9622B] animate-pulse" />
        </motion.div>

        {/* Minimalist Peak Animation Headline */}
        <h1 className="font-display text-[clamp(2.8rem,9vw,8rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
          {WORDS.map((w, i) => (
            <span key={w} className="mr-[0.16em] inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 + i * 0.12,
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block ${
                  i === 3 ? "text-[#D9622B]" : i === 1 ? "text-stone-300" : "text-white"
                }`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Value Proposition Description */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex max-w-2xl flex-col gap-6"
        >
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            A verified sports and gym marketplace built for beginner guidance, certified batch lab reports, and Amazon-style 10-day returns. Choose your path below:
          </p>

          {/* TWO PRIMARY CTAs: "Visit the Sports Club" (Compulsory Form) & "Go to Store" */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Visit the Sports Club -> Compulsory User Form */}
            <Button
              asChild
              size="xl"
              className="bg-[#D9622B] hover:bg-[#C4531E] text-white font-bold tracking-wide rounded-xl shadow-lg shadow-[#D9622B]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link to="/quiz">
                <Sparkles className="size-4 mr-2" />
                Visit the Sports Club
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>

            {/* Go to Store -> Direct Store Catalog */}
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-stone-500 bg-stone-900/80 text-stone-100 hover:bg-stone-800 hover:text-white rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link to="/shop">
                Go to Store <ArrowRight className="size-4 ml-1 opacity-70" />
              </Link>
            </Button>
          </div>

          {/* Minimalist Trust Points */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-300 font-medium">
            <span className="flex items-center gap-1.5">
              <FlaskConical className="size-3.5 text-[#D9622B]" /> NABL Lab Reports
            </span>
            <span className="text-stone-500">•</span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="size-3.5 text-[#D9622B]" /> 10-Day Doorstep Returns
            </span>
            <span className="text-stone-500">•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5 text-[#D9622B]" /> Free Shipping &gt; ₹999
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Trust Metrics - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute right-8 top-1/3 hidden flex-col gap-3 lg:flex"
      >
        {[
          ["100%", "Batch Lab-Tested", FlaskConical],
          ["2 Min", "Personalized Fit Guide", Sparkles],
          ["10 Days", "Amazon-Style Returns", RotateCcw],
        ].map(([a, b, Icon], i) => {
          const I = Icon as typeof FlaskConical;
          return (
            <motion.div
              key={b as string}
              whileHover={{ scale: 1.05, x: -4 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
              className="flex items-center gap-3.5 rounded-2xl border border-stone-700/80 bg-stone-900/80 px-4 py-3 backdrop-blur-md shadow-xl"
            >
              <div className="grid size-8 place-items-center rounded-xl bg-[#D9622B]/20 text-[#D9622B]">
                <I className="size-4" />
              </div>
              <div>
                <p className="font-display text-xl font-black text-white leading-none">{a as string}</p>
                <p className="text-[11px] text-stone-300 mt-0.5">{b as string}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Optimum Nutrition Gold Standard Whey",
    "MuscleBlaze Biozyme Lab-Tested Whey",
    "Creapure Micronized Creatine",
    "Cast Iron Hex Dumbbells",
    "Non-Slip Eco Yoga Mats",
    "Cellucor C4 Pre-Workout",
    "Scivation XTEND BCAAs",
    "Harbinger Wrist-Wrap Gloves",
  ];

  return (
    <div className="overflow-hidden border-y border-stone-200/80 bg-[#F2ECE4] py-3 text-stone-800">
      <div className="marquee flex w-max gap-8 font-display text-xs sm:text-sm font-bold uppercase tracking-wider">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t}
            <span className="text-[#D9622B] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const featured = PRODUCTS.filter((p) => p.stock > 0);

  return (
    <div className="space-y-16 sm:space-y-24 bg-[#FAF7F2] pb-12">
      <Hero />
      <Marquee />

      {/* Categories Scrollable Showcase with Left & Right Arrows */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Departments</p>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-stone-900">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-stone-600 hover:text-[#D9622B] transition-colors flex items-center gap-1"
          >
            All Products <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Minimal Variable Scrollable Category Row with Left & Right Arrows */}
        <ScrollRow scrollAmount={300} className="gap-4 pb-2">
          {SHOWCASE_COLLECTIONS.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={c.search}
              className="group relative block w-[210px] sm:w-[250px] md:w-[280px] shrink-0 aspect-[4/5] overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={c.image}
                alt={c.label}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">{c.label}</p>
                <p className="text-[11px] text-stone-200 mt-0.5 line-clamp-1">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </ScrollRow>
      </section>

      {/* Best Sellers Scrollable Carousel with Left & Right Arrows */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9622B]">Top Rated</p>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-stone-900">
              Best Sellers
            </h2>
          </div>
          <Link to="/shop" className="text-xs sm:text-sm font-bold text-stone-600 hover:text-[#D9622B]">
            See All Items →
          </Link>
        </div>

        {/* Amazon-Style Minimalist Product Scroll Carousel with Left & Right Arrows */}
        <ScrollRow scrollAmount={300} className="gap-4 pb-2">
          {featured.map((p, i) => (
            <div key={p.slug} className="w-[195px] sm:w-[230px] md:w-[260px] shrink-0">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </ScrollRow>
      </section>

      {/* Authenticated Lab Report & Transparency Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-stone-200/90 bg-white text-stone-900 md:grid-cols-2 shadow-sm">
          <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <BadgeCheck className="size-4" /> Lab Reports Authenticated
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-black uppercase leading-tight text-stone-900">
                Know Exactly What You Put In Your Body.
              </h2>
              <p className="mt-3 text-sm text-stone-600 leading-relaxed font-normal">
                Every protein, mass gainer, creatine, and vitamin tub sold on D&S Sports Club includes an independent Certificate of Analysis (CoA) from accredited laboratories (Equinox Labs / NABL). Inspect protein purity, zero amino spiking, and absence of heavy metals before ordering.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-[#D9622B] hover:bg-[#C4531E] text-white font-bold rounded-xl shadow-md shadow-[#D9622B]/20">
                <Link to="/certificates">
                  <FlaskConical className="size-4 mr-2" /> View Lab Certificates
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-stone-300 bg-stone-50 text-stone-800 hover:bg-stone-100 rounded-xl">
                <Link to="/shop" search={{ category: "supplements" }}>
                  Browse Supplements
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone-200">
            {[
              [FlaskConical, "NABL Accredited Testing", "Third-party laboratory analysis for every edible batch"],
              [BadgeCheck, "Zero Amino Spiking", "Purity verified for intact protein and real BCAAs"],
              [Truck, "Free Express Shipping", "On all orders over ₹999 with doorstep delivery"],
              [RotateCcw, "10-Day Doorstep Returns", "Amazon-style doorstep pickups for easy refunds"],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof FlaskConical;
              return (
                <div key={t as string} className="bg-[#FAF7F2] p-6 flex flex-col justify-center">
                  <div className="grid size-9 place-items-center rounded-xl bg-[#D9622B]/10 text-[#D9622B]">
                    <I className="size-4" />
                  </div>
                  <p className="mt-3 font-bold text-stone-900 text-sm sm:text-base">{t as string}</p>
                  <p className="mt-1 text-xs text-stone-500 leading-relaxed">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
