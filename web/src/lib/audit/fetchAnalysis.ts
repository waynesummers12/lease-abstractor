// web/src/lib/audit/fetchAnalysis.ts

import { ApiResult } from "./types";

export async function fetchAnalysis(auditId: string): Promise<ApiResult> {
  if (!auditId) {
    throw new Error("fetchAnalysis called without auditId");
  }

  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

  if (!workerUrl) {
    throw new Error("Missing NEXT_PUBLIC_WORKER_URL");
  }

  const url = `${workerUrl}/auditById/${auditId}`;

  console.log("🔎 Fetching audit analysis:", url);

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Audit fetch failed:", res.status, text);
    throw new Error(`Audit fetch failed (${res.status})`);
  }

  return res.json();
}


