// src/app/marketing/cam-reconciliation/page.tsx

import Link from "next/link";

export const metadata = {
  title: "CAM Reconciliation Explained | Spot Overcharges & Save Money",
  description:
    "Learn how CAM reconciliation works, common overcharge mistakes, and how commercial tenants can identify avoidable CAM costs before audit deadlines close.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/cam-reconciliation",
  },
};

export default function CamReconciliationPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* ---------------- HERO ---------------- */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          CAM Reconciliation Explained — How Commercial Tenants Spot Overcharges & Protect Audit Rights
        </h1>

        <p className="mb-6 text-lg text-gray-700">
          CAM reconciliation is where many avoidable CAM overcharges first surface.
          During the annual reconciliation statement, estimated operating expenses
          are compared against actual costs — and allocation errors, non-allowable
          expenses, and inflated administrative fees often appear.
        </p>

        <p className="mb-8 text-gray-700">
          For commercial tenants, reviewing reconciliation language, pro-rata share
          allocations, and audit rights early can prevent thousands of dollars in
          recurring exposure before deadlines expire.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to review CAM reconciliation (Free Preview)
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
          CAM reconciliation errors are not isolated incidents — they are a predictable
          byproduct of how operating expenses are estimated, categorized, and allocated
          across multi-tenant properties.
        </p>

        <ul className="ml-6 list-disc space-y-2 text-gray-700">
          <li>Manual spreadsheets and calculations</li>
          <li>Vague or outdated lease language</li>
          <li>Costs passed through incorrectly</li>
          <li>Administrative markups and bundled fees</li>
          <li>Lack of tenant review or challenge</li>
        </ul>

        <p className="mt-4 text-gray-700">
          In many properties, reconciliation statements are generated from property
          management systems or internal accounting spreadsheets that group expenses
          broadly and apply allocations automatically. Without a lease-specific review,
          tenants may never know whether charges comply with caps, exclusions, or
          pro-rata share calculations defined in their lease.
        </p>
      </section>

      {/* ---------------- COMMON MISTAKES ---------------- */}
      <section className="mb-14">
        <h2 id="common-cam-mistakes-detail" className="mb-3 text-2xl font-semibold">
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
        <h2 id="how-much-cam-errors-cost" className="mb-3 text-2xl font-semibold">
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

      {/* ---------------- REAL WORLD EXAMPLE ---------------- */}
      <section className="mb-14 border-t pt-10">
        <h2 className="mb-3 text-2xl font-semibold">
          Example: How Small CAM Errors Become Large Costs
        </h2>

        <p className="mb-4 text-gray-700">
          Consider a 7,500 square foot retail tenant paying $6.75 per square foot
          in CAM charges. That equates to more than $50,000 annually in recoverable expenses.
        </p>

        <p className="mb-4 text-gray-700">
          If administrative fees are applied at 8% without proper lease support,
          or capital improvements are incorrectly passed through, exposure can
          range from $3,000 to $12,000 per year.
        </p>

        <p className="text-gray-700">
          Over a five‑year lease term, even modest reconciliation errors can
          exceed $25,000–$60,000 if left unchallenged.
        </p>

        <div className="mt-6">
          <Link
            href="/app/step-1-upload"
            className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Review Your CAM Reconciliation (Free Preview)
          </Link>
        </div>
      </section>

      {/* ---------------- WHAT CAN BE CHALLENGED ---------------- */}
      <section className="mb-14">
        <h2 id="what-you-can-challenge" className="mb-3 text-2xl font-semibold">
          What Tenants Can (and Can’t) Challenge
        </h2>
        <p className="mb-6 text-gray-700">
          Whether a charge is challengeable depends entirely on the specific language,
          caps, exclusions, and allocation methods defined in your lease agreement.
        </p>
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
    dispute CAM charges after receiving the reconciliation statement.
    After that period expires, charges are frequently deemed accepted
    by default, even if errors exist.
  </p>

  <p className="text-gray-700">
    If the window closes, charges may become final and leverage is lost.
    Timing matters as much as accuracy — make sure you understand{" "}
    <a
      href="/marketing/nnn-audit-rights"
      className="text-gray-900 underline hover:text-black"
    >
      your audit rights
    </a>{" "}
    and any{" "}
    <a
      href="/marketing/cam-expense-caps"
      className="text-gray-900 underline hover:text-black"
    >
      CAM expense caps
    </a>{" "}
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
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check CAM reconciliation (Free Preview)
        </Link>

        <p className="mt-3 text-xs text-gray-600">
          🔒 Secure & private • No obligation • Takes 2–3 minutes
        </p>
      </section>

      {/* ---------------- BREADCRUMB SCHEMA ---------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://saveonlease.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Learn",
                item: "https://saveonlease.com/marketing/learn",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "CAM Reconciliation",
                item: "https://saveonlease.com/marketing/cam-reconciliation",
              },
            ],
          }),
        }}
      />
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
