// lib/audit/waitForAnalysis.ts
import { sleep } from "./utils";
import { fetchAnalysis } from "./fetchAnalysis";

export async function waitForAnalysis(
  auditId: string,
  {
    maxRetries = 3,
    delayMs = 750,
  }: { maxRetries?: number; delayMs?: number } = {}
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const analysis = await fetchAnalysis(auditId);

    if (analysis) {
      return analysis;
    }

    if (attempt < maxRetries) {
      await sleep(delayMs);
    }
  }

  return null;
}
