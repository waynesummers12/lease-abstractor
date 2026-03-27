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

/* ================== PAGE ================== */

export default function DashboardPage() {
  const [audits, setAudits] = useState<Lease[]>([]);
  const [selected, setSelected] = useState<Lease | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState<"risk" | "renewal" | "name">("risk");
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

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

  // Build 12-month renewal timeline
  const today = new Date();
  const timelineMonths = Array.from({ length: 12 }).map((_, i) => {
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
    return () => {
      cancelled = true;
    };
  }, []);

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
          Upload a lease to add it to your portfolio. You can run a paid CAM / NNN audit anytime.
        </p>
        <Link
          href="/app/step-1-upload"
          className="inline-block rounded bg-black px-4 py-2 text-sm text-white"
        >
          Add Lease to Portfolio
        </Link>
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

  return (
    <div className="grid h-full grid-cols-[18rem_1fr] gap-6 p-6">
      {/* LEFT — HISTORY */}
      <aside className="border-r border-gray-200 pr-6">
        <h2 className="mb-4 text-lg font-semibold">
          Your Leases
        </h2>
        <div className="mb-4 flex gap-2 text-xs">
          <button
            onClick={() => setSortMode("risk")}
            className={`rounded px-2 py-1 border ${
              sortMode === "risk"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Risk
          </button>

          <button
            onClick={() => setSortMode("renewal")}
            className={`rounded px-2 py-1 border ${
              sortMode === "renewal"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Renewal Date
          </button>

          <button
            onClick={() => setSortMode("name")}
            className={`rounded px-2 py-1 border ${
              sortMode === "name"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Name
          </button>
        </div>

        <ul className="space-y-2">
          {sortedLeases.map((audit) => {
            let tooltip = "";

            if (audit.renewal_date) {
              const renewal = new Date(audit.renewal_date);
              const today = new Date();
              const diffMs = renewal.getTime() - today.getTime();
              const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

              tooltip =
                daysRemaining > 0
                  ? `Renewal in ${daysRemaining} days`
                  : "Lease expired";
            }

            const showUrgentDot = (() => {
              if (!audit.renewal_date) return false;

              const renewal = new Date(audit.renewal_date);
              const today = new Date();
              const diffMs = renewal.getTime() - today.getTime();
              const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

              return daysRemaining <= 90;
            })();

            return (
              <li
                key={audit.id}
                onClick={() => setSelected(audit)}
                title={tooltip}
                className={`cursor-pointer rounded p-3 text-sm transition-all duration-200 ease-in-out transform ${
                  selected?.id === audit.id
                    ? "bg-gray-200 scale-[1.01]"
                    : "hover:bg-gray-100 hover:scale-[1.01]"
                }`}
              >
                <div className="flex items-center gap-2 font-medium">
                  {showUrgentDot && (
                    <span className="inline-block h-2 w-2 rounded-full bg-red-600" />
                  )}
                  {audit.property_name ?? "Unnamed Lease"}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Health {getHealthScore()}
                </div>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* RIGHT — DETAIL */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">
              Lease Overview
            </h1>
          </div>

          {selected && (
            <div className="flex items-center gap-3">
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

        <div className="rounded border border-gray-200 p-6">
          <div className="text-sm text-gray-500 mb-4">
            Lease Details
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Property</div>
              <div className="font-medium">{selected?.property_name ?? "—"}</div>
            </div>

            <div>
              <div className="text-gray-500">Lease Type</div>
              <div className="font-medium">{selected?.lease_type ?? "NNN"}</div>
            </div>

            <div>
              <div className="text-gray-500">Square Footage</div>
              <div className="font-medium">{selected?.square_feet ? selected.square_feet.toLocaleString() : "—"}</div>
            </div>

            {selected && (() => {
              if (!selected.renewal_date) {
                return (
                  <div>
                    <div className="text-gray-500">Renewal Date</div>
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
                  <div className="text-gray-500">Renewal Date</div>
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
              <div className="mt-6">
                <Link
                  href="/app/step-1-upload"
                  className={`inline-block rounded px-4 py-2 text-sm font-medium transition ${buttonStyles[status]}`}
                >
                  Run CAM / NNN Audit
                </Link>

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
            <div className={`mt-6 rounded border p-4 text-sm ${style}`}>
              <div className="font-semibold mb-1">Negotiation Leverage Insight</div>
              <div>{message}</div>
            </div>
          );
        })()}
        </div>

        {/* DASHBOARD SUMMARY — BAR STYLE */}
        <div className="space-y-4 mb-6">
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
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">
                    {item.value.toLocaleString()}
                    {item.suffix ?? ""}
                  </span>
                </div>

                <div className="h-3 w-full bg-gray-100 rounded">
                  <div
                    className={`h-3 rounded ${item.color} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CALENDAR TIMELINE */}
        <div className="rounded border border-gray-200 p-6">
          <div className="mb-4 text-sm text-gray-500">Renewal Timeline (Next 12 Months)</div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
            {timelineMonths.map((m) => {
              const intensity =
                m.count >= 5
                  ? "bg-red-100 text-red-800"
                  : m.count >= 3
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800";

              return (
                <div
                  key={m.label}
                  onClick={() =>
                    setActiveMonth(activeMonth === m.label ? null : m.label)
                  }
                  className={`rounded p-3 text-center cursor-pointer border transition ${
                    activeMonth === m.label
                      ? "border-black ring-1 ring-black"
                      : "border-transparent"
                  } ${intensity}`}
                >
                  <div className="font-medium">{m.label}</div>
                  <div className="mt-1 text-lg font-semibold">{m.count}</div>
                  <div className="text-xs">renewals</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PLATFORM NAVIGATION */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/product/app/leases"
            className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
          >
            View All Leases
          </Link>

          <Link
            href="/product/app/portfolio"
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

          <Link
            href="/app/step-1-upload"
            className="rounded bg-black px-3 py-2 text-sm text-white"
          >
            Run CAM / NNN Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
