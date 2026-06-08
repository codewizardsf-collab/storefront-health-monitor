export function calculateStorefrontHealth(snapshot) {
  const checkoutConversion = percentage(snapshot.completedCheckouts, snapshot.checkoutSessions);
  const paymentFailureRate = percentage(snapshot.paymentFailures, snapshot.completedCheckouts + snapshot.paymentFailures);
  const inventoryAccuracy = percentage(snapshot.inventoryAccurateSkuCount, snapshot.totalSkuCount);
  const webhookLagSeconds = snapshot.webhookLagSeconds;

  const score = Math.max(0, Math.round(
    checkoutConversion * 0.45 +
    (100 - paymentFailureRate) * 0.25 +
    inventoryAccuracy * 0.2 +
    Math.max(0, 100 - webhookLagSeconds) * 0.1
  ));

  return {
    brand: snapshot.brand,
    checkoutConversion,
    paymentFailureRate,
    inventoryAccuracy,
    webhookLagSeconds,
    score,
    status: score >= 90 ? "healthy" : score >= 75 ? "watch" : "degraded"
  };
}

export function rankStorefronts(snapshots) {
  return snapshots
    .map(calculateStorefrontHealth)
    .sort((left, right) => left.score - right.score);
}

function percentage(numerator, denominator) {
  if (denominator === 0) {
    return 0;
  }

  return Math.round((numerator / denominator) * 10000) / 100;
}
