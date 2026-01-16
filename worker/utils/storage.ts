// worker/utils/storage.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase env vars");
}

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

export async function fetchPdfFromStorage(
  objectPath: string
): Promise<Uint8Array> {
  const { data, error } = await supabase.storage
    .from("leases")
    .download(objectPath);

  if (error || !data) {
    throw new Error(`Failed to download PDF: ${error?.message}`);
  }

  const buffer = await data.arrayBuffer();
  return new Uint8Array(buffer);
}

export async function saveLeaseAbstract(
  objectPath: string,
  result: Record<string, any>
) {
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


