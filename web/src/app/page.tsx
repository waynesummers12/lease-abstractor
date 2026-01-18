"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ---------- TYPES (MATCH BACKEND) ---------- */

type Analysis = {
  lease?: {
    startDate?: string;
    endDate?: string;
    squareFeet?: number;
  };
  rent?: {
    baseRent?: number;
    escalationType?: "fixed" | "percent" | "unknown";
    escalationValue?: number;
  };
  cam?: {
    isNNN: boolean;
    estimatedAnnualExposure?: number;
  };
  audit?: {
    auditRight: boolean;
    auditWindowMonths?: number;
  };
  healthScore?: {
    score: number;
    riskLevel: "low" | "medium" | "high";
    estimatedRecoverableDollars?: number;
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

  const analysis = result?.analysis;

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

      {analysis && (
        <>
          {/* ---------- LEASE SUMMARY ---------- */}
          <section style={cardStyle}>
            <h2 style={sectionTitle}>Lease Summary</h2>
            <Field label="Lease Start" value={analysis.lease?.startDate} />
            <Field label="Lease End" value={analysis.lease?.endDate} />
            <Field
              label="Square Feet"
              value={analysis.lease?.squareFeet}
            />
          </section>

          {/* ---------- RENT ---------- */}
          <section style={cardStyle}>
            <h2 style={sectionTitle}>Rent & Escalations</h2>

            <Field
              label="Base Rent"
              value={
                analysis.rent?.baseRent != null
                  ? `$${analysis.rent.baseRent.toLocaleString()}`
                  : null
              }
            />

            <Field
              label="Escalation Type"
              value={analysis.rent?.escalationType}
            />

            <Field
              label="Escalation Value"
              value={
                analysis.rent?.escalationValue != null
                  ? `${analysis.rent.escalationValue}${
                      analysis.rent.escalationType === "percent" ? "%" : ""
                    }`
                  : null
              }
            />
          </section>

          {/* ---------- CAM / NNN ---------- */}
          <section style={cardStyle}>
            <h2 style={sectionTitle}>CAM / NNN Exposure</h2>
            <Field
              label="Lease Type"
              value={analysis.cam?.isNNN ? "NNN" : "Non-NNN"}
            />
            <Field
              label="Estimated Annual Exposure"
              value={
                analysis.cam?.estimatedAnnualExposure != null
                  ? `$${analysis.cam.estimatedAnnualExposure.toLocaleString()}`
                  : null
              }
            />
          </section>

          {/* ---------- HEALTH ---------- */}
          {analysis.healthScore && (
            <section style={cardStyle}>
              <h2 style={sectionTitle}>Lease Health Score</h2>
              <Field
                label="Score"
                value={`${analysis.healthScore.score}/100`}
              />
              <Field
                label="Risk Level"
                value={analysis.healthScore.riskLevel}
              />
              <Field
                label="Estimated Recoverable Dollars"
                value={
                  analysis.healthScore.estimatedRecoverableDollars != null
                    ? `$${analysis.healthScore.estimatedRecoverableDollars.toLocaleString()}`
                    : null
                }
              />
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
