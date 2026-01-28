// web/src/lib/audit/fetchAnalysis.ts

import type { AuditPipelineResult } from "./analysis.types";

export async function fetchAnalysis(
  auditId: string
): Promise<AuditPipelineResult> {

  if (!auditId) {
    throw new Error("fetchAnalysis called without auditId");
  }

  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

  if (!workerUrl) {
    throw new Error("Missing NEXT_PUBLIC_WORKER_URL");
  }

  const url = `${workerUrl}/auditById/${auditId}`;

  console.log("🔎 Fetching audit analysis:", url);

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Audit fetch failed:", res.status, text);
    throw new Error(`Audit fetch failed (${res.status})`);
  }

  const data = await res.json();

  /**
   * Normalize exposure fields so pre-checkout and success
   * pages can rely on the same shape.
   *
   * This does NOT invent data — it only surfaces what exists.
   */
  const analysis = data.analysis ?? data;

  return {
    ...data,
    analysis: {
      ...analysis,

      // Primary exposure number
      cam_total_avoidable_exposure:
        analysis.cam_total_avoidable_exposure ??
        analysis.avoidable_exposure ??
        null,

      // Optional range
      exposure_range:
        analysis.exposure_range ??
        (analysis.exposure_low != null && analysis.exposure_high != null
          ? {
              low: analysis.exposure_low,
              high: analysis.exposure_high,
            }
          : null),

      // Optional risk label
      exposure_risk:
        analysis.exposure_risk ??
        analysis.risk_level ??
        null,
    },
  };
}



