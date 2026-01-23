"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRef } from "react";

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


/* ---------- PAGE ---------- */

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);

  // Audit selection + history HOOKS
  const [selectedAudit, setSelectedAudit] = useState<AnalysisWithMeta | null>(null);
  const [auditHistory, setAuditHistory] = useState<AnalysisWithMeta[]>([]);
  const [hasAnalyzedInSession, setHasAnalyzedInSession] = useState(false);

    // ✅ ADD THIS HERE
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // ✅ SINGLE SOURCE OF TRUTH
  const analysis: Analysis | null = (() => {
  if (selectedAudit) return selectedAudit;
  if (result?.success && result.analysis) return result.analysis;
  return null;
})();


  const totalAvoidableExposure: number | null = (() => {
  if (!analysis?.health?.flags?.length) return null;

  let total = 0;

  for (const flag of analysis.health.flags) {
    const impact = flag.estimated_impact;
    if (!impact) continue;

    const value = parseDollarAmount(impact);
    if (typeof value === "number" && value > 0) {
      total += value;
    }
  }

  return total > 0 ? Math.round(total) : null;
})();

const exposureRiskLabel: "low" | "medium" | "high" | null = (() => {
  if (totalAvoidableExposure == null) return null;

  if (totalAvoidableExposure >= 25_000) return "high";
  if (totalAvoidableExposure >= 10_000) return "medium";
  return "low";
})();

const exposureRange: { low: number; high: number } | null = (() => {
  if (totalAvoidableExposure == null) return null;

  return {
    low: Math.round(totalAvoidableExposure * 0.7),
    high: Math.round(totalAvoidableExposure * 1.3),
  };
})();

