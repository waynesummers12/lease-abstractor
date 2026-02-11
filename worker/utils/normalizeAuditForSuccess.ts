// worker/utils/normalizeAuditForSuccess.ts
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

type NormalizeAuditHealth = {
  score?: number | null;
  flags?: unknown;
  findings?: unknown;
};

type NormalizeAuditAnalysis = {
  tenant?: string | null;
  landlord?: string | null;
  premises?: string | null;
  lease_start?: string | null;
  lease_end?: string | null;
  term_months?: number | null;
  rent?: number | null;

  exposure_range?: string | null;
  exposure_risk?: string | null;

  cam_total_avoidable_exposure?: number | null;

  // 🔥 flattened numeric inputs from abstractLease
  escalation_low?: number | null;
  escalation_high?: number | null;

  capital_items_low?: number | null;
  capital_items_high?: number | null;

  management_fee_low?: number | null;
  management_fee_high?: number | null;

  health?: NormalizeAuditHealth | null;
};

export function normalizeAuditForSuccess(
  analysis: NormalizeAuditAnalysis | null | undefined,
) {
  if (!analysis) return null;

  const health = analysis.health ?? null;

  const healthScore =
    typeof health?.score === "number" ? health.score : null;

  const riskLevel =
    healthScore !== null
      ? healthScore >= 75
        ? "LOW"
        : healthScore >= 50
        ? "MEDIUM"
        : "HIGH"
      : "HIGH";

  const camTotalAvoidableExposure =
    typeof analysis.cam_total_avoidable_exposure === "number"
      ? Math.round(analysis.cam_total_avoidable_exposure)
      : null;

  /* -------------------------------------------------
     ROLLUPS — SINGLE SOURCE OF TRUTH FOR PDF
     (No inference, no guessing, just wiring)
  -------------------------------------------------- */

  const rollup = {
    camEscalation: {
      low:
        typeof analysis.escalation_low === "number"
          ? Math.round(analysis.escalation_low)
          : 0,
      high:
        typeof analysis.escalation_high === "number"
          ? Math.round(analysis.escalation_high)
          : 0,
    },

    capitalItems: {
      low:
        typeof analysis.capital_items_low === "number"
          ? Math.round(analysis.capital_items_low)
          : 0,
      high:
        typeof analysis.capital_items_high === "number"
          ? Math.round(analysis.capital_items_high)
          : 0,
    },

    managementFees: {
      low:
        typeof analysis.management_fee_low === "number"
          ? Math.round(analysis.management_fee_low)
          : 0,
      high:
        typeof analysis.management_fee_high === "number"
          ? Math.round(analysis.management_fee_high)
          : 0,
    },
  };

  return {
    // 🔒 FLAT, UI-READY FIELDS
    tenant: analysis.tenant ?? null,
    landlord: analysis.landlord ?? null,
    premises: analysis.premises ?? null,
    lease_start: analysis.lease_start ?? null,
    lease_end: analysis.lease_end ?? null,
    term_months: analysis.term_months ?? null,

    rent: analysis.rent ?? null,

    // ✅ PRIMARY EXPOSURE (GREEN BOX — UNCHANGED)
    cam_total_avoidable_exposure: camTotalAvoidableExposure,
    exposure_range: analysis.exposure_range ?? null,
    exposure_risk: analysis.exposure_risk ?? null,
    risk_level: riskLevel,

    // ✅ PDF + SUMMARY SOURCE
    rollup,

    // health block (unchanged)
    health: health
  ? {
      ...health,
      score: healthScore,
      flags: health.flags ?? null,
      findings: health.findings ?? [],
    }
  : null,
  };
}