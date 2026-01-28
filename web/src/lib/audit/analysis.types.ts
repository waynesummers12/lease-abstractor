// lib/audit/analysis.types.ts

export type AuditPipelineResult =
  | {
      success: true;
      status: "analysis_ready";
      analysis: any; // your Analysis type
      auditId: string;
    }
  | {
      success: false;
      status: "analysis_pending" | "failed";
      auditId: string;
      error: string;
    };