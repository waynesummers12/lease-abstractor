"use client";

import { runAuditPipeline } from "../step-2-analysis/analysis.service";

export function useAuditUpload() {
  async function uploadAndAnalyze(file: File, auditId: string) {
    return await runAuditPipeline(file, auditId);
  }

  return {
    uploadAndAnalyze,
  };
}

