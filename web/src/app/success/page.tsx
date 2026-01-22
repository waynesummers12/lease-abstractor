"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type AuditResponse = {
  analysis?: {
    avoidable_exposure?: number;
    risk_level?: "LOW" | "MEDIUM" | "HIGH";
    flagged_sections?: {
      section: string;
      title: string;
    }[];
    health_score?: number;
  };
  signedUrl?: string | null;
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auditId) return;

    let cancelled = false;
    let interval: NodeJS.Timeout;

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
          return;
        }
      } catch (err) {
        console.error("Audit polling error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    // First check immediately
    checkAudit();

    // Then poll every 5 seconds
    interval = setInterval(checkAudit, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [auditId, router]);

  /* ---------------- UI ---------------- */

  return (
    <main className="mx-auto max-w-xl px-6 py-24">
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-sm text-yellow-900">
        <p className="font-semibold">Analysis in progress</p>
        <p className="mt-2">
          We’re finalizing your lease audit. This usually completes within a few
          minutes.
        </p>
        <p className="mt-2">
          You can safely leave this page — you’ll be redirected automatically
          once your results are ready.
        </p>
      </div>
    </main>
  );
}

