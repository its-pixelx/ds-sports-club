import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  PackageCheck,
  RotateCcw,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "10-Day Returns & Refunds Center — D&S Sports Club" },
      { name: "description", content: "Amazon-style 10-day easy returns and doorstep refunds for D&S Sports Club gym gear and lab-tested nutrition." },
    ],
  }),
  component: ReturnsPage,
});

interface DemoOrder {
  id: string;
  date: string;
  status: string;
  items: { name: string; variant: string; price: number; slug: string }[];
}

const DEMO_ORDERS: DemoOrder[] = [
  {
    id: "DS-78219",
    date: "2026-11-19 (Delivered 3 days ago)",
    status: "Eligible for Return (7 days left)",
    items: [
      { name: "Optimum Nutrition (ON) Gold Standard 100% Whey", variant: "Double Rich Chocolate", price: 3399, slug: "optimum-nutrition-gold-standard-whey" },
      { name: "BlenderBottle Classic V2 Squeezer Shaker Bottle (700ml)", variant: "Matte Black", price: 449, slug: "blenderbottle-classic-v2-700ml" },
    ],
  },
  {
    id: "DS-69104",
    date: "2026-11-15 (Delivered 7 days ago)",
    status: "Eligible for Return (3 days left)",
    items: [
      { name: "Rogue Fitness Commercial Rubber Hex Dumbbells (Pair)", variant: "2 × 7.5 kg", price: 2499, slug: "rogue-rubber-hex-dumbbells-pair" },
    ],
  },
];

const REASONS = [
  "Wrong flavor, color, or weight variant delivered",
  "Product seal broken or damaged in transit",
  "Defective equipment / zipper / grip flaw",
  "Allergic reaction or sensitivity concern",
  "Performance not as expected / Changed mind",
  "Arrived too late",
];

