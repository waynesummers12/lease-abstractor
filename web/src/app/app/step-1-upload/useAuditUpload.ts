"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { runAuditPipeline } from "@/app/app/step-2-analysis/analysis.service";

export function useAuditUpload() {
  async function uploadAndAnalyze(file: File) {
    // ✅ Generate auditId correctly
    const auditId = crypto.randomUUID();

    return await runAuditPipeline(
      file,
      supabaseBrowser,
      auditId
    );
  }

  return {
    uploadAndAnalyze,
  };
}
