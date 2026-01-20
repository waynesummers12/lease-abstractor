// worker/utils/createAuditPdfSignedUrl.ts

import { supabase } from "../lib/supabase.ts";

/**
 * Create a signed URL for an AUDIT PDF
 *
 * INVARIANTS:
 * - objectPath MUST come from lease_audits.object_path
 * - Audit PDFs live in the "leases" bucket
 * - objectPath MUST NOT be null
 */
export async function createAuditPdfSignedUrl(
  objectPath: string,
  expiresInSeconds = 60 * 60 // 1 hour (safe default)
): Promise<string> {
  if (!objectPath) {
    throw new Error("Missing objectPath for audit PDF");
  }

  // Guard: enforce audit PDF naming convention
  // Audit PDFs are always: leases/<auditId>.pdf
  if (!objectPath.startsWith("leases/") || !objectPath.endsWith(".pdf")) {
    throw new Error(`Invalid audit PDF objectPath: ${objectPath}`);
  }

  const { data, error } = await supabase.storage
    .from("leases") // 🔒 CORRECT BUCKET
    .createSignedUrl(objectPath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    throw new Error(
      `Failed to create signed URL for audit PDF: ${error?.message}`
    );
  }

  return data.signedUrl;
}

