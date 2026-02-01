"use client";

type Props = {
  onUpload: (file: File) => void;
  loading: boolean;
};

export default function UploadForm({ onUpload, loading }: Props) {
  return (
    <input
      type="file"
      accept="application/pdf"
      disabled={loading}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onUpload(file);
      }}
    />
  );
}


