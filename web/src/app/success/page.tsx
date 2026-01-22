"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ================= TYPES ================= */

type AuditResponse = {
  analysis?: {
    avoidable_exposure?: number;
  };
  signedUrl?: string | null;
};

/* ================= CONFIG ================= */

const POLL_INTERVAL_MS = 5000;
const MAX_WAIT_MS = 120000; // 2 min

/* ================= PAGE ================= */

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");

  const [ready, setReady] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  const progress = Math.min(
    Math.round((elapsed / MAX_WAIT_MS) * 100),
    95
  );

  useEffect(() => {
    if (!auditId) return;

    let pollTimer: NodeJS.Timeout;
    let tickTimer: NodeJS.Timeout;

    async function pollAudit() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/audits/${auditId}`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const json: AuditResponse = await res.json();

        if (json?.analysis && json?.signedUrl) {
          setReady(true);
          router.replace("/product/app/dashboard");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }

    pollAudit();
    pollTimer = setInterval(pollAudit, POLL_INTERVAL_MS);

    tickTimer = setInterval(() => {
      setElapsed((t) => {
        if (t + 1000 >= MAX_WAIT_MS) {
          setTimedOut(true);
          clearInterval(pollTimer);
          clearInterval(tickTimer);
        }
        return t + 1000;
      });
    }, 1000);

    return () => {
      clearInterval(pollTimer);
      clearInterval(tickTimer);
    };
  }, [auditId, router]);

  /* ================= UI ================= */

  return (
    <main className="mx-auto max-w-xl px-6 py-28 text-center">
      {!timedOut ? (
        <>
          <div className="mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto" />

          <h1 className="text-xl font-semibold">
            Finalizing your lease audit
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Reviewing CAM / NNN language and calculating exposure.
          </p>

          {/* Progress */}
          <div className="mt-6">
            <div className="h-2 w-full rounded bg-gray-200">
              <div
                className="h-2 rounded bg-black transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {progress}% complete
            </p>
          </div>

          {/* Manual escape hatch */}
          <button
            onClick={() => router.push("/product/app/dashboard")}
            className="mt-8 text-sm underline text-gray-600"
          >
            View latest audit
          </button>
        </>
      ) : (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-sm text-yellow-900">
          <p className="font-semibold">Still processing</p>
          <p className="mt-2">
            Your audit is taking longer than expected. You’ll receive an email
            once it’s ready.
          </p>
          <button
            onClick={() => router.push("/product/app/dashboard")}
            className="mt-4 underline"
          >
            Go to dashboard
          </button>
        </div>
      )}
    </main>
  );
}
