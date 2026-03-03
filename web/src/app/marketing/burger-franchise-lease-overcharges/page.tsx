import Link from "next/link";

export const metadata = {
  title: "Burger Franchise Lease Overcharges | CAM & NNN Audit for QSR Operators",
  description:
    "Franchisees and multi-unit burger operators: uncover hidden CAM and NNN lease overcharges before your audit window closes.",
};

export default function BurgerFranchiseLeaseOverchargesPage() {
  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Burger Franchise Lease Overcharges
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Built for franchisees & multi-unit operators managing thin margins in competitive QSR markets.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6 text-sm">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="font-semibold text-gray-900">4–6% margin industry</p>
            <p className="text-gray-600 mt-1">
              Even small CAM discrepancies can erase annual profit.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="font-semibold text-gray-900">Triple Net exposure</p>
            <p className="text-gray-600 mt-1">
              Taxes, insurance, and maintenance often passed through without scrutiny. Learn how these structures work in our <Link href="/marketing/nnn-for-burger-restaurants" className="text-indigo-600 font-medium hover:underline">Triple Net (NNN) guide for burger restaurants</Link>.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="font-semibold text-gray-900">30–120 day audit windows</p>
            <p className="text-gray-600 mt-1">
              Miss the deadline and overcharges may become permanent.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            Why Burger Franchisees Are Vulnerable
          </h2>

          <p>
            Many franchisees assume corporate oversight protects them from lease risk.
            In reality, most CAM reconciliations and NNN pass-throughs are the
            responsibility of the individual operator.
            For a full breakdown of structured review steps, see our <Link href="/marketing/burger-restaurant-cam-reconciliation-checklist" className="text-indigo-600 font-medium hover:underline">Burger Restaurant CAM Reconciliation Checklist</Link>.
          </p>

          <p>
            In strip centers and inline retail locations, common hidden exposures include:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Uncapped administrative fees</li>
            <li>Capital expense pass-throughs</li>
            <li>Improper allocation percentages</li>
            <li>Insurance markups</li>
            <li>Landlord overhead embedded in CAM</li>
          </ul>

          <p>
            When operating margins are tight, a 3–7% discrepancy in CAM can wipe out
            location-level profitability.
          </p>
          <p>
            You can also benchmark total occupancy cost using our <Link href="/marketing/how-much-rent-should-a-burger-restaurant-pay" className="text-indigo-600 font-medium hover:underline">Burger Restaurant Rent guide</Link> to see if your location is outside the healthy 6–10% range.
          </p>
          <p>
            If you want a broader overview of risk exposure across your lease, review our <Link href="/marketing/burger-restaurant-lease-audit" className="text-indigo-600 font-medium hover:underline">Burger Restaurant Lease Audit guide</Link>.
          </p>
        </div>

        <div className="mt-12 p-8 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900">
            Multi-Unit Operators: Portfolio Risk Multiplies
          </h2>
          <p className="mt-3 text-indigo-800">
            If you operate 5, 10, or 25 locations, small discrepancies compound across
            every lease. A $8,000 annual overcharge per store becomes $80,000 across
            ten stores.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">
            How SaveOnLease Helps Burger Franchisees
          </h2>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>✔ Identify uncapped CAM and NNN exposure</li>
            <li>✔ Flag capital expense pass-through violations</li>
            <li>✔ Highlight reconciliation irregularities</li>
            <li>✔ Surface audit window deadlines</li>
          </ul>
          <p className="mt-6 text-gray-700">
            Multi-brand franchise groups can also review our broader <Link href="/marketing/franchise-cam-audit" className="text-indigo-600 font-medium hover:underline">Franchise CAM Audit overview</Link> for portfolio-wide exposure strategies.
          </p>
        </div>

        <div className="mt-16 text-center">
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

        <div className="mt-20 border-t pt-12">
          <h3 className="text-xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h3>

          <div className="mt-6 space-y-6">
            <div>
              <p className="font-medium text-gray-900">
                How much can a burger franchise lose to CAM overcharges?
              </p>
              <p className="mt-2 text-gray-600">
                Depending on square footage and lease structure, exposure can range
                from $5,000 to $25,000+ per location annually — especially in
                high-traffic retail centers.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Can franchisees challenge CAM charges?
              </p>
              <p className="mt-2 text-gray-600">
                Most commercial leases include audit rights with defined deadlines.
                Identifying discrepancies before the window closes is critical. Learn more in our <Link href="/marketing/burger-restaurant-lease-audit-rights" className="text-indigo-600 font-medium hover:underline">Burger Restaurant Lease Audit Rights guide</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}