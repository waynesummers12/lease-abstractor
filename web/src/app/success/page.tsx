"use client";

import { useEffect, useState } from "react";

type AuditResponse = {
  audit: any | null;
  signedUrl: string | null;
};

export default function SuccessPage() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAudit() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORKER_URL}/audit/latest`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch audit");

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Unable to load your audit");
      } finally {
        setLoading(false);
      }
    }

    fetchAudit();
  }, []);

  if (loading) {
    return <p className="p-6">Loading your audit…</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!data || !data.audit) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Payment successful</h2>
        <p>Your audit is still processing. Please refresh shortly.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Your Lease Audit is Ready</h2>

      <div className="rounded border p-4">
        <p>
          <strong>Lease:</strong> {data.audit.lease_name}
        </p>
        <p>
          <strong>Estimated Savings:</strong> $
          {data.audit.avoidable_exposure?.toLocaleString()}
        </p>
      </div>

      {data.signedUrl && (
        <a
          href={data.signedUrl}
          target="_blank"
          className="inline-block rounded bg-black px-4 py-2 text-white"
        >
          Download Audit PDF
        </a>
      )}
    </div>
  );
}
<a
  href="/dashboard"
  className="mt-6 inline-block text-sm underline"
>
  Go to Dashboard
</a>
