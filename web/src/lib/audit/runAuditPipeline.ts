// lib/audit/runAuditPipeline.ts
import { supabase } from "@/lib/supabaseClient";
import { waitForAnalysis } from "./waitForAnalysis";
import type { AuditPipelineResult } from "./types";

export async function runAuditPipeline(
  file: File,
  supabase: SupabaseClient
): Promise<AuditPipelineResult> {
  const auditId = crypto.randomUUID();

  try {
    /* ---------- 1. CREATE AUDIT ---------- */
    const createRes = await fetch("/api/audits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auditId }),
    });

    if (!createRes.ok) {
      return {
        success: false,
        status: "failed",
        auditId,
        error: await createRes.text(),
      };
    }

    /* ---------- 2. UPLOAD PDF ---------- */
    const objectPath = `leases/${auditId}.pdf`;

    const { error: uploadError } = await supabase.storage
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

    /* ---------- 3. INGEST ---------- */
    const ingestRes = await fetch("/api/ingest/lease/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auditId, objectPath }),
    });

    if (!ingestRes.ok) {
      return {
        success: false,
        status: "failed",
        auditId,
        error: await ingestRes.text(),
      };
    }

    /* ---------- 4. WAIT FOR ANALYSIS ---------- */
    const analysis = await waitForAnalysis(auditId);

    if (!analysis) {
      return {
        success: false,
        status: "analysis_pending",
        auditId,
        error: "Analysis not ready",
      };
    }

    /* ---------- 5. SUCCESS ---------- */
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
