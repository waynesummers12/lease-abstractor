//web/src/app/app/useAuditUpload.ts
"use client";

import { supabase } from "@/lib/supabaseClient";

export function useAuditUpload() {
  async function uploadFile(file: File, auditId: string) {
    const path = `leases/${auditId}.pdf`;

    const { error } = await supabase.storage
      .from("leases")
      .upload(path, file, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  return { uploadFile };
}

