"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Lease {
  id: string;
  propertyName: string;
  landlord?: string;
  squareFeet?: number;
  leaseType?: string;
  renewalDate?: string;
}

function calculateDaysUntil(date?: string) {
  if (!date) return null;
  const today = new Date();
  const renewal = new Date(date);
  const diff = renewal.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function calculateRiskScore(days: number | null) {
  if (days === null) return 0;
  if (days <= 30) return 95;
  if (days <= 90) return 80;
  if (days <= 180) return 60;
  if (days <= 365) return 40;
  return 20;
}

export default function LeaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leaseId = params?.id as string;

  const [lease, setLease] = useState<Lease | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLease() {
      try {
        const res = await fetch("/api/portfolio-leases");
        const data = await res.json();

        if (res.ok && Array.isArray(data.leases)) {
          const found = data.leases.find((l: Lease) => l.id === leaseId);
          setLease(found || null);
        }
      } catch (err) {
        console.error("Failed to load lease:", err);
      } finally {
        setLoading(false);
      }
    }

    if (leaseId) fetchLease();
  }, [leaseId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-gray-500">
        Loading lease details...
      </div>
    );
  }

  if (!lease) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-600 mb-4">Lease not found.</p>
        <button
          onClick={() => router.push("/app/leases")}
          className="text-blue-600 underline"
        >
          Back to Leases
        </button>
      </div>
    );
  }

  const daysUntil = calculateDaysUntil(lease.renewalDate);
  const riskScore = calculateRiskScore(daysUntil);

  async function handleSave() {
    if (!lease) return;

    setSaving(true);
    try {
      const res = await fetch("/api/portfolio-leases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lease),
      });

      if (!res.ok) {
        throw new Error("Failed to update lease");
      }

      setEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!lease) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this lease? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const res = await fetch("/api/portfolio-leases", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lease.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete lease");
      }

      router.push("/app/leases");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => setEditing(!editing)}
              className="text-sm border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              {editing ? "Cancel" : "Edit Lease"}
            </button>
            <button
              onClick={handleDelete}
              className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
          <h1 className="text-3xl font-semibold">{lease.propertyName}</h1>
          <p className="text-gray-500 mt-1">
            {lease.landlord || "Landlord not specified"}
          </p>
        </div>

        <Link
          href="/product/app/portfolio"
          className="text-sm text-gray-600 hover:underline"
        >
          Back to Portfolio
        </Link>
      </div>

      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">Renewal Risk Overview</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-gray-500">Renewal Date</div>
            <div className="font-medium">
              {lease.renewalDate
                ? new Date(lease.renewalDate).toLocaleDateString()
                : "Not set"}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Days Until Renewal</div>
            <div className="font-medium">
              {daysUntil !== null ? `${daysUntil} days` : "—"}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Risk Score</div>
            <div className="font-semibold">{riskScore} / 100</div>
            {daysUntil !== null && daysUntil <= 90 && (
              <div className="mt-4 text-sm text-red-600 font-medium">
                Renewal approaching — action recommended.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">Lease Details</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-gray-500">Lease Type</div>
            {editing ? (
              <select
                value={lease.leaseType || ""}
                onChange={(e) =>
                  setLease({ ...lease, leaseType: e.target.value })
                }
                className="border px-2 py-1 rounded text-sm"
              >
                <option value="NNN">NNN</option>
                <option value="Gross">Gross</option>
                <option value="Modified Gross">Modified Gross</option>
              </select>
            ) : (
              <div className="font-medium">{lease.leaseType || "—"}</div>
            )}
          </div>
          <div>
            <div className="text-gray-500">Square Footage</div>
            {editing ? (
              <input
                type="number"
                value={lease.squareFeet || ""}
                onChange={(e) =>
                  setLease({ ...lease, squareFeet: Number(e.target.value) })
                }
                className="border px-2 py-1 rounded text-sm"
              />
            ) : (
              <div className="font-medium">
                {lease.squareFeet
                  ? lease.squareFeet.toLocaleString()
                  : "—"}
              </div>
            )}
          </div>
        </div>
        {editing && (
          <div className="mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-black text-white px-5 py-2 rounded text-sm"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      <div className="border rounded-lg p-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Negotiation Leverage Insight</h2>
        {daysUntil !== null && daysUntil <= 90 ? (
          <p className="text-sm text-gray-700">
            This lease is approaching renewal within 90 days. This is a critical negotiation window. Evaluate CAM charges and renewal terms immediately.
          </p>
        ) : (
          <p className="text-sm text-gray-700">
            Early analysis of cost structure and escalation terms improves negotiation leverage well before renewal deadlines.
          </p>
        )}
        <div className="mt-6">
          <Link
            href="/app/step-1-upload"
            className="inline-block bg-black text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            Run Audit (Free Preview)
          </Link>
          <div className="mt-3 text-xs text-gray-500">
            Managing another lease?
            <Link href="/product/app/add-lease" className="ml-1 underline">
              Add Lease →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}