"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authenticatedPortfolioFetch } from "@/lib/portfolioFetch";

type Audit = {
  id: string;
  completed_at: string | null;
  portfolio_lease_id: string | null;
  analysis: { tenant?: string | null; property_name?: string | null } | null;
};

export function PortfolioAuditList({ leaseId, leases = [] }: {
  leaseId?: string;
  leases?: { id: string; propertyName: string }[];
}) {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    authenticatedPortfolioFetch("/api/portfolio-audits")
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to load completed audits");
        return res.json();
      })
      .then((data) => { if (active) setAudits(data.audits ?? []); })
      .catch(() => { if (active) setError("Unable to load completed audits."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function linkAudit(auditId: string, portfolioLeaseId: string) {
    if (!portfolioLeaseId) return;
    try {
      const res = await authenticatedPortfolioFetch("/api/portfolio-audits", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, portfolioLeaseId }),
      });
      if (!res.ok) throw new Error("Unable to link audit");
      setAudits((current) => current.map((audit) =>
        audit.id === auditId ? { ...audit, portfolio_lease_id: portfolioLeaseId } : audit
      ));
    } catch {
      setError("Unable to link this audit. Please try again.");
    }
  }

  const visible = leaseId ? audits.filter((audit) => audit.portfolio_lease_id === leaseId) : audits;
  return (
    <section className="rounded-lg border bg-white p-6">
      <h2 className="mb-2 text-lg font-semibold">Completed audits</h2>
      <p className="mb-4 text-sm text-gray-600">Reports from audits you ran while signed in.</p>
      {loading ? <p className="text-sm text-gray-500">Loading audits...</p> :
        error ? <p className="text-sm text-red-700">{error}</p> :
        visible.length === 0 ? <p className="text-sm text-gray-500">No completed audits here yet.</p> :
        <ul className="divide-y">
          {visible.map((audit) => (
            <li key={audit.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
              <div>
                <p className="font-medium">{audit.analysis?.property_name || audit.analysis?.tenant || "Lease audit"}</p>
                <p className="text-gray-500">Completed {audit.completed_at ? new Date(audit.completed_at).toLocaleDateString() : "recently"}</p>
              </div>
              <div className="flex items-center gap-3">
                {!leaseId && !audit.portfolio_lease_id && leases.length > 0 && (
                  <select aria-label="Link audit to lease" className="rounded border px-2 py-1"
                    defaultValue="" onChange={(event) => linkAudit(audit.id, event.target.value)}>
                    <option value="">Link to lease...</option>
                    {leases.map((lease) => <option key={lease.id} value={lease.id}>{lease.propertyName}</option>)}
                  </select>
                )}
                {!leaseId && audit.portfolio_lease_id && (
                  <Link className="underline" href={`/product/app/leases/${encodeURIComponent(audit.portfolio_lease_id)}`}>View lease</Link>
                )}
                <Link className="font-medium underline" href={`/product/app/audits/${encodeURIComponent(audit.id)}`}>View report</Link>
              </div>
            </li>
          ))}
        </ul>}
    </section>
  );
}
