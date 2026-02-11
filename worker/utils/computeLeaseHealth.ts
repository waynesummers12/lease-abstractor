// worker/utils/computeLeaseHealth.ts
/**
 * SHARED UTILITY — SAVEONLEASE V1 (LOCKED)
 *
 * Intended use:
 * - utils/*.ts files
 * - Normalization helpers
 * - Pure calculations
 *
 * Rules:
 * - Pure functions only
 * - No side effects
 * - No network calls
 * - No environment variables
 *
 * Safe to use in:
 * - Worker (Deno + Oak)
 * - Next.js API routes
 *
 * NOT safe for client components unless explicitly reviewed.
 */


type LeaseHealthInput = {
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;
  cam_nnn: {
    monthly_amount: number | null;
    annual_amount: number | null;
    total_exposure: number | null;
    is_uncapped: boolean;
    reconciliation: boolean;
    includes_capex: boolean;
    cam_cap_percent: number | null;

    // 🔥 Structured numeric findings inputs
    escalation_low: number | null;
    escalation_high: number | null;
    capital_items_low: number | null;
    capital_items_high: number | null;
    management_fee_low: number | null;
    management_fee_high: number | null;
  } | null;
};

type HealthFlag = {
  code: string;
  label: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
  estimated_impact?: string;
};

type StructuredFinding = {
  type: "CAM_ESCALATION" | "CAPITAL_ITEMS" | "MANAGEMENT_FEES";
  low: number;
  high: number;
  explanation: string;
  severity: "low" | "medium" | "high";
};

export function computeLeaseHealth(input: LeaseHealthInput) {
  const flags: HealthFlag[] = [];
  let score = 100;
  const findings: StructuredFinding[] = [];

  const cam = input.cam_nnn;

  if (!cam) {
    return { score: 100, flags: [] };
  }

  /* ---------- UNCAPPED CAM ---------- */
  if (cam.is_uncapped) {
    score -= 25;
    flags.push({
      code: "UNCAPPED_CAM",
      label: "CAM charges appear uncapped",
      severity: "high",
      recommendation:
        "Uncapped CAM expenses expose tenants to unlimited cost increases.",
      estimated_impact: "$5k–$25k annually",
    });
  }

  /* ---------- CAPEX ---------- */
  if (cam.includes_capex) {
    score -= 20;
    flags.push({
      code: "CAPEX_INCLUDED",
      label: "Capital expenditures passed through",
      severity: "high",
      recommendation:
        "Many leases exclude capital items from CAM unless explicitly allowed.",
      estimated_impact: "$3k–$15k annually",
    });
  }

  /* ---------- STRUCTURED NUMERIC FINDINGS ---------- */

  if (
    typeof cam.escalation_high === "number" &&
    cam.escalation_high > 0
  ) {
    findings.push({
      type: "CAM_ESCALATION",
      low: cam.escalation_low ?? 0,
      high: cam.escalation_high,
      explanation:
        "Projected CAM escalation exposure based on uncapped or compounding increases.",
      severity:
        cam.escalation_high > 15000 ? "high" : "medium",
    });

    score -= cam.escalation_high > 15000 ? 20 : 10;
  }

  if (
    typeof cam.capital_items_high === "number" &&
    cam.capital_items_high > 0
  ) {
    findings.push({
      type: "CAPITAL_ITEMS",
      low: cam.capital_items_low ?? 0,
      high: cam.capital_items_high,
      explanation:
        "Capital expenditures appear to be passed through CAM and may require amortization.",
      severity:
        cam.capital_items_high > 10000 ? "high" : "medium",
    });

    score -= cam.capital_items_high > 10000 ? 20 : 10;
  }

  if (
    typeof cam.management_fee_high === "number" &&
    cam.management_fee_high > 0
  ) {
    findings.push({
      type: "MANAGEMENT_FEES",
      low: cam.management_fee_low ?? 0,
      high: cam.management_fee_high,
      explanation:
        "Management or administrative fee percentage may exceed conservative market caps.",
      severity:
        cam.management_fee_high > 10000 ? "medium" : "low",
    });

    score -= cam.management_fee_high > 10000 ? 10 : 5;
  }

  /* ---------- RECONCILIATION ---------- */
  if (!cam.reconciliation) {
    score -= 10;
    flags.push({
      code: "NO_RECONCILIATION",
      label: "No clear CAM reconciliation process",
      severity: "medium",
      recommendation:
        "Lack of reconciliation transparency limits audit rights.",
    });
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    flags,
    findings,
  };
}
