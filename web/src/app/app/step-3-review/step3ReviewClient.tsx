"use client";

import { runAuditPipeline } from "@/app/app/step-2-analysis/analysis.service";
import { supabaseBrowser } from "@/lib/supabase/browser";
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
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const [totalAvoidableExposure, setTotalAvoidableExposure] =
    useState<number | null>(null);

  const [animatedExposure, setAnimatedExposure] =
    useState<number | null>(null);

  const [exposureRange, setExposureRange] =
    useState<{ low: number; high: number } | null>(null);

  const [exposureRiskLabel, setExposureRiskLabel] =
    useState<string | null>(null);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [auditId, setAuditId] = useState<string | null>(null);


/* ---------- DERIVE EXPOSURE FROM ANALYSIS ---------- */
const resultsRef = useRef<HTMLDivElement | null>(null);

async function handleUploadAndAnalyze() {
  if (!file) return;

  setStatus("Preparing audit…");
  setAnalysis(null);

  const newAuditId = crypto.randomUUID();
  setAuditId(newAuditId);

  try {
    /* ---------- 1. CREATE AUDIT ROW ---------- */
    const createRes = await fetch("/api/audits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auditId: newAuditId,
        status: "pending",
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json();
      throw new Error(err?.error ?? "Failed to create audit");
    }

    /* ---------- 2. RUN PIPELINE ---------- */
    setStatus("Uploading lease…");

    const res = await runAuditPipeline(
      file,
      supabaseBrowser,
      newAuditId
    );

    if (!res.success) {
      setStatus(res.error ?? "Analysis failed");
      return;
    }

    if (!res.analysis) {
      setStatus("Analysis failed");
      return;
    }

    setAnalysis(res.analysis.analysis);
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

    const { url } = await res.json();

    if (!url) {
      throw new Error("Missing checkout URL");
    }

    window.location.href = url;
  } catch (err) {
    console.error("Checkout error:", err);
    setStatus("Checkout failed. Please try again.");
    setIsCheckingOut(false);
  }
}

  return (
  <main
    style={{
      padding: 32,
      maxWidth: 960,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 24,
    }}
  >
    {/* ---------- HEADER ---------- */}
    <header style={{ marginBottom: 12 }}>
      <p
        style={{
          fontSize: 12,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#475569",
        }}
      >
        Lease audit
      </p>

      <h1 style={{ fontSize: 28, fontWeight: 800 }}>
        Upload your lease and uncover avoidable CAM / NNN spend
      </h1>

      <p style={{ color: "#475569" }}>
        We run your PDF through our audit pipeline and estimate what you could
        recover in the next 12 months.
      </p>
    </header>

    {/* ---------- UPLOAD ---------- */}
<section
  style={{
    padding: 20,
    borderRadius: 10,
    border: "2px solid #16a34a",
    background: "#f0fdf4",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  }}
>

  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <input
      type="file"
      accept=".pdf"
      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
    />

    <button
      onClick={handleUploadAndAnalyze}
      disabled={!file}
      style={{
        ...buttonStyle,
        background: !file ? "#cbd5e1" : "#0f172a",
        cursor: !file ? "not-allowed" : "pointer",
      }}
    >
      Upload & Analyze
    </button>
  </div>

  {status && (
    <p style={{ color: "#0f172a", fontWeight: 600 }}>{status}</p>
  )}
</section>

{/* ---------- RESULTS ---------- */}
{analysis ? (
  <section
    ref={resultsRef}
    style={{
      ...sectionStyle,
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 16,
    }}
  >
    {/* ===== GREEN EXPOSURE BOX ===== */}
    <div style={exposureBoxStyle}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>
        Estimated Avoidable Exposure (Next 12 Months)
      </div>

      {totalAvoidableExposure != null && (
        <>
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              marginTop: 6,
              color:
                exposureRiskLabel === "high"
                  ? "#991b1b"
                  : exposureRiskLabel === "medium"
                  ? "#92400e"
                  : "#166534",
            }}
          >
            💰 $
            {(animatedExposure ?? totalAvoidableExposure).toLocaleString()}
          </div>
{/* --- VALUE CONFIDENCE BADGE --- */}
<div
  style={{
    marginTop: 6,
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    borderRadius: 999,
    background: "#dcfce7", // soft green
    border: "1px solid #86efac",
    fontSize: 12,
    fontWeight: 600,
    color: "#166534",
  }}
>
  ✓ Calculated from CAM, NNN, escalation, and reconciliation clauses in your lease
</div>
{/* --- RISK-ADJUSTED CONFIDENCE METER --- */}
{exposureRiskLabel && (
  <div style={{ marginTop: 8 }}>
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: "#334155",
        marginBottom: 4,
      }}
    >
      Confidence reflects clarity of CAM, escalation, and reconciliation clauses
    </div>

    <div
      style={{
        width: "100%",
        height: 8,
        background: "#e5e7eb",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width:
            exposureRiskLabel === "low"
              ? "85%"
              : exposureRiskLabel === "medium"
              ? "60%"
              : "35%",
          background:
            exposureRiskLabel === "low"
              ? "#16a34a"
              : exposureRiskLabel === "medium"
              ? "#f59e0b"
              : "#dc2626",
          transition: "width 600ms ease",
        }}
      />
    </div>

    <div
      style={{
        marginTop: 4,
        fontSize: 11,
        color: "#475569",
      }}
    >
      {exposureRiskLabel === "low" && "High confidence — terms are clearly defined"}
      {exposureRiskLabel === "medium" &&
        "Moderate confidence — some assumptions applied"}
      {exposureRiskLabel === "high" &&
        "Lower confidence — recovery depends on interpretation"}
    </div>
  </div>
)}
          {exposureRange && (
            <p style={{ marginTop: 4, fontSize: 13, color: "#166534" }}>
              Estimated recovery range:{" "}
              <strong>
                ${exposureRange.low.toLocaleString()} – $
                {exposureRange.high.toLocaleString()}
              </strong>
            </p>
          )}

          {exposureRiskLabel && (
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                fontWeight: 700,
                color:
                  exposureRiskLabel === "high"
                    ? "#991b1b"
                    : exposureRiskLabel === "medium"
                    ? "#92400e"
                    : "#166534",
              }}
            >
              Risk level: {exposureRiskLabel.toUpperCase()}
            </div>
          )}
        </>
      )}

      <button
        onClick={handleCheckout}
        disabled={isCheckingOut}
        style={{
          ...buttonStyle,
          background: "#0f172a",
          cursor: isCheckingOut ? "not-allowed" : "pointer",
          marginTop: 10,
          alignSelf: "flex-start",
        }}
      >
        {isCheckingOut ? "Opening secure checkout…" : "Unlock full audit report →"}
      </button>
      <div
  style={{
    marginTop: 6,
    fontSize: 12,
    color: "#111827",
  }}
