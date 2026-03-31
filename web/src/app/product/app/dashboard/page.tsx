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


import { useEffect, useState } from "react";
import Link from "next/link";

/* ================== TYPES ================== */

type Lease = {
  id: string;
  created_at: string;
  property_name: string | null;
  landlord: string | null;
  square_feet: number | null;
  lease_type: string | null;
  renewal_date: string | null;
};

/* ================== HELPERS ================== */

function getHealthScore(): "A" | "B" | "C" | "D" {
  const v = 0;
  if (v <= 1000) return "A";
  if (v <= 5000) return "B";
  if (v <= 15000) return "C";
  return "D";
}

function getRenewalRiskScore(lease: Lease | null): number | null {
  if (!lease || !lease.renewal_date) return null;

  const renewal = new Date(lease.renewal_date);
  const today = new Date();
  const diffMs = renewal.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysRemaining <= 0) return 100;        // expired
  if (daysRemaining <= 30) return 90;
  if (daysRemaining <= 60) return 75;
  if (daysRemaining <= 90) return 60;
  if (daysRemaining <= 180) return 40;
  return 10;                                 // low risk
}

function HealthBadge({ score }: { score: "A" | "B" | "C" | "D" }) {
  const styles = {
    A: "bg-green-100 text-green-800",
    B: "bg-blue-100 text-blue-800",
    C: "bg-yellow-100 text-yellow-800",
    D: "bg-red-100 text-red-800",
  };

  return (
    <span className={`rounded px-2 py-1 text-xs font-semibold ${styles[score]}`}>
      Health: {score}
    </span>
  );
}

function StatusChips() {
  return (
    <div className="flex gap-2">
      <span className="rounded bg-gray-100 px-2 py-1 text-xs">
        Paid
      </span>
    </div>
  );
}

function estimateLeaseSavings(lease: Lease) {
  const risk = getRenewalRiskScore(lease) ?? 0;
  const base = lease.square_feet ?? 2000;

  return Math.max(1500, Math.round((risk / 100) * base * 1.5));
}

function estimateMonthlyLoss(lease: Lease) {
  const savings = estimateLeaseSavings(lease);
  return Math.round(savings / 12);
}

/* ================== PAGE ================== */

