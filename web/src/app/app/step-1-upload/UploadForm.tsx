"use client";

import { useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

function getSupabase() {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error("Supabase env vars missing");
    }

    supabase = createClient(url, anonKey);
  }

  return supabase;
}

export default function LeaseUploader({
  onUploaded,
}: {
  onUploaded: (path: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const objectPath = `leases/${crypto.randomUUID()}.pdf`;

      const { error } = await getSupabase()
        .storage
        .from("leases")
        .upload(objectPath, file, {
          contentType: "application/pdf",
        });

      if (error) {
        throw error;
      }

      onUploaded(objectPath);
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        disabled={loading}
      />
      {loading && <p>Uploading…</p>}
    </div>
  );
}
