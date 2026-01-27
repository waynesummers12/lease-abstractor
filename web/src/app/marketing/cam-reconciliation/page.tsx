// src/app/cam-reconciliation/page.tsx

import Link from "next/link";

export const metadata = {
  title: "CAM Reconciliation Explained | Spot Overcharges & Save Money",
  description:
    "Learn how CAM reconciliation works, common overcharge mistakes, and how commercial tenants can identify avoidable CAM costs before audit deadlines close.",
};

export default function CamReconciliationPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* ---------------- HERO ---------------- */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          CAM Reconciliation Explained — How Tenants Spot Overcharges & Save Money
        </h1>

        <p className="mb-6 text-lg text-gray-700">
          Most commercial tenants overpay CAM charges — not because they agreed
          to it, but because reconciliation errors are easy to miss.
        </p>

        <p className="mb-8 text-gray-700">
          CAM reconciliation is the annual process landlords use to bill tenants
          for operating expenses — and it’s often confusing, opaque, and
          frequently inaccurate, so a quick review can reveal avoidable costs.
        </p>

        <Link
          href="/app"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check for CAM overcharges
        </Link>
        <p className="mt-3 text-xs text-gray-600">
          🔒 Secure & private • No obligation • Takes 2–3 minutes
        </p>
        <nav className="mt-4 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-2">
          <a href="#what-is-cam-reconciliation" className="hover:text-gray-900">
            What is CAM Reconciliation
          </a>
          <a href="#common-cam-mistakes" className="hover:text-gray-900">
            Common Mistakes
          </a>
          <a href="#how-much-cam-errors-cost" className="hover:text-gray-900">
            How Much Errors Cost
          </a>
          <a href="#what-you-can-challenge" className="hover:text-gray-900">
            What You Can Challenge
          </a>
          <a href="#audit-deadlines" className="hover:text-gray-900">
            Audit Deadlines
          </a>
        </nav>
      </section>
        
      {/* ---------------- WHAT IS CAM ---------------- */}
      <section className="mb-14">
        <h2 id="what-is-cam-reconciliation" className="mb-3 text-2xl font-semibold">
          What Is CAM Reconciliation? (Plain English)
        </h2>

        <p className="mb-4 text-gray-700">
          CAM reconciliation is the yearly calculation landlords use to determine
          how much tenants owe for Common Area Maintenance (CAM) expenses.
        </p>

        <ol className="ml-6 list-decimal space-y-2 text-gray-700">
          <li>Landlord estimates CAM costs for the year</li>
          <li>Tenants pay estimated CAM monthly</li>
          <li>At year-end, actual expenses are totaled</li>
          <li>A reconciliation statement is issued</li>
          <li>Tenants are billed for the difference</li>
        </ol>

        <p className="mt-4 text-gray-700">
          For many tenants, this is the largest and least-understood charge in
          their lease.
        </p>
      </section>

      {/* ---------------- WHY ERRORS ---------------- */}
      <section className="mb-14">
        <h2 id="common-cam-mistakes" className="mb-3 text-2xl font-semibold">
          Why CAM Reconciliation Errors Are So Common
        </h2>

        <p className="mb-4 text-gray-700">
          CAM reconciliation errors are not rare — they are common.
        </p>

        <ul className="ml-6 list-disc space-y-2 text-gray-700">
          <li>Manual spreadsheets and calculations</li>
          <li>Vague or outdated lease language</li>
          <li>Costs passed through incorrectly</li>
          <li>Administrative markups and bundled fees</li>
          <li>Lack of tenant review or challenge</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Most tenants assume the numbers are correct — and by the time questions
          arise, audit windows may already be closing.
        </p>
      </section>

      {/* ---------------- COMMON MISTAKES ---------------- */}
      <section className="mb-14">
        <h2 id="how-much-cam-errors-cost" className="mb-3 text-2xl font-semibold">
          The Most Common CAM Reconciliation Mistakes
        </h2>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="font-semibold">Inflated or Improper Admin Fees</h3>
            <p>
              Management or admin fees are often higher than allowed by the
              lease, calculated incorrectly, or applied to expenses they
              shouldn’t cover.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Non-Allowable Expenses</h3>
            <p>
              Capital improvements, major repairs, landlord overhead, marketing,
              and leasing costs often appear despite being excluded by the
              lease.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Math & Allocation Errors</h3>
            <p>
              Pro-rata share mistakes, square footage errors, double counting,
              and inconsistent categories can significantly inflate charges.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- COST ---------------- */}
      <section className="mb-14">
        <h2 id="what-you-can-challenge" className="mb-3 text-2xl font-semibold">
          How Much CAM Errors Typically Cost Tenants
        </h2>

        <p className="mb-4 text-gray-700">
          CAM errors are rarely small.
        </p>

        <ul className="ml-6 list-disc space-y-2 text-gray-700">
          <li>$0.50 – $3.00 per square foot per year</li>
          <li>$5,000 – $50,000+ annually for many SMB tenants</li>
          <li>Higher exposure for larger or multi-location tenants</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Because CAM charges recur every year, unchallenged errors compound over
          time.
        </p>
      </section>

      {/* ---------------- WHAT CAN BE CHALLENGED ---------------- */}
      <section className="mb-14">
        <h2 id="what-you-can-challenge" className="mb-3 text-2xl font-semibold">
          What Tenants Can (and Can’t) Challenge
        </h2>

        <div className="grid gap-6 md:grid-cols-2 text-gray-700">
          <div>
            <h3 className="mb-2 font-semibold">Often Challengeable</h3>
            <ul className="ml-6 list-disc space-y-1">
              <li>Admin fees above lease caps</li>
              <li>Excluded expense categories</li>
              <li>Improper allocations</li>
              <li>Unsupported charges</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Often Not Challengeable</h3>
            <ul className="ml-6 list-disc space-y-1">
              <li>Clearly defined allowable expenses</li>
              <li>Properly calculated lease-compliant costs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- AUDIT WINDOW ---------------- */}
      <section className="mb-16">
        <h2 id="audit-deadlines" className="mb-3 text-2xl font-semibold">
          Audit Windows Matter More Than Most Tenants Realize
        </h2>

        <p className="mb-4 text-gray-700">
          Most leases give tenants a limited window — often 30–90 days — to
          dispute CAM charges after receiving the reconciliation.
        </p>

        <p className="text-gray-700">
          If the window closes, charges may become final and leverage is lost.
          Timing matters as much as accuracy — make sure you understand
          <a
            href="/marketing/nnn-audit-rights"
            className="ml-1 text-gray-900 underline hover:text-black"
          >
            your audit rights
          </a>
          before the deadline.
        </p>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="rounded-xl border bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-2xl font-semibold">
          Check Your CAM Charges Before It’s Too Late
        </h2>

        <p className="mb-6 text-gray-700">
          A quick lease review can identify overcharges, admin fee issues, and
          audit deadlines you may be approaching.
        </p>

        <Link
          href="/app"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check CAM reconciliation
        </Link>

        <p className="mt-3 text-xs text-gray-600">
          🔒 Secure & private • No obligation • Takes 2–3 minutes
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is CAM reconciliation required every year?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Most commercial leases require landlords to reconcile estimated CAM charges against actual expenses annually.",
                },
              },
              {
                "@type": "Question",
                name: "Can tenants dispute CAM charges?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Often yes. Most leases allow tenants to dispute CAM charges, but only within the audit window defined in the lease.",
                },
              },
              {
                "@type": "Question",
                name: "How long do tenants have to audit CAM?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Audit windows are typically 30 to 90 days after receiving the CAM reconciliation, though the exact period depends on the lease.",
                },
              },
              {
                "@type": "Question",
                name: "Is my lease information secure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Lease uploads are private and reviewed securely.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
