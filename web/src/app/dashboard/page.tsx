"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ================== TYPES ================== */

type Audit = {
  id: string;
  lease_name: string | null;
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

function HealthBadge({ score }: { score: "A" | "B" | "C" | "D" }) {
  const map = {
    A: "bg-green-100 text-green-800",
    B: "bg-blue-100 text-blue-800",
    C: "bg-yellow-100 text-yellow-800",
    D: "bg-red-100 text-red-800",
  };

  return (
    <span className={`rounded px-2 py-1 text-xs font-semibold ${map[score]}`}>
      Health: {score}
    </span>
  );
}

function StatusChips({ audit }: { audit: Audit }) {
  return (
    <div className="flex gap-2">
      <span className="rounded bg-gray-100 px-2 py-1 text-xs">Paid</span>

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
    async function loadAudits() {
      try {
        const res = await fetch(
  `${process.env.NEXT_PUBLIC_WORKER_URL}/audit/latest`,
  {
    headers: {
      "x-worker-key": process.env.NEXT_PUBLIC_WORKER_KEY!,
    },
  }
);

        if (!res.ok) {
          setAudits([]);
          setSelected(null);
          return;
        }

        const json = await res.json();

        if (json?.audit) {
          setAudits([json.audit]); // single source of truth
          setSelected(json.audit);
        } else {
          setAudits([]);
          setSelected(null);
        }
      } catch (err) {
        console.error("Dashboard load failed:", err);
        setAudits([]);
        setSelected(null);
      } finally {
        setLoading(false);
      }
    }

    loadAudits();
  }, []);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return <div className="p-6">Loading your audits…</div>;
  }

  /* ---------------- EMPTY STATE ---------------- */

  if (!audits.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">No audits yet</h1>
        <p className="text-gray-600 mb-4">
          Upload a lease to generate your first CAM / NNN audit.
        </p>
        <Link
          href="/app"
          className="inline-block rounded bg-black px-4 py-2 text-white text-sm"
        >
          Upload Lease
        </Link>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (
    <div className="flex h-full gap-6 p-6">
      {/* LEFT — HISTORY */}
      <aside className="w-72 border-r pr-4">
        <h2 className="mb-4 text-lg font-semibold">Your Audits</h2>

        <ul className="space-y-2">
          {audits.map((audit) => (
            <li
              key={audit.id}
              onClick={() => setSelected(audit)}
              className={`cursor-pointer rounded p-3 text-sm ${
                selected?.id === audit.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="font-medium">
                {audit.lease_name ?? "Untitled Lease"}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(audit.created_at).toLocaleDateString()}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Health {getHealthScore(audit)}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* RIGHT — DETAIL */}
      <main className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Lease Audit Summary</h1>
          {selected && <HealthBadge score={getHealthScore(selected)} />}
        </div>

        {selected && <StatusChips audit={selected} />}

        <div className="rounded border p-6">
          <div className="text-sm text-gray-500">
            Estimated Avoidable Exposure
          </div>
          <div className="mt-2 text-3xl font-bold">
            {selected?.avoidable_exposure
              ? `$${selected.avoidable_exposure.toLocaleString()}`
              : "—"}
          </div>
        </div>

        <div className="flex gap-3">
          {selected?.signedUrl && (
            <a
              href={selected.signedUrl}
              target="_blank"
              className="rounded bg-black px-4 py-2 text-white"
            >
              Download PDF
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
