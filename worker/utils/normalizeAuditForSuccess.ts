// worker/utils/normalizeAuditForSuccess.ts

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

  // 🔑 DO NOT default flags to []
  // Preserve exactly what abstractLease produced
  const flags = health?.flags ?? null;

  const avoidableExposure =
    typeof analysis.cam_total_avoidable_exposure === "number"
      ? Math.round(analysis.cam_total_avoidable_exposure)
      : null;

  return {
    // preserve original analysis structure
    ...analysis,

    // ✅ preserve health + flags (this is what frontend needs)
    health: health
      ? {
          ...health,
          score: healthScore,
          flags,
        }
      : null,

    // derived helpers (safe to add)
    risk_level: riskLevel,
    avoidable_exposure: avoidableExposure,
  };
}

