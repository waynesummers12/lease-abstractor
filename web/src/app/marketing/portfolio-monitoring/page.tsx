import Image from "next/image";

export default function PortfolioMonitoringPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        Lease Portfolio Monitoring & Risk Alerts
      </h1>

      <p className="text-gray-600 mb-8">
        Monitor your lease portfolio for cost increases, CAM reconciliation anomalies, and renewal risks. SaveOnLease helps you identify issues early and take action before costs escalate.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Expense Spike Alerts
          </h2>
          <p className="text-sm text-gray-600">
            Receive alerts when CAM, NNN, or other operating expenses
            increase beyond expected thresholds.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Portfolio Cost Insights
          </h2>
          <p className="text-sm text-gray-600">
            Compare lease costs and escalation trends across all
            locations in your portfolio.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            AI Lease Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Upload leases and let AI identify negotiation opportunities,
            hidden fees, and high-risk clauses.
          </p>
        </div>

      </div>

      {/* EXAMPLE AUDIT PREVIEW */}
      <div className="mt-14 border rounded-xl p-6 bg-gray-50">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">
            See What Your Audit Looks Like
          </h2>
          <p className="text-sm text-gray-600 max-w-xl">
            Get a clear breakdown of potential overcharges, savings opportunities, and negotiation insights before taking action.
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Image
            src="/demo/final-report.png"
            alt="Lease audit report preview"
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>

        <div className="mt-3 text-xs text-gray-500">
          Example report — your results will be personalized based on your lease
        </div>
      </div>

      <div className="mt-12">
        <div className="flex flex-col sm:flex-row gap-3">

          <a
            href="/product/app/add-lease"
            className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 text-center"
          >
            Upload Your Lease (Free)
          </a>

          <a
            href="/app/step-1-upload"
            className="border border-gray-300 px-6 py-3 rounded-md text-sm hover:bg-gray-100 text-center"
          >
            Preview Potential Savings
          </a>

        </div>

        <p className="text-sm text-gray-600 mt-4 max-w-xl">
          Most tenants uncover $5,000–$50,000+ in avoidable lease costs. Start with a free upload, then decide if a full audit is worth it.
        </p>
      </div>
    </main>
  );
}