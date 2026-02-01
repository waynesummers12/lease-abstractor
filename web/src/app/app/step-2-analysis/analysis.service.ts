// web/src/app/app/useAuditUpload.ts
"use client";

/**
 * CLIENT COMPONENT — SAVEONLEASE V1 (LOCKED)
 *
 * Rules:
 * - Client-side only
 * - No Supabase imports
 * - No Stripe imports
 * - No server-only logic
 * - No process.env (except NEXT_PUBLIC_*)
 *
 * Allowed:
 * - fetch("/api/...")
 * - useState / useEffect / useRouter
 * - window.location
 *
 * Violation = production regression
 */


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
