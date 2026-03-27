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
          onClick={() => router.push("/product/app/leases")}
          className="text-blue-600 underline"
        >
          Back to Leases
        </button>
      </div>
    );
  }

  const daysUntil = calculateDaysUntil(lease.renewalDate);
  const riskScore = calculateRiskScore(daysUntil);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{lease.propertyName}</h1>
          <p className="text-gray-500 mt-1">
            {lease.landlord || "Landlord not specified"}
          </p>
        </div>

        <Link
          href="/product/app/leases"
          className="text-sm text-gray-600 hover:underline"
        >
          Back to Portfolio
        </Link>
      </div>

      {/* Risk Overview */}
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
            <div className="font-semibold">
              {riskScore} / 100
            </div>
          </div>
        </div>
      </div>

      {/* Lease Details */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">Lease Details</h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-gray-500">Lease Type</div>
            <div className="font-medium">{lease.leaseType || "—"}</div>
          </div>

          <div>
            <div className="text-gray-500">Square Footage</div>
            <div className="font-medium">
              {lease.squareFeet
                ? lease.squareFeet.toLocaleString()
                : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Negotiation Leverage Messaging */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Negotiation Leverage Insight</h2>

        {daysUntil !== null && daysUntil <= 90 ? (
          <p className="text-sm text-gray-700">
            This lease is approaching renewal within 90 days. This is a critical
            negotiation window. You should evaluate CAM charges, escalations,
            and renewal terms immediately to strengthen leverage before formal
            renewal discussions begin.
          </p>
        ) : (
          <p className="text-sm text-gray-700">
            While this lease is not in an immediate renewal window, early
            analysis of cost structure and escalation terms can improve your
            negotiation position well before renewal deadlines.
          </p>
        )}

        <div className="mt-6">
          <Link
            href="/app/step-1-upload"
            className="inline-block bg-black text-white px-5 py-3 rounded-md text-sm"
          >
            Run CAM / NNN Audit
          </Link>
        </div>
      </div>
    </main>
  );
}