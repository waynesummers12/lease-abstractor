"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { runAuditPipeline } from "@/app/app/step-2-analysis/analysis.service";

export function useAuditUpload() {
  async function uploadAndAnalyze(file: File) {
    // ✅ Native UUID — no library needed
    const auditId = crypto.randomUUID();

    const result = await runAuditPipeline(
      file,
      supabaseBrowser,
      auditId
    );

    if (!result.success) {
      throw new Error(result.error || "Audit pipeline failed");
    }

    // ✅ Return EXACT shape expected by page.tsx
    return {
      id: auditId,
    };
  }

  return {
    uploadAndAnalyze,
  };
}





