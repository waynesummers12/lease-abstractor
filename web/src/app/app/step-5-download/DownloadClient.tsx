"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ================= TYPES ================= */

type AuditResponse = {
  status: "unpaid" | "paid" | "complete";
  analysis: {
    tenant?: string | null;
    risk_level?: string | null;
    health?: {
      score?: number | null;
    };
    cam_total_avoidable_exposure?: number | null;
  } | null;
};

/* ================= HELPERS ================= */

function deriveRiskLevel(score?: number | null) {
  if (typeof score !== "number") return "UNKNOWN";
  if (score >= 75) return "LOW RISK";
  if (score >= 50) return "MODERATE RISK";
  return "HIGH RISK";
}

function explainScore(score?: number | null) {
  if (typeof score !== "number") {
    return "We were unable to calculate a complete lease health score.";
  }

  if (score >= 75) {
    return "Your lease language is generally clear, with fewer CAM / NNN risk indicators. Most tenants in this range still find savings through targeted audits.";
  }

  if (score >= 50) {
    return "Your lease contains some ambiguous or unfavorable clauses that often result in CAM or NNN overcharges. Audits frequently uncover recoverable costs in this range.";
  }

  return "Your lease shows significant risk indicators, unclear cost allocations, or missing protections. Tenants in this range commonly recover meaningful overcharges after audit.";
}

/* ================= PAGE ================= */

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");

  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [fatalError, setFatalError] = useState<string | null>(null);

  /* ---------- POLL AUDIT STATUS ---------- */
  useEffect(() => {
    if (!auditId) {
      setFatalError("Missing audit reference.");
      setLoading(false);
      return;
    }

    let pollTimer: NodeJS.Timeout | null = null;

    async function loadAudit() {
      try {
        const res = await fetch(`/api/audits/${auditId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setFatalError("Audit not found.");
          return;
        }

        const json = await res.json();
        setData(json);

        if (json.status !== "complete") {
          pollTimer = setTimeout(loadAudit, 4000);
        }
      } catch (err) {
        console.error("Audit polling failed", err);
        setFatalError("Unable to load audit.");
      } finally {
        setLoading(false);
      }
    }

    loadAudit();

    return () => {
      if (pollTimer) clearTimeout(pollTimer);
    };
  }, [auditId]);

  /* ---------- DOWNLOAD PDF ---------- */
  async function handleDownload() {
    if (!auditId) return;

    try {
      setDownloading(true);

      const res = await fetch(`/api/audits/${auditId}/download`, {
        cache: "no-store",
      });

      if (!res.ok) {
        alert("Your PDF is still being prepared. Please try again shortly.");
        return;
      }

      const { url } = await res.json();

      if (!url) {
        alert("Failed to generate download link.");
        return;
      }

      window.location.href = url;
    } catch (err) {
      console.error("PDF download failed", err);
      alert("Failed to download PDF.");
    } finally {
      setDownloading(false);
    }
  }

  /* ================= UI ================= */

  if (fatalError) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-2">{fatalError}</p>
          <button
            onClick={() => router.push("/app/step-1-upload")}
            className="mt-4 underline"
          >
            Back to app
          </button>
        </div>
      </main>
    );
  }

  if (loading || !data) {
    return (
      <main className="mx-auto max-w-xl px-6 py-28 text-center">
        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
        <h1 className="text-xl font-semibold">Preparing your audit</h1>
      </main>
    );
  }

  if (data.status !== "complete") {
    return (
      <main className="mx-auto max-w-xl px-6 py-28 text-center">
        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
        <h1 className="text-xl font-semibold">Finalizing your audit report</h1>
        <p className="mt-3 text-sm text-gray-600">
          Payment received. We’re generating your PDF now.
        </p>
      </main>
    );
  }

  const score = data.analysis?.health?.score ?? null;
  const riskLabel = deriveRiskLevel(score);

  /* ---------- COMPLETE ---------- */
  return (
    <main className="mx-auto max-w-xl px-6 py-24 space-y-8 text-center">
      <div className="text-3xl">✅</div>

      <h1 className="text-2xl font-semibold">Payment successful</h1>

      {/* ---------- LEASE SCORE ---------- */}
      <div className="rounded-xl border bg-gray-50 p-6 text-left space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Lease Health Score</p>
          <span className="text-sm font-semibold">{riskLabel}</span>
        </div>

        <p className="text-4xl font-bold text-black">
          {typeof score === "number" ? score : "—"}
        </p>

        <p className="text-sm text-gray-700">
          {explainScore(score)}
        </p>

        {typeof data.analysis?.cam_total_avoidable_exposure === "number" && (
          <p className="text-sm text-gray-600">
            Estimated avoidable exposure over 12 months:{" "}
            <span className="font-semibold">
              ${data.analysis.cam_total_avoidable_exposure.toLocaleString()}
            </span>
          </p>
        )}
      </div>

      {/* ---------- DOWNLOAD ---------- */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="mt-4 inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {downloading ? "Preparing PDF…" : "Download PDF Audit"}
      </button>
    </main>
  );
}
