"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { runAuditPipeline } from "../step-2-analysis/analysis.service";

export function useAuditUpload() {
  async function uploadAndAnalyze(file: File, auditId: string) {
    return await runAuditPipeline(file, supabaseBrowser, auditId);
  }

  return {
    uploadAndAnalyze,
  };
}


