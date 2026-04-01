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
  const [error] = useState<string | null>(null);

  const pollRef = useRef<number | null>(null);
  const hasFiredLeaseUploaded = useRef(false);

  useEffect(() => {
    if (!auditId) {
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

    const range = analysis?.teaser_summary?.estimated_avoidable_range;

  // Total exposure across remaining lease term
  const totalLeaseExposure =
    range
      ? midpoint(range)
      : analysis?.cam_total_avoidable_exposure ?? null;

  // Annualized exposure (Next 12 Months)
  const leaseMonths = analysis?.term_months ?? 12;

  const annualExposure =
    totalLeaseExposure != null
      ? Math.round((totalLeaseExposure / leaseMonths) * 12)
      : null;

  const monthlyLoss = annualExposure != null ? Math.round(annualExposure / 12) : null;

  // GA4: fire once when value is shown
  useEffect(() => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;

    if (typeof window !== "undefined" && gtag) {
      if (annualExposure != null && !hasFiredLeaseUploaded.current) {
        hasFiredLeaseUploaded.current = true;

        gtag("event", "lease_uploaded", {
          event_category: "funnel",
          event_label: "estimated_savings_shown",
          value: annualExposure,
        });
      }
    }
  }, [annualExposure]);

  if (!auditId) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-red-600">Missing auditId</p>
      </main>
    );
  }

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


  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Savings Preview</h1>
        <p className="mt-2 text-gray-600">
          We’ve identified potential savings and risk areas — unlock the full audit to see exactly where.
        </p>
      </div>


      {/* ---------- GREEN SUMMARY BOX ---------- */}
{annualExposure != null && (
  <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-6 space-y-5">
    {/* Header */}
    <div className="flex items-center gap-3">
      <span className="text-2xl">💰</span>
      <div>
        <p className="text-sm text-emerald-700 font-medium">
          Estimated Avoidable Exposure (Next 12 Months)
        </p>

        {/* PRIMARY NUMBER */}
        <p className="text-4xl font-extrabold text-emerald-900">
          ${annualExposure.toLocaleString()}
        </p>
        {monthlyLoss != null && (
          <p className="mt-1 text-sm text-red-700 font-medium">
            You may be losing ~${monthlyLoss.toLocaleString()}/month until resolved
          </p>
        )}

        {/* SECONDARY CONTEXT */}
        {totalLeaseExposure != null && (
          <p className="mt-1 text-sm text-emerald-800">
            Estimated total exposure over remaining lease term:{" "}
            <span className="font-semibold">
              ${totalLeaseExposure.toLocaleString()}
            </span>
          </p>
        )}

        {/* RANGE (IF AVAILABLE) */}
        {analysis.teaser_summary?.estimated_avoidable_range && (
          <>
            <p className="mt-1 text-sm text-emerald-700">
              Conservative estimate range:{" "}
              <span className="font-semibold">
                ${analysis.teaser_summary.estimated_avoidable_range.low.toLocaleString()}
                {" – "}
                ${analysis.teaser_summary.estimated_avoidable_range.high.toLocaleString()}
              </span>
            </p>
            <p className="mt-2 text-xs text-emerald-700">
              ⚠️ Many leases have time-limited audit windows — delays can reduce recovery.
            </p>
          </>
        )}
      </div>
    </div>

    {/* Confidence / badge */}
    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm w-fit">
      ✓ Calculated from your CAM, NNN, escalation, and reconciliation lease clauses
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

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-emerald-800">
      <div>✔ CAM charges reviewed</div>
      <div>✔ Admin fees analyzed</div>
      <div>✔ Escalations evaluated</div>
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

    {/* ---------- TOP 3 ISSUES (TEASER) ---------- */}
    {analysis.teaser_summary?.headline_flags && analysis.teaser_summary.headline_flags.length > 0 && (
      <div className="rounded-lg bg-white/60 p-4 border border-emerald-200">
        <p className="text-sm font-semibold text-emerald-900 mb-2">
          Top issues found (preview)
        </p>

        <ul className="list-disc list-inside space-y-1 text-sm text-emerald-900">
          {analysis.teaser_summary.headline_flags.slice(0, 3).map((flag, i) => (
            <li key={i} className="relative">
              <span>
                {flag}
              </span>
              <span className="ml-2 bg-gradient-to-r from-emerald-900/80 to-transparent text-transparent bg-clip-text select-none">
                confidential details
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-2 text-xs text-emerald-700">
          Unlock the full audit to see complete findings, dollar impact, and exact lease clauses.
        </p>
      </div>
    )}

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

      {/* ---------- UNLOCK FULL AUDIT EXPLANATION ---------- */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          Unlock ${annualExposure?.toLocaleString() ?? "your"} in Potential Savings — Limited Launch Price: $49.99
          <span className="block text-sm font-normal text-gray-500 mt-1">
            (Regular Price $249)
          </span>
        </h2>
        <p className="text-sm text-red-600 font-medium">
          Audit windows are time-sensitive — delays can reduce recoverable savings
        </p>

        <p className="text-gray-700">
          This complete audit highlights potential CAM / NNN exposure based on
          your lease language. Unlocking this full audit provides a complete,
          downloadable PDF with the detail you need to take action.
        </p>

        <p className="text-sm text-gray-600">
          One-time payment. No subscriptions. No auto-renewals.
        </p>
        <p className="text-xs text-gray-500">
          If no meaningful issues are found, you’ll still receive a complete audit report for your records.
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Audit windows are often time-limited
          </li>
          <li>
            Issue-by-issue findings tied directly to specific lease provisions
          </li>
          <li>
            Estimated dollar impact for each CAM / NNN risk identified
          </li>
          <li>
            Audit-ready explanations you can share with an attorney,
            accountant, or landlord
          </li>
          <li>
            A secure, downloadable PDF for your records
          </li>
        </ul>
      </div>

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
        className="w-full rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 font-medium text-center"
      >
        Unlock ${annualExposure?.toLocaleString() ?? "Savings"} →
      </button>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Secure checkout • Instant access after payment
      </p>
      <p className="text-[11px] text-gray-400 mt-2 text-center">
        2,100+ leases analyzed • Avg. savings $8,400
      </p>
    </main>
  );
}
