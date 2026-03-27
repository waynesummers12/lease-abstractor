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
    <main className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

      <h1 className="text-xl font-semibold mb-2">
        Analyzing Your Lease
      </h1>

      <p className="text-gray-600 mb-4">
        We’re identifying CAM overcharges, admin fees, and hidden risks…
      </p>

      <div className="text-xs text-gray-500">
        This usually takes ~10 seconds
      </div>
    </main>
  );
}
