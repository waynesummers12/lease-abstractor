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
import { useAuth } from "@/app/providers/AuthProvider";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* ================= TYPES ================= */

type AuditResponse = {
  status: string;
  analysis: {
    tenant?: string | null;
    premises?: string | null;
    health?: { flags?: Array<{ code?: string; label?: string }> | null };
  } | null;
};

const REPORT_WAIT_MS = 120_000;
const POLL_INTERVAL_MS = 4_000;
const REQUEST_TIMEOUT_MS = 10_000;

/* ================= HELPERS ================= */

/* ================= PAGE ================= */

export default function SuccessPage() {
  const { session, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");
  const checkoutSessionId = searchParams.get("session_id");

  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [waitTimedOut, setWaitTimedOut] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!auditId || !checkoutSessionId || authLoading) return;
    const controller = new AbortController();
    fetch("/api/audit-checkout/recover", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}) },
      body: JSON.stringify({ auditId, sessionId: checkoutSessionId }),
      signal: controller.signal,
    }).then((response) => {
      if (response.ok) setRetryCount((count) => count + 1);
    }).catch(() => { /* The webhook and status poll remain available. */ });
    return () => controller.abort();
  }, [auditId, checkoutSessionId, authLoading, session?.access_token]);

  /* ---------- POLL AUDIT STATUS ---------- */
  useEffect(() => {
    if (authLoading) return;
    if (!auditId) {
      setFatalError("Missing audit reference.");
      setLoading(false);
      return;
    }
    const currentAuditId = auditId;
    setFatalError(null);

    let active = true;
    let pollTimer: ReturnType<typeof setTimeout> | null = null;
    let requestTimer: ReturnType<typeof setTimeout> | null = null;
    let requestController: AbortController | null = null;
    const deadline = Date.now() + REPORT_WAIT_MS;

    function retryLater() {
      if (!active) return;
      const remaining = deadline - Date.now();
      if (remaining <= 0) {
        setWaitTimedOut(true);
        setLoading(false);
      } else {
        pollTimer = setTimeout(loadAudit, Math.min(POLL_INTERVAL_MS, remaining));
      }
    }

    async function loadAudit() {
      if (!active) return;
      if (Date.now() >= deadline) {
        setWaitTimedOut(true);
        setLoading(false);
        return;
      }
      requestController = new AbortController();
      requestTimer = setTimeout(() => requestController?.abort(),
        Math.min(REQUEST_TIMEOUT_MS, deadline - Date.now()));
      try {
        const res = await fetch(`/api/audits/${encodeURIComponent(currentAuditId)}`, {
          cache: "no-store",
          headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {},
          signal: requestController.signal,
        });

        if (!active) return;

        if (res.status === 401 || res.status === 403 || res.status === 404) {
          setFatalError("We couldn't access this audit. Please contact support with your audit reference.");
          return;
        }
        if (!res.ok) {
          retryLater();
          return;
        }

        const json = await res.json();
        if (!active) return;

        const status = json?.status ?? json?.audit?.status;
        if (status === "failed" || status === "error") {
          setFatalError("We couldn't prepare your report. Please contact support with your audit reference.");
          return;
        }
        if (typeof status !== "string") {
          retryLater();
          return;
        }

        setData({
          status,
          analysis: json?.analysis ?? json?.audit?.analysis ?? null,
        });

        if (status === "complete") setWaitTimedOut(false);
        else retryLater();

      } catch (err) {
        if (active) {
          console.error("Audit polling failed", err);
          retryLater();
        }
      } finally {
        if (requestTimer) clearTimeout(requestTimer);
        requestTimer = null;
        requestController = null;
        if (active) setLoading(false);
      }
    }

    loadAudit();

    return () => {
      active = false;
      if (pollTimer) clearTimeout(pollTimer);
      if (requestTimer) clearTimeout(requestTimer);
      requestController?.abort();
    };
  }, [auditId, authLoading, session?.access_token, retryCount]);

        /* ---------- GA4: REPORT PURCHASED ---------- */
