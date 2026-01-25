// lib/audit/fetchAnalysis.ts
export async function fetchAnalysis(auditId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORKER_URL}/auditById/${auditId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-lease-worker-key": process.env.NEXT_PUBLIC_WORKER_KEY!,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Audit fetch failed (${res.status})`);
  }

  return res.json();
}
