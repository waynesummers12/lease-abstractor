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
        const res = await fetch(`/api/audits/${auditId}`, { cache: "no-store" });

        if (!res.ok) {
          setFatalError("Audit not found.");
          return;
        }

        const json: AuditResponse = await res.json();
        setData(json);

        // If paid but not complete, poll again
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

  /* ---------- DOWNLOAD PDF ---------- */
  async function handleDownload() {
    if (!auditId) return;
    const pdfPath = data?.audit_pdf_path ?? data?.object_path;
    if (!pdfPath) {
      alert("Your PDF is still being prepared. Please try again shortly.");
      return;
    }

    try {
      setDownloading(true);

      const res = await fetch(
        `/api/download?auditId=${auditId}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        alert("Your PDF is still being prepared. Please try again shortly.");
        return;
      }

      const { url } = await res.json();
      window.open(url, "_blank");
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
          onClick={() => router.push("/product/app/step-1-upload/upload")}
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
const pdfReady = Boolean(data.audit_pdf_path || data.object_path);

/* ✅ FIX: SUPPORT BOTH SCORE SHAPES */
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

    {/* ---------- LEASE SCORE ---------- */}
    {typeof leaseScore === "number" && (
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm">
        <p className="text-sm font-semibold text-gray-900">Lease Score</p>

        <p className="mt-2 text-sm text-gray-700">
          A numeric measure of how tenant-favorable your lease is based on CAM /
          NNN structure, escalation limits, and audit leverage.
        </p>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <p className="text-xs uppercase text-gray-500">Score</p>
            <p className="mt-1 text-3xl font-bold">
              {leaseScore}
              <span className="text-sm font-medium text-gray-500"> / 100</span>
            </p>
          </div>

          {riskLevel && (
            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                riskLevel === "LOW"
                  ? "bg-green-100 text-green-800"
                  : riskLevel === "MEDIUM"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {riskLevel}
            </div>
          )}
        </div>
      </div>
    )}

    {/* ---------- LEASE SCORE EXPLANATION ---------- */}
    <div className="mt-6 rounded-xl border bg-white p-6 text-left shadow-sm">
      <h3 className="text-lg font-semibold">
        How Your Lease Score Is Calculated
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        Your Lease Score reflects how tenant-favorable your lease is for CAM /
        NNN charges, escalation limits, and audit rights — based on the lease
        terms most likely to drive overcharges.
      </p>

      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="font-medium text-green-700">Low Risk Lease</p>
          <p className="text-gray-600">
            Strong tenant protections with defined CAM limits, excluded capital
            expenses, and enforceable audit rights.
          </p>
        </div>

        <div>
          <p className="font-medium text-amber-700">Medium Risk Lease</p>
          <p className="text-gray-600">
            Some protections exist, but key terms are ambiguous or partially
            uncapped. These leases require active monitoring.
          </p>
        </div>

        <div>
          <p className="font-medium text-red-700">High Risk Lease</p>
          <p className="text-gray-600">
            Broad or uncapped CAM / NNN language with limited audit leverage.
            These leases are most likely to produce recoverable overcharges.
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs text-gray-500">
        Lease Score reflects dispute outcomes observed across commercial CAM /
        NNN audits and how landlords typically interpret ambiguous lease
        language.
      </p>
    </div>

    {/* ---------- RISK & TIMING NOTICE ---------- */}
    {(riskLevel === "MEDIUM" ||
      riskLevel === "HIGH" ||
      typeof data.analysis?.avoidable_exposure === "number") && (
      <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 text-left shadow-sm">
        <p className="text-sm font-semibold text-amber-900">
          Risk &amp; Timing Notice
        </p>

        <p className="mt-2 text-sm text-amber-900">
          Potential CAM / NNN overcharge risk identified. Acting within the audit
          window may allow recovery of meaningful dollars.
        </p>

        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-100 p-3 text-sm text-amber-900">
          <p>
            Most commercial leases require CAM / NNN disputes within
            <strong> 30–120 days</strong> of reconciliation. Missing this window
            often waives recovery rights.
          </p>
        </div>
      </div>
    )}

    {/* ---------- AVOIDABLE EXPOSURE ---------- */}
    {typeof data.analysis?.avoidable_exposure === "number" && (
      <div className="mt-6 rounded-lg border bg-gray-50 p-4 text-sm">
        <p className="font-medium">Estimated recoverable exposure</p>
        <p className="mt-1 text-2xl font-bold">
          ${data.analysis.avoidable_exposure.toLocaleString()}
        </p>
      </div>
    )}

    {/* ---------- DOWNLOAD ---------- */}
    <button
      onClick={handleDownload}
      disabled={downloading || !pdfReady}
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