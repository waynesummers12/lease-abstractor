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

    try {
      // Create audit row (API route, not Supabase directly)
      const res = await fetch("/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId }),
      });

      if (!res.ok) throw new Error("Failed to create audit");

      // Send file to worker ONLY
      const formData = new FormData();
      formData.append("file", file);
      formData.append("auditId", auditId);

      fetch(
        `${process.env.NEXT_PUBLIC_WORKER_URL}/ingest/lease/pdf`,
        {
          method: "POST",
          headers: {
            "X-Lease-Worker-Key":
              process.env.NEXT_PUBLIC_WORKER_KEY!,
          },
          body: formData,
        }
      ).catch(console.error);

      router.push(`/app/step-3-review?auditId=${auditId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Upload failed");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-light text-center">
        Upload Your Lease
      </h1>

      <div className="mt-10 rounded-2xl border bg-white p-8">
        <UploadForm onUpload={handleUpload} loading={loading} />
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </main>
  );
}
