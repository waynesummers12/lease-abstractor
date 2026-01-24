// lib/audit/fetchAnalysis.ts
export async function fetchAnalysis(auditId: string) {
  const res = await fetch(`/api/audits?auditId=${auditId}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Audit fetch failed (${res.status})`);
  }

  const audit = await res.json();
  return audit?.analysis ?? null;
}
