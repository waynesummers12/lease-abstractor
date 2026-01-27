"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LeaseUploader({ onUploaded }: { onUploaded: (path: string) => void }) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const objectPath = `leases/${crypto.randomUUID()}.pdf`;

    const { error } = await supabase.storage
      .from("leases")
      .upload(objectPath, file, { contentType: "application/pdf" });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    onUploaded(objectPath);
  }

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
    </div>
  );
}
