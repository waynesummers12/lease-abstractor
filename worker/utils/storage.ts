// worker/utils/storage.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get(
  "SUPABASE_SERVICE_ROLE_KEY"
)!;

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

export async function fetchPdfFromStorage(objectPath: string): Promise<Uint8Array> {
  const { data, error } = await supabase.storage
    .from("leases")
    .download(objectPath);

  if (error || !data) {
    throw new Error(`Failed to download PDF: ${error?.message}`);
  }

  const arrayBuffer = await data.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
