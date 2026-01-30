"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const auditId = crypto.randomUUID();
    const objectPath = `leases/${auditId}.pdf`;

    try {
      /* ---------- UPLOAD TO SUPABASE ---------- */
      const { error } = await getSupabase()
        .storage
        .from("leases")
        .upload(objectPath, file, {
          contentType: "application/pdf",
        });

      if (error) throw error;

      /* ---------- TRIGGER ANALYSIS (FormData!) ---------- */
      const formData = new FormData();
      formData.append("auditId", auditId);
      formData.append("objectPath", objectPath);

      const res = await fetch("/api/audit/analyze", {
        method: "POST",
        body: formData, // ✅ DO NOT set Content-Type manually
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Analysis failed");
      }

      /* ---------- GO TO REVIEW ---------- */
      router.push(`/app/step-3-review?auditId=${auditId}`);
    } catch (err: any) {
      alert(err.message || "Upload failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        disabled={loading}
      />

      {loading && (
        <p className="text-sm text-gray-600">Uploading…</p>
      )}
    </div>
  );
}
