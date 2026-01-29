// web/src/app/app/step-2-analysis/analysis.wait.ts

import { sleep } from "./analysis.utils";

export async function waitForAnalysis(
  auditId: string,
  maxAttempts = 20
): Promise<any> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(`/api/audits/${auditId}`, {
        cache: "no-store",
      });

      /* ⏳ Audit not ready yet */
      if (res.status === 404) {
        await sleep(2000);
        continue;
      }

      /* ⚠️ Transient backend issue */
      if (!res.ok) {
        await sleep(2000);
        continue;
      }

      const data = await res.json();

      /* ✅ SUCCESS: analysis exists */
      if (data?.analysis) {
        return data.analysis; // ← return analysis ONLY
      }
    } catch {
      // swallow transient network errors
    }

    await sleep(2000);
  }

  /* 🚫 HARD FAILURE */
  throw new Error("Timed out waiting for analysis");
}

