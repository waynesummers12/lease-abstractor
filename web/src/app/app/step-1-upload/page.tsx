"use client";

import { useCallback, useState } from "react";

export default function UploadForm({
  onUpload,
  loading,
}: {
  onUpload: (file: File) => Promise<void>;
  loading: boolean;
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onUpload(e.dataTransfer.files[0]);
      }
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onUpload(e.target.files[0]);
      }
    },
    [onUpload]
  );

  return (
    <form
      className="relative"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="application/pdf"
        onChange={handleChange}
        disabled={loading}
      />
      <label
        htmlFor="file-upload"
        className="border-2 border-dashed border-white/70 bg-white/20 rounded-2xl py-16 text-white font-semibold shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:bg-white/30 hover:shadow-2xl"
      >
        {loading ? "Uploading..." : "Drag & drop your lease here, or click to select"}
      </label>
      {dragActive && (
        <div
          className="absolute inset-0"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </form>
  );
}