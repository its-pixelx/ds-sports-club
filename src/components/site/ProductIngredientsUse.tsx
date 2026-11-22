import { useState } from "react";
import {
  Activity,
  AlertCircle,
  Award,
  Check,
  CheckCircle2,
  Clock,
  Droplet,
  Dumbbell,
  FileCheck2,
  Filter,
  Flame,
  FlaskConical,
  HelpCircle,
  Info,
  Layers,
  Pill,
  Scale,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  type AminoAcid,
  type AminoAcidType,
  type Product,
  isEdible,
} from "@/data/products";

interface ProductIngredientsUseProps {
  product: Product;
}

export function ProductIngredientsUse({ product }: ProductIngredientsUseProps) {
  const isSupplement = isEdible(product);
  const [activeSubTab, setActiveSubTab] = useState<"amino" | "ingredients" | "nutrition" | "usage">(
    isSupplement && product.aminoAcidProfile ? "amino" : "ingredients"
  );
  const [aminoFilter, setAminoFilter] = useState<"ALL" | AminoAcidType>("ALL");

  if (!isSupplement) {
    // Non-edible Gear, Apparel, Equipment & Accessories View
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9622B]/10 px-3 py-1 text-xs font-bold text-[#D9622B] mb-2">
                <Dumbbell className="size-3.5" /> Engineered Gear Specifications
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-stone-900">
                Materials, Build & Care Protocol
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Authentic manufacturer materials, longevity guidelines, and daily maintenance instructions.
              </p>
            </div>
          </div>

          {product.materialCareGuide ? (
            <div className="space-y-6">
              {/* Materials Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
                  <Layers className="size-4 text-[#D9622B]" /> Construction Materials
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.materialCareGuide.materials.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-stone-200 bg-[#FAF7F2] p-3.5 space-y-1 transition-all hover:border-stone-300"
                    >
                      <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-[#D9622B] shrink-0" />
                        {m.name}
                      </span>
                      <p className="text-xs text-stone-600 pl-5.5 leading-relaxed">{m.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              {product.materialCareGuide.specs && product.materialCareGuide.specs.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
                    <Scale className="size-4 text-[#D9622B]" /> Technical Specifications
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-stone-200 bg-[#FAF7F2]">
                    <table className="w-full text-xs sm:text-sm">
                      <tbody className="divide-y divide-stone-200">
                        {product.materialCareGuide.specs.map((s, idx) => (
                          <tr key={idx} className="hover:bg-stone-50/50">
                            <td className="p-3 font-semibold text-stone-700 w-1/3 sm:w-1/4">{s.label}</td>
                            <td className="p-3 font-mono font-medium text-stone-900">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Maintenance & Care Guide */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[#D9622B]" /> Maintenance & Longevity Guidelines
                </h4>
                <ul className="space-y-1.5 pl-1">
                  {product.materialCareGuide.careInstructions.map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-amber-950">
                      <span className="text-[#D9622B] font-bold">•</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-xs text-stone-600 bg-[#FAF7F2] p-4 rounded-xl border border-stone-200">
              <p>Standard commercial-grade athletic equipment crafted to meet international training standards.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // EDIBLE PRODUCTS VIEW (Supplements, Protein, Creatine, Pre-workout, BCAA, Multivitamin)
  const profile = product.aminoAcidProfile;
  const filteredAcids =
    profile?.acids.filter((a) => {
      if (aminoFilter === "ALL") return true;
      if (aminoFilter === "NEAA") return a.type === "NEAA" || a.type === "CEAA";
      return a.type === aminoFilter;
    }) || [];

  const bcaaCount = profile?.acids.filter((a) => a.type === "BCAA").length || 0;
  const eaaCount = profile?.acids.filter((a) => a.type === "EAA").length || 0;
  const neaaCount = profile?.acids.filter((a) => a.type === "NEAA" || a.type === "CEAA").length || 0;

  return (
    <div className="space-y-6">
      {/* Top Nutrition & Amino Quick Stats Banner */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="size-3 text-emerald-600" /> 100% Genuine Lab-Tested Edible
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#D9622B]/10 border border-[#D9622B]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#D9622B]">
                <ShieldCheck className="size-3" /> Zero Amino Spiking Guarantee
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-stone-900">
              Nutritional Breakdown & Amino Matrix
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Comprehensive amino acid spectrum, full ingredient source transparency, and certified dosage protocols.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {profile?.totalBcaa && (
              <div className="flex-1 sm:flex-initial rounded-xl border border-amber-200 bg-amber-50/70 p-2 sm:p-2.5 text-center min-w-[90px]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Total BCAAs
                </span>
                <span className="font-mono text-xs sm:text-base font-black text-amber-950">
                  {profile.totalBcaa}
                </span>
              </div>
            )}
            {profile?.totalEaa && (
              <div className="flex-1 sm:flex-initial rounded-xl border border-blue-200 bg-blue-50/70 p-2 sm:p-2.5 text-center min-w-[90px]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-800">
                  Total EAAs
                </span>
                <span className="font-mono text-xs sm:text-base font-black text-blue-950">
                  {profile.totalEaa}
                </span>
              </div>
            )}
            {product.nutrition?.find((n) => n.label.toLowerCase().includes("protein")) && (
              <div className="flex-1 sm:flex-initial rounded-xl border border-emerald-200 bg-emerald-50/70 p-2 sm:p-2.5 text-center min-w-[90px]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Protein
                </span>
                <span className="font-mono text-xs sm:text-base font-black text-emerald-950">
                  {product.nutrition.find((n) => n.label.toLowerCase().includes("protein"))?.value}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sub-Navigation Buttons (Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
          {profile && (
            <button
              type="button"
              onClick={() => setActiveSubTab("amino")}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border min-h-[40px] ${
                activeSubTab === "amino"
                  ? "border-[#D9622B] bg-[#D9622B] text-white shadow-sm"
                  : "border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-stone-300"
              }`}
            >
              <Zap className="size-3.5" /> Amino Acid Spectrum ({profile.acids.length})
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveSubTab("ingredients")}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border min-h-[40px] ${
              activeSubTab === "ingredients"
                ? "border-[#D9622B] bg-[#D9622B] text-white shadow-sm"
                : "border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-stone-300"
            }`}
          >
            <FlaskConical className="size-3.5" /> Detailed Ingredients
          </button>

          {product.nutrition && (
            <button
              type="button"
              onClick={() => setActiveSubTab("nutrition")}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border min-h-[40px] ${
                activeSubTab === "nutrition"
                  ? "border-[#D9622B] bg-[#D9622B] text-white shadow-sm"
                  : "border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-stone-300"
              }`}
            >
              <Scale className="size-3.5" /> Supplement Facts ({product.nutrition.length})
            </button>
          )}

          {(product.useProtocol || product.usage) && (
            <button
              type="button"
              onClick={() => setActiveSubTab("usage")}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border min-h-[40px] ${
                activeSubTab === "usage"
                  ? "border-[#D9622B] bg-[#D9622B] text-white shadow-sm"
                  : "border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:border-stone-300"
              }`}
            >
              <Clock className="size-3.5" /> How & When to Use
            </button>
          )}
        </div>
      </div>

      {/* SUB-VIEW 1: AMINO ACID SPECTRUM */}
      {activeSubTab === "amino" && profile && (
        <div className="space-y-4">
          {/* Amino Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Filter className="size-3.5 text-[#D9622B]" /> Filter Amino Acids:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAminoFilter("ALL")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border ${
                  aminoFilter === "ALL"
                    ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                    : "bg-[#FAF7F2] text-stone-600 border-stone-200 hover:bg-stone-100"
                }`}
              >
                All ({profile.acids.length})
              </button>
              {bcaaCount > 0 && (
                <button
                  type="button"
                  onClick={() => setAminoFilter("BCAA")}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border ${
                    aminoFilter === "BCAA"
                      ? "bg-[#D9622B] text-white border-[#D9622B] shadow-sm"
                      : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  ⚡ BCAAs ({bcaaCount})
                </button>
              )}
              {eaaCount > 0 && (
                <button
                  type="button"
                  onClick={() => setAminoFilter("EAA")}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border ${
                    aminoFilter === "EAA"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
                  }`}
                >
                  🧬 EAAs ({eaaCount})
                </button>
              )}
              {neaaCount > 0 && (
                <button
                  type="button"
                  onClick={() => setAminoFilter("NEAA")}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border ${
                    aminoFilter === "NEAA"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  🛡️ NEAAs / CEAAs ({neaaCount})
                </button>
              )}
            </div>
          </div>

          {profile.summary && (
            <p className="text-xs text-stone-600 italic bg-[#FAF7F2] p-3 rounded-xl border border-stone-200">
              ℹ️ {profile.summary}
            </p>
          )}

          {/* Amino Acid Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAcids.map((acid, idx) => {
              const isBcaa = acid.type === "BCAA";
              const isEaa = acid.type === "EAA";
              const isCeaa = acid.type === "CEAA";

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-2 hover:border-[#D9622B]/40 transition-shadow shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                        {acid.name}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border shrink-0 ${
                          isBcaa
                            ? "bg-amber-500/10 text-amber-700 border-amber-500/20"
                            : isEaa
                            ? "bg-blue-500/10 text-blue-700 border-blue-500/20"
                            : isCeaa
                            ? "bg-purple-500/10 text-purple-700 border-purple-500/20"
                            : "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                        }`}
                      >
                        {acid.type}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-sm sm:text-base font-black text-stone-900">
                        {acid.amount}
                      </span>
                      <span className="text-[11px] text-stone-400">per serving</span>
                    </div>

                    {/* Relative Bar */}
                    <div className="h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isBcaa
                            ? "bg-[#D9622B]"
                            : isEaa
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.max(10, Math.min(100, acid.pct || 40))}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-600 leading-relaxed pt-1 border-t border-stone-100 mt-1">
                    {acid.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Educational Legend Footer */}
          <div className="rounded-xl border border-stone-200 bg-[#FAF7F2] p-4 space-y-2 text-xs text-stone-600">
            <h5 className="font-bold text-xs uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Info className="size-4 text-[#D9622B]" /> Understanding Amino Acid Categories:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1 text-[11px]">
                  ⚡ BCAAs (Branched-Chain):
                </span>
                <p className="text-[11px] leading-relaxed">
                  Leucine, Isoleucine, and Valine. These bypass the liver and are metabolized directly in muscles to activate mTOR protein synthesis and prevent catabolism.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-blue-900 flex items-center gap-1 text-[11px]">
                  🧬 EAAs (Essential Amino Acids):
                </span>
                <p className="text-[11px] leading-relaxed">
                  The human body cannot produce these 9 amino acids; they must be consumed through dietary protein to enable cellular growth and complete muscle recovery.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1 text-[11px]">
                  🛡️ NEAAs & CEAAs (Conditionally Essential):
                </span>
                <p className="text-[11px] leading-relaxed">
                  Includes Glutamine, Arginine, and Tyrosine. Under intense physical training, the body's natural synthesis cannot keep pace with demand, making supplementation vital.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: DETAILED INGREDIENTS */}
      {activeSubTab === "ingredients" && (
        <div className="space-y-4">
          {product.detailedIngredients ? (
            <div className="space-y-4">
              {product.detailedIngredients.map((cat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 space-y-3"
                >
                  <h4 className="font-display text-base font-black uppercase text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                    <span className="grid size-5 place-items-center rounded-full bg-[#D9622B]/10 text-[#D9622B] text-xs font-bold">
                      {idx + 1}
                    </span>
                    {cat.category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="rounded-lg border border-stone-200 bg-[#FAF7F2] p-3 space-y-1 transition-colors hover:border-stone-300"
                      >
                        <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-start gap-1.5">
                          <Check className="size-3.5 text-[#D9622B] shrink-0 mt-0.5" />
                          <span>{item.name}</span>
                        </span>
                        <p className="text-xs text-stone-600 pl-5 leading-relaxed">
                          {item.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : product.ingredients ? (
            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">
                Ingredients List
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-stone-200">
                {product.ingredients.join(", ")}.
              </p>
            </div>
          ) : null}

          {/* Transparency Certification Stamp */}
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-emerald-950">
            <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block">100% Label Accuracy & Ingredient Verification</span>
              <p className="text-[11px] text-emerald-800">
                Every ingredient listed above is third-party tested by NABL-accredited laboratories. Zero hidden compounds, zero unlisted fillers, and zero adulteration.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: NUTRITIONAL FACTS */}
      {activeSubTab === "nutrition" && product.nutrition && (
        <div className="space-y-4">
          <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <h4 className="font-display text-lg font-black uppercase text-stone-900">
                  Supplement Facts
                </h4>
                <p className="text-xs text-stone-500">
                  Nutritional value determined per standardized serving.
                </p>
              </div>
              <span className="text-xs font-semibold text-stone-600 bg-[#FAF7F2] px-3 py-1 rounded-lg border border-stone-200 w-fit">
                Batch Verified Assay
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-stone-200 bg-[#FAF7F2]">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-stone-100 text-[11px] uppercase text-stone-500 border-b border-stone-200">
                  <tr>
                    <th className="p-3 text-left">Nutrient / Parameter</th>
                    <th className="p-3 text-right">Amount Per Serving</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {product.nutrition.map((n, idx) => (
                    <tr key={idx} className="hover:bg-white/60 transition-colors">
                      <td className="p-3 font-medium text-stone-800">{n.label}</td>
                      <td className="p-3 text-right font-bold text-stone-900 font-mono">
                        {n.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: HOW & WHEN TO USE */}
      {activeSubTab === "usage" && (
        <div className="space-y-4">
          {product.useProtocol ? (
            <div className="space-y-4">
              {/* Serving & Timing Callout Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                    <Scale className="size-3.5 text-[#D9622B]" /> Recommended Serving Size
                  </span>
                  <p className="font-display text-base font-bold text-stone-900">
                    {product.useProtocol.servingSize}
                  </p>
                  {product.useProtocol.servingsPerContainer && (
                    <p className="text-xs text-stone-500">{product.useProtocol.servingsPerContainer}</p>
                  )}
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                    <Droplet className="size-3.5 text-blue-500" /> Ideal Liquid & Temperature
                  </span>
                  <p className="font-bold text-xs sm:text-sm text-stone-900">
                    {product.useProtocol.liquid}
                  </p>
                  <p className="text-xs text-stone-500">Shaken in a squeezer bottle or stirred.</p>
                </div>
              </div>

              {/* Best Timing Options */}
              <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-[#D9622B]" /> Optimal Consumption Timing:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.useProtocol.bestTiming.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl bg-[#FAF7F2] border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-800 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="size-3.5 text-[#D9622B]" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Directions */}
              <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
                <h4 className="font-display text-base font-black uppercase text-stone-900">
                  Step-by-Step Preparation Directions
                </h4>
                <div className="space-y-2">
                  {product.useProtocol.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#D9622B] text-white font-bold text-[11px] mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beginner Coach Advice */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-1.5">
                <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="size-4 text-[#D9622B]" /> Beginner Coach Pro-Tip:
                </h5>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {product.useProtocol.beginnerTip}
                </p>
              </div>

              {/* Precautions */}
              {product.useProtocol.precautions && (
                <div className="rounded-xl border border-stone-200 bg-[#FAF7F2] p-3.5 space-y-1">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                    <AlertCircle className="size-3.5 text-stone-500" /> Storage & Usage Precautions:
                  </span>
                  <ul className="space-y-1 pl-1">
                    {product.useProtocol.precautions.map((p, idx) => (
                      <li key={idx} className="text-xs text-stone-600 flex items-start gap-2">
                        <span className="text-stone-400">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : product.usage ? (
            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#D9622B]">
                Beginner Guide: How & When to Use
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-stone-200">
                {product.usage}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
