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

  // Preserve the incoming flags payload (including null) without forcing defaults
  const flags = health?.flags ?? null;

  // Optional: pre-compute avoidable exposure if backend already has it
  const avoidableExposure =
    typeof analysis.cam_total_avoidable_exposure === "number"
      ? Math.round(analysis.cam_total_avoidable_exposure)
      : null;

  return {
  // preserve original analysis fields for downstream usage
  ...analysis,

  // ✅ ensure health object is always shaped correctly for frontend
  health: health
    ? {
        ...health,
        score: healthScore,
        flags, // ← critical: frontend computes exposure from flags[].estimated_impact
      }
    : null,

  // ✅ derived + stable fields the UI depends on
  risk_level: riskLevel,
  avoidable_exposure: avoidableExposure,
};
}

