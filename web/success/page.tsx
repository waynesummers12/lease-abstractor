"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const auditId = searchParams.get("auditId");

  const [data, setData] = useState<AuditResponse | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD AUDIT ---------------- */

  useEffect(() => {
    if (!auditId) {
      setLoading(false);
      return;
    }

    async function loadAudit() {
      try {
        const res = await fetch(`/api/audit/${auditId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setData(null);
          return;
        }

        const json = await res.json();
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadAudit();
  }, [auditId]);

  /* ---------------- LOAD DOWNLOAD URL ---------------- */

  useEffect(() => {
    if (!auditId) return;

    async function loadDownload() {
      try {
        const res = await fetch(
          `/api/audit/${auditId}/download`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const json = await res.json();
        if (json?.url) {
          setDownloadUrl(json.url);
        }
      } catch {
        // ignore
      }
    }

    loadDownload();
  }, [auditId]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-2xl font-semibold">
          Finalizing your audit…
        </h1>
        <p className="mt-2 text-gray-600">
          This usually takes just a few seconds.
        </p>
      </main>
    );
  }

  /* ---------------- FALLBACK ---------------- */

  if (!data) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
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

  /* ---------------- DATA ---------------- */

  const exposure = data.analysis?.avoidable_exposure;
  const risk = data.analysis?.risk_level ?? "HIGH";
  const sections = data.analysis?.flagged_sections ?? [];
  const score = data.analysis?.health_score ?? 50;

  /* ---------------- UI ---------------- */

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-6 py-20">
      <div>
        <h1 className="text-3xl font-bold">
          Lease Audit Complete
        </h1>
        <p className="mt-2 text-gray-600">
          We’ve completed an initial CAM / NNN risk review of your lease.
        </p>
      </div>

      <div className="rounded-lg border border-green-400 bg-green-50 p-6">
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

      <div className="rounded-lg border p-6">
        <div className="text-sm text-gray-500">
          Lease Health Score
        </div>
        <div className="mt-1 text-2xl font-bold">
          {score} / 100
        </div>
      </div>

      {downloadUrl && (
        <div>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
          >
            Download Full Audit (PDF)
          </a>
        </div>
      )}

      <div className="pt-2 text-sm text-gray-600">
        We’ve also emailed you a copy of this audit for your records.
      </div>
    </main>
  );
}
