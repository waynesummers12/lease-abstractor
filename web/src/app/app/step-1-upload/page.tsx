"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "./UploadForm";
import { useAuditUpload } from "./useAuditUpload";

export default function UploadLeasePage() {
  const router = useRouter();
  const { uploadAndAnalyze } = useAuditUpload();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    setError(null);
    setLoading(true);

    try {
      const audit = await uploadAndAnalyze(file);

      // Expecting audit.id to exist from pipeline
      if (!audit?.id) {
        throw new Error("Audit was created but no ID was returned.");
      }

      // Move user forward in the funnel
      router.push(`/product/app/step-3-review?auditId=${audit.id}`);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-light tracking-tight">
          Upload Your Lease
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Upload your commercial lease PDF to begin your CAM & NNN audit.
        </p>
      </div>

      {/* Upload Form */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <UploadForm
          onUpload={handleUpload}
          loading={loading}
        />

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
