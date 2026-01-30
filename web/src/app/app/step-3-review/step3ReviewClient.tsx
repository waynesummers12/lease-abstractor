"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ---------- TYPES ---------- */

type Analysis = {
  tenant: string | null;
  landlord: string | null;
  premises: string | null;
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;
  rent?: {
    base_rent: number | null;
    frequency: "monthly" | "annual" | null;
    escalation_type: "fixed_percent" | "fixed_amount" | "cpi" | "none";
    escalation_value: number | null;
    escalation_interval: "annual" | null;
  };
  cam_total_avoidable_exposure?: number | null;
  exposure_range?: { low: number; high: number } | null;
  exposure_risk?: "low" | "medium" | "high" | null;
};

/* ---------- PAGE ---------- */

export default function Step3ReviewClient() {
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const [auditId, setAuditId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [status, setStatus] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [animatedExposure, setAnimatedExposure] =
    useState<number | null>(null);
  const [totalAvoidableExposure, setTotalAvoidableExposure] =
    useState<number | null>(null);
  const [exposureRange, setExposureRange] =
    useState<{ low: number; high: number } | null>(null);
  const [exposureRiskLabel, setExposureRiskLabel] =
    useState<string | null>(null);

  /* ---------- READ AUDIT ID ---------- */

  useEffect(() => {
    const id = searchParams.get("auditId");
    if (id) setAuditId(id);
  }, [searchParams]);

  /* ---------- LOAD ANALYSIS ---------- */

  useEffect(() => {
    if (!auditId) return;

    async function loadAnalysis() {
      try {
        const res = await fetch(`/api/audit/${auditId}`, {
          cache: "no-store",
        });

        if (!res.ok) return;

        const json = await res.json();
        setAnalysis(json?.analysis ?? json);
      } catch (err) {
        console.error("Failed to load analysis", err);
      }
    }

    loadAnalysis();
  }, [auditId]);

  /* ---------- DERIVE EXPOSURE ---------- */

  useEffect(() => {
    if (!analysis) {
      setTotalAvoidableExposure(null);
      setExposureRange(null);
      setExposureRiskLabel(null);
      setAnimatedExposure(null);
      return;
    }

    const exposure =
      typeof analysis.cam_total_avoidable_exposure === "number"
        ? analysis.cam_total_avoidable_exposure
        : null;

    setTotalAvoidableExposure(exposure);
    setExposureRange(analysis.exposure_range ?? null);
    setExposureRiskLabel(
      analysis.exposure_risk ? analysis.exposure_risk.toLowerCase() : null
    );

    if (exposure == null) return;

    setAnimatedExposure(0);

    let current = 0;
    const step = Math.max(Math.floor(exposure / 40), 1);

    const interval = setInterval(() => {
      current += step;
      if (current >= exposure) {
        setAnimatedExposure(exposure);
        clearInterval(interval);
      } else {
        setAnimatedExposure(current);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [analysis]);

  /* ---------- CHECKOUT ---------- */

  async function handleCheckout() {
    if (!auditId || isCheckingOut) return;

    setIsCheckingOut(true);
    setStatus("Redirecting to secure checkout…");

    try {
      if (analysis) {
        sessionStorage.setItem(
          "latest_analysis",
          JSON.stringify(analysis)
        );
      }

      const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
      const workerKey = process.env.NEXT_PUBLIC_WORKER_KEY;

      if (!workerUrl || !workerKey) {
        throw new Error("Worker not configured");
      }

      const res = await fetch(`${workerUrl}/checkout/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lease-Worker-Key": workerKey,
        },
        body: JSON.stringify({ auditId }),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error("Checkout creation failed");
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error("Checkout error:", err);
      setStatus(err?.message ?? "Checkout failed");
      setIsCheckingOut(false);
    }
  }

  /* ---------- UI ---------- */

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Lease Audit Review</h1>
        <p className="mt-2 text-gray-600">
          Initial CAM / NNN risk assessment based on your lease.
        </p>
      </div>

      {animatedExposure != null && (
        <div className="rounded-xl border border-green-500 bg-green-50 p-6">
          <div className="text-sm text-green-700">
            Estimated Avoidable Exposure (12 months)
          </div>
          <div className="mt-1 text-4xl font-extrabold text-green-800">
            ${animatedExposure.toLocaleString()}
          </div>

          {exposureRange && (
            <div className="mt-2 text-sm text-gray-700">
              Range: ${exposureRange.low.toLocaleString()} – $
              {exposureRange.high.toLocaleString()}
            </div>
          )}

          {exposureRiskLabel && (
            <div className="mt-2 font-semibold text-red-700">
              Risk level: {exposureRiskLabel.toUpperCase()}
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isCheckingOut || !auditId}
        className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {isCheckingOut ? "Redirecting…" : "Get Full Audit PDF"}
      </button>

      {status && (
        <p className="text-sm text-gray-600">{status}</p>
      )}

      <div ref={resultsRef} />
    </main>
  );
}
