"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { authenticatedPortfolioFetch } from "@/lib/portfolioFetch";

type Audit = {
  id: string;
  completed_at: string | null;
  portfolio_lease_id: string | null;
  analysis: Record<string, unknown> | null;
};

export default function PortfolioAuditPage() {
  const { id } = useParams<{ id: string }>();
  const [audit, setAudit] = useState<Audit | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    authenticatedPortfolioFetch(`/api/portfolio-audits/${encodeURIComponent(id)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(res.status === 404 ? "Audit not found" : "Unable to load audit");
        return res.json();
      })
      .then((data) => { setAudit(data.audit); setDownloadUrl(data.downloadUrl); })
      .catch((cause) => setError(cause instanceof Error ? cause.message : "Unable to load audit"));
  }, [id]);

  return <main className="mx-auto max-w-4xl space-y-6 px-6 py-16">
    <Link href="/product/app/portfolio" className="text-sm underline">Back to portfolio</Link>
    <h1 className="text-3xl font-semibold">Completed lease audit</h1>
    {error ? <p role="alert" className="text-red-700">{error}</p> : !audit ? <p>Loading report...</p> : <>
      <p className="text-sm text-gray-600">Completed {audit.completed_at ? new Date(audit.completed_at).toLocaleDateString() : "recently"}</p>
      {audit.portfolio_lease_id && <Link className="underline" href={`/product/app/leases/${encodeURIComponent(audit.portfolio_lease_id)}`}>View linked lease</Link>}
      {downloadUrl ? <a href={downloadUrl} className="inline-block rounded bg-black px-5 py-3 text-white">Download full report</a> :
        <p className="text-sm text-gray-600">The report is being prepared. Please check back shortly.</p>}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-3 text-lg font-semibold">Analysis</h2>
        {audit.analysis && Object.keys(audit.analysis).length > 0 ?
          <dl className="grid gap-3 sm:grid-cols-2">
            {Object.entries(audit.analysis).filter(([, value]) => typeof value === "string" || typeof value === "number").map(([key, value]) =>
              <div key={key}><dt className="text-sm capitalize text-gray-500">{key.replaceAll("_", " ")}</dt><dd className="font-medium">{String(value)}</dd></div>
            )}
          </dl> : <p className="text-sm text-gray-600">Open the full report for the analysis.</p>}
      </section>
    </>}
  </main>;
}
