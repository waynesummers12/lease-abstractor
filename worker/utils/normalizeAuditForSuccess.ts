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

  cam_escalation_low?: number | null;
  cam_escalation_high?: number | null;

  capital_items_low?: number | null;
  capital_items_high?: number | null;

  management_fees_low?: number | null;
  management_fees_high?: number | null;

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
     Roll-up derivation (PDF + UI source of truth)
     Conservative defaults if data missing
  -------------------------------------------------- */

  const rollup = {
    camEscalation: {
      low:
        typeof analysis.cam_escalation_low === "number"
          ? Math.round(analysis.cam_escalation_low)
          : 0,
      high:
        typeof analysis.cam_escalation_high === "number"
          ? Math.round(analysis.cam_escalation_high)
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
        typeof analysis.management_fees_low === "number"
          ? Math.round(analysis.management_fees_low)
          : 0,
      high:
        typeof analysis.management_fees_high === "number"
          ? Math.round(analysis.management_fees_high)
          : 0,
    },
  };

  return {
    // 🔒 SINGLE SOURCE OF TRUTH (flat, UI-ready)
    tenant: analysis.tenant ?? null,
    landlord: analysis.landlord ?? null,
    premises: analysis.premises ?? null,
    lease_start: analysis.lease_start ?? null,
    lease_end: analysis.lease_end ?? null,
    term_months: analysis.term_months ?? null,

    rent: analysis.rent ?? null,

    // ✅ PRIMARY EXPOSURE (green box)
    cam_total_avoidable_exposure: camTotalAvoidableExposure,
    exposure_range: analysis.exposure_range ?? null,
    exposure_risk: analysis.exposure_risk ?? null,
    risk_level: riskLevel,

    // ✅ ROLL-UP (used by PDF + BottomLine)
    rollup,

    // score + flags (used on success page)
    health: health
      ? {
          ...health,
          score: healthScore,
          flags: health.flags ?? null,
        }
      : null,
  };
}
