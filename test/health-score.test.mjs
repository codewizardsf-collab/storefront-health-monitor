import test from "node:test";
import assert from "node:assert/strict";
import { calculateStorefrontHealth, rankStorefronts } from "../src/health-score.mjs";

test("storefront health flags degraded payment reliability", () => {
  const health = calculateStorefrontHealth({
    brand: "northstar",
    checkoutSessions: 1000,
    completedCheckouts: 620,
    paymentFailures: 180,
    inventoryAccurateSkuCount: 930,
    totalSkuCount: 1000,
    webhookLagSeconds: 22
  });

  assert.equal(health.status, "degraded");
  assert.equal(health.paymentFailureRate, 22.5);
});

test("rankStorefronts puts weakest storefront first", () => {
  const ranked = rankStorefronts([
    { brand: "stable", checkoutSessions: 1000, completedCheckouts: 810, paymentFailures: 10, inventoryAccurateSkuCount: 990, totalSkuCount: 1000, webhookLagSeconds: 3 },
    { brand: "problem", checkoutSessions: 1000, completedCheckouts: 610, paymentFailures: 120, inventoryAccurateSkuCount: 910, totalSkuCount: 1000, webhookLagSeconds: 40 }
  ]);

  assert.equal(ranked[0].brand, "problem");
});
