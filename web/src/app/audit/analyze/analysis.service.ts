// web/src/app/app/step-2-analysis/analysis.service.ts

import { getSupabaseBrowser } from "@/app/_client/browser";
import { waitForAnalysis } from "./analysis.wait";
import type { AuditPipelineResult } from "@/lib/audit/analysis.types";

export async function runAuditPipeline(
  file: File,
  auditId: string
): Promise<AuditPipelineResult> {
  const supabaseBrowser = getSupabaseBrowser();
  const objectPath = `leases/${auditId}.pdf`;

  try {
    /* ---------- 1. UPLOAD PDF ---------- */
    const { error: uploadError } = await supabaseBrowser.storage
      .from("leases")
      .upload(objectPath, file, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    /* ---------- 2. TRIGGER ANALYSIS (API ONLY) ---------- */
    const analyzeRes = await fetch("/api/audit/analyze", {
      method: "POST",
      body: (() => {
        const form = new FormData();
        form.append("auditId", auditId);
        form.append("objectPath", objectPath);
        return form;
      })(),
    });

    if (!analyzeRes.ok) {
      throw new Error(await analyzeRes.text());
    }

    /* ---------- 3. WAIT FOR ANALYSIS ---------- */
    const { analysis } = await waitForAnalysis(auditId);

    if (!analysis) {
      throw new Error("Analysis not available");
    }

    /* ---------- 4. SUCCESS ---------- */
    return {
      success: true,
      status: "analysis_ready",
      auditId,
      analysis,
    };
  } catch (err: any) {
    return {
      success: false,
      status: "failed",
      auditId,
      error: err?.message ?? "Unexpected pipeline error",
    };
  }
}


