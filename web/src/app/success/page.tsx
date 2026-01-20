"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SuccessData = {
  audit: {
    avoidable_exposure?: number;
  } | null;
  signedUrl: string | null;
};

export default function SuccessPage() {
  const [data, setData] = useState<SuccessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORKER_URL}/audit/latest`,
          { credentials: "include" }
        );

        if (!res.ok) {
          console.warn("Failed to load latest audit");
          setData(null);
          return;
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Success page load error:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-2xl font-semibold">
          Finalizing your audit…
        </h1>
        <p className="mt-2 text-gray-600">
          This usually takes just a few seconds.
        </p>
      </main>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          ✅ Payment successful
        </h1>
        <p className="mt-2 text-gray-600">
          Your CAM / NNN lease audit has been generated and saved
          securely.
        </p>
      </div>

      {/* Checklist */}
      <div className="space-y-2 rounded border p-6">
        <ChecklistItem done label="Payment received" />
        <ChecklistItem done label="Audit generated" />
        <ChecklistItem done label="PDF secured" />
        <ChecklistItem
          done={!!data?.signedUrl}
          label="Email delivered"
        />
      </div>

      {/* Value Callout */}
      {data?.audit?.avoidable_exposure != null && (
        <div className="rounded bg-gray-50 p-6">
          <div className="text-sm text-gray-500">
            Estimated Avoidable Exposure
          </div>
          <div className="mt-1 text-3xl font-bold">
            ${data.audit.avoidable_exposure.toLocaleString()}
          </div>
          <div className="mt-1 text-sm text-gray-600">
            Based on CAM / NNN reconciliation risks identified in
            your lease.
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {data?.signedUrl && (
          <a
            href={data.signedUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
          >
            Download PDF
          </a>
        )}

        <Link
          href="/dashboard"
          className="rounded border px-5 py-2 hover:bg-gray-50"
        >
          Go to Dashboard
        </Link>

        <Link
          href="/app"
          className="rounded border px-5 py-2 hover:bg-gray-50"
        >
          Upload Another Lease
        </Link>
      </div>

      {/* Footer reassurance */}
      <div className="pt-4 text-sm text-gray-600">
        We’ve also emailed you a secure link to your audit for
        convenience. You can access this audit anytime from your
        dashboard.
      </div>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ChecklistItem({
  done,
  label,
}: {
  done: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
          done
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-gray-700"
        }`}
      >
        ✓
      </span>
      <span className={done ? "" : "text-gray-500"}>
        {label}
      </span>
    </div>
  );
}
