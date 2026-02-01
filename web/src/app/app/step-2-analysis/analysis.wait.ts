// web/src/app/app/step-2-analysis/analysis.wait.ts

import { sleep } from "./analysis.utils";

export async function waitForAnalysis(
  auditId: string,
  maxAttempts = 15
): Promise<any | null> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(`/api/audits/${auditId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        await sleep(2000);
        continue;
      }

      const result = await res.json();

      // ✅ API already returns { analysis }
      if (result?.analysis) {
        return result.analysis;
      }
    } catch {
      // swallow transient errors
    }

    await sleep(2000);
  }

  return null;
}
