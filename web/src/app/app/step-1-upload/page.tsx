"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "./UploadForm";
import { runAuditPipeline } from "../step-2-analysis/analysis.service";

export default function UploadLeasePage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    setError(null);
    setLoading(true);

    const auditId = crypto.randomUUID();

    try {
      // 1️⃣ Create audit row FIRST
      const createRes = await fetch("/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId }),
      });

      if (!createRes.ok) {
        throw new Error("Failed to create audit");
      }

      // 2️⃣ Upload + ingest + wait (fire-and-forget safety)
      runAuditPipeline(file, auditId).catch(console.error);

      // 3️⃣ Go to Step-3 (polling page)
      router.push(`/app/step-3-review?auditId=${auditId}`);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err?.message ?? "Upload failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-light tracking-tight">
          Upload Your Lease
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Upload your commercial lease PDF to begin your CAM & NNN audit.
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
