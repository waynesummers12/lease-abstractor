"use client";

import { useEffect, useState } from "react";

type Audit = {
  id: string;
  lease_name: string | null;
  created_at: string;
  avoidable_exposure: number | null;
  signedUrl: string | null;
};

export default function DashboardPage() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [selected, setSelected] = useState<Audit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAudits() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORKER_URL}/audits`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to load audits");

        const json = await res.json();
        setAudits(json.audits ?? []);
        setSelected(json.audits?.[0] ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAudits();
  }, []);

  if (loading) {
    return <div className="p-6">Loading your audits…</div>;
  }

  if (!audits.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">No audits yet</h1>
        <p className="mt-2 text-gray-600">
          Upload a lease to generate your first CAM / NNN audit.
        </p>
      </div>
    );
  }

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
            </li>
          ))}
        </ul>
      </aside>

      {/* RIGHT — DETAIL */}
      <main className="flex-1 space-y-6">
        <h1 className="text-2xl font-semibold">Lease Audit Summary</h1>

        <div className="rounded border p-4">
          <p>
            <strong>Estimated Avoidable Exposure:</strong>{" "}
            {selected?.avoidable_exposure
              ? `$${selected.avoidable_exposure.toLocaleString()}`
              : "—"}
          </p>
        </div>

        {selected?.signedUrl && (
          <a
            href={selected.signedUrl}
            target="_blank"
            className="inline-block rounded bg-black px-4 py-2 text-white"
          >
            Download Audit PDF
          </a>
        )}
      </main>
    </div>
  );
}
