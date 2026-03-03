

import Link from "next/link";

export const metadata = {
  title: "How Much Rent Should a Burger Restaurant Pay? | 2026 Lease Guide",
  description:
    "Understand typical rent-to-revenue ratios for burger restaurants and franchise operators. Learn how CAM and NNN charges impact total occupancy cost.",
};

export default function HowMuchRentBurgerRestaurantPage() {
  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          How Much Rent Should a Burger Restaurant Pay?
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          A practical benchmark guide for franchisees and multi-unit QSR operators evaluating lease performance.
        </p>

        <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            Typical Rent-to-Revenue Ratio for Burger Restaurants
          </h2>

          <p>
            Most quick-service burger restaurants aim for total occupancy costs
            (base rent + CAM + taxes + insurance) to fall between
            <strong> 6%–10% of gross revenue</strong>.
          </p>

          <p>
            If total occupancy exceeds 10–12%, profitability becomes increasingly
            sensitive to labor, food, and insurance cost fluctuations.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
          <div className="p-6 border rounded-lg bg-gray-50">
            <p className="font-semibold text-gray-900">Strong Location</p>
            <p className="mt-2 text-gray-600">6%–8% of gross revenue</p>
          </div>
          <div className="p-6 border rounded-lg bg-gray-50">
            <p className="font-semibold text-gray-900">Average Range</p>
            <p className="mt-2 text-gray-600">8%–10% of gross revenue</p>
          </div>
          <div className="p-6 border rounded-lg bg-gray-50">
            <p className="font-semibold text-gray-900">High Risk Zone</p>
            <p className="mt-2 text-gray-600">10%–12%+ of gross revenue</p>
          </div>
        </div>

        <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            The Hidden Variable: CAM & NNN Charges
          </h2>

          <p>
            Many operators focus on base rent per square foot but overlook
            the impact of CAM, insurance, and tax pass-throughs in{" "}
            <Link href="/marketing/nnn-for-burger-restaurants" className="text-indigo-600 font-medium hover:underline">triple-net lease structures</Link>.
          </p>

          <p>
            A location that appears to be 7% of revenue can quickly move into
            the 10–12% range when reconciliation discrepancies are present.
          </p>
          <p>
            If discrepancies are suspected, review our <Link href="/marketing/burger-restaurant-lease-audit" className="text-indigo-600 font-medium hover:underline">Burger Restaurant Lease Audit guide</Link> to understand common risk patterns.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Uncapped administrative fees</li>
            <li>Capital improvements billed as CAM</li>
            <li>Improper pro rata allocations</li>
            <li>Insurance markups</li>
          </ul>
        </div>

        <div className="mt-12 p-8 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900">
            Multi-Unit Operators: Portfolio-Level Math
          </h2>
          <p className="mt-3 text-indigo-800">
            A 2% overage in occupancy cost across 10 stores generating $1.5M each
            equals $300,000 in annual margin erosion.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">
            When to Review Your Lease
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            If occupancy costs exceed 9–10% of gross revenue, or if year-over-year
            CAM increases outpace revenue growth, a structured lease review is warranted.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            You may also want to follow our structured <Link href="/marketing/burger-restaurant-cam-reconciliation-checklist" className="text-indigo-600 font-medium hover:underline">CAM Reconciliation Checklist</Link> and understand your <Link href="/marketing/burger-restaurant-lease-audit-rights" className="text-indigo-600 font-medium hover:underline">Lease Audit Rights</Link> before your audit window closes.
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
            FAQ
          </h3>

          <div className="mt-6 space-y-6">
            <div>
              <p className="font-medium text-gray-900">
                What is a typical CAM cost per square foot for burger restaurants?
              </p>
              <p className="mt-2 text-gray-600">
                CAM varies by market and center type, but operators often see
                $3–$10+ per square foot annually in retail environments.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Can high occupancy costs be renegotiated?
              </p>
              <p className="mt-2 text-gray-600">
                Depending on lease terms and audit findings, operators may have
                leverage during renewal periods or through formal audit processes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}