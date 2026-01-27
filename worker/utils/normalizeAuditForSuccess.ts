export function normalizeAuditForSuccess(analysis: any) {
  if (!analysis) return null;

  const rawHealth = analysis.health ?? {};

  const healthScore =
    typeof rawHealth.score === "number" ? rawHealth.score : null;

  // 🔑 ALWAYS guarantee flags is an array
  const flags = Array.isArray(rawHealth.flags) ? rawHealth.flags : [];

  const riskLevel =
    healthScore !== null
      ? healthScore >= 75
        ? "LOW"
        : healthScore >= 50
        ? "MEDIUM"
        : "HIGH"
      : "HIGH";

  const avoidableExposure =
    typeof analysis.cam_total_avoidable_exposure === "number"
      ? Math.round(analysis.cam_total_avoidable_exposure)
      : null;

  return {
    // preserve everything else
    ...analysis,

    // 🔒 frontend-safe shape (never undefined)
    health: {
      ...rawHealth,
      score: healthScore,
      flags,
    },

    // derived fields used by UI
    risk_level: riskLevel,
    avoidable_exposure: avoidableExposure,
  };
}
