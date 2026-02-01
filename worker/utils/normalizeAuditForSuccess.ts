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


export function normalizeAuditForSuccess(analysis: any) {
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

  return {
    // 🔒 SINGLE SOURCE OF TRUTH (flat, UI-ready)
    tenant: analysis.tenant ?? null,
    landlord: analysis.landlord ?? null,
    premises: analysis.premises ?? null,
    lease_start: analysis.lease_start ?? null,
    lease_end: analysis.lease_end ?? null,
    term_months: analysis.term_months ?? null,

    rent: analysis.rent ?? null,

    // ✅ THIS IS WHAT THE GREEN BOX NEEDS
    cam_total_avoidable_exposure: camTotalAvoidableExposure,
    exposure_range: analysis.exposure_range ?? null,
    exposure_risk: analysis.exposure_risk ?? null,
    risk_level: riskLevel,

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
