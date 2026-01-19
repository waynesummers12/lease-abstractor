// worker/utils/createAuditPdfSignedUrl.ts
import { supabase } from "../lib/supabase.ts";

export async function createAuditPdfSignedUrl(
  objectPath: string,
  expiresInSeconds = 60 * 10 // 10 minutes
) {
  const { data, error } = await supabase.storage
    .from("audit-pdfs")
    .createSignedUrl(objectPath, expiresInSeconds);

  if (error) {
    console.error("createSignedUrl error:", error);
    return null;
  }

  return data.signedUrl;
}
