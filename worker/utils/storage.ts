// worker/utils/storage.ts
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


import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase env vars");
}

/**
 * Service-role Supabase client
 * NOTE:
 * - Used ONLY for server-side operations
 * - Never exposed to frontend
 */
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Fetch an ORIGINAL lease PDF from storage
 *
 * IMPORTANT:
 * - This MUST NOT be used for audit PDFs
 * - Audit PDFs are handled explicitly in routes/auditPdf.ts
 */
export async function fetchPdfFromStorage(
  objectPath: string
): Promise<Uint8Array> {
  if (!objectPath) {
    throw new Error("Missing objectPath");
  }

  // Guard: never allow audit PDFs here
  if (objectPath.includes("audit")) {
    throw new Error("Audit PDFs cannot be fetched via fetchPdfFromStorage");
  }

  const { data, error } = await supabase.storage
    .from("leases")
    .download(objectPath);

  if (error || !data) {
    throw new Error(`Failed to download PDF: ${error?.message}`);
  }

  const buffer = await data.arrayBuffer();
  return new Uint8Array(buffer);
}

/**
 * Persist a structured lease abstract
 *
 * IMPORTANT:
 * - Uses object_path as the natural key
 * - Does NOT create audits
 * - Does NOT upload PDFs
 */
export async function saveLeaseAbstract(
  objectPath: string,
  result: Record<string, any>
) {
  if (!objectPath) {
    throw new Error("Missing objectPath");
  }

  const payload = {
    object_path: objectPath,
    bucket: "leases",

    tenant_name: result.tenant_name ?? null,
    landlord_name: result.landlord_name ?? null,
    premises: result.premises ?? null,

    lease_start: result.lease_start ?? null,
    lease_end: result.lease_end ?? null,

    base_rent: result.base_rent ?? null,
    term_months: result.term_months ?? null,

    raw_text_length: result.raw_text_length ?? null,
    confidence: result.confidence ?? null,

    raw_result: result,
  };

  const { error } = await supabase
    .from("lease_abstracts")
    .upsert(payload, {
      onConflict: "object_path",
    });

  if (error) {
    throw new Error(`Failed to save lease abstract: ${error.message}`);
  }
}
