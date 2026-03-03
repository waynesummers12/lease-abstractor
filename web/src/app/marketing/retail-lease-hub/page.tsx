import Link from "next/link";

export const metadata = {
  title: "Retail Lease Audit Hub | SaveOnLease",
  description:
    "Central resource for retail tenants reviewing CAM reconciliation, NNN charges, audit rights, admin fees, and occupancy exposure.",
};

export default function RetailLeaseHubPage() {
  return (
    <main className="bg-white">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Retail Lease Audit Hub
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          A complete resource center for retail tenants reviewing CAM,
          reconciliation risk, audit deadlines, and total occupancy exposure.
        </p>

        {/* Primary Pillar */}
        <div className="mt-12 p-8 border rounded-xl bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900">
            Start Here: Retail Lease Audit Overview
          </h2>
          <p className="mt-3 text-gray-700">
            Understand overcharges, audit windows, and how small discrepancies
            compound across lease terms.
          </p>
          <Link
            href="/marketing/commercial-lease-audit"
            className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
          >
            Commercial Lease Audit Guide →
          </Link>
        </div>

        {/* Knowledge Grid */}
        <div className="mt-14 grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              CAM Reconciliation Explained
            </h3>
            <p className="mt-2 text-gray-600">
              How annual true-ups create overcharge exposure.
            </p>
            <Link
              href="/marketing/cam-reconciliation"
              className="inline-block mt-3 text-indigo-600 hover:underline"
            >
              View CAM Reconciliation →
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              NNN Lease Guide
            </h3>
            <p className="mt-2 text-gray-600">
              Understand how taxes, insurance, and CAM pass-throughs impact
              retail margins.
            </p>
            <Link
              href="/marketing/triple-net-lease"
              className="inline-block mt-3 text-indigo-600 hover:underline"
            >
              View NNN Guide →
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              CAM Admin Fee Caps
            </h3>
            <p className="mt-2 text-gray-600">
              Identify administrative markups that exceed negotiated caps.
            </p>
            <Link
              href="/marketing/cam-admin-fees"
              className="inline-block mt-3 text-indigo-600 hover:underline"
            >
              View Admin Fee Guide →
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              Audit Rights & Deadlines
            </h3>
            <p className="mt-2 text-gray-600">
              Understand how 30–120 day windows affect recovery rights.
            </p>
            <Link
              href="/marketing/nnn-audit-rights"
              className="inline-block mt-3 text-indigo-600 hover:underline"
            >
              View Audit Rights →
            </Link>
          </div>
        </div>

        {/* Exposure Section */}
        <div className="mt-16 p-8 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900">
            Retail Occupancy Risk Signals
          </h2>
          <ul className="mt-4 space-y-2 text-indigo-800">
            <li>• 3–7% CAM discrepancies commonly identified</li>
            <li>• $5k–$25k+ typical annual exposure</li>
            <li>• 30–120 day audit windows</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/app/step-1-upload"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Upload Your Lease — Results in ~10 Seconds
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Secure. No subscription required.
          </p>
        </div>
      </section>
    </main>
  );
}
