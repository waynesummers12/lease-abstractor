"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type LeaseResult = {
  tenant_name: string | null;
  landlord_name: string | null;
  premises: string | null;
  lease_start: string | null;
  lease_end: string | null;
  base_rent: number | null;
  term_months: number | null;
  confidence: string;
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<LeaseResult | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setStatus("Uploading lease…");
    setResult(null);

    const filePath = `${Date.now()}-${file.name}`;

    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("leases")
      .upload(filePath, file);

    if (uploadError) {
      setStatus(uploadError.message);
      return;
    }

    // 2. Trigger worker ingest
    setStatus("Analyzing lease…");

    const res = await fetch("/api/ingest/lease/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objectPath: filePath }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(data.error || "Failed to analyze lease");
      return;
    }

    setResult(data.result);
    setStatus("Analysis complete ✅");
  };

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">AI Lease Abstractor</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Upload & Analyze
      </button>

      <p className="text-sm text-gray-600">{status}</p>

      {result && (
        <div className="border rounded p-6 space-y-2">
          <h2 className="text-xl font-semibold">Lease Summary</h2>

          <Field label="Tenant" value={result.tenant_name} />
          <Field label="Landlord" value={result.landlord_name} />
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
    <div className="flex gap-2">
      <span className="font-medium w-32">{label}:</span>
      <span>{value ?? "—"}</span>
    </div>
  );
}


