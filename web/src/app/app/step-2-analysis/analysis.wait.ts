// web/src/app/app/step-2-analysis/analysis.wait.ts

import { sleep } from "./analysis.utils";

export type AuditByIdResponse =
  | {
      success: true;
      status: "analysis_ready";
      analysis: any;
      auditId: string;
    }
  | {
      success: false;
      status: "analysis_pending" | "failed";
      auditId: string;
      error: string;
    };

export async function waitForAnalysis(
  auditId: string,
  maxAttempts = 15
): Promise<AuditByIdResponse> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(`/api/audits/${auditId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        await sleep(2000);
        continue;
      }

      const result: AuditByIdResponse = await res.json();

      if (result.success && result.analysis) {
        return result;
      }
    } catch {
      // swallow transient errors
    }

    await sleep(2000);
  }

  return {
    success: false,
    status: "failed",
    auditId,
    error: "Analysis timed out",
  };
}