/* ---------- UPLOAD + ANALYZE ---------- */
async function handleUploadAndAnalyze() {
  if (!file) return;

  setStatus("Uploading lease…");
  setResult(null);

  // 🔒 Generate auditId ONCE
  const newAuditId = crypto.randomUUID();
  setAuditId(newAuditId);

  // 🔒 PDF path MUST use auditId
  const objectPath = `leases/${newAuditId}.pdf`;

  const { error } = await supabase.storage
    .from("leases")
    .upload(objectPath, file, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    setStatus(error.message);
    return;
  }

  setStatus("Analyzing lease…");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORKER_URL}/ingest/lease/pdf`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
      },
      body: JSON.stringify({ objectPath }),
    }
  );

  if (!res.ok) {
    setStatus("Analysis failed");
    return;
  }

  const data = (await res.json()) as ApiResult;
  setResult(data);

  if (data.success && data.analysis) {
    const entry = {
      ...data.analysis,
      created_at: new Date().toISOString(),
    };

    const existing =
      JSON.parse(sessionStorage.getItem("audit_history") || "[]");

    const updated = [entry, ...existing];

    sessionStorage.setItem("audit_history", JSON.stringify(updated));
    setAuditHistory(updated);
  }

  setHasAnalyzedInSession(true);
  setStatus("Analysis complete ✅");

  setTimeout(() => {
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}


/* ---------- STRIPE CHECKOUT ---------- */
const [isCheckingOut, setIsCheckingOut] = useState(false);
const [auditId, setAuditId] = useState<string | null>(null);

async function handleCheckout() {
  if (!analysis || isCheckingOut) return;

  if (!auditId) {
    setStatus("Missing audit ID — please re-upload lease.");
    return;
  }

  setIsCheckingOut(true);
  setStatus("Redirecting to secure checkout…");

  try {
    sessionStorage.setItem(
      "latest_analysis",
      JSON.stringify(analysis)
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_URL}/checkout/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
        },
        body: JSON.stringify({ auditId }),
      }
    );

    if (!res.ok) {
      throw new Error("Checkout failed");
    }

    const data = await res.json();

    if (data?.url) {
  setIsCheckingOut(false); // ✅ safe cleanup before redirect
  window.location.href = data.url;
} else {
  throw new Error("Missing checkout URL");
}

  } catch (err) {
    console.error(err);
    setStatus("Checkout failed. Please try again.");
    setIsCheckingOut(false);
  }
}

return (
  <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>

    {totalAvoidableExposure != null && (
  <>
    {/* Scroll anchor (accounts for sticky header) */}
    <div
      ref={resultsRef}
      style={{ scrollMarginTop: 120 }}
    />

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

    <div
      style={{
        fontSize: 34,
        fontWeight: 900,
        marginTop: 4,
        letterSpacing: -0.5,
        color:
          exposureRiskLabel === "high"
            ? "#991b1b"
            : exposureRiskLabel === "medium"
            ? "#92400e"
            : "#166534",
      }}
    >
  💰 ${totalAvoidableExposure.toLocaleString()}
</div>
    <p
  style={{
    marginTop: 6,
    marginBottom: 8,
    fontSize: 14,
    color: "#14532d",
    fontWeight: 500,
  }}
>
  Based on your lease terms, you may be able to recover up to{" "}
  <strong>${totalAvoidableExposure.toLocaleString()}</strong> in CAM / NNN
  overcharges over the next 12 months.
</p>

{exposureRange && (
  <div
    style={{
      marginTop: 4,
      marginBottom: 8,
      fontSize: 13,
      color: "#166534",
    }}
  >
    Estimated recovery range:{" "}
    <strong>
      ${exposureRange.low.toLocaleString()} – $
      {exposureRange.high.toLocaleString()}
    </strong>
  </div>
)}

    {exposureRiskLabel && (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      gap: 6,
      marginTop: 8,
      padding: "8px 10px",
      borderRadius: 8,
      background:
        exposureRiskLabel === "high"
          ? "#fee2e2"
          : exposureRiskLabel === "medium"
          ? "#fef3c7"
          : "#dcfce7",
      color:
        exposureRiskLabel === "high"
          ? "#991b1b"
          : exposureRiskLabel === "medium"
          ? "#92400e"
          : "#166534",
      fontSize: 13,
      fontWeight: 500,
    }}
  >
    <div style={{ fontWeight: 700 }}>
      Risk level: {exposureRiskLabel.toUpperCase()}
    </div>

    {exposureRiskLabel === "high" && (
      <div>
        Significant CAM / NNN exposure detected. Immediate review is recommended
        before reconciliation or audit deadlines expire.
      </div>
    )}

    {exposureRiskLabel === "medium" && (
      <div>
        Material overcharge risk identified. A focused audit could recover
        meaningful dollars.
      </div>
    )}

    {exposureRiskLabel === "low" && (
      <div>
        Lower-risk findings, but review may still yield savings depending on lease
        interpretation.
      </div>
    )}

    <div style={{ marginTop: 4, fontSize: 12, opacity: 0.9 }}>
      ⏱️ Most commercial leases require CAM / NNN disputes within{" "}
      <strong>30–120 days</strong> of reconciliation. Missing this window often
      waives recovery rights.
    </div>
  </div>
)}
<div
  style={{
    marginTop: 12,
    paddingTop: 10,
    borderTop: "1px dashed #bbf7d0",
    fontSize: 12,
    color: "#166534",
    lineHeight: 1.5,
  }}
>
  <strong>How this estimate was calculated:</strong>
  <ul style={{ marginTop: 6, paddingLeft: 18 }}>
    <li>
      CAM / NNN charges flagged as <strong>uncapped, ambiguous, or escalating</strong>
    </li>
    <li>
      Conservative dollar ranges extracted from lease language (not worst-case)
    </li>
    <li>
      Annualized impact based on current rent and reconciliation rules
    </li>
  </ul>
  <div style={{ marginTop: 6, fontStyle: "italic" }}>
    Final recovery depends on lease interpretation, audit rights, and timing.
  </div>
</div>

    <div style={{ fontSize: 12, marginTop: 6, color: "#166534" }}>
      Conservative estimate based on identified CAM / NNN risks
    </div>
  </section>
)}
      
      {/* ---------- AUDIT HISTORY ---------- */}
      {hasAnalyzedInSession && auditHistory.length > 0 && (
        <section
          style={{
            marginBottom: 24,
            padding: 16,
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            background: "#fafafa",
          }}
        >
          <h2 style={{ fontWeight: 600, marginBottom: 12 }}>
            Previous CAM Audits
          </h2>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {auditHistory.map((audit, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setSelectedAudit(audit)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: 6,
                    border:
                      analysis === audit
                        ? "2px solid #000"
                        : "1px solid #ddd",
                    background:
                      analysis === audit ? "#000" : "#fff",
                    color:
                      analysis === audit ? "#fff" : "#000",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>{audit.tenant ?? "Unknown Tenant"}</span>

                    {idx === 0 && (
                      <span
                        style={{
                          marginLeft: 8,
                          padding: "2px 6px",
                          fontSize: 10,
                          borderRadius: 4,
                          background: "#e6f4ea",
                          color: "#137333",
                          fontWeight: 600,
                        }}
                      >
                        Most recent
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    Lease ends {audit.lease_end ?? "—"}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      opacity: 0.55,
                      marginTop: 2,
                    }}
                  >
                    Created{" "}
                    {audit.created_at
                      ? new Date(
                          audit.created_at
                        ).toLocaleDateString()
                      : "—"}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- HERO / PAGE INTRO ---------- */}
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          CAM & NNN Audit Risk — Estimated Tenant Recovery
        </h1>

        <p className="mx-auto max-w-2xl text-gray-600">
          Upload your commercial lease to identify CAM / NNN
          overcharges, escalation risk, and recoverable
          dollars — before reconciliation deadlines.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          One-time audit summary · Typically recovers
          $10k–$50k+
        </p>
      </section>

      {/* ---------- URGENCY / CALLOUT ---------- */}
      <section className="mb-10 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left">
        <p className="mb-2 font-medium text-amber-900">
          ⚠️ CAM / NNN Audit Deadline Risk
        </p>

        <p className="text-sm text-amber-800">
          Most commercial leases allow tenants{" "}
          <strong>30–120 days</strong> after receiving the
          annual CAM reconciliation to dispute overcharges.
          <strong>
            {" "}
            Miss the window, and recovery rights are often
            waived.
          </strong>
        </p>
      </section>

      {/* ---------- UPLOAD ---------- */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleUploadAndAnalyze}
          disabled={!file}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            file
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Analyze CAM / NNN Risk
        </button>
      </div>

      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}

      {analysis !== null && (
        <>
          {/* ---------- LEASE SUMMARY ---------- */}
          <section style={cardStyle}>
  <h2 style={sectionTitle}>Lease Summary</h2>
  <Field label="Tenant" value={analysis.tenant} />
  <Field label="Landlord" value={analysis.landlord} />
  <Field label="Premises" value={analysis.premises} />
  <Field label="Lease Start" value={analysis.lease_start} />
  <Field label="Lease End" value={analysis.lease_end} />
  <Field
    label="Term"
    value={analysis.term_months ? `${analysis.term_months} months` : null}
  />
</section>

          {/* ---------- RENT ---------- */}
          <section style={cardStyle}>
            <h2 style={sectionTitle}>Rent & Escalations</h2>

            <Field
  label="Base Rent"
  value={
    analysis.rent.base_rent != null
      ? `$${analysis.rent.base_rent.toLocaleString()}`
      : null
  }
/>

<Field label="Billing Frequency" value={analysis.rent.frequency} />

<Field label="Escalation Type" value={analysis.rent.escalation_type} />

<Field
  label="Escalation Value"
  value={
    analysis.rent.escalation_value != null
      ? `$${analysis.rent.escalation_value.toLocaleString()}`
      : null
  }
/>

          </section>

          {/* ---------- CAM / NNN ---------- */}
          <section style={cardStyle}>
            <h2 style={sectionTitle}>CAM / NNN Exposure</h2>
            <Field
  label="Monthly CAM / NNN"
  value={
    analysis.cam_nnn?.monthly_amount != null
      ? `$${analysis.cam_nnn.monthly_amount.toLocaleString()}`
      : null
  }
/>

<Field
  label="Annual CAM / NNN"
  value={
    analysis.cam_nnn?.annual_amount != null
      ? `$${analysis.cam_nnn.annual_amount.toLocaleString()}`
      : null
  }
/>

<Field
  label="Uncapped Charges"
  value={analysis.cam_nnn?.is_uncapped ? "Yes" : "No"}
/>

          </section>

          {/* ---------- HEALTH ---------- */}
          {analysis.health && (
  <section style={cardStyle}>
    <h2 style={sectionTitle}>Lease Health Score</h2>

    <div style={{ marginBottom: 12 }}>
      <strong>Score:</strong>{" "}
      <span
        style={{
          fontSize: 24,
          fontWeight: 700,
          color:
            analysis.health.score >= 80
              ? "green"
              : analysis.health.score >= 60
              ? "orange"
              : "red",
        }}
      >
        {analysis.health.score}
      </span>
      /100
    </div>

    <ul>
      {analysis.health.flags.map((flag) => (
        <li key={flag.code} style={{ marginBottom: 14 }}>
          <strong>{flag.severity.toUpperCase()}</strong> — {flag.label}
          <div style={{ marginLeft: 12 }}>👉 {flag.recommendation}</div>
          {flag.estimated_impact && (
            <div style={{ marginLeft: 12, color: "#0a6" }}>
              💰 {flag.estimated_impact}
            </div>
          )}
        </li>
      ))}
    </ul>
  </section>
)}

{/* ---------- CTA ---------- */}
<section
  className="mt-6 rounded-lg border p-4"
  style={{
    borderColor:
      exposureRiskLabel === "high"
        ? "#fecaca"
        : exposureRiskLabel === "medium"
        ? "#fde68a"
        : "#bbf7d0",
    background:
      exposureRiskLabel === "high"
        ? "#fef2f2"
        : exposureRiskLabel === "medium"
        ? "#fffbeb"
        : "#f0fdf4",
  }}
>
  <p
    className="text-sm font-medium mb-2"
    style={{
      color:
        exposureRiskLabel === "high"
          ? "#7f1d1d"
          : exposureRiskLabel === "medium"
          ? "#78350f"
          : "#14532d",
    }}
  >
    {exposureRiskLabel === "high" &&
      "🚨 High-risk CAM / NNN exposure detected — timing matters"}
    {exposureRiskLabel === "medium" &&
      "⚠️ Material CAM / NNN overcharge risk identified"}
    {exposureRiskLabel === "low" &&
      "✅ Potential CAM / NNN savings identified"}
  </p>

  <p
    style={{
      fontSize: 13,
      marginBottom: 12,
      color:
        exposureRiskLabel === "high"
          ? "#7f1d1d"
          : exposureRiskLabel === "medium"
          ? "#78350f"
          : "#14532d",
    }}
  >
    {exposureRiskLabel === "high" &&
      "Most leases impose strict audit windows. Missing them can permanently waive recovery rights."}
    {exposureRiskLabel === "medium" &&
      "A focused audit often recovers meaningful overcharges with limited effort."}
    {exposureRiskLabel === "low" &&
      "Even lower-risk leases frequently contain administrative or escalation errors."}
  </p>

  <button
  onClick={handleCheckout}
  disabled={!analysis}
  className={`px-4 py-2 rounded-md text-sm font-medium ${
    analysis
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  Get My CAM Audit Summary — $249.99
</button>


  <div style={{ marginTop: 12, fontSize: 12, color: "#374151" }}>
    <strong>Why $249.99?</strong>

    <ul style={{ paddingLeft: 16, marginTop: 6, marginBottom: 8 }}>
      <li>
        Comparable CAM / NNN audits typically cost{" "}
        <strong>$1,500–$5,000+</strong>
      </li>
      <li>
        Tenants frequently recover{" "}
        <strong>$5,000–$50,000+</strong> from overcharges
      </li>
      <li>
        One missed audit window can lock in years of unrecoverable costs
      </li>
    </ul>

    <div style={{ fontStyle: "italic", color: "#4b5563" }}>
      One-time, tenant-first audit designed to pay for itself many times over.
    </div>
  </div>
</section>
        </>
      )}

  </main>
);
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

const sectionTitle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 12,
};