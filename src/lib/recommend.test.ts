import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/data/products";
import { recommend, type Profile } from "./recommend";

const base: Profile = {
  name: "Test", source: "YouTube", goal: "bulking", level: "intermediate", place: "gym",
  days: "3-4", diet: "veg", allergies: [], needs: ["gainer"], budget: 5000,
};

describe("recommend", () => {
  it("never suggests items above the budget", () => {
    const recs = recommend(PRODUCTS, { ...base, budget: 1000 }, 20);
    expect(recs.length).toBeGreaterThan(0);
    expect(recs.every((r) => r.product.price <= 1000)).toBe(true);
  });
  it("puts the requested item first for a bulking goal", () => {
    expect(recommend(PRODUCTS, base)[0]?.product.slug).toBe("muscleblaze-super-gainer-xxl");
  });
  it("skips lactose products for lactose-intolerant users", () => {
    const recs = recommend(PRODUCTS, { ...base, allergies: ["lactose"] }, 20);
    expect(recs.some((r) => r.product.lactose)).toBe(false);
  });
  it("hides advanced items from beginners", () => {
    const recs = recommend(PRODUCTS, { ...base, goal: "workout", level: "beginner", needs: ["preworkout"] }, 20);
    expect(recs.some((r) => r.product.slug === "cellucor-c4-original-preworkout")).toBe(false);
  });
  it("never suggests out-of-stock items", () => {
    const recs = recommend(PRODUCTS, { ...base, needs: ["accessories"], budget: 20000 }, 20);
    expect(recs.some((r) => r.product.stock === 0)).toBe(false);
  });
});
