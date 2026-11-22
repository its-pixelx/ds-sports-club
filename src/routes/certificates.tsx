import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CheckCircle2,
  Download,
  FileText,
  FlaskConical,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { LabReportDialog } from "@/components/site/LabReportDialog";
import { PRODUCTS, type Product } from "@/data/products";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Lab Reports & Legal Certificates — D&S Sports Club" },
      { name: "description", content: "Explore verified Certificates of Analysis (CoAs), FSSAI registrations, and NABL laboratory reports for all our sports supplements." },
    ],
  }),
  component: CertificatesPage,
});

export function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const edibleProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.labReport !== undefined);
  }, []);

  const filtered = useMemo(() => {
    return edibleProducts.filter((p) => {
      if (selectedType !== "all" && p.type !== selectedType) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.labReport?.certificateNo.toLowerCase().includes(q) ||
          p.labReport?.batch.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [edibleProducts, selectedType, search]);

  const types = useMemo(() => {
    return Array.from(new Set(edibleProducts.map((p) => p.type)));
  }, [edibleProducts]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Top Hero / Header */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 text-stone-900 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9622B]/30 bg-[#D9622B]/10 px-3 py-1 text-xs font-bold text-[#D9622B]">
            <ShieldCheck className="size-4" /> 100% Quality & Legal Transparency
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Lab Reports & Legal Certificates
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            At D&S Sports Club, we believe athletes and fitness beginners have the right to know exactly what is inside their supplements. Every edible item sold on our store is tested by an independent NABL-accredited laboratory for label purity, zero amino spiking, and absence of heavy metals or banned compounds.
          </p>
        </div>

        {/* 4 Pillars of Compliance */}
        <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 pt-6 border-t border-stone-200">
          <div className="rounded-2xl border border-stone-200 bg-[#FAF7F2]/70 p-4 space-y-1.5">
            <BadgeCheck className="size-5 text-emerald-400" />
            <h3 className="font-bold text-xs sm:text-sm text-stone-900 uppercase tracking-tight">FSSAI Compliance</h3>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Standard central registration requirements and dietary supplement guidelines adhered to across all stocks.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[#FAF7F2]/70 p-4 space-y-1.5">
            <FlaskConical className="size-5 text-[#D9622B]" />
            <h3 className="font-bold text-xs sm:text-sm text-stone-900 uppercase tracking-tight">NABL Accredited Labs</h3>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Tested by ISO/IEC 17025 accredited partner laboratories (Equinox Labs) for rigorous chemical and microbial analysis.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[#FAF7F2]/70 p-4 space-y-1.5">
            <CheckCircle2 className="size-5 text-blue-400" />
            <h3 className="font-bold text-xs sm:text-sm text-stone-900 uppercase tracking-tight">Zero Amino Spiking</h3>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Verified free nitrogen vs intact protein ratios ensuring you receive 100% genuine BCAAs and whey.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[#FAF7F2]/70 p-4 space-y-1.5">
            <ShieldCheck className="size-5 text-purple-400" />
            <h3 className="font-bold text-xs sm:text-sm text-stone-900 uppercase tracking-tight">WADA Banned List Screen</h3>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Screened for prohibited stimulants, steroids, and performance-enhancing contaminants on the WADA list.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <h2 className="font-display text-2xl font-black uppercase text-stone-900">
            Batch Certificates of Analysis (CoA)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Click "View Full Certificate" or "Download" to inspect official laboratory findings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-stone-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search batch or brand..."
              className="h-9 rounded-xl border border-stone-200 bg-white pl-8 pr-3 text-xs text-stone-900 outline-none focus:border-[#D9622B]"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-9 rounded-xl border border-stone-200 bg-white px-3 text-xs font-semibold text-stone-900 outline-none cursor-pointer"
          >
            <option value="all" className="bg-stone-50">All Supplements ({edibleProducts.length})</option>
            {types.map((t) => (
              <option key={t} value={t} className="bg-stone-50">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.map((product) => {
          const report = product.labReport!;
          return (
            <div
              key={product.slug}
              className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 transition-colors space-y-4"
            >
              {/* Product Header */}
              <div className="flex items-start gap-3.5">
                <Link to="/product/$slug" params={{ slug: product.slug }} className="size-16 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                  <img src={product.image} alt={product.name} className="size-full object-cover" />
                </Link>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      {product.brand}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      <CheckCircle2 className="size-3" /> PASS
                    </span>
                  </div>
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="font-bold text-stone-900 text-sm hover:text-sky-300 transition-colors truncate block"
                  >
                    {product.name}
                  </Link>
                  <p className="text-[11px] text-stone-500 font-mono">
                    Certificate No: {report.certificateNo}
                  </p>
                </div>
              </div>

              {/* Lab & Batch Details */}
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#FAF7F2] p-3 text-[11px]">
                <div>
                  <p className="text-[10px] text-stone-500 uppercase font-semibold">Batch ID</p>
                  <p className="font-bold font-mono text-stone-900 mt-0.5">{report.batch}</p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-500 uppercase font-semibold">Test Date</p>
                  <p className="font-bold text-stone-900 mt-0.5">{report.testedOn}</p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-500 uppercase font-semibold">Accreditation</p>
                  <p className="font-bold text-emerald-400 mt-0.5 truncate">
                    NABL ISO 17025
                  </p>
                </div>
              </div>

              {/* Key Verified Results Quick View */}
              <div className="space-y-1 text-xs">
                {report.claims.slice(0, 2).map((c) => (
                  <div key={c.parameter} className="flex justify-between border-b border-stone-200/80 pb-1">
                    <span className="text-stone-500">{c.parameter}</span>
                    <span className="font-bold text-stone-900 font-mono">
                      {c.found} <span className="text-emerald-400 text-[10px]">(Claim: {c.claimed})</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <BadgeCheck className="size-3.5 text-emerald-400" /> FSSAI Compliant
                </span>

                <LabReportDialog report={report} productName={product.name}>
                  <Button size="sm" className="bg-[#D9622B] hover:bg-sky-300 text-white font-bold text-xs h-8">
                    <FileText className="size-3.5 mr-1" /> View Full Certificate
                  </Button>
                </LabReportDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