>
  Full audit report generated immediately after checkout. No subscription required.
</div>
    </div>

    {/* ---------- DETAILS ---------- */}
    <div style={{ display: "grid", gap: 12 }}>
      {/* Lease basics */}
      <div>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>
          Lease basics
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
            fontSize: 14,
          }}
        >
          <span>Tenant: {analysis.tenant ?? "—"}</span>
          <span>Landlord: {analysis.landlord ?? "—"}</span>
          <span>Premises: {analysis.premises ?? "—"}</span>
          <span>Lease start: {formatDate(analysis.lease_start)}</span>
          <span>Lease end: {formatDate(analysis.lease_end)}</span>
          <span>Term (months): {analysis.term_months ?? "—"}</span>
        </div>
      </div>

      {/* Rent */}
      <div>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Rent</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 6,
            fontSize: 14,
          }}
        >
          <span>Base rent: {formatMoney(analysis.rent?.base_rent)}</span>
          <span>Frequency: {analysis.rent?.frequency ?? "—"}</span>
          <span>
            Escalation:{" "}
            {formatEscalation(
              analysis.rent?.escalation_type,
              analysis.rent?.escalation_value
            )}
          </span>
        </div>
      </div>

      {/* CAM / NNN */}
      {analysis.cam_nnn && (
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            CAM / NNN
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 6,
              fontSize: 14,
            }}
          >
            <span>
              Monthly: {formatMoney(analysis.cam_nnn.monthly_amount)}
            </span>
            <span>
              Annual: {formatMoney(analysis.cam_nnn.annual_amount)}
            </span>
            <span>
              Total exposure:{" "}
              {formatMoney(analysis.cam_nnn.total_exposure)}
            </span>
            <span>
              {analysis.cam_nnn.is_uncapped ? "Uncapped" : "Capped"}
            </span>
            <span>
              {analysis.cam_nnn.reconciliation
                ? "Reconciliation"
                : "No reconciliation"}
            </span>
            <span>
              {analysis.cam_nnn.includes_capex
                ? "Includes capex"
                : "Excludes capex"}
            </span>
          </div>
        </div>
      )}
    </div>
  </section>
) : (
  <section
    style={{
      ...sectionStyle,
      border: "1px dashed #cbd5e1",
      color: "#475569",
    }}
  >
    No analysis yet. Upload a PDF to see your results.
  </section>
)}
  </main>
);
}
