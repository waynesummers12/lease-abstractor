// web/src/app/app/step-2-analysis/analysis.wait.ts

import { sleep } from "@/app/_shared/utils/sleep";

export async function waitForAnalysis(
  auditId: string,
  maxAttempts = 20
): Promise<{ analysis: any }> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(`/api/audit/${auditId}`, {
        cache: "no-store",
      });

      /* ⏳ Audit not ready */
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

      /* ✅ SUCCESS */
      if (data?.analysis) {
        return { analysis: data.analysis };
      }
    } catch {
      // swallow transient errors
    }

    await sleep(2000);
  }

  throw new Error("Timed out waiting for analysis");
}


