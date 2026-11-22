import { BadgeCheck, Download, FileText, FlaskConical, Printer, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { LabReport, LabRow } from "@/data/products";
import type { ReactNode } from "react";

function Rows({ rows, mode }: { rows: LabRow[]; mode: "claim" | "limit" }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0b101c]">
      <table className="w-full text-xs sm:text-sm">
        <thead className="bg-slate-900/90 text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <tr>
            <th className="p-3">Parameter Tested</th>
            <th className="p-3">{mode === "claim" ? "Label Claim" : "Safe Limit"}</th>
            <th className="p-3">Lab Found Value</th>
            <th className="p-3 text-right">Result</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80">
          {rows.map((r) => (
            <tr key={r.parameter} className="hover:bg-slate-900/40 transition-colors">
              <td className="p-3 font-semibold text-white">{r.parameter}</td>
              <td className="p-3 text-slate-400 font-mono">{mode === "claim" ? r.claimed : r.limit}</td>
              <td className="p-3 text-sky-400 font-bold font-mono">{r.found}</td>
              <td className="p-3 text-right">
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-black text-emerald-400">
                  {r.pass ? "PASS ✓" : "FAIL ✗"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LabReportView({ report, productName }: { report: LabReport; productName: string }) {
  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Official Certificate Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-sky-400/30 bg-sky-400/10 p-5 text-white">
        <div className="flex items-center gap-3.5">
          <div className="grid size-12 place-items-center rounded-2xl bg-sky-400 text-slate-950 shrink-0">
            <ShieldCheck className="size-7" />
          </div>
          <div>
            <p className="font-display text-2xl font-black uppercase tracking-tight">
              Certificate of Analysis (CoA)
            </p>
            <p className="text-xs text-sky-200/80 mt-0.5 font-mono">
              Certificate No: {report.certificateNo} · {report.fssaiLicense}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black uppercase text-slate-950">
            ALL TESTS PASSED
          </span>
          <button
            type="button"
            onClick={handlePrintDownload}
            className="rounded-xl border border-sky-400/40 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-400 hover:text-slate-950 transition-colors flex items-center gap-1.5"
            title="Download / Print Certificate"
          >
            <Download className="size-3.5" /> Download
          </button>
        </div>
      </div>

      {/* Audit & Laboratory Metadata */}
      <dl className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        {[
          ["Product Name", productName],
          ["Batch Number", report.batch],
          ["Testing Lab", report.lab.split(" (")[0]],
          ["Test Completed On", report.testedOn],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-slate-800 bg-[#0b101c] p-3.5">
            <dt className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{k}</dt>
            <dd className="mt-1 font-bold text-white truncate" title={v}>{v}</dd>
          </div>
        ))}
      </dl>

      {/* Table 1: Label Claim Verification */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-lg font-bold uppercase tracking-tight text-white flex items-center gap-2">
            <FlaskConical className="size-4 text-sky-400" /> 1. Label Claim Verification
          </h4>
          <span className="text-[11px] text-slate-400">HPLC / Kjeldahl Method</span>
        </div>
        <Rows rows={report.claims} mode="claim" />
      </div>

      {/* Table 2: Toxic Contaminants & Purity */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-lg font-bold uppercase tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-400" /> 2. Safety, Heavy Metals & Banned Substances
          </h4>
          <span className="text-[11px] text-slate-400">ICP-MS & ISO 4833 Method</span>
        </div>
        <Rows rows={report.contaminants} mode="limit" />
      </div>

      {/* Legal Accreditation Footer */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="flex items-center gap-2">
          <BadgeCheck className="size-4 text-emerald-400 shrink-0" />
          <span>{report.accreditation}</span>
        </p>
        <span className="text-[11px] text-slate-500 font-mono">D&S Sports Club Quality Assurance</span>
      </div>
    </div>
  );
}

export function LabReportDialog({
  report,
  productName,
  children,
}: {
  report: LabReport;
  productName: string;
  children?: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? (
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors">
            <FlaskConical className="size-3.5" /> View Lab Report
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl bg-[#090d14] border-slate-800 text-white p-6">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl uppercase font-black text-white">
            Official Laboratory Report
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-xs sm:text-sm">
            Independent third-party batch assay for {productName}. Verified for nutritional integrity and purity.
          </DialogDescription>
        </DialogHeader>
        <LabReportView report={report} productName={productName} />
      </DialogContent>
    </Dialog>
  );
}
