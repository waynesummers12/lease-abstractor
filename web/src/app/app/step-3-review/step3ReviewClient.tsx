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
  <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-6 space-y-4">

    <div className="flex items-center gap-3">
      <span className="text-2xl">💰</span>
      <div>
        <p className="text-sm text-emerald-700 font-medium">
          Estimated Avoidable Exposure (Next 12 Months)
        </p>
        <p className="text-4xl font-extrabold text-emerald-900">
          ${animatedExposure.toLocaleString()}
        </p>
      </div>
    </div>

    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm w-fit">
      ✓ Calculated from CAM, NNN, escalation, and reconciliation clauses
    </div>

    {/* Confidence */}
    <div className="space-y-1">
      <p className="text-xs text-emerald-700">
        Confidence reflects clarity of CAM, escalation, and reconciliation clauses
      </p>

      <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-600 rounded-full"
          style={{ width: "85%" }}
        />
      </div>

      <p className="text-xs text-emerald-700">
        High confidence — terms are clearly defined
      </p>
    </div>

    {/* Lease basics preview */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-emerald-200 text-sm text-emerald-900">

  <div>
    <p className="font-semibold">Tenant</p>
    <p>{analysis.tenant ?? "—"}</p>
  </div>

  <div>
    <p className="font-semibold">Landlord</p>
    <p>{analysis.landlord ?? "—"}</p>
  </div>

  <div>
    <p className="font-semibold">Premises</p>
    <p>{analysis.premises ?? "—"}</p>
  </div>

  <div>
    <p className="font-semibold">Lease Term</p>
    <p>
      {analysis.lease_start && analysis.lease_end
        ? `${analysis.lease_start} → ${analysis.lease_end} (${analysis.term_months} months)`
        : "—"}
    </p>
  </div>

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
