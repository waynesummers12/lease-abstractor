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
 * - useState / useEffect / useRouter
 * - window.location
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
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
  setError(null);
  setUploading(true);

  const auditId = crypto.randomUUID();
  const objectPath = `leases/${auditId}.pdf`;

  try {
    // 1️⃣ Create audit row
    const createRes = await fetch("/api/audits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auditId, objectPath }),
    });

    if (!createRes.ok) {
      let message = "Failed to create audit";

      try {
        const contentType = createRes.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const json = await createRes.json();
          message = json?.error || message;
        }
      } catch {
        // swallow
      }

      setError(message);
      return; // 🔴 DO NOT THROW
    }

    // 2️⃣ Upload lease PDF
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
      let message = "Failed to upload lease";

      try {
        const text = await ingestRes.text();
        if (text) message = text;
      } catch {
        // swallow
      }

      setError(message);
      return; // 🔴 DO NOT THROW
    }

    // 3️⃣ Redirect (this was never reached before)
    router.push(`/success?auditId=${auditId}`);
  } catch (err) {
    console.error(err);
    setError("Unexpected error occurred");
  } finally {
    // 🔥 ALWAYS runs now
    setUploading(false);
  }
}

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-light tracking-tight">
          Upload Your Lease
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Upload your commercial lease PDF to identify CAM & NNN risks,
          hidden fees, and overcharges.
        </p>

        <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-3">
          <div>✔ CAM & NNN overcharges</div>
          <div>✔ Admin & management fee padding</div>
          <div>✔ Missing caps & audit rights</div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          🔒 Your lease is encrypted, never shared, and deleted after your audit.
          <br />
          ⏱ Takes about 2 minutes • No obligation to purchase
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <UploadForm onUpload={handleUpload} loading={loading} />

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>
    </main>
  );
}
