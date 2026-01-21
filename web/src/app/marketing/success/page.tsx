"use client";

import { useEffect, useState } from "react";

type AuditResponse = {
  analysis: {
    avoidable_exposure?: number;
    risk_level?: "LOW" | "MEDIUM" | "HIGH";
    flagged_sections?: {
      section: string;
      title: string;
    }[];
    health_score?: number;
  };
  signedUrl: string | null;
};

export default function SuccessPage() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auditId = params.get("auditId");

    if (!auditId) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/audits/${auditId}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setData(null);
          return;
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Success page load error:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-2xl font-semibold">
          Finalizing your audit…
        </h1>
        <p className="mt-2 text-gray-600">
          This usually takes just a few seconds.
        </p>
      </main>
    );
  }

  /* ---------------- FALLBACK (PRODUCTION-CORRECT) ---------------- */

  if (!data) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-sm text-yellow-900">
          <p className="font-semibold">Analysis in progress</p>
          <p className="mt-2">
            We’re finalizing your lease audit. This usually completes within a
            few minutes. You can safely close this page or refresh shortly.
          </p>
        </div>
      </main>
    );
  }

  const exposure = data.analysis?.avoidable_exposure;
  const risk = data.analysis?.risk_level ?? "HIGH";
  const sections = data.analysis?.flagged_sections ?? [];
  const score = data.analysis?.health_score ?? 50;

  /* ---------------- UI ---------------- */

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Lease Audit Complete
        </h1>
        <p className="mt-2 text-gray-600">
          We’ve completed an initial CAM / NNN risk review of
          your lease.
        </p>
      </div>

      {/* VALUE BOX */}
      <div className="rounded border border-green-400 bg-green-50 p-6">
        <div className="text-sm text-green-700">
          Estimated Avoidable Exposure (Next 12 Months)
        </div>

        {exposure != null && (
          <div className="mt-1 text-3xl font-bold text-green-800">
            ${exposure.toLocaleString()}
          </div>
        )}

        <div className="mt-3 font-semibold text-red-700">
          Risk level: {risk}
        </div>

        {sections.length > 0 && (
          <div className="mt-3 text-sm text-gray-700">
            Exposure detected in the following lease sections:
            <ul className="mt-2 list-disc pl-5">
              {sections.slice(0, 3).map((s) => (
                <li key={s.section}>
                  <strong>{s.section}</strong> — {s.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-3 text-sm text-gray-600">
          Most commercial leases require CAM / NNN disputes within
          <strong> 30–120 days</strong> of reconciliation.
        </div>
      </div>

      {/* HEALTH SCORE */}
      <div className="rounded border p-6">
        <div className="text-sm text-gray-500">
          Lease Health Score
        </div>
        <div className="mt-1 text-2xl font-bold">
          {score} / 100
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-3">
        {data.signedUrl && (
          <a
            href={data.signedUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
          >
            Download Full Audit (PDF)
          </a>
        )}
      </div>

      {/* REASSURANCE */}
      <div className="pt-4 text-sm text-gray-600">
        We’ve also emailed you a copy of this audit for your
        records.
      </div>
    </main>
  );
}
