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

import { Suspense } from "react";
import Step3ReviewClient from "./Step3ReviewClient";

export default function Step3ReviewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Step3ReviewClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16" role="status">
      <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

      <h1 className="mb-2 text-2xl font-semibold">
        Preparing your lease preview
      </h1>

      <p className="text-gray-600 mb-4">
        We’re estimating potential savings and identifying key risk areas before your full audit…
      </p>

      <div className="text-xs text-gray-500">
        We’ll offer a retry and support path if the preview takes longer than a minute.
      </div>
    </main>
  );
}
