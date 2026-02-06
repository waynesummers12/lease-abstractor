"use client";

/**
 * CLIENT COMPONENT — SAVEONLEASE V1 (LOCKED)
 *
 * Rules:
 * - Client-side only
 * - No Supabase imports
 * - No Stripe imports
 * - No server-only logic
 * - No process.env (except NEXT_PUBLIC_*)
 *
 * Allowed:
 * - fetch("/api/...")
 * - useState / useEffect / useRouter
 * - window.location
 *
 * Violation = production regression
 */


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

// Normalize status regardless of API shape
const status =
  json?.status ??
  json?.audit?.status ??
  "paid";

setData({
  status,
  analysis: json?.analysis ?? json?.audit?.analysis ?? null,
});

if (status !== "complete") {
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

    const data = await res.json();
    const url = data?.url;

    // HARD GUARD — prevents Next.js from hijacking navigation
    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      alert("Your PDF is still being prepared. Please try again shortly.");
      return;
    }

    // ✅ OPEN IN NEW TAB — DO NOT use window.location.href
    window.open(url, "_blank", "noopener,noreferrer");
  } catch (err) {
    console.error("PDF download failed", err);
    alert("Failed to download PDF.");
  } finally {
    setDownloading(false);
  }
}

  /* ================= UI ================= */

  if (fatalError) {
// =======================================================
// ⛔ DO NOT MODIFY ABOVE THIS LINE ⛔
// Only edit JSX BELOW the return() statement.
// =======================================================

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

  /* ---------- GA4: REPORT PURCHASED ---------- */
useEffect(() => {
  if (data?.status === "complete" && typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "report_purchased", {
      event_category: "funnel",
      event_label: "audit_pdf_unlocked",
      value: 49.99,
    });
  }
}, [data?.status]);

  /* ---------- COMPLETE ---------- */
return (
  <main className="mx-auto max-w-xl px-6 py-24 space-y-8 text-center">
    <div className="text-3xl">✅</div>

    <h1 className="text-2xl font-semibold">Payment successful</h1>

    {/* ---------- LEASE SUMMARY ---------- */}
<div className="rounded-xl border bg-gray-50 p-6 text-left space-y-4">
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium text-gray-600">
      Lease Health Score
    </p>
    <span className="text-sm font-semibold">
      {riskLabel}
    </span>
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

  {/* ---------- NEXT STEPS ---------- */}
  <p className="pt-2 text-sm text-gray-600">
    Even low-risk leases often contain recoverable CAM or NNN charges.
    A full audit highlights where landlords commonly over-allocate costs.
  </p>
</div>


    {/* ---------- ACTIONS ---------- */}
    <div className="space-y-3">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {downloading ? "Preparing PDF…" : "Download PDF Audit"}
      </button>

      <div>
        <button
          onClick={() => router.push("/app/step-1-upload")}
          className="text-sm underline text-gray-600 hover:text-black"
        >
          Run another audit
        </button>
      </div>
    </div>
  </main>
);
}
