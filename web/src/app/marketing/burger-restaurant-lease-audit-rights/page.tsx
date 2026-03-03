import Link from "next/link";

export const metadata = {
  title: "Burger Restaurant Lease Audit Rights | CAM & NNN Dispute Guide",
  description:
    "Understand audit rights in burger restaurant leases. Learn how franchisees and multi-unit operators can challenge CAM and NNN overcharges before deadlines expire.",
};

export default function BurgerRestaurantLeaseAuditRightsPage() {
  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Burger Restaurant Lease Audit Rights
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          A practical guide for franchisees and multi-unit burger operators
          reviewing CAM and NNN reconciliations. For a broader risk overview, see our <Link href="/marketing/burger-restaurant-lease-audit" className="text-indigo-600 font-medium hover:underline">Burger Restaurant Lease Audit guide</Link>.
        </p>

        <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            Do Burger Franchisees Have Audit Rights?
          </h2>

          <p>
            Most commercial leases include audit provisions that allow tenants to
            review and challenge <Link href="/marketing/nnn-for-burger-restaurants" className="text-indigo-600 font-medium hover:underline">CAM and NNN charges</Link>.
            However, these rights are typically subject to strict timing requirements.
          </p>

          <p>
            Audit windows commonly range from 30 to 120 days after the
            reconciliation statement is delivered. Missing this window may
            permanently waive your ability to dispute charges. Before that window closes, follow our <Link href="/marketing/burger-restaurant-cam-reconciliation-checklist" className="text-indigo-600 font-medium hover:underline">CAM Reconciliation Checklist</Link> to structure your review.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              Key Audit Clauses to Review
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
              <li>Time limits to request audit</li>
              <li>Scope of audit rights</li>
              <li>Cost-sharing provisions</li>
              <li>Interest or penalty terms</li>
              <li>Confidentiality requirements</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              Common Dispute Areas
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
              <li>Improper pro rata allocation</li>
              <li>Uncapped administrative fees</li>
              <li>Capital improvements billed as CAM</li>
              <li>Insurance markups</li>
              <li>Non-operating expense inclusion</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-8 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900">
            Multi-Location Operators Face Compounded Risk
          </h2>
          <p className="mt-3 text-indigo-800">
            A single overlooked discrepancy may seem minor. Across 10–20 stores,
            however, exposure can escalate quickly into six-figure annual impact.
          </p>
          <p className="mt-4 text-indigo-800">
            You can benchmark portfolio-level exposure using our <Link href="/marketing/how-much-rent-should-a-burger-restaurant-pay" className="text-indigo-600 font-medium hover:underline">Burger Restaurant Rent guide</Link>.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">
            What Happens If You Miss the Deadline?
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Many leases include language stating that failure to object within the
            defined audit period constitutes acceptance of the reconciliation.
            This can make recovery difficult or impossible.
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
                How long do burger franchisees have to challenge CAM charges?
              </p>
              <p className="mt-2 text-gray-600">
                Most leases provide between 30 and 120 days from delivery of the
                reconciliation statement. Exact timing depends on lease language. Learn how to identify discrepancies in our <Link href="/marketing/burger-restaurant-lease-audit" className="text-indigo-600 font-medium hover:underline">Lease Audit overview</Link>.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Can multi-unit operators audit multiple locations simultaneously?
              </p>
              <p className="mt-2 text-gray-600">
                Yes. Standardizing review across your portfolio can identify
                systemic allocation patterns or recurring discrepancies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}