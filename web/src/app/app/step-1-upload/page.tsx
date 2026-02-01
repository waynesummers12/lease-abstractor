// web/src/app/step-1-upload/page.tsx
"use client";

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
  setLoading(true);

  const auditId = crypto.randomUUID();
  const objectPath = `leases/${auditId}.pdf`; // ✅ REQUIRED

  try {
    // 1️⃣ Create audit row (web → API → worker)
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
    formData.append("objectPath", objectPath); // ✅ REQUIRED

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

    // 3️⃣ Review
    router.push(`/app/step-3-review?auditId=${auditId}`);
  } catch (err: any) {
    console.error("Upload failed:", err);
    setError(err?.message ?? "Upload failed. Please try again.");
    setLoading(false);
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
