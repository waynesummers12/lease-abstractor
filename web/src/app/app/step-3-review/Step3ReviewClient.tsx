"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { waitForAnalysis } from "../step-2-analysis/analysis.wait";
import { useAuth } from "@/app/providers/AuthProvider";
import { trackFunnel } from "@/lib/funnelAnalytics";

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
  health?: {
    flags?: Array<{ code: string; label: string; recommendation: string }> | null;
  } | null;

};

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
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

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
    if (analysis && !hasFiredLeaseUploaded.current) {
      hasFiredLeaseUploaded.current = true;
      trackFunnel("lease_preview_viewed", { includes_statement: Boolean(analysis.reconciliation) });
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
    trackFunnel("statement_analysis_started", { support_count: supportFiles.length, entry_point: "preview_page" });
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
      trackFunnel("statement_analysis_completed", { support_count: supportFiles.length, entry_point: "preview_page" });
    } catch (error) {
      setDocumentError(error instanceof Error ? error.message : "Document analysis failed");
      trackFunnel("statement_analysis_failed", { entry_point: "preview_page" });
    } finally {
      setDocumentBusy(false);
    }
  }

  async function beginCheckout() {
    if (!auditId || checkoutBusy) return;
    setCheckoutError(null);
    setCheckoutBusy(true);
    trackFunnel("checkout_clicked", { includes_statement: Boolean(analysis?.reconciliation) });
    try {
      const res = await fetch("/api/audit-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ auditId }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && typeof data?.url === "string") {
        trackFunnel("begin_checkout", { currency: "USD", value: 49.99 });
        window.location.href = data.url;
      } else {
        throw new Error("Checkout could not open. Please try again.");
      }
    } catch {
      setCheckoutError("Checkout could not open. Please try again.");
      trackFunnel("checkout_start_failed");
      setCheckoutBusy(false);
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

  const reviewItems = analysis.health?.flags?.slice(0, 3).map((flag) => ({
    title: flag.label,
    nextStep: flag.recommendation,
  })) ?? analysis.teaser_summary?.headline_flags?.slice(0, 3).map((flag) => ({
    title: flag,
    nextStep: "Compare this lease language with your annual CAM or NNN statement and source records.",
  })) ?? [];

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 pb-28 pt-10 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Step 2 of 2 · Free preview</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{reviewItems.length ? `${reviewItems.length} lease ${reviewItems.length === 1 ? "item" : "items"} worth checking` : "Your lease review is ready"}</h1>
        <p className="mt-3 text-slate-600">
          {analysis.tenant ? `${analysis.tenant}: ` : ""}Here is what the preview found. The full report connects the lease language, source pages, and next questions in a PDF you can use.
        </p>
      </div>


      <section className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Free preview</p>
          <h2 className="mt-2 text-xl font-semibold text-emerald-950">A starting point for your next billing review</h2>
          <p className="mt-2 text-sm text-emerald-900">{analysis.reconciliation ? "We compared readable statement details with the lease. These are questions to verify with supporting records." : "We found lease language that may matter when you review a CAM or NNN bill. The lease alone cannot show whether you were overcharged."}</p>
        </div>
        {reviewItems.length > 0 && <div className="grid gap-3 sm:grid-cols-2">
          {reviewItems.map((item, index) => <article key={`${item.title}-${index}`} className="rounded-xl border border-emerald-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">Review lead {index + 1}</p>
            <h3 className="mt-2 text-base font-semibold text-emerald-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.nextStep}</p>
          </article>)}
        </div>}
        <dl className="grid gap-4 border-t border-emerald-200 pt-4 text-sm sm:grid-cols-2">
          <div><dt className="font-medium text-emerald-800">Tenant</dt><dd>{analysis.tenant || "Not identified"}</dd></div>
          <div><dt className="font-medium text-emerald-800">Landlord</dt><dd>{analysis.landlord || "Not identified"}</dd></div>
          <div><dt className="font-medium text-emerald-800">Premises</dt><dd>{analysis.premises || "Not identified"}</dd></div>
          <div><dt className="font-medium text-emerald-800">Lease dates</dt><dd>{analysis.lease_start && analysis.lease_end ? `${analysis.lease_start} to ${analysis.lease_end}` : "Not identified"}</dd></div>
        </dl>
      </section>

      <section aria-labelledby="unlock-title" className="overflow-hidden rounded-3xl border border-[#b9d5c1] bg-white shadow-xl shadow-emerald-950/10">
        <div className="bg-[#102c25] px-5 py-6 text-white sm:px-8 sm:py-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a9e9be]">Your next step</p>
          <h2 id="unlock-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{reviewItems.length ? "Turn these review leads into a plan." : "Get a plan for reviewing your lease."}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d9e9df] sm:text-base">Get a page-referenced PDF with the relevant lease terms, prioritized questions, records to request, and a billing worksheet. {analysis.reconciliation ? "Your analyzed annual statement is included." : "You can add your annual statement first at no extra cost."}</p>
          <button type="button" disabled={documentBusy || checkoutBusy} onClick={pendingDocuments ? analyzeDocuments : beginCheckout} className="mt-5 hidden min-h-12 rounded-xl bg-[#a9e9be] px-6 py-3 text-sm font-bold text-[#102c25] transition hover:bg-white disabled:opacity-60 sm:inline-flex sm:items-center sm:justify-center">{documentBusy ? "Analyzing selected documents…" : checkoutBusy ? "Opening secure checkout…" : pendingDocuments ? "Analyze selected documents first →" : "Get my full report · $49.99 →"}</button>
        </div>
        <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_220px] md:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Inside your full report</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li><span className="mr-2 font-bold text-emerald-700">✓</span>Relevant lease clauses with source pages and next questions</li>
              <li><span className="mr-2 font-bold text-emerald-700">✓</span>Notice or audit deadlines to verify against your signed documents</li>
              <li><span className="mr-2 font-bold text-emerald-700">✓</span>Records request draft and billing worksheet to guide follow-up</li>
              {analysis.reconciliation && <li><span className="mr-2 font-bold text-emerald-700">✓</span>Checks from your uploaded annual statement</li>}
            </ul>
          </div>
          <a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-slate-200 bg-[#f7faf6] p-3 text-center transition hover:border-emerald-500">
            <Image src="/sample/lease-and-statement-review-preview.png" alt="First page of a fictional sample report" width={992} height={1403} className="mx-auto h-40 w-auto rounded border border-slate-200 shadow-sm" />
            <span className="mt-3 block text-sm font-semibold text-emerald-800 underline underline-offset-4">View fictional sample PDF ↗</span>
          </a>
        </div>
        <div className="border-t border-slate-200 bg-[#f5f9f5] px-5 py-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-2xl font-bold text-slate-950">$49.99 <span className="text-sm font-medium text-slate-600">once</span></p><p className="mt-1 text-xs text-slate-600">No subscription · Secure checkout · PDF prepared after payment</p></div>
            <button type="button" disabled={documentBusy || checkoutBusy} onClick={pendingDocuments ? analyzeDocuments : beginCheckout} className="min-h-12 rounded-xl bg-[#102c25] px-7 py-3 text-center text-sm font-bold text-white transition hover:bg-[#1e4b3c] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800">{documentBusy ? "Analyzing selected documents…" : checkoutBusy ? "Opening secure checkout…" : pendingDocuments ? "Analyze selected documents first →" : "Get my full report · $49.99 →"}</button>
          </div>
          {documentError && <p role="alert" className="mt-3 text-sm text-red-700">{documentError}</p>}
          {checkoutError && <p role="alert" className="mt-3 text-sm text-red-700">{checkoutError}</p>}
          <p className="mt-4 text-xs leading-5 text-slate-600">The preview identifies questions, not verified overcharges or guaranteed savings. Your report reflects the readable files supplied before checkout.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Optional · Before checkout</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-950">Add your annual statement and supporting records</h2>
        <p className="mt-2 text-sm text-slate-600">We can compare a text-readable CAM or NNN statement with the lease and check visible arithmetic. Add up to four supporting PDFs. The report will label what remains unverified.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-800">Annual statement PDF
            <input type="file" accept="application/pdf,.pdf" onChange={(event) => { const nextStatement = event.target.files?.[0] ?? null; setStatement(nextStatement); if (!nextStatement) setSupportFiles([]); setPendingDocuments(Boolean(nextStatement)); }} className="mt-2 block w-full text-sm" />
          </label>
          <label className="text-sm font-medium text-slate-800">Supporting PDFs (up to four)
            <input type="file" accept="application/pdf,.pdf" multiple disabled={!statement} onChange={(event) => { const nextFiles = Array.from(event.target.files ?? []); setSupportFiles(nextFiles); setPendingDocuments(Boolean(statement)); }} className="mt-2 block w-full text-sm disabled:opacity-50" />
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

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-emerald-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(16,44,37,0.12)] backdrop-blur sm:hidden">
        <button type="button" disabled={documentBusy || checkoutBusy} onClick={pendingDocuments ? analyzeDocuments : beginCheckout} className="min-h-12 w-full rounded-xl bg-[#102c25] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{documentBusy ? "Analyzing documents…" : checkoutBusy ? "Opening checkout…" : pendingDocuments ? "Analyze selected documents →" : "Get my full report · $49.99 →"}</button>
      </div>

    </main>
  );
}
