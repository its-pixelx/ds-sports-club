import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /quiz", () => {
    const matches = router.matchRoutes("/quiz");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /shop", () => {
    const matches = router.matchRoutes("/shop");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /product/optimum-nutrition-gold-standard-whey", () => {
    const matches = router.matchRoutes("/product/optimum-nutrition-gold-standard-whey");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /cart", () => {
    const matches = router.matchRoutes("/cart");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /certificates", () => {
    const matches = router.matchRoutes("/certificates");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /returns", () => {
    const matches = router.matchRoutes("/returns");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
