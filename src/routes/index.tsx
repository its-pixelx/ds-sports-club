import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, BadgeCheck, Dumbbell, Flame, FlaskConical, RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useRef } from "react";
import hero from "@/assets/hero-athlete.jpg";
import logoWhite from "@/assets/logo-white.png";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
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

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[calc(100svh-4rem)] items-center sm:items-end overflow-hidden bg-[#090d14] text-white">
      {/* Background Hero Image */}
      <motion.img
        src={hero}
        alt="D&S Sports Club Athlete"
        style={{ y, scale }}
        className="absolute inset-0 -z-10 size-full object-cover object-[55%_center] opacity-30 mix-blend-luminosity"
      />
      {/* Clean, minimalist dark gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#090d14] via-[#090d14]/75 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#090d14]/95 via-[#090d14]/60 to-transparent" />

      <motion.div style={{ opacity: fade }} className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:pb-20">
        {/* Minimalist Welcome Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-slate-700/60 bg-slate-900/80 px-3.5 py-1 backdrop-blur-md"
        >
          <img src={logoWhite} alt="D&S Logo" className="h-4 w-auto object-contain" />
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300">
            Welcome to <strong className="text-white">D&S Sports Club</strong>
          </span>
          <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
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
                  i === 3 ? "text-sky-400" : i === 1 ? "text-slate-400" : "text-white"
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
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            A verified sports and gym marketplace built for beginner guidance, certified batch lab reports, and Amazon-style 10-day returns. Choose your path below:
          </p>

          {/* TWO PRIMARY CTAs: "Visit the Sports Club" (Compulsory Form) & "Go to Store" */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Visit the Sports Club -> Compulsory User Form */}
            <Button
              asChild
              size="xl"
              className="bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold tracking-wide rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
              className="border-slate-700 bg-slate-900/80 text-slate-100 hover:bg-slate-800 hover:text-white rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link to="/shop">
                Go to Store <ArrowRight className="size-4 ml-1 opacity-70" />
              </Link>
            </Button>
          </div>

          {/* Minimalist Trust Points */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <FlaskConical className="size-3.5 text-sky-400" /> NABL Lab Reports
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="size-3.5 text-sky-400" /> 10-Day Doorstep Returns
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5 text-sky-400" /> Free Shipping &gt; ₹999
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
              className="flex items-center gap-3.5 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 backdrop-blur-md shadow-xl"
            >
              <div className="grid size-8 place-items-center rounded-xl bg-sky-400/10 text-sky-400">
                <I className="size-4" />
              </div>
              <div>
                <p className="font-display text-xl font-black text-white leading-none">{a as string}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{b as string}</p>
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
    <div className="overflow-hidden border-y border-slate-800/80 bg-[#0b101c] py-2.5 text-slate-300">
      <div className="marquee flex w-max gap-8 font-display text-xs sm:text-sm font-semibold uppercase tracking-wider">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t}
            <span className="text-sky-400 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const featured = PRODUCTS.filter((p) => p.stock > 0).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24">
      <Hero />
      <Marquee />

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sky-400">Departments</p>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1"
          >
            All Products <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/shop"
                search={{ category: c.id }}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-md"
              >
                <img
                  src={CAT_IMG[c.id]}
                  alt={c.label}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">{c.label}</p>
                  <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{c.blurb}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sky-400">Top Rated</p>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
              Best Sellers
            </h2>
          </div>
          <Link to="/shop" className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white">
            See All Items →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Authenticated Lab Report & Transparency Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-slate-800 bg-[#0c121e] text-white md:grid-cols-2 shadow-xl">
          <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold text-sky-400">
                <BadgeCheck className="size-4" /> Lab Reports Authenticated
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-black uppercase leading-tight">
                Know Exactly What You Put In Your Body.
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Every protein, mass gainer, creatine, and vitamin tub sold on D&S Sports Club includes an independent Certificate of Analysis (CoA) from accredited laboratories (Equinox Labs / NABL). Inspect protein purity, zero amino spiking, and absence of heavy metals before ordering.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold rounded-xl">
                <Link to="/certificates">
                  <FlaskConical className="size-4 mr-2" /> View Lab Certificates
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 rounded-xl">
                <Link to="/shop" search={{ category: "supplements" }}>
                  Browse Supplements
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-800/80">
            {[
              [FlaskConical, "NABL Accredited Testing", "Third-party laboratory analysis for every edible batch"],
              [BadgeCheck, "Zero Amino Spiking", "Purity verified for intact protein and real BCAAs"],
              [Truck, "Free Express Shipping", "On all orders over ₹999 with doorstep delivery"],
              [RotateCcw, "10-Day Doorstep Returns", "Amazon-style doorstep pickups for easy refunds"],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof FlaskConical;
              return (
                <div key={t as string} className="bg-[#0c121e] p-6 flex flex-col justify-center">
                  <div className="grid size-9 place-items-center rounded-xl bg-sky-400/10 text-sky-400">
                    <I className="size-4" />
                  </div>
                  <p className="mt-3 font-bold text-white text-sm sm:text-base">{t as string}</p>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
