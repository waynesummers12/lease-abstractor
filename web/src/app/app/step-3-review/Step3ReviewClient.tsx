"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { waitForAnalysis } from "../step-2-analysis/analysis.wait";
import { useAuth } from "@/app/providers/AuthProvider";

type Analysis = {
  reconciliation?: { statementName: string; supportNames: string[]; checks: Array<{ label: string; result: string; status: string }> } | null;
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
  const [failure, setFailure] = useState<"timeout" | "not-found" | "unavailable" | "invalid-document" | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [statement, setStatement] = useState<File | null>(null);
  const [supportFiles, setSupportFiles] = useState<File[]>([]);
  const [documentBusy, setDocumentBusy] = useState(false);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [pendingDocuments, setPendingDocuments] = useState(false);

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

        gtag("event", "lease_preview_viewed", { audit_id: auditId });
      }
    }
  }, [analysis, auditId]);

  async function analyzeDocuments() {
    if (!auditId || documentBusy) return;
    if (!statement) {
      setDocumentError("Choose an annual statement PDF before analyzing the selected documents.");
      return;
    }
    setDocumentError(null);
    setDocumentBusy(true);
    try {
      if (supportFiles.length > 4) throw new Error("Choose up to four supporting PDFs.");
      if ([statement, ...supportFiles].some((file) => file.size > 10 * 1024 * 1024) || [statement, ...supportFiles].reduce((sum, file) => sum + file.size, 0) > 29 * 1024 * 1024) throw new Error("Each PDF must be under 10 MB and all PDFs together under 29 MB.");
      const form = new FormData();
      form.append("files", statement);
      for (const file of supportFiles) form.append("files", file);
      const tokenResponse = await fetch(`/api/audits/${auditId}/reconcile`, { headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}, cache: "no-store" });
      const token = await tokenResponse.json();
      if (!tokenResponse.ok || typeof token.capability !== "string") throw new Error(token.error || "Document access unavailable");
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/audit/${auditId}/reconcile`, { method: "POST", headers: { "X-Audit-Capability": token.capability }, body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Document analysis failed");
      setAnalysis((current) => current ? { ...current, reconciliation: result.reconciliation } : current);
      setPendingDocuments(false);
    } catch (error) {
      setDocumentError(error instanceof Error ? error.message : "Document analysis failed");
    } finally {
      setDocumentBusy(false);
    }
  }

  async function beginCheckout() {
    if (!auditId) return;
    const res = await fetch("/api/audit-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
      },
      body: JSON.stringify({ auditId }),
    });
    const data = await res.json();
    if (data?.url) {
      window.gtag?.("event", "begin_checkout", { currency: "USD", value: 49.99, audit_id: auditId });
      window.location.href = data.url;
    } else {
      alert("Failed to start checkout");
    }
  }

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
    const message = failure === "invalid-document"
      ? "This upload appears to be a SaveOnLease report rather than the original lease agreement. We can't produce a reliable lease review from it. Please upload the original commercial lease PDF."
      : failure === "not-found"
      ? "We couldn't find this audit. Check the link or upload the lease again."
      : failure === "unavailable"
        ? "We couldn't access this audit right now. Please try again."
        : "Your preview is taking longer than expected. You can check again without re-uploading.";
    const supportHref = `mailto:audits@saveonlease.com?subject=${encodeURIComponent("Lease preview help")}&body=${encodeURIComponent(`Please help with audit ID: ${auditId}`)}`;
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h1 className="text-2xl font-semibold">{failure === "invalid-document" ? "Please upload the lease agreement" : "Preview not ready"}</h1>
        <p className="mt-3 text-slate-700">{message}</p>
        <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center">
          {failure !== "invalid-document" && <button
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
          </button>}
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
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Your lease{analysis.reconciliation ? " + statement" : ""} preview</h1>
        <p className="mt-3 text-slate-600">
          Review the terms and {analysis.reconciliation ? "statement checks" : "topics"} we found. You can decide whether a full report is worth it.
        </p>
      </div>


      <section className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Free preview</p>
          <h2 className="mt-2 text-xl font-semibold text-emerald-950">Lease terms{analysis.reconciliation ? " and statement checks" : ""} ready for review</h2>
          <p className="mt-2 text-sm text-emerald-900">{analysis.reconciliation ? "We compared readable statement details with the lease. Review the checks below and verify any flagged items with supporting records." : "We found lease language to check against your CAM/NNN billing records. An uploaded lease alone cannot establish an overcharge or a recoverable dollar amount."}</p>
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

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Steps 2 and 3 · Optional before payment</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-950">Add your annual statement and supporting records</h2>
        <p className="mt-2 text-sm text-slate-600">We can compare a text-readable CAM or NNN statement with the lease and check visible arithmetic. Add up to four supporting PDFs. The report will label what remains unverified.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-800">Annual statement PDF
            <input type="file" accept="application/pdf,.pdf" onChange={(event) => { const nextStatement = event.target.files?.[0] ?? null; setStatement(nextStatement); setPendingDocuments(Boolean(nextStatement) || supportFiles.length > 0); }} className="mt-2 block w-full text-sm" />
          </label>
          <label className="text-sm font-medium text-slate-800">Supporting PDFs (up to four)
            <input type="file" accept="application/pdf,.pdf" multiple onChange={(event) => { const nextFiles = Array.from(event.target.files ?? []); setSupportFiles(nextFiles); setPendingDocuments(Boolean(statement) || nextFiles.length > 0); }} className="mt-2 block w-full text-sm" />
          </label>
        </div>
        <button type="button" disabled={!statement || documentBusy} onClick={analyzeDocuments} className="mt-5 min-h-11 rounded-lg bg-emerald-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">{documentBusy ? "Reviewing documents…" : "Analyze documents"}</button>
        {analysis.reconciliation && <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
          <p className="font-semibold">Statement analyzed: {analysis.reconciliation.statementName}</p>
          <p className="mt-1">{analysis.reconciliation.supportNames.length} supporting PDFs added. The report will include the checks below.</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">{analysis.reconciliation.checks.map((check, index) => <li key={index}><strong>{check.label}:</strong> {check.result}</li>)}</ul>
        </div>}
        <p className="mt-4 text-xs text-slate-500">You may continue with only the lease. Add all documents before checkout; the paid PDF reflects the files saved at purchase.</p>
      </section>

      <div>
        <button
          type="button"
          disabled={documentBusy}
          onClick={pendingDocuments ? analyzeDocuments : beginCheckout}
          className="min-h-12 w-full rounded-xl bg-black px-5 py-3 text-center font-semibold text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {documentBusy ? "Analyzing selected documents…" : pendingDocuments ? "Analyze selected documents →" : "Unlock your report · $49.99"}
        </button>
        {documentError && <p role="alert" className="mt-3 text-center text-sm text-red-700">{documentError}</p>}
        <p className="mt-2 text-center text-xs text-slate-500">
          Secure one-time checkout. Your PDF is prepared after payment.
        </p>
      </div>

      {/* ---------- UNLOCK FULL AUDIT EXPLANATION ---------- */}
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">
          Lease Expense Review{analysis.reconciliation ? " + Statement" : ""} · $49.99 one-time
        </h2>
        <p className="text-sm font-medium text-slate-600">
          Check your lease for any notice or audit deadlines before deciding what to do next.
        </p>

        <p className="text-gray-700">
          The paid report summarizes lease language and, when added above, checks statement arithmetic and documents to verify before asserting an overcharge.
        </p>

        <p className="text-sm text-gray-600">
          One-time payment. No subscriptions. No auto-renewals.
        </p>
        <p className="text-xs text-gray-500">
          If no meaningful issues are found, you’ll still receive a complete audit report for your records.
        </p>

        <section className="overflow-hidden rounded-2xl border-2 border-emerald-700 bg-emerald-50 shadow-sm" aria-labelledby="sample-report-heading">
          <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_220px]">
            <div className="p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">See the report format</p>
              <h3 id="sample-report-heading" className="mt-2 text-xl font-semibold text-slate-950">Preview the report before paying</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">Explore an 11-page report generated from fictional lease and statement documents. It shows prioritized questions, conditional calculations, a worksheet, and records to request. Your report will reflect your own files.</p>
              <a
                href="/sample/lease-and-statement-review-sample.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
              >
                Open the full sample report (PDF) ↗
              </a>
              <p className="mt-3 text-xs text-slate-600">Fictional demonstration · Review leads are not verified overcharges</p>
            </div>
            <a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open the full sample lease and statement report PDF" className="block border-t border-emerald-200 bg-white p-4 md:border-l md:border-t-0">
              <Image src="/sample/lease-and-statement-review-preview.png" alt="First page of the fictional lease and statement report" width={992} height={1403} className="mx-auto h-64 w-auto rounded border border-slate-200 shadow-md md:h-72" />
            </a>
          </div>
        </section>

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

    </main>
  );
}
