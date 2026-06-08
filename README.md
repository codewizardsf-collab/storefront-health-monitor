# Storefront Health Monitor

A storefront health scoring module for ranking brands by checkout conversion, payment failure rate, inventory accuracy, and webhook lag.

## Stack

Node.js, ecommerce operations, checkout health

## Problem

Multi-storefront teams need fast operational signals before campaign launches and during checkout incidents.

## Architecture

- health-score.mjs calculates storefront health and ranks weakest storefronts first.
- Tests cover degraded payment reliability and ranking.
- The domain is transport-agnostic and ready for a dashboard API.

## Implemented Production Readiness

- CI runs the Node test suite.
- Health status uses stable thresholds.
- Ranking puts the weakest storefront first for operational response.

## Run And Test

```powershell
npm test
```

## Quality Gates

- Project-specific GitHub Actions workflow included under .github/workflows/ci.yml.
- Generated build outputs and dependency folders are excluded through .gitignore.
- Tests and validation commands are intentionally small enough to run during code review.

## Production Extension Points

- Add Shopify Admin API adapter.
- Add Redis webhook lag tracking.
- Export Datadog or OpenTelemetry metrics.

## Repository Hygiene

This repository contains original portfolio code only. It does not include employer source code, private resumes, generated binaries, local credentials, or large media files.

