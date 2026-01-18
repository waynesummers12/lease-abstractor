"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ---------- TYPES ---------- */

type Rent = {
  base_rent: number | null;
  frequency: "monthly" | "annual" | null;
  escalation_type: "fixed_percent" | "fixed_amount" | "cpi" | "none";
  escalation_value: number | null;
  escalation_interval: "annual" | "other" | null;
};

type RentScheduleRow = {
  year: number;
  annual_rent: number;
  monthly_rent: number;
};

type LeaseHealth = {
  score: number;
  flags: {
    code: string;
    label: string;
    severity: "low" | "medium" | "high";
    recommendation: string;
    estimated_impact: string; // 👈 ADD
  }[];
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
  confidence: Record<string, string>;
  raw_preview: string;
};

/* ---------- PAGE ---------- */

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<LeaseResult | null>(null);

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

  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1 className="text-4xl font-bold mb-2">
  CAM & NNN Audit Risk — Estimated Tenant Recovery
</h1>

<p className="text-gray-600 mb-6 max-w-2xl">
  Upload your commercial lease to identify CAM / NNN overcharges, uncapped
  escalation risk, and <span className="font-medium">recoverable dollars</span> —
  before annual reconciliation deadlines expire.
</p>

<div className="flex items-center gap-4">
  <input
    type="file"
    accept="application/pdf"
    onChange={(e) => setFile(e.target.files?.[0] || null)}
    className="block text-sm text-gray-700"
  />

  <button
    onClick={handleUploadAndAnalyze}
    disabled={!file}
    className={`px-4 py-2 rounded-md text-sm font-medium transition
      ${
        file
          ? "bg-black text-white hover:bg-gray-800"
          : "bg-gray-200 text-gray-500 cursor-not-allowed"
      }`}
  >
    Analyze CAM / NNN Risk
  </button>
</div>

{status && (
  <p className="mt-4 text-sm text-gray-600">
    {status}
  </p>
)}

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
              value={
                result.term_months
                  ? `${result.term_months} months`
                  : null
              }
            />
          </section>

          {/* ---------- LEASE HEALTH ---------- */}
{result.health && (
  <section style={cardStyle}>
    <h2 style={sectionTitle}>CAM / NNN Risk Score</h2>

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
          <div>
            <strong>{flag.severity.toUpperCase()}</strong> — {flag.label}
          </div>
          <div style={{ marginLeft: 12, color: "#555" }}>
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


          {/* ---------- RENT & ESCALATION ---------- */}
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

            <Field
              label="Billing Frequency"
              value={result.rent.frequency}
            />

            <Field
              label="Escalation Type"
              value={
                result.rent.escalation_type === "none"
                  ? "None"
                  : result.rent.escalation_type
                      .replace("_", " ")
                      .toUpperCase()
              }
            />

            {result.rent.escalation_value !== null && (
              <Field
                label="Escalation Value"
                value={
                  result.rent.escalation_type === "fixed_percent"
                    ? `${result.rent.escalation_value}%`
                    : `$${result.rent.escalation_value.toLocaleString()}`
                }
              />
            )}

            {result.rent.escalation_interval && (
              <Field
                label="Escalation Interval"
                value={result.rent.escalation_interval}
              />
            )}
          </section>

          {/* ---------- RENT SCHEDULE ---------- */}
          {result.rent_schedule && result.rent_schedule.length > 0 && (
            <section style={cardStyle}>
              <h2 style={sectionTitle}>
                Rent Schedule (Year-by-Year)
              </h2>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 12,
                }}
              >
                <thead>
                  <tr>
                    <th style={th}>Year</th>
                    <th style={th}>Annual Rent</th>
                    <th style={th}>Monthly Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rent_schedule.map((row) => (
                    <tr key={row.year}>
                      <td style={td}>Year {row.year}</td>
                      <td style={td}>
                        ${row.annual_rent.toLocaleString()}
                      </td>
                      <td style={td}>
                        ${row.monthly_rent.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* ---------- RAW TEXT DEBUG ---------- */}
          <details style={{ marginTop: 24 }}>
            <summary style={{ cursor: "pointer" }}>
              Raw Extracted Text (Debug)
            </summary>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                marginTop: 12,
                background: "#f6f6f6",
                padding: 12,
                borderRadius: 6,
              }}
            >
              {result.raw_preview}
            </pre>
          </details>
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

const th: React.CSSProperties = {
  textAlign: "left",
  borderBottom: "1px solid #ccc",
  padding: 8,
};

const td: React.CSSProperties = {
  padding: 8,
  borderBottom: "1px solid #eee",
};


