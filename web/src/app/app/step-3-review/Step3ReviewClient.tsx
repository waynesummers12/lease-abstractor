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

  teaser_summary?: {
    headline_flags?: string[];
  } | null;

};

function reviewLabel(label: string) {
  if (/management|admin/i.test(label)) return "Management or administrative fee language to verify";
  if (/capital/i.test(label)) return "Capital expense language to verify";
  if (/pro.rata|allocation/i.test(label)) return "Pro-rata allocation language to verify";
  return "Lease term to verify in the original document";
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

  // GA4: fire once when the preview is shown.
  useEffect(() => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;

    if (typeof window !== "undefined" && gtag) {
      if (analysis && !hasFiredLeaseUploaded.current) {
        hasFiredLeaseUploaded.current = true;

        gtag("event", "lease_uploaded", {
          event_category: "funnel",
          event_label: "lease_preview_shown",
        });
      }
    }
  }, [analysis]);

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

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Step 2 of 2 · Free preview</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Your lease preview</h1>
        <p className="mt-3 text-slate-600">
          Review the lease details we extracted. You can decide whether a full report is worth it.
        </p>
      </div>


      <section className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Free preview</p>
          <h2 className="mt-2 text-xl font-semibold text-emerald-950">Lease terms ready for review</h2>
          <p className="mt-2 text-sm text-emerald-900">We found lease language to check against your CAM/NNN billing records. An uploaded lease alone cannot establish an overcharge or a recoverable dollar amount.</p>
        </div>
        {analysis.teaser_summary?.headline_flags && analysis.teaser_summary.headline_flags.length > 0 && (
          <div className="rounded-lg border border-emerald-200 bg-white p-4">
            <p className="text-sm font-semibold text-emerald-950">Potential review items</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
              {analysis.teaser_summary.headline_flags.slice(0, 3).map((flag, index) => <li key={index}>{reviewLabel(flag)}</li>)}
            </ul>
          </div>
        )}
        <dl className="grid gap-4 border-t border-emerald-200 pt-4 text-sm sm:grid-cols-2">
          <div><dt className="font-medium text-emerald-800">Tenant</dt><dd>{analysis.tenant || "Not identified"}</dd></div>
          <div><dt className="font-medium text-emerald-800">Landlord</dt><dd>{analysis.landlord || "Not identified"}</dd></div>
          <div><dt className="font-medium text-emerald-800">Premises</dt><dd>{analysis.premises || "Not identified"}</dd></div>
          <div><dt className="font-medium text-emerald-800">Lease dates</dt><dd>{analysis.lease_start && analysis.lease_end ? `${analysis.lease_start} to ${analysis.lease_end}` : "Not identified"}</dd></div>
        </dl>
      </section>

      {/* ---------- UNLOCK FULL AUDIT EXPLANATION ---------- */}
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">
          Full lease audit · $49.99 one-time
        </h2>
        <p className="text-sm font-medium text-slate-600">
          Check your lease for any notice or audit deadlines before deciding what to do next.
        </p>

        <p className="text-gray-700">
          The paid report summarizes the language review, flags terms to verify,
          and lists the records needed before you can establish an overcharge.
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
            Issue-by-issue screening findings and practical verification steps
          </li>
          <li>
            No dollar recovery claim without billing records
          </li>
          <li>
            A report you can share with an attorney,
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
