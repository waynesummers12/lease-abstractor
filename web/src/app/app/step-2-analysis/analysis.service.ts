// lib/audit/runAuditPipeline.ts
import { supabaseBrowser } from "@/lib/supabase/browser";
import { waitForAnalysis } from "./analysis.wait";
import type { AuditPipelineResult } from "@/lib/audit/analysis.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function runAuditPipeline(
  file: File,
  supabase: SupabaseClient
): Promise<AuditPipelineResult> {
  const objectPath = `leases/${crypto.randomUUID()}.pdf`;

  try {
    /* ---------- 1. UPLOAD PDF ---------- */
    const { error: uploadError } = await supabaseBrowser.storage
      .from("leases")
      .upload(objectPath, file, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      return {
        success: false,
        status: "failed",
        auditId,
        error: uploadError.message,
      };
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
  objectPath,
}),
      }
    );

    if (!ingestRes.ok) {
      return {
        success: false,
        status: "failed",
        auditId,
        error: await ingestRes.text(),
      };
    }

    /* ---------- 3. WAIT FOR ANALYSIS ---------- */
    const analysis = await waitForAnalysis(auditId);

    if (!analysis) {
      return {
        success: false,
        status: "analysis_pending",
        auditId,
        error: "Analysis not ready",
      };
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
  error: uploadError.message,
};
  }
}
