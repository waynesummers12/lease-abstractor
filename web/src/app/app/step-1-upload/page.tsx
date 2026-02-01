"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "./UploadForm";
import { useAuditUpload } from "./useAuditUpload";

export default function UploadLeasePage() {
  const router = useRouter();
  const { uploadFile } = useAuditUpload(); // ✅ FIXED

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    setError(null);
    setLoading(true);

    const auditId = crypto.randomUUID(); // ✅ source of truth

    try {
      // 1️⃣ upload lease to Supabase
      await uploadFile(file, auditId);

      // 2️⃣ create audit record (needed for polling)
      await fetch("/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId }),
      });

      // 3️⃣ go straight to review (polling happens there)
      router.push(`/product/app/step-3-review?auditId=${auditId}`);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err?.message ?? "Upload failed. Please try again.");
    } finally {
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
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
