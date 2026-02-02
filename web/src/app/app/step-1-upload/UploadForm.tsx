// web/src/app/step-1-upload/UploadForm.tsx
"use client";

/**
 * CLIENT COMPONENT — SAVEONLEASE V1 (LOCKED)
 *
 * Rules:
 * - Client-side only
 * - No Supabase imports
 * - No Stripe imports
 * - No server-only logic
 * - No process.env (except NEXT_PUBLIC_*)
 *
 * Allowed:
 * - fetch("/api/...")
 * - useState / useEffect / useRouter
 * - window.location
 *
 * Violation = production regression
 */


type Props = {
  onUpload: (file: File) => void;
  loading: boolean;
};

export default function UploadForm({ onUpload, loading }: Props) {

/* ======================================================
   ⚠️  DO NOT MODIFY ABOVE THIS LINE
   ------------------------------------------------------
   - State
   - Hooks
   - Helpers
   - Types
   - Business wiring

   JSX RENDERING BEGINS BELOW
   ------------------------------------------------------
   From this point forward:
   ✔ Safe to edit markup, text, classes
   ❌ Do NOT add logic, hooks, or state
   ====================================================== */

   // ⬇️ JSX ONLY ⬇️
   
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



