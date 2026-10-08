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
 * - useState / useRouter
 *
 * Violation = production regression
 */

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "./UploadForm";
import { useAuth } from "@/app/providers/AuthProvider";

export default function UploadLeasePage() {
  const router = useRouter();
  const { session } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setError(null);
    setUploading(true);

    const auditId = crypto.randomUUID();
    const objectPath = `leases/${auditId}.pdf`; // ✅ REQUIRED

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

      // 3️⃣ Redirect (working path)
      router.push(`/app/step-3-review?auditId=${auditId}`);
    } catch (err: unknown) {
      console.error("Upload failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Upload failed. Please try again.";
      setError(errorMessage);
    } finally {
      // 🔥 ALWAYS reset state
      setUploading(false);
    }
  }
// =======================================================
// ⛔ DO NOT MODIFY ABOVE THIS LINE ⛔
// Only edit JSX BELOW the return() statement.
// =======================================================
  return (
  <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Free lease preview</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        Understand your lease expense terms
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
        Upload one commercial lease PDF for a free preview of its CAM and NNN terms. You can decide whether to buy the full lease report afterward.
      </p>
    </div>

    <div className="mx-auto mt-9 max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Step 1 of 2</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">Choose your lease PDF</h2>
        <p className="mt-2 text-sm text-slate-600">Choose the original lease agreement, not a prior SaveOnLease report. We’ll analyze it and take you to your free preview.</p>
      </div>
      <UploadForm
        onUpload={handleUpload}
        loading={uploading}
      />
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      )}
      <p className="mt-5 text-center text-sm text-slate-600">No credit card needed for the preview.</p>
    </div>

    <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-sm text-slate-700 sm:grid-cols-3">
      <div className="rounded-xl bg-slate-50 p-4"><span className="font-semibold">1. Upload</span><br />Choose a PDF copy of your lease.</div>
      <div className="rounded-xl bg-slate-50 p-4"><span className="font-semibold">2. Preview</span><br />Review the extracted lease terms and topics to verify.</div>
      <div className="rounded-xl bg-slate-50 p-4"><span className="font-semibold">3. Decide</span><br />Unlock the lease report only if it’s useful to you.</div>
    </div>
    <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-600">Have an annual CAM statement too? <a href="/marketing/reconciliation-pilot" className="font-semibold text-emerald-800 underline">Request our separate founder-reviewed pilot</a>. This upload accepts a lease only.</p>
  </main>
);
}
