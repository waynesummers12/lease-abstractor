"use client";

import { useState } from "react";

interface UploadFormProps {
  onUploaded: (file: File) => void;
}

export default function UploadForm({ onUploaded }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file || loading) return;

    setLoading(true);
    try {
      onUploaded(file);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full rounded-lg border p-3"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="mt-4 w-full rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Uploading…" : "Start Audit"}
      </button>
    </div>
  );
}
