// web/src/app/app/useAuditUpload.ts
"use client";

export function useAuditUpload() {
  async function uploadAndIngest(file: File, auditId: string) {
    // 🔒 Lazy-load Supabase so it NEVER runs during build
    const { createClient } = await import("@supabase/supabase-js");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase env vars missing");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const objectPath = `leases/${auditId}.pdf`;

    // 1️⃣ Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from("leases")
      .upload(objectPath, file, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // 2️⃣ Trigger worker ingest
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_URL}/ingest/lease/pdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lease-Worker-Key":
            process.env.NEXT_PUBLIC_WORKER_KEY!,
        },
        body: JSON.stringify({
          auditId,
          objectPath,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(await res.text());
    }
  }

  return { uploadAndIngest };
}
