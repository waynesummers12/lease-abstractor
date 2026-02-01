// web/src/app/app/useAuditUpload.ts
"use client";

/**
 * TEMPORARILY DISABLED
 * Supabase is not allowed in Vercel build.
 * Worker handles ingestion directly.
 */

export function useAuditUpload() {
  async function uploadAndIngest(_file: File, _auditId: string) {
    throw new Error(
      "useAuditUpload disabled: ingestion handled via worker"
    );
  }

  return { uploadAndIngest };
}
