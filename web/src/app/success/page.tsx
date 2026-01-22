"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auditId = searchParams.get("auditId");

  /* ---------------- POLLING ---------------- */

  useEffect(() => {
    if (!auditId) return;

    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/audits/${auditId}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setTimeout(poll, 4000);
          return;
        }

        const json = await res.json();

        // ✅ Analysis complete → redirect to final page
        if (json?.analysis) {
  setTimeout(() => {
    router.push("/product/app/dashboard");
  }, 800);
  return;
}

        // ⏳ Still processing → keep polling
        if (!cancelled) {
          setTimeout(poll, 3000);
        }
      } catch (err) {
        console.error("Success polling error:", err);
        if (!cancelled) {
          setTimeout(poll, 5000);
        }
      }
    }

    poll();

    return () => {
      cancelled = true;
    };
  }, [auditId, router]);

  /* ---------------- UI ---------------- */

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
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
