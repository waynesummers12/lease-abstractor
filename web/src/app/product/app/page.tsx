"use client";

import { runAuditPipeline } from "@/lib/audit/runAuditPipeline";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useState, useRef, useEffect } from "react";

/* ---------- TYPES (MATCH BACKEND) ---------- */

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
};

type ApiResult = {
  success: boolean;
  analysis?: Analysis;
};

type AnalysisWithMeta = Analysis & {
  created_at: string;
};

function parseDollarAmount(value: string): number | null {
  if (!value) return null;

  // Normalize
  const text = value.toLowerCase().replace(/,/g, "");

  // Detect monthly
  const isMonthly = text.includes("month");

  // Extract numbers like 5000, 5k, 15k
  const matches = text.match(/(\d+(\.\d+)?)(k)?/g);
  if (!matches || matches.length === 0) return null;

  // Take the LOW end (conservative)
  const raw = matches[0];
  let amount = parseFloat(raw.replace("k", ""));
  if (raw.includes("k")) amount *= 1000;

  if (isNaN(amount)) return null;

  return isMonthly ? amount * 12 : amount;
}
/* ---------- UI HELPERS ---------- */

function Field({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div style={{ display: "flex", marginBottom: 8 }}>
      <strong style={{ width: 220 }}>{label}:</strong>
      <span>{value ?? "—"}</span>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  marginTop: 24,
  padding: 20,
  border: "1px solid #ddd",
  borderRadius: 8,
};
/* ---------- PAGE ---------- */

export default function HomePage() {
  console.log("🔥 HomePage component is executing");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);

  // Audit selection + history hooks
  const [selectedAudit, setSelectedAudit] =
    useState<AnalysisWithMeta | null>(null);
  const [auditHistory, setAuditHistory] =
    useState<AnalysisWithMeta[]>([]);
  const [hasAnalyzedInSession, setHasAnalyzedInSession] =
    useState(false);

  // 🔥 Yellow box state
  const [totalAvoidableExposure, setTotalAvoidableExposure] =
    useState<number | null>(null);
  const [exposureRange, setExposureRange] =
    useState<{ low: number; high: number } | null>(null);
  const [exposureRiskLabel, setExposureRiskLabel] =
    useState<string | null>(null);

  // Stripe
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [auditId, setAuditId] = useState<string | null>(null);

  // Scroll anchor
  const resultsRef = useRef<HTMLDivElement | null>(null);

  /* ---------- DERIVED ANALYSIS ---------- */
  const analysis: Analysis | null =
    selectedAudit ??
    (result?.success ? result.analysis ?? null : null);

  /* ---------- UPLOAD + ANALYZE ---------- */
  async function handleUploadAndAnalyze() {
    if (!file) return;

    setStatus("Uploading lease…");
    setResult(null);

    try {
      const res = await runAuditPipeline(file, supabaseBrowser);

      if (!res.success || !res.analysis) {
        setStatus(res.error ?? "Analysis failed");
        return;
      }

      if (!res.auditId) {
        setStatus("Audit creation failed — missing audit ID.");
        return;
      }

      setAuditId(res.auditId);
      setResult({ success: true, analysis: res.analysis });
      setHasAnalyzedInSession(true);
      setStatus("Analysis complete ✅");
    } catch (err: any) {
      console.error("Analyze failed:", err);
      setStatus(err?.message ?? "Unexpected error");
    }

  /* ---------- POST-ANALYSIS EFFECT ---------- */
  useEffect(() => {
    if (!analysis) return;

    setTotalAvoidableExposure(
      (analysis as any).avoidable_exposure ?? null
    );

    setExposureRange(
      (analysis as any).avoidable_exposure_range
        ? {
            low: (analysis as any).avoidable_exposure_range.low,
            high: (analysis as any).avoidable_exposure_range.high,
          }
        : null
    );

    setExposureRiskLabel(
      (analysis as any).risk_level?.toLowerCase() ?? null
    );

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [analysis]);

  /* ---------- STRIPE CHECKOUT ---------- */
  async function handleCheckout() {
    if (isCheckingOut) return;

    if (!auditId) {
      setStatus("Missing audit ID — please re-upload lease.");
      return;
    }

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

      if (!res.ok) throw new Error(await res.text());

      const { url } = await res.json();
      if (!url) throw new Error("Missing Stripe checkout URL");

      window.location.href = url;
    } catch (err) {
      console.error("❌ Checkout error:", err);
      setStatus("Checkout failed. Please try again.");
      setIsCheckingOut(false);
    }
  }

  /* ---------- RENDER ---------- */
  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <div className="p-4 text-red-600 font-bold">
        UPLOAD SECTION SHOULD BE HERE
      </div>
<div
        style={{
          marginBottom: 24,
          padding: 20,
          border: "1px dashed #ccc",
          borderRadius: 8,
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          Upload Your Lease
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          style={{ marginBottom: 12 }}
        />

        <br />

        <button
          onClick={handleUploadAndAnalyze}
          disabled={!file}
          style={{
            padding: "10px 16px",
            background: file ? "#2563eb" : "#94a3b8",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            cursor: file ? "pointer" : "not-allowed",
          }}
        >
          Upload & Analyze Lease
        </button>

        {status && (
          <p style={{ marginTop: 12, fontStyle: "italic" }}>{status}</p>
        )}
      </div>

      {totalAvoidableExposure != null && (
        <section
          style={{
            marginBottom: 24,
            padding: 20,
            borderRadius: 10,
            border: "2px solid #16a34a",
            background: "#f0fdf4",
          }}
        >
          <div ref={resultsRef} />

          <div style={{ fontSize: 14, fontWeight: 600, color: "#166534" }}>
            Estimated Avoidable Exposure (Next 12 Months)
          </div>

          <div style={{ fontSize: 34, fontWeight: 900 }}>
            💰 ${totalAvoidableExposure.toLocaleString()}
          </div>

          <p style={{ marginTop: 6 }}>
            Based on your lease terms, you may be able to recover up to{" "}
            <strong>
              ${totalAvoidableExposure.toLocaleString()}
            </strong>{" "}
            in CAM / NNN.
          </p>
        </section>
      )}
    </div>
  );
}

return (
  <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
    {totalAvoidableExposure != null && (
      <section
        style={{
          marginBottom: 24,
          padding: 20,
          borderRadius: 10,
          border: "2px solid #16a34a",
          background: "#f0fdf4",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: "#166534" }}>
          Estimated Avoidable Exposure (Next 12 Months)
        </div>

        <div style={{ fontSize: 34, fontWeight: 900 }}>
          💰 ${totalAvoidableExposure.toLocaleString()}
        </div>

        <p style={{ marginTop: 6 }}>
          Based on your lease terms, you may be able to recover up to{" "}
          <strong>${totalAvoidableExposure.toLocaleString()}</strong> in CAM / NNN.
        </p>
      </section>
    )}
  </main>
);
}