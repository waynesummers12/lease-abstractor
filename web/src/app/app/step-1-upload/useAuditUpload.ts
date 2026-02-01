//web/src/app/app/useAuditUpload.ts
"use client";

import { supabase } from "@/lib/supabaseClient";

export function useAuditUpload() {
  async function uploadAndIngest(file: File, auditId: string) {
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