useEffect(() => {
  if (
  data?.status === "complete" &&
  typeof window !== "undefined" &&
  window.gtag
) {
  window.gtag("event", "report_purchased", {
    event_category: "funnel",
    event_label: "audit_pdf_unlocked",
    value: 49.99,
  } as Record<string, unknown>);
}
}, [data?.status]);

  /* ---------- DOWNLOAD PDF ---------- */
  async function handleDownload() {
  if (!auditId) return;

  try {
    setDownloading(true);

    const res = await fetch(`/api/audits/${auditId}/download`, {
      cache: "no-store",
      headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {},
    });

    if (!res.ok) {
      alert(res.status === 503
        ? "We couldn't update your report right now. Please try again shortly or contact audits@saveonlease.com."
        : "Your PDF is still being prepared. Please try again shortly.");
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
          {auditId && (
            <a
              href={`mailto:audits@saveonlease.com?subject=${encodeURIComponent("Lease audit access")}&body=${encodeURIComponent(`Please help me access audit ${auditId}.`)}`}
              className="mt-3 inline-block underline"
            >
              Contact support about this audit
            </a>
          )}
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

  if (waitTimedOut) {
    return (
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h1 className="text-xl font-semibold">Your report is taking longer than expected</h1>
          <p className="mt-3 text-sm text-gray-700">
            Keep this audit link. Checking again will not start another payment.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => {
                setWaitTimedOut(false);
                setRetryCount((count) => count + 1);
              }}
              className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
            >
              Check report again
            </button>
            {auditId && (
              <a
                href={`mailto:audits@saveonlease.com?subject=${encodeURIComponent("Lease audit report delay")}&body=${encodeURIComponent(`Please help with audit ID: ${auditId}`)}`}
                className="underline"
              >
                Contact support about this audit
              </a>
            )}
          </div>
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
          {data.status === "paid"
            ? "Payment received. We’re generating your PDF now."
            : "We’re confirming your payment and preparing your PDF."}
        </p>
        <p className="mt-2 text-xs text-gray-500">We’ll check for up to two minutes.</p>
      </main>
    );
  }

  const reviewItems = Array.isArray(data.analysis?.health?.flags)
    ? data.analysis.health.flags
    : [];

  /* ---------- COMPLETE ---------- */
return (
  <main className="mx-auto max-w-2xl px-6 py-12 sm:py-20 space-y-8">
    <div className="space-y-3">
      <p className="text-sm font-semibold text-green-700">Payment complete · Report ready</p>
      <h1 className="text-3xl font-semibold tracking-tight">Your lease review is ready</h1>
      <p className="text-gray-600">Download the report to review the flagged lease terms and the records needed to verify them.</p>
    </div>

    <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-5" aria-label="Audit summary">
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">Lease</p>
        <p className="mt-1 font-medium">{data.analysis?.premises || data.analysis?.tenant || "Uploaded lease"}</p>
      </div>
      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm font-medium">Lease-language review completed</p>
        <p className="mt-1 text-sm text-gray-600">The initial scan flagged {reviewItems.length} potential review item{reviewItems.length === 1 ? "" : "s"}. The PDF includes items that can be matched to text in your original upload.</p>
      </div>
      <p className="text-sm text-gray-700">This is a lease-language screening result. It does not establish an overcharge or a recoverable savings amount. Compare the findings with your invoices and CAM/NNN reconciliations.</p>
      {auditId && <p className="text-xs text-gray-500 break-all">Audit reference: {auditId}</p>}
    </section>

    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {downloading ? "Preparing PDF…" : "Open full PDF report"}
      </button>
      {session && <button onClick={() => router.push("/product/app/portfolio")} className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50">Go to portfolio</button>}
      <button onClick={() => router.push("/app/step-1-upload")} className="px-2 py-3 text-sm text-gray-600 underline">Review another lease</button>
    </div>
  </main>
);
}
