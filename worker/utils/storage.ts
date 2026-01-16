// worker/utils/storage.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchPdfFromStorage(
  objectPath: string
): Promise<Uint8Array> {
  const { data, error } = await supabase.storage
    .from("leases")
    .download(objectPath);

  if (error || !data) {
    throw new Error(error?.message || "Failed to download PDF");
  }

  const arrayBuffer = await data.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

