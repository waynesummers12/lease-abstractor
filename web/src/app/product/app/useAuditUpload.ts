"use client";

import { supabase } from "@/lib/supabaseClient";

type Analysis = any; // keep loose for now on purpose

type UploadResult =
  | { success: true; analysis: Analysis }
  | { success: false; error: string };

export async function runAuditPipeline(
  file: File
): Promise<UploadResult> {
  try {
    // 🔒 Generate auditId ONCE
    const auditId = crypto.randomUUID();

    /* ---------- CREATE AUDIT ROW ---------- */
    const createRes = await fetch("/api/audits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auditId }),
    });

    if (!createRes.ok) {
      return {
        success: false,
        error: `Create audit failed: ${await createRes.text()}`,
      };
    }

    /* ---------- UPLOAD PDF ---------- */
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
        error: uploadError.message,
      };
    }

    /* ---------- INGEST ---------- */
    const ingestRes = await fetch("/api/ingest/lease/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auditId, objectPath }),
    });

    if (!ingestRes.ok) {
      return {
        success: false,
        error: `Ingest failed: ${await ingestRes.text()}`,
      };
    }

    /* ---------- FETCH AUDIT ---------- */
    const auditRes = await fetch(`/api/audits?auditId=${auditId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!auditRes.ok) {
      return {
        success: false,
        error: `Audit fetch failed: ${await auditRes.text()}`,
      };
    }

    const audit = await auditRes.json();
    const analysis = audit?.analysis;

    if (!analysis) {
      return {
        success: false,
        error: "Audit created but analysis not ready",
      };
    }

    return {
      success: true,
      analysis,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Unexpected error",
    };
  }
}
