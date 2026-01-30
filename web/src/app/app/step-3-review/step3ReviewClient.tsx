"use client";

import { runAuditPipeline } from "@/app/app/step-2-analysis/analysis.service";
import { getSupabaseBrowser } from "@/app/_client/browser";
import { useEffect, useRef, useState } from "react";

type Analysis = {
  tenant: string | null;
  landlord: string | null;
  premises: string | null;
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;
  rent: {
    base_rent: number | null;
    frequency: "monthly" | "annual" | null;
    escalation_type: "fixed_percent" | "fixed_amount" | "cpi" | "none";
    escalation_value: number | null;
    escalation_interval: "annual" | null;
  };
  rent_schedule?: {
    year: number;
    annual_rent: number;
    monthly_rent: number;
  }[];
  cam_nnn?: {
    monthly_amount: number | null;
    annual_amount: number | null;
    total_exposure: number | null;
    is_uncapped: boolean;
    reconciliation: boolean;
    pro_rata: boolean;
    includes_capex: boolean;
    cam_cap_percent: number | null;
    escalation_exposure: number | null;
  };
  health?: {
    score: number;
    flags: {
      code: string;
      label: string;
      severity: "low" | "medium" | "high";
      recommendation: string;
      estimated_impact?: string;
    }[];
  };
  cam_total_avoidable_exposure?: number | null;
  exposure_range?: { low: number; high: number } | null;
  exposure_risk?: "low" | "medium" | "high" | null;
};
function formatDate(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

function formatMoney(value?: number | null) {
  if (value == null || isNaN(value)) return "—";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
function formatEscalation(
  type?: "fixed_percent" | "fixed_amount" | "cpi" | "none" | null,
  value?: number | null,
  interval?: "annual" | null
) {
  if (!type || type === "none") return "None";

  switch (type) {
    case "fixed_percent":
      return value != null
        ? `${value}% ${interval ?? ""}`.trim()
        : "Fixed %";

    case "fixed_amount":
      return value != null
        ? `${formatMoney(value)} ${interval ?? ""}`.trim()
        : "Fixed amount";

    case "cpi":
      return "CPI-based";

    default:
      return "—";
  }
}

/* ---------- STYLES ---------- */

const headerStyle: React.CSSProperties = {
  marginBottom: 12,
};

const sectionStyle: React.CSSProperties = {
  padding: 20,
  borderRadius: 10,
  border: "2px solid #16a34a",
  background: "#f0fdf4",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 8,
  border: "none",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: 14,
};
const exposureBoxStyle: React.CSSProperties = {
  marginTop: 20,
  padding: 20,
  borderRadius: 12,
  border: "2px solid #16a34a",
  background: "#f0fdf4",
};

/* ---------- PAGE ---------- */

export default function Step3ReviewClient() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [animatedExposure, setAnimatedExposure] =
    useState<number | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [totalAvoidableExposure, setTotalAvoidableExposure] =
    useState<number | null>(null);
  const [exposureRange, setExposureRange] =
    useState<{ low: number; high: number } | null>(null);
  const [exposureRiskLabel, setExposureRiskLabel] =
    useState<string | null>(null);

/* ---------- DERIVE EXPOSURE FROM ANALYSIS ---------- */
const resultsRef = useRef<HTMLDivElement | null>(null);

async function handleUploadAndAnalyze() {
  if (!file) return;

  setStatus("Preparing audit…");
  setAnalysis(null);

  const newAuditId = crypto.randomUUID();
  setAuditId(newAuditId);

  try {
    setStatus("Uploading lease…");

    const pipelineResult = await runAuditPipeline(file, newAuditId);

    setStatus("Finalizing analysis…");

    // ✅ Primary path — pipeline already returned analysis
if (pipelineResult && "analysis" in pipelineResult) {
  setAnalysis(pipelineResult.analysis);
} else {
  // 🔁 Fallback: fetch once directly from API (non-fatal)

      const res = await fetch(`/api/audits/${newAuditId}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.analysis) {
          setAnalysis(data.analysis);
        }
      }
    }

    setStatus("Analysis complete ✅");

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } catch (err: any) {
    console.error("Analyze failed:", err);
    setStatus(err?.message ?? "Unexpected error");
  }
}


/* ---------- DERIVE + ANIMATE EXPOSURE FROM ANALYSIS ---------- */

useEffect(() => {
  if (!analysis) {
    setTotalAvoidableExposure(null);
    setExposureRange(null);
    setExposureRiskLabel(null);
    setAnimatedExposure(null);
    return;
  }

  const exposure =
    typeof (analysis as any).cam_total_avoidable_exposure === "number"
      ? (analysis as any).cam_total_avoidable_exposure
      : typeof (analysis as any).avoidable_exposure === "number"
      ? (analysis as any).avoidable_exposure
      : null;

  setTotalAvoidableExposure(exposure);
  setExposureRange((analysis as any).exposure_range ?? null);
  setExposureRiskLabel(
    typeof (analysis as any).exposure_risk === "string"
      ? (analysis as any).exposure_risk.toLowerCase()
      : typeof (analysis as any).risk_level === "string"
      ? (analysis as any).risk_level.toLowerCase()
      : null
  );

  if (exposure == null) {
    setAnimatedExposure(null);
    return;
  }

  // 🔢 Animate exposure
  setAnimatedExposure(0);

  setTimeout(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);

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

async function handleCheckout() {
  if (isCheckingOut || !auditId) return;

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

  if (!res.ok) {
    const text = await res.text(); // ⚠️ worker may not return JSON
    console.error("Checkout create failed:", text);
    throw new Error(text || "Checkout creation failed");
  }

  const data = await res.json();

  if (!data?.url) {
    throw new Error("Missing checkout URL");
  }

  window.location.href = data.url;
} catch (err: any) {
  console.error("Checkout error:", err);
  setStatus(err?.message ?? "Checkout failed. Please try again.");
  setIsCheckingOut(false);
}

}

