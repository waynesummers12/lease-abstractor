"use client";

/**
 * Client upload flow. The lease is ingested first; optional billing documents
 * are reconciled against that analyzed lease before opening the free preview.
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
 * - useState / useRouter
 *
 */

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UploadForm from "./UploadForm";
import { useAuth } from "@/app/providers/AuthProvider";
import { trackFunnel } from "@/lib/funnelAnalytics";

export default function UploadLeasePage() {
  const router = useRouter();
  const { session } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [recoverAuditId, setRecoverAuditId] = useState<string | null>(null);

  useEffect(() => {
    trackFunnel("free_preview_started");
  }, []);

  async function handleUpload(file: File, statement?: File, supporting: File[] = []) {
    setError(null);
    setRecoverAuditId(null);
    setUploading(true);
    trackFunnel("upload_submitted", { includes_statement: Boolean(statement) });

    const auditId = crypto.randomUUID();
    const objectPath = `leases/${auditId}.pdf`; // ✅ REQUIRED

    let leaseReady = false;
    let stage = "create_audit";
    try {
      // 1️⃣ Create audit row
      const portfolioLeaseId = new URLSearchParams(window.location.search).get("portfolioLeaseId");
      const createRes = await fetch("/api/audits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ auditId, objectPath, portfolioLeaseId }),
      });

      if (!createRes.ok) {
        const text = await createRes.text();
        throw new Error(text || "Failed to create audit");
      }
      const createdAudit = await createRes.json();
      if (typeof createdAudit.capability !== "string") throw new Error("Audit access is unavailable");

      // 2️⃣ Upload lease PDF to worker
      const formData = new FormData();
      formData.append("file", file);
      formData.append("auditId", auditId);
      formData.append("objectPath", objectPath);

      stage = "lease_analysis";
      const ingestRes = await fetch(
        `${process.env.NEXT_PUBLIC_WORKER_URL}/ingest/lease/pdf`,
        {
          method: "POST",
          headers: {
            "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
            "X-Audit-Capability": createdAudit.capability,
          },
          body: formData,
        }
      );

      if (!ingestRes.ok) {
        const result = await ingestRes.json().catch(() => null);
        throw new Error(typeof result?.error === "string" ? result.error : "We couldn't analyze this PDF. Please try another copy of the lease.");
      }
      leaseReady = true;
      trackFunnel("lease_uploaded", { includes_statement: Boolean(statement) });

      // The lease must be analyzed first. The existing reconciliation endpoint
      // then saves the optional statement and records on this same audit.
      if (statement) {
        stage = "statement_analysis";
        trackFunnel("statement_analysis_started", { support_count: supporting.length, entry_point: "initial_upload" });
        const documents = new FormData();
        documents.append("files", statement);
        for (const support of supporting) documents.append("files", support);
        const reconcileRes = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/audit/${auditId}/reconcile`, {
          method: "POST",
          headers: { "X-Audit-Capability": createdAudit.capability },
          body: documents,
        });
        if (!reconcileRes.ok) {
          const result = await reconcileRes.json().catch(() => null);
          throw new Error(typeof result?.error === "string" ? result.error : "We couldn't analyze the annual statement. You can add it on the preview page instead.");
        }
        trackFunnel("statement_analysis_completed", { support_count: supporting.length, entry_point: "initial_upload" });
      }

      // 3️⃣ Redirect (working path)
      router.push(`/app/step-3-review?auditId=${auditId}`);
    } catch (err: unknown) {
      console.error("Upload failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Upload failed. Please try again.";
      setError(errorMessage);
      trackFunnel("lease_upload_failed", { stage });
      if (stage === "statement_analysis") trackFunnel("statement_analysis_failed", { entry_point: "initial_upload" });
      if (leaseReady) setRecoverAuditId(auditId);
    } finally {
      // 🔥 ALWAYS reset state
      setUploading(false);
    }
  }
  return (
  <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Free lease preview</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">See how your CAM and NNN bill compares with your lease.</h1>
      <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
        Start with your signed commercial lease. Add an annual CAM or NNN statement to check readable charges, calculations, and lease terms together. You can preview the results before deciding whether to buy the full report.
      </p>
      <a href="#upload-documents" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#102b25] px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-900">I have my lease · Go to upload ↓</a>
    </div>

    <section aria-labelledby="document-checklist-title" className="mx-auto mt-10 max-w-5xl rounded-[28px] border border-[#d9e7dc] bg-[#f3f8f3] p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Before you upload</p>
          <h2 id="document-checklist-title" className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">What to have ready.</h2>
        </div>
        <p className="text-sm font-semibold text-emerald-900">Only the lease is required</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">01 · Required</span>
          <h3 className="mt-4 text-lg font-semibold text-slate-950">Signed lease PDF</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Include amendments in the same text-readable PDF when possible. The free preview pulls out lease terms and questions to check.</p>
          <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-600"><strong className="text-slate-800">Limit:</strong> A lease alone cannot establish what you were actually billed or whether money is owed.</p>
        </article>
        <article className="rounded-2xl border border-[#dce5dc] bg-white p-5 shadow-sm">
          <span className="inline-flex rounded-full bg-[#eaf3ec] px-3 py-1 text-xs font-bold text-[#286149]">02 · Optional</span>
          <h3 className="mt-4 text-lg font-semibold text-slate-950">Annual CAM or NNN statement</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Add the landlord&apos;s reconciliation to compare readable expense lines, tenant share, arithmetic, and credits with the lease.</p>
          <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-600"><strong className="text-slate-800">Good to know:</strong> You can add it on the preview page before checkout, for the same report price.</p>
        </article>
        <article className="rounded-2xl border border-[#dce5dc] bg-white p-5 shadow-sm">
          <span className="inline-flex rounded-full bg-[#eaf3ec] px-3 py-1 text-xs font-bold text-[#286149]">03 · Optional</span>
          <h3 className="mt-4 text-lg font-semibold text-slate-950">Supporting records</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">With a statement, add up to four PDFs such as an area schedule, expense ledger, invoices, or payment history if you already have them.</p>
          <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-600"><strong className="text-slate-800">Missing records?</strong> Start anyway. The full report lists what to request and what remains unverified.</p>
        </article>
      </div>
      <p className="mt-5 text-sm leading-6 text-[#456654]">A flagged item is a question to verify against the signed documents and source records. <Link href="/marketing/pricing" className="font-semibold text-emerald-800 underline underline-offset-4">See the free preview and full report side by side →</Link></p>
    </section>

    <div id="upload-documents" className="mx-auto mt-8 max-w-3xl scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Step 1 of 2 · Add your documents</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">Choose your files.</h2>
        <p className="mt-2 text-sm text-slate-600">Use your signed lease, including amendments. A prior SaveOnLease report is not the source document. The annual statement and supporting PDFs are optional and can also be added on the preview page.</p>
      </div>
      <UploadForm
        onUpload={handleUpload}
        loading={uploading}
      />
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      )}
      {recoverAuditId && <Link href={`/app/step-3-review?auditId=${recoverAuditId}`} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4">Your lease preview is ready. Continue and add the statement there →</Link>}
      <p className="mt-5 text-center text-sm text-slate-600">No credit card needed now. Review the free preview before choosing the $49.99 report.</p>
    </div>

    <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-sm text-slate-700 sm:grid-cols-3">
      <div className="rounded-xl bg-slate-50 p-4"><span className="font-semibold">1. Upload</span><br />Choose the lease and, if available, an annual statement.</div>
      <div className="rounded-xl bg-slate-50 p-4"><span className="font-semibold">2. Preview</span><br />Review extracted terms and any statement checks.</div>
      <div className="rounded-xl bg-slate-50 p-4"><span className="font-semibold">3. Decide</span><br />Pay $49.99 once for the full PDF only if it’s useful to you.</div>
    </div>
    <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-600">The review flags questions to verify; it does not certify an overcharge or a refund. <Link href="/marketing/how-it-works" className="font-semibold text-emerald-800 underline underline-offset-4">See what the full report includes →</Link></p>
  </main>
);
}
