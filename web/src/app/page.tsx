"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";


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


/* ---------- PAGE ---------- */

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);
const [latestAudit, setLatestAudit] = useState<Analysis | null>(null);

  const analysis =
  result?.success && result.analysis
    ? result.analysis
    : latestAudit;


  useEffect(() => {
  async function loadLatestAudit() {
    const { data, error } = await supabase
      .from("lease_audits")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Failed to load latest audit:", error.message);
      return;
    }

    if (data?.analysis) {
      setLatestAudit(data.analysis);
    }
  }

  loadLatestAudit();
}, []);
  /* ---------- UPLOAD + ANALYZE ---------- */
  async function handleUploadAndAnalyze() {
    if (!file) return;

    setStatus("Uploading lease…");
    setResult(null);

    const objectPath = `leases/${crypto.randomUUID()}.pdf`;

    const { error } = await supabase.storage
      .from("leases")
      .upload(objectPath, file, {
        contentType: "application/pdf",
      });

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Analyzing lease…");

    const res = await fetch("http://localhost:8000/ingest/lease/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": "local-dev-secret",
      },
      body: JSON.stringify({ objectPath }),
    });

    if (!res.ok) {
      setStatus("Analysis failed");
      return;
    }

    const data = (await res.json()) as ApiResult;
    setResult(data);
    setStatus("Analysis complete ✅");
  }

  /* ---------- STRIPE CHECKOUT ---------- */
  async function handleCheckout() {
  if (!analysis) return;

  // ✅ SAVE ANALYSIS BEFORE STRIPE REDIRECT
  sessionStorage.setItem(
    "latest_analysis",
    JSON.stringify(analysis)
  );

  setStatus("Redirecting to secure checkout…");

  const res = await fetch("http://localhost:8000/checkout/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    setStatus("Checkout failed");
    return;
  }

  const data = await res.json();
  if (data?.url) window.location.href = data.url;
}

  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      {/* ---------- HEADER ---------- */}
      <h1 className="text-4xl font-bold mb-2">
        CAM & NNN Audit Risk — Estimated Tenant Recovery
      </h1>

      <p className="text-gray-600 mb-2">
        Upload your commercial lease to identify CAM / NNN overcharges,
        escalation risk, and recoverable dollars — before reconciliation
        deadlines.
      </p>

      <p className="text-xs text-gray-500 mb-6">
        One-time audit summary · Typically recovers $10k–$50k+
      </p>

      {/* ---------- AUDIT URGENCY ---------- */}
      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-medium text-amber-900 mb-1">
          ⚠️ CAM / NNN Audit Deadline Risk
        </p>
        <p className="text-sm text-amber-800">
          Most commercial leases allow tenants{" "}
          <strong>30–120 days</strong> after receiving the annual CAM
          reconciliation to dispute overcharges.{" "}
          <strong>Miss the window, and recovery rights are often waived.</strong>
        </p>
      </div>

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
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-900 mb-3">
              💰 You may be entitled to recover thousands in CAM / NNN overcharges
            </p>

            <button
              onClick={handleCheckout}
              className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800"
            >
              Get My CAM Audit Summary — $149.99
            </button>
          </div>
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
