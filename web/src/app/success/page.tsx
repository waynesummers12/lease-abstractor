"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ================= TYPES ================= */

type AuditResponse = {
  status?: "paid" | "unpaid";
  analysis: {
    avoidable_exposure?: number;
    tenant?: string | null;
  } | null;
};

/* ================= PAGE ================= */

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");

  const [data, setData] = useState<AuditResponse | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  /* ---------- LOAD AUDIT (POLL UNTIL READY) ---------- */
  useEffect(() => {
    if (!auditId) {
      setFatalError("Missing audit reference.");
      return;
    }

    let interval: number;

    async function loadAudit() {
      try {
        const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/audits/${auditId}`,
  { cache: "no-store" }
);

        // still processing → not fatal
        if (!res.ok) return;

        const json: AuditResponse = await res.json();
        setData(json);

        if (json.status === "paid" && json.analysis) {
  clearInterval(interval);
}

      } catch (err) {
        console.error("Success page fetch error:", err);
        setFatalError("Unable to load audit.");
        clearInterval(interval);
      }
    }

    loadAudit();
    interval = window.setInterval(loadAudit, 5000);

    return () => clearInterval(interval);
  }, [auditId]);

  /* ---------- FETCH SIGNED PDF URL ---------- */
useEffect(() => {
  if (!auditId || !data?.analysis || downloadUrl) return;

  async function fetchDownloadUrl() {
    try {
      setLoadingPdf(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/audits/${auditId}/download`,
        { cache: "no-store" }
      );

      if (!res.ok) return;

      const json = await res.json();
      if (json?.url) {
        setDownloadUrl(json.url);
      }
    } catch (err) {
      console.error("Failed to load PDF download URL", err);
    } finally {
      setLoadingPdf(false);
    }
  }

  fetchDownloadUrl();
}, [auditId, data, downloadUrl]);


  /* ================= UI ================= */

  // ❌ fatal error
  if (fatalError) {
    return (
      <main className="mx-auto max-w-xl px-6 py-28 text-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-2">{fatalError}</p>
          <button
            onClick={() => router.push("/product/app")}
            className="mt-4 underline"
          >
            Back to app
          </button>
        </div>
      </main>
    );
  }

  // ⏳ processing (normal)
  if (!data || data.analysis === null) {
    return (
      <main className="mx-auto max-w-xl px-6 py-28 text-center">
        <div className="mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto" />
        <h1 className="text-xl font-semibold">Preparing your audit summary</h1>
        <p className="mt-3 text-sm text-gray-600">
          This can take a few minutes. You can safely leave this page.
        </p>
      </main>
    );
  }

  /* ================= READY ================= */

  return (
    <main className="mx-auto max-w-xl px-6 py-28 text-center">
      <div className="mb-6 text-3xl">✅</div>

      <h1 className="text-2xl font-semibold">Payment successful</h1>

      <p className="mt-3 text-sm text-gray-600">
        Your CAM / NNN Audit Summary is ready.
      </p>

      {typeof data.analysis.avoidable_exposure === "number" && (
        <div className="mt-6 rounded-lg border bg-gray-50 p-4 text-sm">
          <p className="font-medium">Estimated recoverable exposure</p>
          <p className="mt-1 text-2xl font-bold">
            ${data.analysis.avoidable_exposure.toLocaleString()}
          </p>
        </div>
      )}

      {/* ---------- PRIMARY ACTION ---------- */}
      {downloadUrl ? (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Download PDF Audit
        </a>
      ) : loadingPdf ? (
        <p className="mt-6 text-sm text-gray-500">Preparing your PDF…</p>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Your PDF is being finalized. You’ll receive an email when it’s ready.
        </p>
      )}

      {/* ---------- SECONDARY ACTIONS ---------- */}
      <div className="mt-8 space-y-3 text-sm">
        <button
          onClick={() => router.push("/dashboard/audits")}
          className="block mx-auto underline text-gray-700"
        >
          View all audits (My Audits)
        </button>

        <button
          onClick={() => alert("PDF regeneration queued.")}
          className="block mx-auto underline text-gray-500"
        >
          Regenerate PDF
        </button>
      </div>

      <button
        onClick={() => router.push("/product/app")}
        className="mt-10 block mx-auto text-sm underline text-gray-600"
      >
        Return to app
      </button>
    </main>
  );
}
