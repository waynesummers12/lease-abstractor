"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { runAuditPipeline } from "@/app/app/step-2-analysis/analysis.service";
import { v4 as uuidv4 } from "uuid";

export function useAuditUpload() {
  async function uploadAndAnalyze(file: File) {
    const auditId = uuidv4();

    const result = await runAuditPipeline(
      file,
      supabaseBrowser,
      auditId
    );

    if (!result.success) {
      throw new Error(result.error || "Audit pipeline failed");
    }

    // 🔑 RETURN A SIMPLE SHAPE
    return {
      id: auditId,
    };
  }

  return {
    uploadAndAnalyze,
  };
}




