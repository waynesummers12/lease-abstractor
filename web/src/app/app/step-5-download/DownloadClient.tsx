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
    reconciliation?: { statementName?: string; checks?: Array<{ label: string; result: string; status: string }> } | null;
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
    }).then(async (response) => {
      if (!response.ok || controller.signal.aborted) return;
      const result = await response.json().catch(() => null);
      if (result?.status === "complete" && checkoutSessionId) {
        const key = `saveonlease:purchase:${checkoutSessionId}`;
        try {
          if (!localStorage.getItem(key) && window.gtag) {
            window.gtag("event", "purchase", {
              transaction_id: checkoutSessionId,
              currency: "USD",
              value: 49.99,
              audit_id: auditId,
            });
            localStorage.setItem(key, "1");
          }
        } catch { /* Analytics storage may be unavailable; report access still works. */ }
      }
      setRetryCount((count) => count + 1);
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
    window.gtag?.("event", "report_downloaded", { audit_id: auditId });
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
  const statementChecks = Array.isArray(data.analysis?.reconciliation?.checks)
    ? data.analysis.reconciliation.checks
    : [];
  const hasStatement = Boolean(data.analysis?.reconciliation);
  const leaseName = data.analysis?.premises || data.analysis?.tenant || "Your uploaded lease";

  /* ---------- COMPLETE ---------- */
return (
  <main className="bg-[#f5f8f5] text-[#102820]">
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#102c25] px-6 py-9 text-white shadow-[0_24px_70px_rgba(16,44,37,0.18)] sm:px-10 sm:py-12 lg:px-14 lg:py-14" aria-labelledby="report-ready-title">
        <div className="pointer-events-none absolute -right-28 -top-44 h-[420px] w-[420px] rounded-full border border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-12 -top-28 h-[330px] w-[330px] rounded-full border border-white/10" aria-hidden="true" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#a8edbf]/40 bg-[#a8edbf]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a8edbf]"><span className="text-base leading-none" aria-hidden="true">✓</span> Payment complete · Report ready</p>
            <h1 id="report-ready-title" className="mt-7 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">Your lease review is ready. <span className="text-[#a8edbf]">Here’s what to check next.</span></h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#d8e9df] sm:text-lg">Your full report brings the lease terms, {hasStatement ? "statement questions, " : ""}page references, and records to request into one place.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={handleDownload} disabled={downloading} className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[#a8edbf] px-7 py-3 text-sm font-bold text-[#102c25] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60">{downloading ? "Preparing PDF…" : "Open your full PDF report ↗"}</button>
              {session && <button onClick={() => router.push("/product/app/dashboard#reports")} className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">View saved reports</button>}
            </div>
            <p className="mt-4 text-xs text-[#b6d4c3]">Your report opens in a new tab so you can keep this page for reference.</p>
          </div>
          <div className="relative mx-auto w-full max-w-[320px] rotate-[2deg] rounded-2xl border border-[#dbe9df] bg-white p-5 text-[#102820] shadow-[0_25px_55px_rgba(0,0,0,0.24)] sm:p-6" aria-label="Report at a glance">
            <div className="h-1.5 rounded-full bg-[#0b776e]" />
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b776e]">SaveOnLease / Commercial lease review</p>
            <p className="mt-4 text-2xl font-semibold leading-tight tracking-tight">Your lease,<br />clearer next steps.</p>
            <div className="mt-5 rounded-xl bg-[#edf5f4] p-4">
              <p className="text-3xl font-semibold tracking-tight">{hasStatement ? statementChecks.length : reviewItems.length}</p>
              <p className="mt-1 text-xs font-medium text-[#335851]">{hasStatement ? "statement questions to verify" : "lease review items to verify"}</p>
            </div>
            <div className="mt-5 space-y-2 text-xs text-[#526a62]"><p>01 / Review the questions</p><p>02 / Check the source pages</p><p>03 / Request supporting records</p></div>
            <p className="mt-5 border-t border-[#dce8e1] pt-3 text-[10px] text-[#6b8077]">Prepared for {leaseName}</p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)]">
        <section className="rounded-[1.5rem] border border-[#dce8de] bg-white p-6 shadow-sm sm:p-8" aria-labelledby="inside-report-title">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b776e]">Your report at a glance</p>
          <h2 id="inside-report-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">A clear path from findings to questions.</h2>
          <p className="mt-3 text-sm leading-7 text-[#53675d]">For <strong className="text-[#102820]">{leaseName}</strong>, the PDF organizes what the documents show and what still needs confirmation.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-[#f2f7f3] p-4"><p className="text-2xl font-semibold">{reviewItems.length}</p><p className="mt-1 text-xs leading-5 text-[#53675d]">initial lease terms flagged</p></div>
            <div className="rounded-xl bg-[#f2f7f3] p-4"><p className="text-2xl font-semibold">{hasStatement ? statementChecks.length : "—"}</p><p className="mt-1 text-xs leading-5 text-[#53675d]">{hasStatement ? "statement questions to verify" : "statement not provided"}</p></div>
            <div className="rounded-xl bg-[#f2f7f3] p-4"><p className="text-2xl font-semibold">PDF</p><p className="mt-1 text-xs leading-5 text-[#53675d]">page references and next steps</p></div>
          </div>
          {hasStatement && <p className="mt-5 text-xs text-[#65796e]">Statement reviewed: {data.analysis?.reconciliation?.statementName || "Annual statement"}</p>}
        </section>

        <section className="rounded-[1.5rem] border border-[#dce8de] bg-[#e3f1e8] p-6 sm:p-8" aria-labelledby="next-steps-title">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b776e]">What to do now</p>
          <h2 id="next-steps-title" className="mt-3 text-2xl font-semibold tracking-tight">Turn the report into a plan.</h2>
          <ol className="mt-6 space-y-5 text-sm">
            <li className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-[#0b776e]">01</span><span><strong className="block">Open the PDF</strong><span className="mt-1 block leading-6 text-[#53675d]">Start with the first actions and flagged questions.</span></span></li>
            <li className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-[#0b776e]">02</span><span><strong className="block">Check the source pages</strong><span className="mt-1 block leading-6 text-[#53675d]">Compare each question with your signed lease and billing records.</span></span></li>
            <li className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-[#0b776e]">03</span><span><strong className="block">Request what is missing</strong><span className="mt-1 block leading-6 text-[#53675d]">Use the records checklist and request draft in your report.</span></span></li>
          </ol>
        </section>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-[#dce8de] bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div><h2 className="text-lg font-semibold">Keep your review close.</h2><p className="mt-1 max-w-xl text-sm leading-6 text-[#53675d]">{session ? "Return to your dashboard to find this report alongside your saved leases." : "Keep this page or your downloaded PDF for future reference."} Review another lease whenever you’re ready.</p></div>
        <div className="flex shrink-0 flex-wrap gap-3">{session && <button onClick={() => router.push("/product/app/dashboard#reports")} className="rounded-xl border border-[#cbded0] px-5 py-3 text-sm font-semibold hover:bg-[#f2f7f3]">Go to dashboard</button>}<button onClick={() => router.push("/app/step-1-upload")} className="rounded-xl border border-[#cbded0] px-5 py-3 text-sm font-semibold hover:bg-[#f2f7f3]">Review another lease →</button></div>
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-6 text-[#65796e]">Review questions are prompts to verify, not confirmed overcharges or recoverable savings. Check notice and audit deadlines in your signed lease. {auditId && <>Audit reference: <span className="break-all">{auditId}</span></>}</p>
    </div>
  </main>
);
}
