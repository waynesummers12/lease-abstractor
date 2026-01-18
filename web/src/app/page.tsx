"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ---------- TYPES ---------- */

type Rent = {
  base_rent: number | null;
  frequency: "monthly" | "annual" | null;
  escalation_type: "fixed_percent" | "fixed_amount" | "cpi" | "none";
  escalation_value: number | null;
  escalation_interval: "annual" | null;
};

type RentScheduleRow = {
  year: number;
  annual_rent: number;
  monthly_rent: number;
};

type LeaseHealthFlag = {
  code: string;
  label: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
  estimated_impact: string;
};

type LeaseHealth = {
  score: number;
  flags: LeaseHealthFlag[];
};

type LeaseResult = {
  tenant: string | null;
  landlord: string | null;
  premises: string | null;
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;
  rent: Rent;
  rent_schedule?: RentScheduleRow[];
  health?: LeaseHealth;
  raw_preview: string;
};

/* ---------- PAGE ---------- */

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<LeaseResult | null>(null);

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
        "x-lease-worker-key": "local-dev-secret",
      },
      body: JSON.stringify({ objectPath }),
    });

    if (!res.ok) {
      setStatus("Analysis failed");
      return;
    }

    const data = await res.json();
    setResult(data);
    setStatus("Analysis complete ✅");
  }

  /* ---------- STRIPE CHECKOUT ---------- */
  async function handleCheckout() {
    setStatus("Redirecting to secure checkout…");

    const res = await fetch("http://localhost:8000/checkout/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setStatus("Checkout failed");
      return;
    }

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      setStatus("Checkout unavailable");
    }
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
          <span className="font-medium">30–120 days</span> after receiving the
          annual CAM reconciliation to dispute overcharges.{" "}
          <span className="font-medium">
            Miss the window, and recovery rights are often waived.
          </span>
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

      {result && (
        <>
          {/* ---------- LEASE SUMMARY ---------- */}
          <section style={cardStyle}>
            <h2 style={sectionTitle}>Lease Summary</h2>
            <Field label="Tenant" value={result.tenant} />
            <Field label="Landlord" value={result.landlord} />
            <Field label="Premises" value={result.premises} />
            <Field label="Lease Start" value={result.lease_start} />
            <Field label="Lease End" value={result.lease_end} />
            <Field
              label="Term"
              value={result.term_months ? `${result.term_months} months` : null}
            />
          </section>

          {/* ---------- HEALTH ---------- */}
          {result.health && (
            <section style={cardStyle}>
              <h2 style={sectionTitle}>Lease Health Score</h2>

              <div style={{ marginBottom: 12 }}>
                <strong>Score:</strong>{" "}
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color:
                      result.health.score >= 80
                        ? "green"
                        : result.health.score >= 60
                        ? "orange"
                        : "red",
                  }}
                >
                  {result.health.score}
                </span>
                /100
              </div>

              <ul>
                {result.health.flags.map((flag) => (
                  <li key={flag.code} style={{ marginBottom: 14 }}>
                    <strong>{flag.severity.toUpperCase()}</strong> —{" "}
                    {flag.label}
                    <div style={{ marginLeft: 12 }}>
                      👉 {flag.recommendation}
                    </div>
                    <div style={{ marginLeft: 12, color: "#0a6" }}>
                      💰 {flag.estimated_impact}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ---------- PRIMARY CTA ---------- */}
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-900 mb-1">
              💰 You may be entitled to recover thousands in CAM / NNN
              overcharges
            </p>

            <p className="text-sm text-green-800 mb-3">
              We’ll generate a full audit-ready CAM report instantly.
            </p>

            <button
              onClick={handleCheckout}
              className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800"
            >
              Get My CAM Audit Summary — $149.99
            </button>
          </div>

          {/* ---------- RENT ---------- */}
          <section style={cardStyle}>
            <h2 style={sectionTitle}>Rent & Escalations</h2>

            <Field
              label="Base Rent"
              value={
                result.rent.base_rent
                  ? `$${result.rent.base_rent.toLocaleString()}`
                  : null
              }
            />
            <Field label="Billing Frequency" value={result.rent.frequency} />
            <Field
              label="Escalation Type"
              value={result.rent.escalation_type}
            />
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
  value: string | number | null;
}) {
  return (
    <div style={{ display: "flex", marginBottom: 8 }}>
      <strong style={{ width: 180 }}>{label}:</strong>
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

