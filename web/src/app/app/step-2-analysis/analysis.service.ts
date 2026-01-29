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

    /* ---------- 2. INGEST VIA WORKER ---------- */
    const ingestRes = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_URL}/ingest/lease/pdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-lease-worker-key": process.env.NEXT_PUBLIC_WORKER_KEY!,
        },
        body: JSON.stringify({
          auditId,
          objectPath,
        }),
      }
    );

    if (!ingestRes.ok) {
      throw new Error(await ingestRes.text());
    }

    /* ---------- 3. WAIT FOR ANALYSIS ---------- */
    const result = await waitForAnalysis(auditId);
    const analysis = result?.analysis ?? null;


    /* ---------- 4. SUCCESS (analysis is guaranteed here) ---------- */
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
