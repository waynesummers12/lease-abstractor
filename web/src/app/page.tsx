"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Rent = {
  base_rent: number | null;
  frequency: "monthly" | "annual" | null;
  escalation_type: "fixed_percent" | "fixed_amount" | "cpi" | "none";
  escalation_value: number | null;
  escalation_interval: "annual" | "other" | null;
};

type LeaseResult = {
  tenant: string | null;
  landlord: string | null;
  premises: string | null;
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;
  rent: Rent;
  confidence: Record<string, string>;
  raw_preview: string;
};

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
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>
        AI Lease Abstractor
      </h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br />
      <br />

      <button
        onClick={handleUploadAndAnalyze}
        disabled={!file}
        style={{
          padding: "10px 16px",
          background: "#000",
          color: "#fff",
          borderRadius: 6,
        }}
      >
        Upload & Analyze
      </button>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}

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

