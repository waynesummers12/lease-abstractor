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

      {/* WHAT THE CHECKLIST COVERS */}
      <div className="max-w-3xl mx-auto text-left mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          What This Commercial Lease Checklist Helps Identify
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 marker:text-green-600">
          <li>CAM reconciliation discrepancies and unexplained cost spikes</li>
          <li>Administrative or management fees above lease limits</li>
          <li>Capital expenses incorrectly billed to tenants</li>
          <li>Incorrect pro‑rata share or square footage allocations</li>
          <li>Gross‑up adjustments that inflate operating expenses</li>
          <li>Insurance and property tax pass‑through errors</li>
          <li>Charges billed outside the allowable audit window</li>
        </ul>
      </div>

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

      {/* CHECKLIST PREVIEW */}
      <div className="max-w-3xl mx-auto text-left mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Inside the Commercial Lease Checklist
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 marker:text-green-600">
          <li>CAM administrative fee review and lease limit comparison</li>
          <li>Capital expense misclassification checks</li>
          <li>Pro‑rata share and square‑footage allocation verification</li>
          <li>CAM reconciliation variance testing</li>
          <li>Gross‑up adjustments and vacancy impact review</li>
          <li>Property tax and insurance pass‑through validation</li>
        </ul>
      </div>

      {/* TRUST SIGNAL */}
      <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-12">
        Used by retail, restaurant, franchise, and medical tenants reviewing
        commercial lease costs and CAM reconciliations nationwide.
      </p>

      {/* INDUSTRIES */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Industries That Commonly Use This Lease Checklist
        </h2>

        <p className="text-gray-700 mb-6">
          Commercial lease cost issues are most commonly discovered in
          retail, restaurant, franchise, healthcare, and office leases
          where CAM and NNN expenses are passed through to tenants.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
          <span className="border rounded-md px-3 py-2">Retail Stores</span>
          <span className="border rounded-md px-3 py-2">Restaurants</span>
          <span className="border rounded-md px-3 py-2">Franchise Locations</span>
          <span className="border rounded-md px-3 py-2">Medical Offices</span>
          <span className="border rounded-md px-3 py-2">Dental Practices</span>
          <span className="border rounded-md px-3 py-2">Professional Offices</span>
        </div>
      </div>

      {/* HOW TENANTS USE THE CHECKLIST */}
      <div className="max-w-3xl mx-auto mb-16 text-left">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          How Tenants Use This Lease Review Checklist
        </h2>

        <p className="text-gray-700 mb-4">
          Commercial tenants typically use this checklist when reviewing
          CAM reconciliation statements, preparing for lease renewals,
          or validating operating expenses passed through by landlords.
        </p>

        <p className="text-gray-700 mb-4">
          Because CAM and NNN costs can change significantly year to year,
          tenants often discover administrative fee increases, expense
          allocation changes, or capital cost pass‑throughs that were not
          clearly disclosed in the original lease agreement.
        </p>

        <p className="text-gray-700">
          A structured checklist helps tenants systematically review lease
          language and reconciliation statements before audit rights
          expire, allowing potential cost issues to be addressed early.
        </p>
      </div>

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

      {/* FAQ */}
      <div className="border-t pt-12 mt-16 max-w-3xl mx-auto text-left">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Commercial Lease Checklist FAQs
        </h2>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="font-semibold mb-1">Why review CAM charges?</h3>
            <p>
              CAM reconciliations often include administrative fees,
              capital expenses, or allocation errors that increase
              tenant operating costs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">When should tenants audit CAM expenses?</h3>
            <p>
              Most leases allow tenants to challenge operating expense
              charges only within a limited audit window, often
              12–24 months after reconciliation statements are issued.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">How much money can tenants recover?</h3>
            <p>
              Many commercial tenants uncover $5,000–$50,000+ in
              avoidable exposure when reviewing CAM reconciliations
              and lease cost allocations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">What is the fastest way to check a lease?</h3>
            <p>
              Upload your lease to run an automated CAM / NNN risk
              scan and identify potential overcharges in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* RELATED CAM RESOURCES */}
      <div className="border-t pt-12 mt-16 max-w-3xl mx-auto text-left">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Related CAM Audit Resources
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>
            <Link href="/marketing/cam-reconciliation" className="underline">
              Understanding CAM Reconciliation Statements
            </Link>
          </li>
          <li>
            <Link href="/marketing/cam-admin-fees" className="underline">
              CAM Administrative Fees Explained
            </Link>
          </li>
          <li>
            <Link href="/marketing/nnn-expenses" className="underline">
              What NNN Expenses Include in Commercial Leases
            </Link>
          </li>
        </ul>
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