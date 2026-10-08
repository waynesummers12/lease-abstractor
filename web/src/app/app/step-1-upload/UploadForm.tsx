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
        aria-label="Choose a lease PDF"
        className="peer sr-only"
        disabled={loading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            e.target.value = "";
            onUpload(file); // ✅ THIS WAS MISSING / NOT FIRING
          }
        }}
      />

      <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50/50 px-5 py-8 text-center transition hover:border-emerald-600 hover:bg-emerald-50 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-emerald-700 sm:min-h-56">
        <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-800">↑</span>
        <span className="text-lg font-semibold text-slate-950">
          {loading ? "Uploading and analyzing your lease..." : "Choose a lease PDF"}
        </span>
        <span className="max-w-sm text-sm text-slate-600">
          {loading ? "Keep this page open. Your preview will load when the analysis is ready." : "Tap here to browse your files. PDF documents only."}
        </span>
      </div>
    </label>
  );
}
