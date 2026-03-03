import Link from "next/link";

export const metadata = {
  title: "Triple Net (NNN) Leases for Burger Restaurants | 2026 Guide",
  description:
    "Understand how NNN leases work for burger franchisees and multi-unit operators. Learn how CAM, taxes, and insurance impact total occupancy cost.",
};

export default function NnnForBurgerRestaurantsPage() {
  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Triple Net (NNN) Leases for Burger Restaurants
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          A practical breakdown for franchisees and multi-unit QSR operators leasing in strip centers and inline retail.
        </p>

        <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            What Is a Triple Net (NNN) Lease?
          </h2>

          <p>
            In a triple net lease, burger restaurant tenants pay base rent plus
            their proportionate share of property taxes, insurance, and common
            area maintenance (CAM).
          </p>

          <p>
            For franchise operators, this means total occupancy cost includes:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Base rent</li>
            <li>Property taxes</li>
            <li>Insurance</li>
            <li>CAM (landscaping, parking, lighting, management fees)</li>
          </ul>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
          <div className="p-6 border rounded-lg bg-gray-50">
            <p className="font-semibold text-gray-900">Base Rent</p>
            <p className="mt-2 text-gray-600">
              Fixed per square foot amount negotiated in the lease.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-gray-50">
            <p className="font-semibold text-gray-900">Taxes & Insurance</p>
            <p className="mt-2 text-gray-600">
              Fluctuate annually and are typically passed through to tenants.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-gray-50">
            <p className="font-semibold text-gray-900">CAM</p>
            <p className="mt-2 text-gray-600">
              Covers maintenance, management, and shared area expenses.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            Why NNN Leases Create Risk for Burger Franchisees
          </h2>

          <p>
            Because NNN charges fluctuate year over year, total occupancy cost
            can increase even when base rent remains stable.
          </p>

          <p>
            Common risk areas include:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Uncapped administrative fees</li>
            <li>Capital improvements billed as CAM</li>
            <li>Improper pro rata allocation</li>
            <li>Insurance markups</li>
          </ul>
        </div>

        <div className="mt-12 p-8 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900">
            Multi-Unit Operators: NNN Exposure Scales Fast
          </h2>
          <p className="mt-3 text-indigo-800">
            A $5,000 annual NNN discrepancy at one location becomes $50,000 across
            ten stores. Portfolio-level review is critical.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">
            How to Protect Your Burger Restaurant Lease
          </h2>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>
              ✔ Review your <Link href="/marketing/burger-restaurant-cam-reconciliation-checklist" className="text-indigo-600 font-medium hover:underline">CAM reconciliation annually</Link>
            </li>
            <li>
              ✔ Understand your <Link href="/marketing/burger-restaurant-lease-audit-rights" className="text-indigo-600 font-medium hover:underline">audit window deadlines</Link>
            </li>
            <li>
              ✔ Benchmark occupancy cost against revenue targets (6–10%)
            </li>
          </ul>
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
            FAQ
          </h3>

          <div className="mt-6 space-y-6">
            <div>
              <p className="font-medium text-gray-900">
                Are most burger restaurant leases triple net?
              </p>
              <p className="mt-2 text-gray-600">
                Yes. Many burger restaurants operate in retail centers where NNN
                structures are standard.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Can NNN charges be negotiated?
              </p>
              <p className="mt-2 text-gray-600">
                Certain caps, exclusions, or amortization terms may be negotiable
                during lease signing or renewal periods.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
