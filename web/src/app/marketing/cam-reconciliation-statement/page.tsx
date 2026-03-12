

import Link from "next/link";

export default function CamReconciliationStatementPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-center">

      {/* HERO */}
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">
        CAM Reconciliation Statement Explained
        <span className="block font-medium">
          How Tenants Identify Hidden Operating Expense Charges
        </span>
      </h1>

      <p className="text-gray-700 max-w-2xl mx-auto mb-8">
        A CAM reconciliation statement shows the difference between
        estimated operating expenses and the actual costs incurred by
        the property during the year. Many commercial tenants receive
        these statements annually but are unsure how to verify whether
        the charges are accurate.
      </p>

      <p className="text-green-700 font-medium mb-12">
        ✓ Many tenants discover $5K–$50K+ in potential CAM overcharges
      </p>

      {/* EXAMPLE TABLE */}
      <div className="max-w-3xl mx-auto text-left mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Example CAM Reconciliation Statement
        </h2>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3">Expense Category</th>
                <th className="text-right px-4 py-3">Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">Property Taxes</td>
                <td className="px-4 py-3 text-right">$142,000</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Insurance</td>
                <td className="px-4 py-3 text-right">$36,000</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Maintenance</td>
                <td className="px-4 py-3 text-right">$88,000</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Management Fee</td>
                <td className="px-4 py-3 text-right">$12,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* COMMON ERRORS */}
      <div className="max-w-3xl mx-auto text-left mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Common CAM Reconciliation Errors
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 marker:text-green-600">
          <li>Administrative or management fees exceeding lease limits</li>
          <li>Capital improvements billed as operating expenses</li>
          <li>Incorrect pro‑rata share calculations</li>
          <li>Insurance and tax allocation errors</li>
          <li>Vacancy &quot;gross‑up&quot; adjustments inflating tenant costs</li>
        </ul>
      </div>

      {/* AUDIT WINDOW */}
      <div className="max-w-3xl mx-auto text-left mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          CAM Audit Window Deadlines
        </h2>

        <p className="text-gray-700 mb-4">
          Most commercial leases only allow tenants to challenge CAM
          charges within a limited time window. These audit windows are
          typically between 12 and 24 months after the reconciliation
          statement is issued.
        </p>

        <p className="text-gray-700">
          If the audit window expires, tenants may lose the ability to
          dispute incorrect operating expenses entirely.
        </p>
      </div>

      {/* CHECKLIST CTA */}
      <div className="border-t pt-12 mt-16">
        <h3 className="text-lg font-semibold mb-4">
          Download the CAM Audit Checklist
        </h3>

        <p className="text-gray-700 mb-6">
          Use a structured checklist to review CAM reconciliation
          statements and identify potential operating expense
          discrepancies.
        </p>

        <Link
          href="/marketing/cam-audit-checklist"
          className="inline-block border border-gray-300 px-6 py-3 text-sm font-semibold rounded-md hover:bg-gray-100 transition"
        >
          View CAM Audit Checklist →
        </Link>
      </div>

      {/* TOOL CTA */}
      <div className="border-t pt-12 mt-16">
        <h3 className="text-lg font-semibold mb-4">
          Want an Instant Lease Risk Review?
        </h3>

        <p className="text-gray-700 mb-6">
          Upload your commercial lease to identify potential CAM
          exposure, cost allocation issues, and negotiation
          opportunities in seconds.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black text-white px-8 py-4 text-sm font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Check Your Commercial Lease for Hidden Costs
        </Link>
      </div>

    </main>
  );
}