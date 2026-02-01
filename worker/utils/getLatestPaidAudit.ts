// worker/utils/getLatestPaidAudit.ts
/**
 * SHARED UTILITY — SAVEONLEASE V1
 *
 * Rules:
 * - Pure functions only
 * - No side effects
 * - No network calls
 * - No environment variables
 *
 * Safe to use in:
 * - Worker
 * - API routes
 *
 * NOT safe for client unless explicitly reviewed.
 */

import { supabase } from "../lib/supabase.ts";

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour

export type LatestPaidAudit = {
  id: string;
  created_at: string;
  avoidable_exposure: number | null;
  signedUrl: string | null;
  email_sent: boolean;
};

export async function getLatestPaidAudit(): Promise<LatestPaidAudit | null> {
  /**
   * Fetch the latest COMPLETE audit with a generated PDF.
   */

  const { data, error } = await supabase
    .from("lease_audits")
    .select("id, created_at, analysis, audit_pdf_path, email_sent")
    .eq("status", "complete")
    .not("audit_pdf_path", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getLatestPaidAudit query error:", error);
    return null;
  }

  if (!data || !data.audit_pdf_path) {
    return null;
  }

  // Create signed URL for the audit PDF
  const objectPath = data.audit_pdf_path.replace(/^audit-pdfs\//, "");
  const { data: signed, error: signError } = await supabase.storage
    .from("audit-pdfs")
    .createSignedUrl(objectPath, SIGNED_URL_TTL_SECONDS);

  if (signError || !signed?.signedUrl) {
    console.error("Failed to sign audit PDF:", signError);
    return null;
  }

  // Extract avoidable_exposure from analysis
  const avoidable_exposure = 
    typeof data.analysis?.avoidable_exposure === "number"
      ? data.analysis.avoidable_exposure
      : null;

  return {
    id: data.id,
    created_at: data.created_at,
    avoidable_exposure,
    signedUrl: signed.signedUrl,
    email_sent: data.email_sent ?? false,
  };
}

