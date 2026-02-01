"use client";

import { useState } from "react";

interface UploadFormProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export default function UploadForm({
  onUpload,
  loading = false,
}: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);

  function handleClick() {
    if (!file || loading) return;
    onUpload(file);
  }

  return (
    <div className="w-full">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full rounded-lg border p-3"
      />

      <button
        onClick={handleClick}
        disabled={!file || loading}
        className="mt-4 w-full rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Uploading…" : "Start Audit"}
      </button>
    </div>
  );
}

