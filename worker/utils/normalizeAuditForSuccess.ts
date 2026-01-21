export function normalizeAuditForSuccess(analysis: any) {
  if (!analysis) return null;

  const avoidable =
    typeof analysis.cam_total_avoidable_exposure === "number"
      ? Math.round(analysis.cam_total_avoidable_exposure)
      : null;

  const healthScore =
    typeof analysis.health?.score === "number"
      ? analysis.health.score
      : null;

  const riskLevel =
    healthScore !== null
      ? healthScore >= 75
        ? "LOW"
        : healthScore >= 50
        ? "MEDIUM"
        : "HIGH"
      : "HIGH";

  const flaggedSections =
    Array.isArray(analysis.health?.flags)
      ? analysis.health.flags.slice(0, 3).map((f: any, idx: number) => ({
          section: `Section ${idx + 1}`,
          title: f.label,
        }))
      : [];

  return {
    avoidable_exposure: avoidable,
    risk_level: riskLevel,
    flagged_sections: flaggedSections,
    health_score: healthScore,
  };
}
