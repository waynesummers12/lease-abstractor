"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { runAuditPipeline } from "../step-2-analysis/analysis.service";

export function useAuditUpload() {
  async function uploadAndAnalyze(file: File) {
    const auditId = crypto.randomUUID();
    return await runAuditPipeline(file, supabaseBrowser, auditId);
  }

  return { uploadAndAnalyze };
}



