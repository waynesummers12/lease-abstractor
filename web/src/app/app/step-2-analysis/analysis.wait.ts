// web/src/app/app/step-2-analysis/analysis.wait.ts

import { sleep } from "./analysis.utils";

export async function waitForAnalysis(
  auditId: string,
  maxAttempts = 20
): Promise<any | null> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(`/api/audits/${auditId}`, {
        cache: "no-store",
      });

      // ⏳ Audit not created yet
      if (res.status === 404) {
        await sleep(2000);
        continue;
      }

      if (!res.ok) {
        await sleep(2000);
        continue;
      }

      const data = await res.json();

      // ✅ THIS IS THE REAL SUCCESS CONDITION
      if (data?.analysis) {
        return data;
      }
    } catch {
      // swallow transient errors
    }

    await sleep(2000);
  }

  return null;
}
