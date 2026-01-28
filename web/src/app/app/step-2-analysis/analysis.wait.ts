// lib/audit/waitForAnalysis.ts
import { sleep } from "./analysis.utils";
import { fetchAnalysis } from "./analysis.fetch";

type AuditByIdResponse = {
  analysis: any | null;
  signedUrl: string | null;
};

export async function waitForAnalysis(
  auditId: string,
  {
    maxRetries = 10,
    delayMs = 1500,
  }: { maxRetries?: number; delayMs?: number } = {}
): Promise<AuditByIdResponse | null> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await fetchAnalysis(auditId);

      // ✅ Analysis is ready
      if (result?.success === true && result.analysis) {
  return result;
}
    } catch (err) {
      // Swallow transient errors (404s during early pipeline)
      console.warn(
        `waitForAnalysis attempt ${attempt} failed, retrying…`,
        err
      );
    }

    if (attempt < maxRetries) {
      await sleep(delayMs);
    }
  }

  return null;
}
