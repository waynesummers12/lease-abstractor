

import Link from "next/link";

export default function CommercialLeaseChecklistPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-center">

      {/* HERO */}
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">
        Commercial Lease Review Checklist
        <span className="block font-medium">
          Identify Hidden CAM, NNN, and Lease Cost Risks
        </span>
      </h1>

      <p className="text-gray-700 max-w-2xl mx-auto mb-8">
        This tenant‑first checklist helps commercial tenants identify common
        lease cost issues including CAM reconciliation discrepancies,
        administrative fee overcharges, capital expense misclassification,
        and pro‑rata allocation errors.
      </p>

      <p className="text-green-700 font-medium mb-10">
        ✓ Many tenants uncover $5K–$50K+ in CAM exposure using this review framework
      </p>

      {/* DOWNLOAD + EMAIL */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
        <input
          type="email"
          placeholder="Enter your email to download the checklist"
          className="w-full sm:w-80 px-4 py-3 border border-gray-300 rounded-md text-gray-800"
        />

        <a
          href="/assets/Tenant-First-CAM-Audit-Checklistv1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-8 py-3 text-lg font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Download Commercial Lease Checklist →
        </a>
      </div>

      <p className="text-xs text-gray-500 mb-12">
        Instant PDF download • No signup required • Tenant‑side lease review framework
      </p>

      {/* TRUST SIGNAL */}
      <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-12">
        Used by retail, restaurant, franchise, and medical tenants reviewing
        commercial lease costs and CAM reconciliations nationwide.
      </p>

      {/* BROKER SECTION */}
      <div className="border-t pt-10 mt-10 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Commercial Broker? Share This With Your Clients
        </h2>

        <p className="text-gray-700 mb-4">
          Tenant‑representation brokers often share this checklist when
          reviewing CAM reconciliations or lease renewals with clients.
        </p>

        <p className="text-gray-700 mb-6">
          The checklist helps identify administrative fee overcharges,
          capital expense misclassification, and structural lease
          exposure before formal audit rights expire.
        </p>

        <Link
          href="/refer"
          className="inline-block border border-gray-300 px-6 py-3 text-sm font-semibold rounded-md hover:bg-gray-100 transition"
        >
          Create Your Broker Referral Link →
        </Link>
      </div>

      {/* CTA TO PRODUCT */}
      <div className="border-t pt-12 mt-16">
        <h3 className="text-lg font-semibold mb-4">
          Want a Faster CAM / NNN Risk Review?
        </h3>

        <p className="text-gray-700 mb-6">
          Upload your lease and instantly identify potential CAM exposure,
          cost allocation issues, and negotiation opportunities.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black text-white px-8 py-4 text-sm font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Run Free Lease Risk Scan
        </Link>
      </div>

    </main>
  );
}