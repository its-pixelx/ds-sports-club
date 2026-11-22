import { Link } from "@tanstack/react-router";
import { BadgeCheck, FlaskConical, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-800 bg-slate-950 text-slate-300">
      {/* Trust banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-volt/10 text-volt">
              <FlaskConical className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">100% Lab Tested</p>
              <p className="text-xs text-slate-400">NABL certified purity checks</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-volt/10 text-volt">
              <RotateCcw className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">10-Day Returns</p>
              <p className="text-xs text-slate-400">Amazon-style doorstep pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-volt/10 text-volt">
              <Truck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">Free Delivery</p>
              <p className="text-xs text-slate-400">On all orders over ₹999</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-volt/10 text-volt">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">Verified Suppliers</p>
              <p className="text-xs text-slate-400">Curated dropship partners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer content */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-5">
        <div className="sm:col-span-2 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logoWhite} alt="D&S Sports Club Logo" className="h-10 w-auto object-contain" />
            <span className="font-display text-2xl font-black uppercase tracking-tight text-white">
              D<span className="text-volt">&</span>S <span className="font-semibold text-slate-300">Sports Club</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm text-slate-400 leading-relaxed">
            Honest fitness gear and independently lab-tested nutrition. Built with intelligent user personalization and beginner guidance to eliminate the guesswork from training, bulking, and active wellness.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300">
              <BadgeCheck className="size-3.5 text-emerald-400" /> FSSAI Compliance
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300">
              <BadgeCheck className="size-3.5 text-emerald-400" /> NABL Accredited
            </span>
          </div>
        </div>

        {/* Quick Links: Shop */}
        <div className="space-y-3 text-sm">
          <p className="font-display text-base font-bold uppercase tracking-wider text-white">Store</p>
          <ul className="space-y-2">
            <li><Link to="/shop" className="text-slate-400 hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/shop" search={{ category: "supplements" }} className="text-slate-400 hover:text-white transition-colors">Supplements & Whey</Link></li>
            <li><Link to="/shop" search={{ category: "equipment" }} className="text-slate-400 hover:text-white transition-colors">Gym Equipment</Link></li>
            <li><Link to="/shop" search={{ category: "accessories" }} className="text-slate-400 hover:text-white transition-colors">Accessories & Shakers</Link></li>
            <li><Link to="/shop" search={{ category: "apparel" }} className="text-slate-400 hover:text-white transition-colors">Apparel & Hoodies</Link></li>
          </ul>
        </div>

        {/* Personalization & Guidance */}
        <div className="space-y-3 text-sm">
          <p className="font-display text-base font-bold uppercase tracking-wider text-white">Guidance</p>
          <ul className="space-y-2">
            <li><Link to="/quiz" className="text-volt font-medium hover:underline">Beginner Fit Guide (Quiz)</Link></li>
            <li><Link to="/shop" search={{ goal: "bulking" }} className="text-slate-400 hover:text-white transition-colors">Bulking Essentials</Link></li>
            <li><Link to="/shop" search={{ goal: "workout" }} className="text-slate-400 hover:text-white transition-colors">Strength & Recovery</Link></li>
            <li><Link to="/shop" search={{ goal: "yoga" }} className="text-slate-400 hover:text-white transition-colors">Yoga & Mobility</Link></li>
            <li><Link to="/cart" className="text-slate-400 hover:text-white transition-colors">My Cart</Link></li>
          </ul>
        </div>

        {/* Trust & Transparency */}
        <div className="space-y-3 text-sm">
          <p className="font-display text-base font-bold uppercase tracking-wider text-white">Legal & Trust</p>
          <ul className="space-y-2">
            <li><Link to="/certificates" className="text-slate-400 hover:text-white transition-colors">Lab Reports & CoAs</Link></li>
            <li><Link to="/certificates" className="text-slate-400 hover:text-white transition-colors">Legal Accreditation</Link></li>
            <li><Link to="/returns" className="text-slate-400 hover:text-white transition-colors">10-Day Doorstep Returns</Link></li>
            <li><Link to="/returns" className="text-slate-400 hover:text-white transition-colors">Refund Policy FAQs</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-black/60 py-5 text-center text-xs text-slate-500 px-4 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-3">
        <p>© 2026 D&S Sports Club. All rights reserved.</p>
        <p className="text-[11px] text-slate-400">
          Dropshipping demonstration catalog · Direct checkout paused until fulfillment integrations go live.
        </p>
      </div>
    </footer>
  );
}
