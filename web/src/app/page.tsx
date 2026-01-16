"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type LeaseResult = {
  tenant: string | null;
  landlord: string | null;
  premises: string | null;
  lease_start: string | null;
  lease_end: string | null;
  base_rent: number | null;
  term_months: number | null;
  confidence: string;
};

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<LeaseResult | null>(null);

  async function handleUploadAndAnalyze() {
    if (!file) return;

    setStatus("Uploading lease…");
    setResult(null);

    const objectPath = `leases/${crypto.randomUUID()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("leases")
      .upload(objectPath, file, {
        contentType: "application/pdf",
      });

    if (uploadError) {
      setStatus(uploadError.message);
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

    const data = await res.json();

    if (!res.ok) {
      setStatus(data?.error || "Lease analysis failed");
      return;
    }

    setResult(data);
    setStatus("Analysis complete ✅");
  }

  return (
    <main style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>
        AI Lease Abstractor
      </h1>

      <div style={{ marginTop: 24 }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={handleUploadAndAnalyze}
          disabled={!file}
          style={{
            padding: "10px 16px",
            background: "#000",
            color: "#fff",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Upload & Analyze
        </button>
      </div>

      {status && (
        <p style={{ marginTop: 16, color: "#555" }}>{status}</p>
      )}

      {result && (
        <div
          style={{
            marginTop: 32,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fafafa",
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
            Lease Summary
          </h2>

          <Field label="Tenant" value={result.tenant} />
          <Field label="Landlord" value={result.landlord} />
          <Field label="Premises" value={result.premises} />
          <Field label="Lease Start" value={result.lease_start} />
          <Field label="Lease End" value={result.lease_end} />
          <Field
            label="Base Rent"
            value={
              result.base_rent
                ? `$${result.base_rent.toLocaleString()} / month`
                : null
            }
          />
          <Field
            label="Term"
            value={
              result.term_months
                ? `${result.term_months} months`
                : null
            }
          />
          <Field label="Confidence" value={result.confidence} />
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div style={{ display: "flex", marginBottom: 6 }}>
      <strong style={{ width: 140 }}>{label}:</strong>
      <span>{value ?? "—"}</span>
    </div>
  );
}
