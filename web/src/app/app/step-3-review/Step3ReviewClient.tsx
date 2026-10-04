"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { waitForAnalysis } from "../step-2-analysis/analysis.wait";
import { useAuth } from "@/app/providers/AuthProvider";

type Analysis = {
  tenant: string | null;
  landlord: string | null;
  premises: string | null;
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;

  cam_total_avoidable_exposure?: number | null;

  teaser_summary?: {
    estimated_avoidable_range?: {
      low: number;
      high: number;
    };
    headline_flags?: string[];
  } | null;

  confidence?: number | null; // UI-only
};

function midpoint(range?: { low: number; high: number } | null) {
  if (!range) return null;
  return Math.round((range.low + range.high) / 2);
  }

export default function Step3ReviewClient() {
  const searchParams = useSearchParams();
  const auditId = searchParams.get("auditId");
  return <AuditReviewClient key={auditId ?? "missing"} auditId={auditId} />;
}

function AuditReviewClient({ auditId }: { auditId: string | null }) {
  const { session, loading: authLoading } = useAuth();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState<"timeout" | "not-found" | "unavailable" | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const hasFiredLeaseUploaded = useRef(false);

  useEffect(() => {
    if (!auditId || authLoading) return;
    const controller = new AbortController();
    waitForAnalysis<Analysis>(auditId, controller.signal, 60_000, session?.access_token).then((result) => {
      if (controller.signal.aborted) return;
      if (result.status === "ready") {
        setAnalysis(result.analysis);
      } else {
        setFailure(result.status);
      }
      setLoading(false);
    });
    return () => controller.abort();
  }, [auditId, retryCount, authLoading, session?.access_token]);

    const range = analysis?.teaser_summary?.estimated_avoidable_range;

  // Total exposure across remaining lease term
  const totalLeaseExposure =
    range
      ? midpoint(range)
      : analysis?.cam_total_avoidable_exposure ?? null;

  // Annualized exposure (Next 12 Months)
  const leaseMonths = analysis?.term_months ?? 12;

  const annualExposure =
    totalLeaseExposure != null
      ? Math.round((totalLeaseExposure / leaseMonths) * 12)
      : null;

  const monthlyLoss = annualExposure != null ? Math.round(annualExposure / 12) : null;

  // GA4: fire once when value is shown
  useEffect(() => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;

    if (typeof window !== "undefined" && gtag) {
      if (annualExposure != null && !hasFiredLeaseUploaded.current) {
        hasFiredLeaseUploaded.current = true;

        gtag("event", "lease_uploaded", {
          event_category: "funnel",
          event_label: "estimated_savings_shown",
          value: annualExposure,
        });
      }
    }
  }, [annualExposure]);

  if (!auditId) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-4 text-red-600">We need your audit link to load this preview.</p>
        <Link href="/app/step-1-upload" className="text-sm font-medium underline">Upload a Lease</Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" role="status">
          <div className="mb-5 h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Step 2 of 2</p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Preparing your lease preview</h1>
          <p className="mt-3 text-slate-600">We’re checking your lease analysis. This can take up to a minute.</p>
          <p className="mt-4 text-sm text-slate-500">Keep this page open. You’ll see the preview here when it’s ready.</p>
        </div>
      </main>
    );
  }

  if (failure || !analysis) {
    const message = failure === "not-found"
      ? "We couldn't find this audit. Check the link or upload the lease again."
      : failure === "unavailable"
        ? "We couldn't access this audit right now. Please try again."
        : "Your preview is taking longer than expected. You can check again without re-uploading.";
    const supportHref = `mailto:audits@saveonlease.com?subject=${encodeURIComponent("Lease preview help")}&body=${encodeURIComponent(`Please help with audit ID: ${auditId}`)}`;
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h1 className="text-2xl font-semibold">Preview not ready</h1>
        <p className="mt-3 text-slate-700">{message}</p>
        <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={() => {
              setAnalysis(null);
              setFailure(null);
              setLoading(true);
              setRetryCount((count) => count + 1);
            }}
            className="min-h-11 rounded-lg bg-black px-5 py-2 font-medium text-white hover:bg-gray-800"
          >
            Try Checking Again
          </button>
          <Link href="/app/step-1-upload" className="inline-flex min-h-11 items-center font-medium underline">Upload again</Link>
          <a href={supportHref} className="inline-flex min-h-11 items-center font-medium underline">Contact support</a>
        </div>
        <p className="mt-5 break-all text-xs text-slate-500">Audit ID: {auditId}</p>
        </div>
      </main>
    );
  }

  const confidence =
    typeof analysis.confidence === "number"
      ? Math.min(Math.max(analysis.confidence, 0), 100)
      : null;


  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Step 2 of 2 · Free preview</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Your lease preview</h1>
        <p className="mt-3 text-slate-600">
          Review the estimate and the lease details we extracted. You can decide whether a full audit is worth it.
        </p>
      </div>


      {/* ---------- GREEN SUMMARY BOX ---------- */}
{annualExposure != null && (
  <div className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-8">
    {/* Header */}
    <div className="flex items-start gap-3">
      <span className="text-2xl" aria-hidden="true">💰</span>
      <div>
        <p className="text-sm font-medium text-emerald-800">
          Estimated avoidable exposure · next 12 months
        </p>

        {/* PRIMARY NUMBER */}
        <p className="break-words text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
          ${annualExposure.toLocaleString()}
        </p>
        {monthlyLoss != null && (
          <p className="mt-2 text-sm font-medium text-emerald-900">
            Approximately ${monthlyLoss.toLocaleString()} per month at this estimate
          </p>
        )}

        {/* SECONDARY CONTEXT */}
        {totalLeaseExposure != null && (
          <p className="mt-1 text-sm text-emerald-800">
            Estimated total exposure over remaining lease term:{" "}
            <span className="font-semibold">
              ${totalLeaseExposure.toLocaleString()}
            </span>
          </p>
        )}

        {/* RANGE (IF AVAILABLE) */}
        {analysis.teaser_summary?.estimated_avoidable_range && (
          <>
            <p className="mt-1 text-sm text-emerald-700">
              Conservative estimate range:{" "}
              <span className="font-semibold">
                ${analysis.teaser_summary.estimated_avoidable_range.low.toLocaleString()}
                {" – "}
                ${analysis.teaser_summary.estimated_avoidable_range.high.toLocaleString()}
              </span>
            </p>
            <p className="mt-2 text-xs text-emerald-700">
              Audit rights and notice windows vary by lease. Check the dates in your agreement.
            </p>
          </>
        )}
      </div>
    </div>

    {/* Confidence / badge */}
    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-900">
      Estimate based on terms extracted from your uploaded lease
    </div>

    {confidence != null && <div>
      <p className="text-sm text-emerald-800 mb-2">
        Confidence reflects clarity of CAM, escalation, and reconciliation clauses
      </p>

      <div className="space-y-1">
        <div className="h-2 w-full rounded-full bg-emerald-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${confidence}%` }}
          />
        </div>

        <p className="text-xs text-emerald-700">
          {confidence >= 75
            ? "High confidence — terms are clearly defined"
            : confidence >= 40
            ? "Moderate confidence — some ambiguity detected"
            : "Lower confidence — lease language is unclear"}
        </p>
      </div>
    </div>}

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-emerald-800">
      <div>CAM and NNN terms checked</div>
      <div>Fee language checked</div>
      <div>Escalation terms checked</div>
    </div>

    {/* How calculated */}
    <div className="rounded-lg bg-white/60 p-4 border border-emerald-200">
      <p className="text-sm font-semibold text-emerald-900 mb-2">
        How this estimate was calculated
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm text-emerald-900">
        <li>Potential cost risks identified from CAM, NNN, and escalation language</li>
        <li>Dollar figures are estimates based on extracted lease terms</li>
        <li>Actual recoveries depend on charges, records, and lease interpretation</li>
      </ul>

      <p className="mt-3 text-xs text-emerald-700 italic">
        Final recovery depends on lease interpretation, audit rights, and timing.
      </p>
    </div>

    {/* ---------- TOP 3 ISSUES (TEASER) ---------- */}
    {analysis.teaser_summary?.headline_flags && analysis.teaser_summary.headline_flags.length > 0 && (
      <div className="rounded-lg bg-white/60 p-4 border border-emerald-200">
        <p className="text-sm font-semibold text-emerald-900 mb-2">
          Top issues found (preview)
        </p>

        <ul className="list-disc list-inside space-y-1 text-sm text-emerald-900">
          {analysis.teaser_summary.headline_flags.slice(0, 3).map((flag, i) => (
            <li key={i} className="relative">
              <span>
                {flag}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-2 text-xs text-emerald-700">
          The full audit provides more detail on each finding and the relevant lease terms.
        </p>
      </div>
    )}

    {/* Lease metadata */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-emerald-200 text-sm">
      <div>
        <p className="font-semibold">Tenant</p>
        <p>{analysis.tenant ?? "—"}</p>
      </div>

      <div>
        <p className="font-semibold">Landlord</p>
        <p>{analysis.landlord ?? "—"}</p>
      </div>

      <div>
        <p className="font-semibold">Premises</p>
        <p>{analysis.premises ?? "—"}</p>
      </div>

      <div>
        <p className="font-semibold">Lease Term</p>
        <p>
          {analysis.lease_start && analysis.lease_end
            ? `${analysis.lease_start} → ${analysis.lease_end} (${analysis.term_months} months)`
            : "—"}
        </p>
      </div>
    </div>
  </div>
)}
      {annualExposure == null && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-950">No reliable dollar estimate yet</h2>
          <p className="mt-2 text-sm text-slate-600">We could not calculate an exposure figure from the extracted terms. Review the lease details below and use the full audit for a closer look.</p>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div><dt className="font-medium text-slate-500">Tenant</dt><dd className="break-words text-slate-900">{analysis.tenant || "Not identified"}</dd></div>
            <div><dt className="font-medium text-slate-500">Premises</dt><dd className="break-words text-slate-900">{analysis.premises || "Not identified"}</dd></div>
          </dl>
        </div>
      )}

      {/* ---------- UNLOCK FULL AUDIT EXPLANATION ---------- */}
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">
          Full lease audit · $49.99 one-time
        </h2>
        <p className="text-sm font-medium text-slate-600">
          Check your lease for any notice or audit deadlines before deciding what to do next.
        </p>

        <p className="text-gray-700">
          This complete audit highlights potential CAM / NNN exposure based on
          your lease language. Unlocking this full audit provides a complete,
          downloadable PDF with the detail you need to take action.
        </p>

        <p className="text-sm text-gray-600">
          One-time payment. No subscriptions. No auto-renewals.
        </p>
        <p className="text-xs text-gray-500">
          If no meaningful issues are found, you’ll still receive a complete audit report for your records.
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Audit windows are often time-limited
          </li>
          <li>
            Issue-by-issue findings tied directly to specific lease provisions
          </li>
          <li>
            Estimated dollar impact where the lease supports a calculation
          </li>
          <li>
            Audit-ready explanations you can share with an attorney,
            accountant, or landlord
          </li>
          <li>
            A secure, downloadable PDF for your records
          </li>
        </ul>
      </div>

      {/* ---------- CHECKOUT BUTTON ---------- */}
      <button
        onClick={async () => {
          if (!auditId) return;

          const res = await fetch(
            "/api/audit-checkout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
              },
              body: JSON.stringify({ auditId }),
            }
          );

          const data = await res.json();

          if (data?.url) {
            window.location.href = data.url;
          } else {
            alert("Failed to start checkout");
          }
        }}
        className="min-h-12 w-full rounded-xl bg-black px-5 py-3 text-center font-semibold text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Unlock the full audit · $49.99
      </button>
      <p className="mt-2 text-center text-xs text-slate-500">
        Secure one-time checkout. Your PDF is prepared after payment.
      </p>
    </main>
  );
}
