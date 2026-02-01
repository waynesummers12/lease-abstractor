"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ================= TYPES ================= */

type AuditResponse = {
  status: "unpaid" | "paid" | "complete";
  audit_pdf_path?: string | null;
  object_path?: string | null;
  analysis: {
    avoidable_exposure?: number;
    tenant?: string | null;
    risk_level?: string | null;
    health_score?: number | null;
    health?: {
      score?: number | null;
    };
  } | null;
};

const deriveRiskLevel = (analysis: AuditResponse["analysis"]) => {
  if (!analysis) return null;

  if (analysis.risk_level) {
    return analysis.risk_level.toUpperCase();
  }

  const score =
    typeof analysis.health_score === "number"
      ? analysis.health_score
      : typeof analysis.health?.score === "number"
      ? analysis.health.score
      : null;

  if (score === null) return null;

  return score >= 75 ? "HIGH" : score >= 50 ? "MEDIUM" : "LOW";
};

/* ================= PAGE ================= */

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");

  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [fatalError, setFatalError] = useState<string | null>(null);

  /* ---------- LOAD + POLL AUDIT ---------- */
  useEffect(() => {
    if (!auditId) {
      setFatalError("Missing audit reference.");
      setLoading(false);
      return;
    }

    let pollTimer: NodeJS.Timeout | null = null;

    async function loadAudit() {
      try {
        const res = await fetch(
        `/api/audits/${auditId}/download`,
        { cache: "no-store" }
        );

        if (!res.ok) {
          setFatalError("Audit not found.");
          return;
        }

        const json: AuditResponse = await res.json();
        setData(json);

        // Paid but not complete → keep polling
        if (json.status === "paid") {
          pollTimer = setTimeout(loadAudit, 4000);
        }
      } catch (err) {
        console.error("Failed to load audit", err);
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

  /* ---------- DOWNLOAD PDF (FIXED) ---------- */
  async function handleDownload() {
    if (!auditId) return;

    try {
      setDownloading(true);

      const res = await fetch(
        `/api/audits/${auditId}/download`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        alert("Your PDF is still being prepared. Please try again shortly.");
        return;
      }

      const { url } = await res.json();

      if (!url) {
        alert("Failed to generate download link.");
        return;
      }

      // 🔥 Trigger browser download
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

  const riskLevel = deriveRiskLevel(data.analysis);

  const leaseScore =
    typeof data.analysis?.health_score === "number"
      ? data.analysis.health_score
      : typeof data.analysis?.health?.score === "number"
      ? data.analysis.health.score
      : null;

  /* ---------- PAID BUT PROCESSING ---------- */
  if (data.status === "paid") {
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

  /* ---------- COMPLETE ---------- */
  return (
    <main className="mx-auto max-w-xl px-6 py-28 text-center">
      <div className="mb-6 text-3xl">✅</div>

      <h1 className="text-2xl font-semibold">Payment successful</h1>

      <p className="mt-3 text-sm text-gray-600">
        Your CAM / NNN Audit Summary is ready.
      </p>

      {/* ---------- DOWNLOAD ---------- */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="mt-8 inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {downloading ? "Preparing PDF…" : "Download PDF Audit"}
      </button>

      {/* ---------- NAV ---------- */}
      <div className="mt-8 space-y-3 text-sm">
        <button
          onClick={() => router.push("/product/app/dashboard")}
          className="block mx-auto underline text-gray-700"
        >
          View all audits
        </button>

        <button
          onClick={() => router.push("/product/app/dashboard")}
          className="block mx-auto underline text-gray-500"
        >
          Return to app
        </button>
      </div>
    </main>
  );
}