function ReturnsPage() {
  const [selectedOrder, setSelectedOrder] = useState<DemoOrder>(DEMO_ORDERS[0]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [reason, setReason] = useState(REASONS[0]);
  const [resolution, setResolution] = useState<"refund" | "replace">("refund");
  const [slot, setSlot] = useState("Tomorrow Morning (9:00 AM – 1:00 PM)");
  const [comments, setComments] = useState("");

  const [returnSubmitted, setReturnSubmitted] = useState(false);
  const [rmaCode, setRmaCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `RMA-DS-${Math.floor(100000 + Math.random() * 900000)}`;
    setRmaCode(code);
    setReturnSubmitted(true);
    toast.success("Return request submitted successfully!", {
      description: `RMA Code: ${code} · Doorstep pickup scheduled.`,
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-10">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-800 bg-[#0c121e] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold text-sky-400">
            <RotateCcw className="size-4" /> Amazon-Style Hassle-Free Returns
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
            10-Day Returns & Refunds Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We want your fitness journey to be completely worry-free. If any equipment or supplement does not match your expectations, start an easy return below. We provide 100% free doorstep pickup and instant refunds directly to your bank account or UPI.
          </p>
        </div>

        {/* 4-Step Process Visualizer */}
        <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-4 pt-6 border-t border-slate-800">
          {[
            { step: "01", title: "Request Return", desc: "Select order and reason in 60 seconds", icon: RotateCcw },
            { step: "02", title: "Free Doorstep Pickup", desc: "Courier partner collects parcel from your address", icon: Truck },
            { step: "03", title: "Quick Check", desc: "Fast hub check for original packaging & safety tags", icon: PackageCheck },
            { step: "04", title: "Instant Refund", desc: "Refund credited to UPI / Bank within 24–48 hours", icon: CheckCircle2 },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-slate-800 bg-[#090d14]/70 p-4 space-y-1">
              <span className="font-display text-2xl font-black text-sky-400">{s.step}</span>
              <p className="font-bold text-xs sm:text-sm text-white">{s.title}</p>
              <p className="text-[11px] text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Return Flow */}
      <div className="rounded-3xl border border-slate-800 bg-[#0c121e] p-5 sm:p-8 shadow-sm">
        <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-5">
          Start a Return Request
        </h2>

        {!returnSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Demo Order */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                1. Select Order:
              </label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {DEMO_ORDERS.map((ord) => (
                  <button
                    key={ord.id}
                    type="button"
                    onClick={() => {
                      setSelectedOrder(ord);
                      setSelectedItemIndex(0);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedOrder.id === ord.id
                        ? "border-sky-400 bg-sky-400/10 text-white shadow-md ring-1 ring-sky-400"
                        : "border-slate-800 bg-[#090d14] hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-mono text-xs sm:text-sm text-white">Order #{ord.id}</span>
                      <span className="text-[10px] font-semibold text-emerald-400">{ord.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{ord.date}</p>
                    <p className="text-[11px] text-slate-300 font-medium mt-1">
                      {ord.items.length} item{ord.items.length > 1 ? "s" : ""} in order
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Item */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                2. Select Item to Return:
              </label>
              <div className="space-y-2">
                {selectedOrder.items.map((it, idx) => (
                  <button
                    key={it.name}
                    type="button"
                    onClick={() => setSelectedItemIndex(idx)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedItemIndex === idx
                        ? "border-sky-400 bg-sky-400/10 text-white ring-1 ring-sky-400"
                        : "border-slate-800 bg-[#090d14] hover:bg-slate-900"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-white">{it.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Option: {it.variant}</p>
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-sky-400 font-mono">{formatINR(it.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Reason */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                3. Reason for Return:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {REASONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReason(r)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      reason === r
                        ? "border-sky-400 bg-sky-400/15 text-white font-bold ring-1 ring-sky-400"
                        : "border-slate-800 bg-[#090d14] text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Additional notes for our logistics pickup partner (optional)..."
                rows={2}
                className="w-full rounded-xl border border-slate-800 bg-[#090d14] p-3 text-xs text-white outline-none focus:border-sky-400"
              />
            </div>

            {/* Step 4: Resolution & Pickup Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  4. Preferred Resolution:
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setResolution("refund")}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      resolution === "refund"
                        ? "border-emerald-500 bg-emerald-500/10 font-bold text-white ring-1 ring-emerald-500"
                        : "border-slate-800 bg-[#090d14] text-slate-400"
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-white">💰 Instant Bank / UPI Refund</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Credited within 24–48 hours of doorstep pickup</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setResolution("replace")}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      resolution === "replace"
                        ? "border-sky-400 bg-sky-400/10 font-bold text-white ring-1 ring-sky-400"
                        : "border-slate-800 bg-[#090d14] text-slate-400"
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-white">🔄 Free Replacement / Exchange</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Dispatched as soon as return courier is booked</p>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  5. Schedule Free Doorstep Pickup:
                </label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full h-11 rounded-xl border border-slate-800 bg-[#090d14] px-3 text-xs font-semibold text-white outline-none cursor-pointer"
                >
                  <option value="Tomorrow Morning (9:00 AM – 1:00 PM)" className="bg-slate-900">Tomorrow Morning (9:00 AM – 1:00 PM)</option>
                  <option value="Tomorrow Afternoon (2:00 PM – 6:00 PM)" className="bg-slate-900">Tomorrow Afternoon (2:00 PM – 6:00 PM)</option>
                  <option value="Day After Tomorrow (9:00 AM – 1:00 PM)" className="bg-slate-900">Day After Tomorrow (9:00 AM – 1:00 PM)</option>
                </select>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <Truck className="size-3.5 text-sky-400" /> Free pickup across India from registered delivery address
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                Refund value: <strong className="text-white font-mono">{formatINR(selectedOrder.items[selectedItemIndex]?.price || 0)}</strong>
              </span>
              <Button type="submit" className="bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs h-10 px-5 rounded-xl">
                Confirm Return & Schedule Pickup <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </form>
        ) : (
          /* Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Return Authorized</span>
                <h3 className="font-display text-2xl font-black uppercase text-white">
                  Pickup Scheduled for Tomorrow
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-slate-800 bg-[#090d14] p-3.5 text-xs">
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px]">RMA Tracking Code</p>
                <p className="font-mono text-sm font-bold text-white mt-0.5">{rmaCode}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px]">Pickup Slot</p>
                <p className="font-bold text-white mt-0.5">{slot}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px]">Resolution</p>
                <p className="font-bold text-emerald-400 mt-0.5 capitalize">
                  {resolution === "refund" ? "Direct Bank / UPI Refund" : "Replacement Order"}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-white">Courier Pickup Instructions:</p>
              <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
                <li>Keep the item packed with all accessories, scoops, or original equipment tags.</li>
                <li>No need to print any label; the courier executive will bring a pre-printed barcode.</li>
                <li>Upon scan, you will receive an SMS and WhatsApp confirmation with your tracking link.</li>
              </ul>
            </div>

            <div className="pt-2 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setReturnSubmitted(false)}
                className="text-xs border-slate-800 bg-slate-900 text-slate-200"
              >
                Submit Another Return
              </Button>
              <Button asChild className="text-xs font-bold bg-sky-400 text-slate-950">
                <Link to="/shop">Continue Browsing Store</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Return Policy FAQs */}
      <div className="rounded-3xl border border-slate-800 bg-[#0c121e] p-6 sm:p-8 shadow-sm space-y-5">
        <div className="space-y-0.5">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Transparent Policies</span>
          <h2 className="font-display text-2xl font-black uppercase text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full text-slate-200">
          <AccordionItem value="faq-1" className="border-slate-800">
            <AccordionTrigger className="text-xs sm:text-sm font-bold text-left hover:text-sky-300">
              How does D&S Sports Club's 10-day return policy work?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-slate-400 leading-relaxed">
              Just like Amazon, you have a full 10-day window from the day of delivery to initiate a return or replacement for any reason. We schedule a free doorstep pickup from your address with zero return shipping fees.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-2" className="border-slate-800">
            <AccordionTrigger className="text-xs sm:text-sm font-bold text-left hover:text-sky-300">
              Can I return protein tubs or nutritional supplements?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-slate-400 leading-relaxed">
              For health, food safety, and NABL chain of custody requirements, edible products must have an intact inner/outer seal. If your product arrived with a broken seal or damaged tub, submit a return immediately and our support team will approve an instant replacement or full refund.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-3" className="border-slate-800">
            <AccordionTrigger className="text-xs sm:text-sm font-bold text-left hover:text-sky-300">
              How long does it take to receive the refund in my bank account?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-slate-400 leading-relaxed">
              Once the courier partner scans the returned package at your doorstep, the refund process is automatically triggered. UPI refunds are credited within 2 to 4 hours; debit/credit card refunds take 24 to 48 banking hours.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
