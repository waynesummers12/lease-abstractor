"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setStatus("Uploading...");

    const filePath = `leases/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("leases")
      .upload(filePath, file);

    if (uploadError) {
      setStatus(uploadError.message);
      return;
    }

    const { error: dbError } = await supabase.from("leases").insert({
      file_path: filePath,
      original_filename: file.name,
    });

    if (dbError) {
      setStatus(dbError.message);
      return;
    }

    setStatus("Upload successful ✅");
  };

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">AI Lease Abstractor</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Upload Lease
      </button>

      <p>{status}</p>
    </main>
  );
}

