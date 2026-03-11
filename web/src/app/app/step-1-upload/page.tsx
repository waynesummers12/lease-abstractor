// web/src/app/step-1-upload/page.tsx
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

export default function UploadLeasePage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setError(null);
    setUploading(true);

    const auditId = crypto.randomUUID();
    const objectPath = `leases/${auditId}.pdf`; // ✅ REQUIRED

    try {
      // 1️⃣ Create audit row
      const createRes = await fetch("/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, objectPath }),
      });

      if (!createRes.ok) {
        const text = await createRes.text();
        throw new Error(text || "Failed to create audit");
      }

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
          },
          body: formData,
        }
      );

      if (!ingestRes.ok) {
        const text = await ingestRes.text();
        throw new Error(text || "Failed to upload lease");
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
  <main className="mx-auto max-w-4xl px-6 py-24">
    <div className="mb-12 text-center">
      <h1 className="text-5xl sm:text-6xl font-light tracking-tight">
        Upload Your Lease
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        Free Preview – Retail, Restaurant, Franchise & Medical
      </p>

      <p className="mt-4 text-lg text-gray-800">
        Upload your commercial or medical office lease PDF to identify CAM & NNN risks,
        hidden fees, and overcharges.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Built for retail operators, restaurant owners, franchisees, office, and medical tenants.
      </p>

      <p className="mt-4 text-base text-gray-600">
        We run your PDF through our audit pipeline and estimate what you could
        recover over the next 12 months. 
        </p>
        
        <p className="mt-4 text-base text-gray-600">
        This estimate is based on your lease language, including CAM, NNN, escalation, and audit provisions. 
        It reflects potential exposure identified from contractual terms — not a review of actual billed statements.
      </p>

      <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-3">
        <div>✔ CAM & NNN overcharges</div>
        <div>✔ Admin & management fee padding</div>
        <div>✔ Missing caps & audit rights</div>
      </div>
    </div>

    <div className="rounded-2xl border bg-white p-8 shadow-sm text-center">
      <UploadForm
        onUpload={handleUpload}
        loading={uploading}
      />

      <p className="mt-3 text-xs text-gray-500">
        ⏱ Results generated in ~10 seconds.
      </p>

      <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
        <p className="text-sm font-semibold text-green-900">
          💰 Typical tenants uncover $5,000–$50,000+ in annual CAM exposure
        </p>
        <p className="mt-1 text-sm text-green-800">
          See your estimated avoidable cost before deciding on a full audit.
        </p>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        🔒 Your lease is encrypted, never shared, and deleted after your audit.
        <br />
        ⏱ Takes about 2 minutes. See how much you can save before buying full audit reports.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
    </div>
  </main>
);
}