import type { Goal, Product } from "@/data/products";

export type Need =
  | "protein" | "gainer" | "creatine" | "preworkout" | "recovery" | "vitamins"
  | "weights" | "bands" | "mat" | "accessories" | "apparel";

export interface Profile {
  name: string;
  source: string;
  goal: Goal;
  level: "beginner" | "intermediate" | "advanced";
  place: "home" | "gym" | "both";
  days: string;
  diet: "veg" | "vegan" | "non-veg";
  allergies: ("lactose" | "gluten")[];
  needs: Need[];
  budget: number; // max price per item in ₹
}

export function needOf(p: Product): Need {
  switch (p.type) {
    case "Protein": return "protein";
    case "Mass gainer": return "gainer";
    case "Creatine": return "creatine";
    case "Pre-workout": return "preworkout";
    case "Amino acids": return "recovery";
    case "Vitamins": return "vitamins";
    case "Dumbbells": return "weights";
    case "Bands": return "bands";
    case "Yoga mat": return "mat";
    default: return p.category === "apparel" ? "apparel" : "accessories";
  }
}

/** Why a product can't be shown to this person, or null if it fits. */
export function excludeReason(p: Product, profile: Profile): string | null {
  if (p.stock <= 0) return "Out of stock";
  if (p.price > profile.budget) return "Over budget";
  if (profile.allergies.includes("lactose") && p.lactose) return "Contains lactose";
  if (profile.allergies.includes("gluten") && p.gluten) return "Contains gluten";
  if (profile.diet === "vegan" && p.diet !== "vegan" && p.diet !== "na") return "Not vegan";
  if (profile.diet === "veg" && p.diet === "non-veg") return "Not vegetarian";
  if (profile.level === "beginner" && !p.beginnerFriendly) return "Not for beginners";
  return null;
}

export interface Recommendation { product: Product; score: number; reasons: string[] }

export function recommend(products: Product[], profile: Profile, limit = 6): Recommendation[] {
  const out: Recommendation[] = [];
  for (const p of products) {
    if (excludeReason(p, profile)) continue;
    const reasons: string[] = [];
    let score = p.rating * 0.5;
    if (p.goals.includes(profile.goal)) { score += 5; reasons.push("Fits your goal"); }
    if (profile.needs.includes(needOf(p))) { score += 4; reasons.push("You asked for this"); }
    if (profile.level === "beginner" && p.beginnerFriendly) { score += 1; reasons.push("Beginner friendly"); }
    if (profile.place === "home" && p.category === "equipment") { score += 1; reasons.push("Great for home"); }
    if (p.price <= profile.budget * 0.5) reasons.push("Well within budget");
    if (score < 5) continue;
    out.push({ product: p, score, reasons: reasons.slice(0, 3) });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function matchesProfile(p: Product, profile: Profile | null): boolean {
  if (!profile) return false;
  return !excludeReason(p, profile) && (p.goals.includes(profile.goal) || profile.needs.includes(needOf(p)));
}
