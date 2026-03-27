import Link from "next/link"

export default function PlatformPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold mb-6">
        Lease Intelligence Platform for Cost Reduction & Risk Management
      </h1>

      <p className="text-lg text-gray-700 mb-10">
        SaveOnLease helps tenants uncover hidden CAM and NNN overcharges, monitor renewal risk, and benchmark lease costs across their portfolio. Upload a lease to identify savings opportunities and gain actionable insights in minutes.
      </p>

      <div className="grid md:grid-cols-3 gap-10 mt-10">

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            Audit & Cost Analysis
          </h2>
          <p className="text-gray-600">
            Upload your lease and our AI analyzes CAM charges,
            escalation clauses, and audit rights to identify
            hidden risks and potential overcharges.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            Portfolio Tracking
          </h2>
          <p className="text-gray-600">
            Track multiple locations, renewal timelines, and
            total lease exposure across your entire portfolio.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            Benchmark & Compare
          </h2>
          <p className="text-gray-600">
            Compare your CAM and NNN costs to industry
            benchmarks and detect abnormal charges.
          </p>
        </div>

      </div>

      <div className="mt-16 flex gap-3">
        <Link
          href="/app/add-lease"
          className="border border-gray-300 px-6 py-3 rounded-md text-sm hover:bg-gray-100"
        >
          Add Lease to Portfolio
        </Link>
        <Link
          href="/app/step-1-upload"
          className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Run Audit (Free Preview)
        </Link>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Typical tenants uncover $7,500–$14,000 in avoidable lease costs.
      </p>

    </main>
  )
}