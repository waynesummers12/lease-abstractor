"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Analysis = {
  cam_total_avoidable_exposure?: number | null;
  exposure_range?: { low: number; high: number } | null;
  exposure_risk?: "low" | "medium" | "high" | null;
};

export default function Step3ReviewPage() {
  const searchParams = useSearchParams();
  const auditId = searchParams.get("auditId");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (!auditId) {
      setError("Missing audit ID.");
      setLoading(false);
      return;
    }

    async function loadAnalysis() {
      try {
        const res = await fetch(`/api/audits/${auditId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load analysis");
        }

        const data = await res.json();

        if (!data?.analysis) {
          throw new Error("Analysis not ready");
        }

        setAnalysis(data.analysis);
      } catch (err: any) {
        setError(err.message || "Unable to load analysis");
      } finally {
        setLoading(false);
      }
    }

    loadAnalysis();
  }, [auditId]);

  async function handleCheckout() {
    if (!auditId || isCheckingOut) return;

    setIsCheckingOut(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORKER_URL}/checkout/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Lease-Worker-Key":
              process.env.NEXT_PUBLIC_WORKER_KEY!,
          },
          body: JSON.stringify({ auditId }),
        }
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      if (!data?.url) throw new Error("Missing checkout URL");

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout failed", err);
      setIsCheckingOut(false);
    }
  }

  if (loading) {
    return <p className="p-8">Loading analysis…</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">{error}</p>;
  }

  const exposure = analysis?.cam_total_avoidable_exposure;

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* GREEN BOX */}
      <div className="rounded-2xl border-2 border-green-600 bg-green-50 p-8">
        <p className="text-sm font-semibold text-green-700 uppercase">
          Analysis complete
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Estimated Avoidable Exposure
        </h1>

        {exposure != null ? (
          <p className="mt-4 text-5xl font-extrabold text-green-700">
            ${exposure.toLocaleString()}
          </p>
        ) : (
          <p className="mt-4 text-gray-600">
            Exposure could not be calculated.
          </p>
        )}

        {analysis?.exposure_range && (
          <p className="mt-2 text-sm text-green-800">
            Estimated range: $
            {analysis.exposure_range.low.toLocaleString()} – $
            {analysis.exposure_range.high.toLocaleString()}
          </p>
        )}

        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isCheckingOut
            ? "Opening secure checkout…"
            : "Unlock full audit report →"}
        </button>

        <p className="mt-3 text-xs text-gray-600">
          One-time payment. PDF delivered immediately after checkout.
        </p>
      </div>
    </main>
  );
}
