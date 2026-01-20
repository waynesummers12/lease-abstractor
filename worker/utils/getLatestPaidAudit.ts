// worker/utils/getLatestPaidAudit.ts

import { supabase } from "../lib/supabase.ts";

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour

export type LatestPaidAudit = {
  id: string;
  created_at: string;
  object_path: string;
  signed_url: string;
};

export async function getLatestPaidAudit(): Promise<LatestPaidAudit | null> {
  /**
   * HARD INVARIANT:
   * A paid audit MUST have an object_path.
   * Historical corrupted rows are ignored safely.
   */

  const { data, error } = await supabase
    .from("lease_audits")
    .select("id, created_at, object_path")
    .eq("status", "paid")
    .not("object_path", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getLatestPaidAudit query error:", error);
    return null;
  }

  if (!data || !data.object_path) {
    return null;
  }

  const { data: signed, error: signError } =
    await supabase.storage
      .from("leases")
      .createSignedUrl(data.object_path, SIGNED_URL_TTL_SECONDS);

  if (signError || !signed?.signedUrl) {
    console.error("Failed to sign audit PDF:", signError);
    return null;
  }

  return {
    id: data.id,
    created_at: data.created_at,
    object_path: data.object_path,
    signed_url: signed.signedUrl,
  };
}

