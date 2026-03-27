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

type Audit = {
  id: string;
  created_at: string;
  avoidable_exposure: number | null;
  signedUrl: string | null;
  email_sent?: boolean;
};

/* ================== HELPERS ================== */

function getHealthScore(audit: Audit): "A" | "B" | "C" | "D" {
  const v = audit.avoidable_exposure ?? 0;
  if (v <= 1000) return "A";
  if (v <= 5000) return "B";
  if (v <= 15000) return "C";
  return "D";
}

function getRenewalInfo(audit: Audit) {
  // Temporary mock: assume 1-year term from created_at
  const created = new Date(audit.created_at);
  const renewal = new Date(created);
  renewal.setFullYear(created.getFullYear() + 1);

  const today = new Date();
  const diffMs = renewal.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let status: "safe" | "warning" | "urgent" = "safe";

  if (daysRemaining <= 90) status = "urgent";
  else if (daysRemaining <= 180) status = "warning";

  return { renewal, daysRemaining, status };
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

function StatusChips({ audit }: { audit: Audit }) {
  return (
    <div className="flex gap-2">
      <span className="rounded bg-gray-100 px-2 py-1 text-xs">
        Paid
      </span>

      {audit.email_sent && (
        <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
          Email sent
        </span>
      )}

      {audit.signedUrl && (
        <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
          PDF ready
        </span>
      )}
    </div>
  );
}

/* ================== PAGE ================== */

export default function DashboardPage() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [selected, setSelected] = useState<Audit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadAudits() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_WORKER_URL;

        if (!baseUrl) {
          console.error("Missing NEXT_PUBLIC_WORKER_URL");
          return;
        }

        const res = await fetch(`${baseUrl}/audit/latest`, {
          cache: "no-store",
        });

        if (!res.ok) return;

        const json = await res.json();

        if (!cancelled && json?.audit) {
          setAudits([json.audit]);
          setSelected(json.audit);
        }
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAudits();
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

  return (
    <div className="grid h-full grid-cols-[18rem_1fr] gap-6 p-6">
      {/* LEFT — HISTORY */}
      <aside className="border-r border-gray-200 pr-6">
        <h2 className="mb-4 text-lg font-semibold">
          Your Leases
        </h2>

        <ul className="space-y-2">
          {audits.map((audit) => (
            <li
              key={audit.id}
              onClick={() => setSelected(audit)}
              className={`cursor-pointer rounded p-3 text-sm transition ${
                selected?.id === audit.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="font-medium">
              Lease – {new Date(audit.created_at).toLocaleDateString()}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Health {getHealthScore(audit)}
              </div>
            </li>
          ))}
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
            <HealthBadge score={getHealthScore(selected)} />
          )}
        </div>

        {selected && <StatusChips audit={selected} />}

        <div className="rounded border border-gray-200 p-6">
          <div className="text-sm text-gray-500 mb-4">
            Lease Details
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Property</div>
              <div className="font-medium">—</div>
            </div>

            <div>
              <div className="text-gray-500">Lease Type</div>
              <div className="font-medium">NNN</div>
            </div>

            <div>
              <div className="text-gray-500">Square Footage</div>
              <div className="font-medium">—</div>
            </div>

            {selected && (() => {
              const { renewal, daysRemaining, status } = getRenewalInfo(selected);

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
            const { status } = getRenewalInfo(selected);

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
        </div>

        {/* DASHBOARD SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="text-xs text-gray-500">Total Leases</div>
            <div className="text-xl font-semibold mt-1">{audits.length}</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-xs text-gray-500">Annual Rent Exposure</div>
            <div className="text-xl font-semibold mt-1">—</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-xs text-gray-500">CAM / NNN Exposure</div>
            <div className="text-xl font-semibold mt-1">—</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-xs text-gray-500">Upcoming Renewals</div>
            <div className="text-xl font-semibold mt-1">—</div>
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

        <div className="rounded border border-gray-200 p-6">
          <div className="text-sm text-gray-500">
            Portfolio Avoidable Exposure (Audited Leases Only)
          </div>
          <div className="mt-2 text-3xl font-bold">
            {selected?.avoidable_exposure
              ? `$${selected.avoidable_exposure.toLocaleString()}`
              : "—"}
          </div>
        </div>

        {selected?.signedUrl && (
          <a
            href={selected.signedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-black px-4 py-2 text-white"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}
