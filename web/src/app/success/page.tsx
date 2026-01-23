"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ================= TYPES ================= */

type AuditResponse = {
  analysis?: {
    avoidable_exposure?: number;
    tenant?: string | null;
  };
  signedUrl?: string | null;
};

/* ================= PAGE ================= */

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AuditResponse | null>(null);

  useEffect(() => {
    if (!auditId) {
      setError("Missing audit reference.");
      setLoading(false);
      return;
    }

    let interval: NodeJS.Timeout;

    async function loadAudit() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/audits/${auditId}`;
        console.log("Loading audit:", url);

        const res = await fetch(url, { cache: "no-store" });

        // 404 = audit exists but not ready yet
        if (!res.ok) {
          console.warn("Audit not ready yet:", res.status);
          return;
        }

        const json: AuditResponse = await res.json();
        console.log("Audit response:", json);

        if (json?.analysis) {
          setData(json);
          setLoading(false);
          clearInterval(interval); // ✅ stop polling
        }
      } catch (err) {
        console.error("Success page fetch error:", err);
      }
    }

    loadAudit();
    interval = setInterval(loadAudit, 5000);

    return () => clearInterval(interval);
  }, [auditId]);

  /* ================= UI ================= */

  return (
    <main className="mx-auto max-w-xl px-6 py-28 text-center">
      {loading && (
        <>
          <div className="mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto" />
          <h1 className="text-xl font-semibold">Preparing your audit summary</h1>
          <p className="mt-3 text-sm text-gray-600">
            This will only take a moment.
          </p>
        </>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => router.push("/product/app")}
            className="mt-4 underline"
          >
            Back to app
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <div className="mb-6 text-3xl">✅</div>

          <h1 className="text-2xl font-semibold">Payment successful</h1>

          <p className="mt-3 text-sm text-gray-600">
            Your CAM / NNN Audit Summary is ready.
          </p>

          {typeof data.analysis?.avoidable_exposure === "number" && (
            <div className="mt-6 rounded-lg border bg-gray-50 p-4 text-sm">
              <p className="font-medium">Estimated recoverable exposure</p>
              <p className="mt-1 text-2xl font-bold">
                ${data.analysis.avoidable_exposure.toLocaleString()}
              </p>
            </div>
          )}

          {data.signedUrl ? (
            <a
              href={data.signedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Download PDF Audit
            </a>
          ) : (
            <p className="mt-6 text-sm text-gray-500">
              Your PDF is still being prepared. You’ll receive an email as soon as
              it’s ready.
            </p>
          )}

          <button
            onClick={() => router.push("/product/app")}
            className="mt-8 block mx-auto text-sm underline text-gray-600"
          >
            Return to app
          </button>
        </>
      )}
    </main>
  );
}
