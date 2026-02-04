"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Analysis = {
  tenant: string | null;
  landlord: string | null;
  premises: string | null;
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;

  cam_total_avoidable_exposure?: number | null;

  teaser_summary?: {
    estimated_avoidable_range?: {
      low: number;
      high: number;
    };
    headline_flags?: string[];
  } | null;

  confidence?: number | null; // UI-only
};

function midpoint(range?: { low: number; high: number } | null) {
  if (!range) return null;
  return Math.round((range.low + range.high) / 2);
  }

export default function Step3ReviewClient() {
  const searchParams = useSearchParams();
  const auditId = searchParams.get("auditId");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    if (!auditId) {
      setError("Missing auditId");
      setLoading(false);
      return;
    }

    async function poll() {
      try {
        const res = await fetch(`/api/audits/${auditId}`, {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data?.analysis) {
          setAnalysis(data.analysis);
          setLoading(false);
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        // swallow
      }
    }

    poll();
    pollRef.current = window.setInterval(poll, 2000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [auditId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-gray-600">Analysis in progress…</p>
      </main>
    );
  }

  if (error || !analysis) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-red-600">{error ?? "Failed to load analysis"}</p>
      </main>
    );
  }

  const confidence =
    typeof analysis.confidence === "number"
      ? Math.min(Math.max(analysis.confidence, 0), 100)
      : 80;

      const range = analysis.teaser_summary?.estimated_avoidable_range;

const exposure =
  range
    ? midpoint(range)
    : analysis.cam_total_avoidable_exposure ?? null;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Lease Audit Review</h1>
        <p className="mt-2 text-gray-600">
          Initial CAM / NNN risk assessment based on your lease.
        </p>
      </div>

      {/* ---------- GREEN SUMMARY BOX ---------- */}
{exposure != null && (
  <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-6 space-y-5">
    {/* Header */}
    <div className="flex items-center gap-3">
      <span className="text-2xl">💰</span>
      <div>
        <p className="text-sm text-emerald-700 font-medium">
          Estimated Avoidable Exposure (Next 12 Months)
        </p>
        <p className="text-4xl font-extrabold text-emerald-900">
          ${exposure.toLocaleString()}
        </p>
        {analysis.teaser_summary?.estimated_avoidable_range && (
          <p className="mt-1 text-sm text-emerald-800">
            Estimated recovery range:{" "}
            <span className="font-semibold">
              ${analysis.teaser_summary.estimated_avoidable_range.low.toLocaleString()}
              {" – "}
              ${analysis.teaser_summary.estimated_avoidable_range.high.toLocaleString()}
            </span>
          </p>
        )}
      </div>
    </div>

    {/* Confidence / badge */}
    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm w-fit">
      ✓ Calculated from CAM, NNN, escalation, and reconciliation clauses
    </div>

    <div>
      <p className="text-sm text-emerald-800 mb-2">
        Confidence reflects clarity of CAM, escalation, and reconciliation clauses
      </p>

      <div className="space-y-1">
        <div className="h-2 w-full rounded-full bg-emerald-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${confidence}%` }}
          />
        </div>

        <p className="text-xs text-emerald-700">
          {confidence >= 75
            ? "High confidence — terms are clearly defined"
            : confidence >= 40
            ? "Moderate confidence — some ambiguity detected"
            : "Lower confidence — lease language is unclear"}
        </p>
      </div>
    </div>

    {/* How calculated */}
    <div className="rounded-lg bg-white/60 p-4 border border-emerald-200">
      <p className="text-sm font-semibold text-emerald-900 mb-2">
        How this estimate was calculated
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm text-emerald-900">
        <li>CAM / NNN charges flagged as <span className="font-semibold">uncapped, ambiguous, or escalating</span></li>
        <li>Conservative dollar ranges inferred from lease language (not worst-case)</li>
        <li>Annualized impact based on current rent and reconciliation rules</li>
      </ul>

      <p className="mt-3 text-xs text-emerald-700 italic">
        Final recovery depends on lease interpretation, audit rights, and timing.
      </p>
    </div>

    {/* Lease metadata */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-emerald-200 text-sm">
      <div>
        <p className="font-semibold">Tenant</p>
        <p>{analysis.tenant ?? "—"}</p>
      </div>

      <div>
        <p className="font-semibold">Landlord</p>
        <p>{analysis.landlord ?? "—"}</p>
      </div>

      <div>
        <p className="font-semibold">Premises</p>
        <p>{analysis.premises ?? "—"}</p>
      </div>

      <div>
        <p className="font-semibold">Lease Term</p>
        <p>
          {analysis.lease_start && analysis.lease_end
            ? `${analysis.lease_start} → ${analysis.lease_end} (${analysis.term_months} months)`
            : "—"}
        </p>
      </div>
    </div>
  </div>
)}

      {/* ---------- CHECKOUT BUTTON ---------- */}
      <button
        onClick={async () => {
          if (!auditId) return;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_WORKER_URL}/checkout/create`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Lease-Worker-Key":
                  process.env.NEXT_PUBLIC_WORKER_KEY!,
              },
              body: JSON.stringify({ auditId }),
            }
          );

          const data = await res.json();

          if (data?.url) {
            window.location.href = data.url;
          } else {
            alert("Failed to start checkout");
          }
        }}
        className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
      >
        Get Full Audit PDF
      </button>
    </main>
  );
}
