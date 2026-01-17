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

      {status && <p>{status}</p>}

      {result && (
        <>
          <h2>Lease Summary</h2>
          {Object.entries(result.confidence).map(([k, v]) => (
            <p key={k}>
              <strong>{k}</strong>: {result[k as keyof LeaseResult] ?? "—"} (
              {v})
            </p>
          ))}

          <details style={{ marginTop: 16 }}>
            <summary>Raw Extracted Text (Debug)</summary>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {result.raw_preview}
            </pre>
          </details>
        </>
      )}
    </main>
  );
}
