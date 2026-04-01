

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold mb-3">
            Simple, ROI-Driven Pricing
          </h1>
          <p className="text-gray-600 text-sm">
            Most tenants uncover $5K–$20K in hidden lease costs
          </p>
        </div>

        {/* PRICING CARD */}
        <div className="max-w-xl mx-auto border rounded-xl p-8 shadow-sm">

          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-1">Per Lease Audit</div>
            <div className="text-4xl font-semibold">$249</div>
            <div className="text-sm text-gray-500 mt-1">
              One-time • No subscription
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-700 mb-6">
            <div>✔ Identify CAM / NNN overcharges</div>
            <div>✔ Flag hidden admin fees & cost leakage</div>
            <div>✔ Renewal negotiation leverage insights</div>
            <div>✔ Downloadable audit summary (PDF)</div>
          </div>

          <div className="text-xs text-gray-500 text-center mb-6">
            Average customer savings: <span className="font-medium">$8,400</span>
          </div>

          <a
            href="/app/step-1-upload"
            className="block w-full text-center bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            Run Audit (Free Preview)
          </a>
        </div>

        {/* TRUST */}
        <div className="text-center text-xs text-gray-500 mt-10 space-y-1">
          <div>✔ 2,100+ leases analyzed</div>
          <div>✔ No long-term contracts</div>
          <div>✔ Secure checkout</div>
        </div>

      </div>
    </div>
  );
}