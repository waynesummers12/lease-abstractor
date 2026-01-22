"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ================== TYPES ================== */

type AuditResponse = {
  analysis?: {
    avoidable_exposure?: number;
  };
  signedUrl?: string | null;
};

/* ================== CONFIG ================== */

const POLL_INTERVAL_MS = 5000;
const MAX_WAIT_MS = 2 * 60 * 1000; // 2 minutes

/* ================== PAGE ================== */

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");

  const [elapsed, setElapsed] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!auditId) return;

    let cancelled = false;
    let pollTimer: NodeJS.Timeout;
    let tickTimer: NodeJS.Timeout;

    async function checkAudit() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/audits/${auditId}`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const json: AuditResponse = await res.json();

        // ✅ READY → REDIRECT
        if (json?.analysis && json?.signedUrl) {
          router.replace("/product/app/dashboard");
        }
      } catch (err) {
        console.error("Audit polling error:", err);
      }
    }

    // First check immediately
    checkAudit();

    // Poll every N seconds
    pollTimer = setInterval(checkAudit, POLL_INTERVAL_MS);

    // Track elapsed time for timeout
    tickTimer = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1000;
        if (next >= MAX_WAIT_MS) {
          setTimedOut(true);
          clearInterval(pollTimer);
          clearInterval(tickTimer);
        }
        return next;
      });
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(pollTimer);
      clearInterval(tickTimer);
    };
  }, [auditId, router]);

  /* ================== UI ================== */

  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
      {!timedOut ? (
        <>
          {/* Spinner */}
          <div className="mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

          <h1 className="text-xl font-semibold">
            Finalizing your lease audit
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            We’re analyzing your lease and preparing your results.
            This usually takes under a minute.
          </p>

          <p className="mt-2 text-xs text-gray-500">
            You’ll be redirected automatically when it’s ready.
          </p>
        </>
      ) : (
        <>
          {/* Timeout fallback */}
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-sm text-yellow-900">
            <p className="font-semibold">Still working on it</p>

            <p className="mt-2">
              Your audit is taking longer than expected, but it’s still
              processing in the background.
            </p>

            <p className="mt-2">
              You’ll receive an email as soon as your audit is ready.
            </p>

            <p className="mt-3 text-xs text-yellow-800">
              If you need help, contact{" "}
              <a
                href="mailto:support@saveonlease.com"
                className="underline"
              >
                support@saveonlease.com
              </a>
            </p>
          </div>
        </>
      )}
    </main>
  );
}


