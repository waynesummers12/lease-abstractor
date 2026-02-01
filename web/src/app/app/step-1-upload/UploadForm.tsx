// web/src/app/step-1-upload/UploadForm.tsx
"use client";

type Props = {
  onUpload: (file: File) => void;
  loading: boolean;
};

export default function UploadForm({ onUpload, loading }: Props) {
  return (
    <label className="block cursor-pointer">
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        disabled={loading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onUpload(file); // ✅ THIS WAS MISSING / NOT FIRING
          }
        }}
      />

      <div className="flex items-center justify-center rounded-lg border border-dashed p-10 text-gray-500 hover:bg-gray-50">
        {loading ? "Uploading…" : "Choose Lease PDF"}
      </div>
    </label>
  );
}



