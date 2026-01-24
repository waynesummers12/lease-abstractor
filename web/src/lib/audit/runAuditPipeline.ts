// lib/audit/runAuditPipeline.ts
import { waitForAnalysis } from "./waitForAnalysis";
import type { AuditPipelineResult } from "./types";

export async function runAuditPipeline(
  file: File
): Promise<AuditPipelineResult> {
  try {
    const auditId = crypto.randomUUID();

    // 1. Create audit
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
        error: "Failed to initialize audit",
      };
    }

    // 2. Upload PDF
    const objectPath = `leases/${auditId}.pdf`;
    // (reuse your existing upload logic here)

    // 3. Ingest
    const ingestRes = await fetch("/api/ingest/lease/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objectPath, auditId }),
    });

    if (!ingestRes.ok) {
      return {
        success: false,
        status: "failed",
        auditId,
        error: "Ingest failed",
      };
    }

    // 4. Wait for analysis (NEW)
    const analysis = await waitForAnalysis(auditId);

    if (!analysis) {
      return {
        success: false,
        status: "analysis_pending",
        auditId,
        error: "Analysis still processing",
      };
    }

    // 5. Success
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
      auditId: "unknown",
      error: err.message ?? "Unexpected pipeline error",
    };
  }
}
