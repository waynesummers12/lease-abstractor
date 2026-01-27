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

  // Preserve FULL flags array (frontend depends on this)
  const flags = Array.isArray(health?.flags) ? health.flags : [];

  // Optional: pre-compute avoidable exposure if backend already has it
  const avoidableExposure =
    typeof analysis.cam_total_avoidable_exposure === "number"
      ? Math.round(analysis.cam_total_avoidable_exposure)
      : null;

  return {
    ...analysis,

    // 🔑 keep health structure intact
    health: health
      ? {
          ...health,
          flags,
        }
      : null,

    // 🔑 derived fields (non-breaking)
    risk_level: riskLevel,
    avoidable_exposure: avoidableExposure,
  };
}

