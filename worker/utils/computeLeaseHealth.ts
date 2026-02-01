// worker/utils/computeLeaseHealth.ts
/**
 * SHARED UTILITY — SAVEONLEASE V1
 *
 * Rules:
 * - Pure functions only
 * - No side effects
 * - No network calls
 * - No environment variables
 *
 * Safe to use in:
 * - Worker
 * - API routes
 *
 * NOT safe for client unless explicitly reviewed.
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
    escalation_exposure: number | null;
  } | null;
};

type HealthFlag = {
  code: string;
  label: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
  estimated_impact?: string;
};

export function computeLeaseHealth(input: LeaseHealthInput) {
  const flags: HealthFlag[] = [];
  let score = 100;

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

  /* ---------- ESCALATION ---------- */
  if (typeof cam.escalation_exposure === "number" && cam.escalation_exposure > 0) {
    score -= 15;
    flags.push({
      code: "ESCALATION_RISK",
      label: "Escalating CAM expenses detected",
      severity: "medium",
      recommendation:
        "Escalation clauses should be reviewed for caps and compounding.",
      estimated_impact: `$${Math.round(cam.escalation_exposure).toLocaleString()} annually`,
    });
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
  };
}