export default function DashboardPage() {
  const [audits, setAudits] = useState<Lease[]>([]);
  const [selected, setSelected] = useState<Lease | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState<"risk" | "renewal" | "name">("risk");
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const upcomingRenewals = audits.filter((lease) => {
    if (!lease.renewal_date) return false;

    const renewal = new Date(lease.renewal_date);
    const today = new Date();
    const diffMs = renewal.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return daysRemaining > 0 && daysRemaining <= 180;
  }).length;

  const expiredLeases = audits.filter((lease) => {
    if (!lease.renewal_date) return false;

    const renewal = new Date(lease.renewal_date);
    const today = new Date();
    const diffMs = renewal.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return daysRemaining <= 0;
  }).length;

  const urgentRenewals = audits.filter((lease) => {
    if (!lease.renewal_date) return false;

    const renewal = new Date(lease.renewal_date);
    const today = new Date();
    const diffMs = renewal.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return daysRemaining > 0 && daysRemaining <= 90;
  }).length;

  const riskScores = audits
    .map((lease) => getRenewalRiskScore(lease))
    .filter((score): score is number => score !== null);

  const averageRiskScore =
    riskScores.length > 0
      ? Math.round(
          riskScores.reduce((sum, score) => sum + score, 0) /
            riskScores.length
        )
      : 0;

  const totalAtRiskSquareFootage = audits
    .filter((lease) => {
      const risk = getRenewalRiskScore(lease);
      return risk !== null && risk >= 60; // warning + urgent
    })
    .reduce((sum, lease) => {
      return sum + (lease.square_feet ?? 0);
    }, 0);

  // Pricing trigger logic
  const showPremiumCTA = averageRiskScore >= 60 || urgentRenewals > 0;
  const estimatedSavings = Math.max(5000, Math.round(averageRiskScore * 150));
  const selectedSavings = selected ? estimateLeaseSavings(selected) : estimatedSavings;
  const selectedMonthlyLoss = selected
  ? estimateMonthlyLoss(selected)
  : Math.round(estimatedSavings / 12);
  const selectedRisk = selected ? getRenewalRiskScore(selected) : null;

  // Build 12-month renewal timeline
  const today = new Date();
  const timelineMonths = Array.from({ length: 12 }).map((_, i) => {
    // ensures newest/highest activity month auto-focus later
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const label = d.toLocaleString("default", { month: "short", year: "numeric" });

    const count = audits.filter((lease) => {
      if (!lease.renewal_date) return false;
      const r = new Date(lease.renewal_date);
      return r.getFullYear() === d.getFullYear() && r.getMonth() === d.getMonth();
    }).length;

    return { label, count };
  });

  useEffect(() => {
    let cancelled = false;

    async function loadLeases() {
      try {
        const res = await fetch("/api/portfolio-leases", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const json = await res.json();

        if (!cancelled && json?.leases) {
          setAudits(json.leases);

          // Auto-select highest urgency lease (highest risk first, then nearest renewal)
          const sortedByUrgency = [...json.leases].sort((a, b) => {
            const riskA = getRenewalRiskScore(a) ?? -1;
            const riskB = getRenewalRiskScore(b) ?? -1;

            if (riskA !== riskB) return riskB - riskA;

            if (a.renewal_date && b.renewal_date) {
              return (
                new Date(a.renewal_date).getTime() -
                new Date(b.renewal_date).getTime()
              );
            }

            return 0;
          });

          setSelected(sortedByUrgency[0] ?? null);
        }
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadLeases();
    // Auto-scroll to first active month with leases (improved horizontal focus)
    setTimeout(() => {
      const container = document.querySelector(".timeline-scroll");
      const el = document.querySelector("[data-has-renewals='true']");

      if (container && el) {
        const containerEl = container as HTMLElement;
        const targetEl = el as HTMLElement;

        const offset =
          targetEl.offsetLeft -
          containerEl.offsetWidth / 2 +
          targetEl.offsetWidth / 2;

        containerEl.scrollTo({
          left: offset,
          behavior: "smooth",
        });
      }
    }, 250);
    return () => {
      cancelled = true;
    };
  }, []);

  /* Auto-effect for month filtering */
  useEffect(() => {
    if (!activeMonth) return;

    // Auto-select first lease in filtered set
    const first = audits.find((lease) => {
      if (!lease.renewal_date) return false;

      const r = new Date(lease.renewal_date);
      const label = r.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      return label === activeMonth;
    });

    if (first) setSelected(first);

    // Scroll list into view
    setTimeout(() => {
      const el = document.getElementById("lease-list");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [activeMonth, audits]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return <div className="p-6">Loading your audits…</div>;
  }

  /* ---------------- EMPTY STATE ---------------- */

  if (!audits.length) {
    return (
      <div className="p-6">
        <h1 className="mb-2 text-2xl font-semibold">
          No audits yet
        </h1>
        <p className="mb-4 text-gray-600">
          Upload a lease to manage it, or run a full audit to uncover hidden costs.
        </p>
        <div className="flex gap-3">
          <Link
            href="/product/app/add-lease"
            className="inline-block rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
          >
            Add Lease
          </Link>
          <Link
            href="/app/step-1-upload"
            className="inline-block rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Run Audit (Free Preview)
          </Link>
        </div>
      </div>
    );
  }

/* ---------------- MAIN UI ---------------- */

const filteredLeases = activeMonth
  ? audits.filter((lease) => {
      if (!lease.renewal_date) return false;
      const r = new Date(lease.renewal_date);
      const label = r.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      return label === activeMonth;
    })
  : audits;

const sortedLeases = [...filteredLeases].sort((a, b) => {
  if (sortMode === "risk") {
    const riskA = getRenewalRiskScore(a) ?? -1;
    const riskB = getRenewalRiskScore(b) ?? -1;

    if (riskA !== riskB) return riskB - riskA;

    if (a.renewal_date && b.renewal_date) {
      return (
        new Date(a.renewal_date).getTime() -
        new Date(b.renewal_date).getTime()
      );
    }

    return 0;
  }

  if (sortMode === "renewal") {
    if (a.renewal_date && b.renewal_date) {
      return (
        new Date(a.renewal_date).getTime() -
        new Date(b.renewal_date).getTime()
      );
    }
    return 0;
  }

  if (sortMode === "name") {
    const nameA = a.property_name ?? "";
    const nameB = b.property_name ?? "";
    return nameA.localeCompare(nameB);
  }

  return 0;
});

const topSavings = sortedLeases.length
  ? Math.max(...sortedLeases.map((l) => estimateLeaseSavings(l)))
  : 0;

return (
  <div className="min-h-screen bg-white">
    <div className="p-5 lg:p-6 space-y-6 pb-20">
      {/* HEADER — DETAIL */}
      <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Portfolio Dashboard</h1>
        <p className="text-[13px] text-gray-600 mt-1">
          Monitor renewal risk, prioritize action, and run audits to uncover savings.
        </p>
      </div>
      <button
        onClick={() => showPremiumCTA ? setShowPaywall(true) : window.location.href = "/app/step-1-upload"}
        className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        {showPremiumCTA ? "Unlock Full Audit →" : "Run Lease Audit →"}
      </button>
    </div>
{/* PORTFOLIO SAVINGS HERO */}
<div className="rounded-xl border border-green-200 bg-green-50 p-5 flex items-center justify-between shadow-sm">
  <div>
    <div className="text-[12px] text-green-700 uppercase tracking-wide">
      Estimated Portfolio Savings
    </div>
    <div className="text-2xl font-semibold text-green-900">
      $
      {sortedLeases
        .reduce((sum, l) => sum + estimateLeaseSavings(l), 0)
        .toLocaleString()}
      +
    </div>
    <div className="text-[12px] text-green-700 mt-1">
      Based on renewal risk + lease exposure
    </div>
  </div>

  <button
    onClick={() =>
      showPremiumCTA
        ? setShowPaywall(true)
        : (window.location.href = "/app/step-1-upload")
    }
    className="rounded bg-green-600 px-4 py-2 text-xs text-white hover:bg-green-700"
  >
    Unlock Savings →
  </button>
</div>

{/* CALENDAR TIMELINE — HERO */}
<div className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm w-full">
  <div className="flex items-center justify-between mb-5">
    <div>
      <div className="text-[11px] text-gray-500 uppercase tracking-wide">
        Renewal Timeline
      </div>
      <div className="text-lg font-semibold">
        Next 12 Months
      </div>
    </div>

    {activeMonth && (
      <button
        onClick={() => setActiveMonth(null)}
        className="text-xs text-gray-500 hover:text-black"
      >
        Clear filter
      </button>
    )}
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full pt-1">
    {timelineMonths.map((m) => {
      const intensity =
        m.count >= 5
          ? "bg-red-100 text-red-900"
          : m.count >= 3
          ? "bg-yellow-100 text-yellow-900"
          : "bg-gray-100 text-gray-800";

      return (
        <div
          key={m.label}
          onClick={() =>
            setActiveMonth(activeMonth === m.label ? null : m.label)
          }
          data-has-renewals={m.count > 0 ? "true" : "false"}
          className={`rounded-xl p-5 text-center cursor-pointer border transition-all duration-200 shadow-sm hover:shadow-md ${
  activeMonth === m.label
    ? "border-black ring-2 ring-black"
    : "border-gray-200"
} ${intensity}`}
        >
          <div className="text-sm font-medium tracking-tight">
            {m.label}
          </div>

          <div className="mt-2 text-2xl font-semibold">
            {m.count}
          </div>

          <div className="text-xs mt-1 opacity-80">
            renewals
          </div>

          {/* INLINE SAVINGS PREVIEW */}
          {m.count > 0 && (
            <div className="mt-3 text-[11px] font-medium text-green-700">
              ${Math.round(m.count * 3500).toLocaleString()}+
            </div>
          )}

          {m.count > 0 && (
            <div className="text-[10px] text-gray-500">
              potential savings
            </div>
          )}
        </div>
      );
    })}
  </div>

  {/* CONVERSION BANNER */}
  <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 flex items-center justify-between">
    <div>
      <div className="text-sm font-semibold text-red-900">
        {urgentRenewals > 0
          ? `${urgentRenewals} leases need immediate attention`
          : "Stay ahead of renewal risk"}
      </div>
      <div className="text-xs text-red-700">
        Audit now to uncover hidden costs and strengthen negotiation leverage.
      </div>
    </div>

    <button
      onClick={() => showPremiumCTA ? setShowPaywall(true) : window.location.href = "/app/step-1-upload"}
      className="rounded bg-red-600 px-4 py-2 text-xs text-white hover:bg-red-700"
    >
      {showPremiumCTA ? "Unlock Full Audit →" : "Run Audit Now"}
    </button>
  </div>
</div>
    {/* DASHBOARD SUMMARY — BAR STYLE */}
    <div className="space-y-3 mb-6">
          {[
            {
              label: "Expired Leases",
              value: expiredLeases,
              color: "bg-red-500",
            },
            {
              label: "Urgent Renewals (≤ 90 days)",
              value: urgentRenewals,
              color: "bg-orange-500",
            },
            {
              label: "Upcoming Renewals (≤ 180 days)",
              value: upcomingRenewals,
              color: "bg-yellow-500",
            },
            {
              label: "Average Risk Score",
              value: averageRiskScore,
              suffix: "/100",
              color: "bg-purple-500",
              max: 100,
            },
            {
              label: "At-Risk Square Footage",
              value: totalAtRiskSquareFootage,
              color: "bg-blue-500",
            },
            {
              label: "Total Leases",
              value: audits.length,
              color: "bg-gray-800",
            },
          ].map((item) => {
            const max =
              item.max ??
              Math.max(
                expiredLeases,
                urgentRenewals,
                upcomingRenewals,
                audits.length,
                1
              );

            const percent =
              max > 0 ? Math.min((item.value / max) * 100, 100) : 0;

            return (
              <div key={item.label}>
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">
                    {item.value.toLocaleString()}
                    {item.suffix ?? ""}
                  </span>
                </div>

                <div className="h-2.5 w-full bg-gray-100 rounded-full">
                  <div
                    className={`h-2.5 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        

        {/* PLATFORM NAVIGATION */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/product/app/portfolio"
            className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
          >
            View All Leases
          </Link>
          <Link
            href="/app/portfolio"
            className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
          >
            Portfolio Dashboard
          </Link>
          <Link
            href="/product/app/add-lease"
            className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
          >
            Add Lease (No Audit)
          </Link>
          <button
            onClick={() => showPremiumCTA ? setShowPaywall(true) : window.location.href = "/app/step-1-upload"}
            className="rounded bg-black px-3 py-2 text-sm text-white"
          >
            Run Audit (Free Preview)
          </button>
  </div>
</div>


      {/* NEXT BEST ACTION — REVENUE DRIVER */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex items-center justify-between shadow-sm">
        <div>
          <div className="text-sm font-semibold">
            {selected?.property_name
              ? `Run an audit for ${selected.property_name}`
              : "Run your first lease audit"}
          </div>
          <div className="text-xs text-gray-600">
            Identify CAM overcharges, admin fee padding, and negotiation leverage in minutes.
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href="/product/app/add-lease"
            className="rounded border border-gray-300 px-3 py-2 text-xs hover:bg-gray-100"
          >
            Add Lease
          </Link>
          <button
            onClick={() => showPremiumCTA ? setShowPaywall(true) : window.location.href = "/app/step-1-upload"}
            className="rounded bg-black px-3 py-2 text-xs text-white hover:bg-gray-800"
          >
            {showPremiumCTA ? "Unlock Full Audit →" : "Run Audit →"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — HISTORY */}
<aside id="lease-list" className="border-r border-gray-200 pr-5">
  <h2 className="mb-1 text-base font-semibold">
    {activeMonth ? `${activeMonth} Renewals` : "Your Leases"}
  </h2>

  {activeMonth && (
    <div className="text-[11px] text-gray-500 mb-2">
      Showing leases expiring this month
    </div>
  )}
  <div className="mb-3 flex gap-1.5 text-[11.5px]">
          <button
            onClick={() => setSortMode("risk")}
            className={`rounded px-2 py-[2px] border ${
              sortMode === "risk"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Risk
          </button>

          <button
            onClick={() => setSortMode("renewal")}
            className={`rounded px-2 py-[2px] border ${
              sortMode === "renewal"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Renewal Date
          </button>

          <button
            onClick={() => setSortMode("name")}
            className={`rounded px-2 py-[2px] border ${
              sortMode === "name"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Name
          </button>
        </div>

        <div className="mb-3 text-[11px] text-gray-600 flex items-center justify-between">
          <span>Click any lease to preview savings</span>
          <button
            onClick={() =>
              showPremiumCTA
                ? setShowPaywall(true)
                : (window.location.href = "/app/step-1-upload")
            }
            className="text-blue-600 hover:underline"
          >
            Run audit →
          </button>
        </div>

        <ul className="space-y-1.5">
          {sortedLeases.map((audit) => {
            let tooltip = "";

            if (audit.renewal_date) {
              const renewal = new Date(audit.renewal_date);
              const today = new Date();
              const diffMs = renewal.getTime() - today.getTime();
              const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

              if (daysRemaining <= 0) {
                tooltip = "Lease expired";
              } else if (daysRemaining <= 30) {
                tooltip = "Critical Renewal Window";
              } else {
                tooltip = `Renewal in ${daysRemaining} days`;
              }
            }

            const renewalInfo = (() => {
              if (!audit.renewal_date) return { show: false, pulse: false };

              const renewal = new Date(audit.renewal_date);
              const today = new Date();
              const diffMs = renewal.getTime() - today.getTime();
              const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
              return {
                show: daysRemaining <= 90,
                pulse: daysRemaining <= 30,
              };
            })();

            return (
              <li
                key={audit.id}
                onClick={() => {
                  setSelected(audit);

                  const isTop = estimateLeaseSavings(audit) === topSavings;

                  if (isTop && showPremiumCTA) {
                    setTimeout(() => setShowPaywall(true), 300);
                  }
                }}
                title={tooltip}
                className={`cursor-pointer rounded-md px-3 py-2 text-[12.5px] transition-all duration-150 ease-in-out transform border-l-4 ${
                  (() => {
                    const risk = getRenewalRiskScore(audit);
                    if (risk === null) return "border-gray-200";
                    if (risk >= 90) return "border-red-600";
                    if (risk >= 75) return "border-orange-500";
                    if (risk >= 60) return "border-yellow-400";
                    return "border-green-400";
                  })()
                } ${
                  selected?.id === audit.id
                    ? "bg-gray-200 scale-[1.01] shadow-sm"
                    : "hover:bg-gray-100 hover:scale-[1.01] hover:shadow-sm"
                } ${
                  estimateLeaseSavings(audit) === topSavings
                    ? "ring-1 ring-green-400"
                    : ""
                }`}
              >
                <div className="flex items-center gap-1.5 font-medium leading-tight">
                  {renewalInfo.show && (
                    <span
                      className={`inline-block h-2 w-2 rounded-full bg-red-600 ${
                        renewalInfo.pulse ? "animate-pulse opacity-80" : ""
                      }`}
                    />
                  )}
                  {audit.property_name ?? "Unnamed Lease"}
                </div>
                <div className="mt-0.5 text-[11px] text-gray-500">
                  Health {getHealthScore()}
                </div>
                <div className="text-[10px] text-blue-600 mt-1">Run audit →</div>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-[11px] space-y-1">
          <div className="font-medium text-gray-800">
            Typical Results
          </div>
          <div className="text-gray-600">
            • $5K–$20K savings per lease
          </div>
          <div className="text-gray-600">
            • 2,100+ leases analyzed
          </div>
          <div className="text-gray-600">
            • Avg. savings: $8,400
          </div>
        </div>
      </aside>

      {/* RIGHT — DETAIL */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">
              Lease Overview
            </h1>
          </div>
          {selected && (
            <div className="flex items-center gap-2">
              <HealthBadge score={getHealthScore()} />
              {(() => {
                const risk = getRenewalRiskScore(selected);
                if (risk === null) return null;

                const riskColor =
                  risk >= 80
                    ? "bg-red-100 text-red-800"
                    : risk >= 60
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800";

                return (
                  <span className={`rounded px-2 py-1 text-xs font-semibold ${riskColor}`}>
                    Renewal Risk: {risk}/100
                  </span>
                );
              })()}
            </div>
          )}
        </div>

        {selected && <StatusChips />}

        <div className="rounded-lg border border-gray-200 p-5 bg-white shadow-sm">
          <div className="text-xs text-gray-500 mb-3">
            Lease Details
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[13px]">
            <div>
              <div className="text-gray-500 text-[11px]">Property</div>
              <div className="font-medium">{selected?.property_name ?? "—"}</div>
            </div>

            <div>
              <div className="text-gray-500 text-[11px]">Lease Type</div>
              <div className="font-medium">{selected?.lease_type ?? "NNN"}</div>
            </div>

            <div>
              <div className="text-gray-500 text-[11px]">Square Footage</div>
              <div className="font-medium">{selected?.square_feet ? selected.square_feet.toLocaleString() : "—"}</div>
            </div>

            {selected && (() => {
              if (!selected.renewal_date) {
                return (
                  <div>
                    <div className="text-gray-500 text-[11px]">Renewal Date</div>
                    <div className="font-medium">—</div>
                  </div>
                );
              }

              const renewal = new Date(selected.renewal_date);
              const today = new Date();
              const diffMs = renewal.getTime() - today.getTime();
              const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

              let status: "safe" | "warning" | "urgent" = "safe";
              if (daysRemaining <= 90) status = "urgent";
              else if (daysRemaining <= 180) status = "warning";

              const badgeStyles = {
                safe: "bg-green-100 text-green-800",
                warning: "bg-yellow-100 text-yellow-800",
                urgent: "bg-red-100 text-red-800",
              };

              return (
                <div>
                  <div className="text-gray-500 text-[11px]">Renewal Date</div>
                  <div className="font-medium">
                    {renewal.toLocaleDateString()}
                  </div>
                  <div className={`mt-1 inline-block rounded px-2 py-1 text-xs font-semibold ${badgeStyles[status]}`}>
                    {daysRemaining > 0
                      ? `${daysRemaining} days remaining`
                      : "Expired"}
                  </div>
                </div>
              );
            })()}
          </div>

          {selected && (() => {
            const renewal = selected.renewal_date ? new Date(selected.renewal_date) : null;
            const today = new Date();
            const diffMs = renewal ? renewal.getTime() - today.getTime() : 0;
            const daysRemaining = renewal ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;

            let status: "safe" | "warning" | "urgent" = "safe";
            if (daysRemaining <= 90) status = "urgent";
            else if (daysRemaining <= 180) status = "warning";

            const buttonStyles = {
              safe: "border border-gray-300 hover:bg-gray-100",
              warning: "border border-yellow-400 bg-yellow-50 text-yellow-800 hover:bg-yellow-100",
              urgent: "bg-red-600 text-white hover:bg-red-700",
            };

            return (
              <div className="mt-4">
                <button
                  onClick={() => showPremiumCTA ? setShowPaywall(true) : window.location.href = "/app/step-1-upload"}
                  className={`inline-block rounded px-4 py-2 text-sm font-medium transition ${buttonStyles[status]}`}
                >
                  {showPremiumCTA ? "Unlock Full Audit →" : "Run Full Audit →"}
                </button>
                {showPremiumCTA && (
                  <div className="text-[11px] text-gray-500 mt-1">
                    Includes savings breakdown + negotiation insights
                  </div>
                )}

                {status === "urgent" && (
                  <div className="mt-2 text-xs text-red-600 font-medium">
                    Renewal approaching — audit recommended before negotiation.
                  </div>
                )}

                {status === "warning" && (
                  <div className="mt-2 text-xs text-yellow-700 font-medium">
                    Renewal within 6 months — consider reviewing exposure.
                  </div>
                )}
              </div>
            );
          })()}

        {selected && (() => {
          const risk = getRenewalRiskScore(selected);
          if (risk === null) return null;

          let message = "";
          let style = "border-gray-200 bg-gray-50 text-gray-800";

          if (risk >= 90) {
            message =
              "This lease is expired or critically close to renewal. You have maximum negotiation leverage right now. Use audit findings to push for concessions, caps, or tenant improvements.";
            style = "border-red-400 bg-red-50 text-red-900";
          } else if (risk >= 75) {
            message =
              "Renewal is imminent. Begin negotiation strategy now. Consider requesting CAM caps, administrative fee limits, and removal of capital pass-through language.";
            style = "border-yellow-400 bg-yellow-50 text-yellow-900";
          } else if (risk >= 60) {
            message =
              "You are within strategic review window. Audit exposure and prepare data-backed negotiation points before landlord outreach.";
            style = "border-yellow-300 bg-yellow-50 text-yellow-800";
          } else {
            message =
              "Low immediate renewal risk. Monitor lease health and begin pre-renewal modeling 12–18 months prior to expiration.";
          }

          return (
            <div className={`mt-4 rounded-md border p-3 text-[13px] ${style}`}>
              <div className="font-semibold mb-1">Negotiation Leverage Insight</div>
              <div>{message}</div>
            </div>
          );
        })()}
        </div>

                {/* EXECUTIVE SUMMARY */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  <div className="border rounded-lg p-3">
                    <div className="text-[11px] text-gray-500">Total Leases</div>
                    <div className="text-lg font-semibold">{audits.length}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-[11px] text-gray-500">Urgent (≤ 90 days)</div>
                    <div className="text-lg font-semibold text-red-600">{urgentRenewals}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-[11px] text-gray-500">Upcoming (≤ 180 days)</div>
                    <div className="text-lg font-semibold text-yellow-600">{upcomingRenewals}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-[11px] text-gray-500">Avg Risk</div>
                    <div className="text-lg font-semibold">{averageRiskScore}/100</div>
                  </div>
                </div>
              </div>
            </div>

            {/* PAYWALL MODAL */}
            {showPaywall && (
              <div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                onClick={() => setShowPaywall(false)}
              >
                <div
                  className="bg-white rounded-lg p-6 w-[400px] shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {selected?.property_name
                      ? `Unlock Savings for ${selected.property_name}`
                      : "Unlock Full Audit"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get a full savings breakdown, CAM overcharge detection, and negotiation insights.
                  </p>

                  <div className="text-2xl font-semibold mb-1">$249 / lease</div>

                  <div className="text-[11px] text-red-600 mb-2">
                    {selectedRisk && selectedRisk >= 75
                      ? "Critical: renewal risk is high — act now"
                      : selectedRisk && selectedRisk >= 60
                      ? "Warning: renewal approaching — review costs"
                      : "Unlock full financial insights"}
                  </div>

                  <div className="text-[12px] text-gray-600 mb-3">
                    Estimated savings: ${selectedSavings.toLocaleString()}+ on this lease
                  </div>
                  <div className="text-[11px] text-red-700 font-medium mb-3">
  You may be losing ~${selectedMonthlyLoss.toLocaleString()}/month until resolved
</div>

                  <div className="text-[11px] text-gray-500 mb-2">
  Most tenants uncover $5K–$20K in hidden costs
</div>

<div className="text-[11px] text-gray-700 mb-3">
  • 2,100+ leases analyzed
</div>

<div className="text-[11px] text-gray-700 mb-2">
  • Avg. savings: $8,400 per lease
</div>

<div className="text-[11px] text-red-600 font-medium mb-3">
  {urgentRenewals > 0
    ? `⚠️ ${urgentRenewals} leases approaching renewal — pricing advantage decreases after renewal`
    : "Limited-time insight advantage before renewal window closes"}
</div>

<div className="text-[11px] text-gray-500 border-t pt-3 mb-4">
  Secure checkout • No long-term contracts • Cancel anytime
</div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowPaywall(false)}
                      className="text-sm text-gray-500"
                    >
                      Not now
                    </button>
                    <button
                      onClick={() => window.location.href = "/app/step-1-upload"}
                      className="bg-black text-white px-4 py-2 rounded text-sm"
                    >
                      Unlock ${selectedSavings.toLocaleString()} →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

        
      