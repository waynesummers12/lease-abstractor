import Link from "next/link"

export default function PlatformPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold mb-6">
        SaveOnLease Platform
      </h1>

      <p className="text-lg text-gray-700 mb-10">
        SaveOnLease is an AI lease intelligence platform that analyzes,
        monitors, and benchmarks commercial leases so tenants can reduce
        hidden costs and negotiate better terms.
      </p>

      <div className="grid md:grid-cols-3 gap-10 mt-10">

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            Lease Audit Intelligence
          </h2>
          <p className="text-gray-600">
            Upload your lease and our AI analyzes CAM charges,
            escalation clauses, and audit rights to identify
            hidden risks and potential overcharges.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            Portfolio Monitoring
          </h2>
          <p className="text-gray-600">
            Track multiple locations, renewal timelines, and
            total lease exposure across your entire portfolio.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            CAM Benchmarking
          </h2>
          <p className="text-gray-600">
            Compare your CAM and NNN costs to industry
            benchmarks and detect abnormal charges.
          </p>
        </div>

      </div>

      <div className="mt-16">
        <Link
          href="/app/step-1-upload"
          className="bg-black text-white px-6 py-3 rounded-md"
        >
          Upload Your Lease
        </Link>
      </div>

    </main>
  )
}