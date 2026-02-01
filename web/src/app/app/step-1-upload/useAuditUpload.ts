"use client";

import { supabase } from "@/lib/supabaseClient";
import { runAuditPipeline } from "@/lib/audit/runAuditPipeline";

export function useAuditUpload() {
  async function uploadAndAnalyze(file: File) {
    return await runAuditPipeline(file, supabase);
  }

  return {
    uploadAndAnalyze,
  };
}
