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
          CAM reconciliation explained in practical terms: this is where many
          commercial tenants first spot overcharges and protect audit rights.
          During the annual reconciliation statement, estimated operating
          expenses are compared against actual costs — and allocation errors,
          non-allowable expenses, and inflated administrative fees often appear. Tenants comparing reconciliation detail against a structured <Link href="/marketing/cam-reconciliation-checklist" className="underline hover:text-black">CAM reconciliation checklist</Link> framework often identify discrepancies earlier.
        </p>

        <p className="mb-8 text-gray-700">
          This guide serves as the central authority resource on CAM reconciliation for commercial tenants. Below, you’ll find a complete breakdown of definitions, common overcharges, reconciliation math, audit deadlines, expense caps, and real-world exposure examples — with direct links to deeper resources on each topic.
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

      {/* ---------------- PILLAR OVERVIEW ---------------- */}
      <section className="mb-16 rounded-xl border bg-gray-50 p-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Complete CAM Reconciliation Guide for Commercial Tenants
        </h2>
        <div className="grid gap-6 md:grid-cols-2 text-sm text-gray-700">
          <ul className="list-disc ml-6 space-y-2">
            <li><Link href="/marketing/common-area-maintenance" className="underline hover:text-black">Common Area Maintenance (CAM) explained</Link></li>
            <li><Link href="/marketing/cam-charges" className="underline hover:text-black">What CAM charges include</Link></li>
            <li><Link href="/marketing/pro-rata-share-explained" className="underline hover:text-black">Pro-rata share allocation</Link></li>
            <li><Link href="/marketing/cam-expense-caps" className="underline hover:text-black">CAM expense caps & limitations</Link></li>
          </ul>
          <ul className="list-disc ml-6 space-y-2">
            <li><Link href="/marketing/non-allowable-cam-nnn-expenses" className="underline hover:text-black">Non-allowable CAM expenses</Link></li>
            <li><Link href="/marketing/cam-reconciliation-errors" className="underline hover:text-black">Common reconciliation errors</Link></li>
            <li><Link href="/marketing/nnn-overcharges" className="underline hover:text-black">NNN overcharges explained</Link></li>
            <li><Link href="/marketing/commercial-lease-audit" className="underline hover:text-black">Commercial lease audit process</Link></li>
          </ul>
        </div>
      </section>
      </section>
        
      {/* ---------------- WHAT IS CAM ---------------- */}
      <section className="mb-14">
        <h2 id="what-is-cam-reconciliation" className="mb-3 text-2xl font-semibold">
          What Is CAM Reconciliation? (Plain English)
        </h2>

        <p className="mb-4 text-gray-700">
          CAM reconciliation is the yearly calculation landlords use to determine
          how much tenants owe for{" "}
          <Link href="/marketing/common-area-maintenance" className="underline hover:text-black">
            Common Area Maintenance (CAM)
          </Link>{" "}
          expenses.
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
        <div className="mt-6 rounded-lg border p-6 text-sm text-gray-700">
          <p className="mb-2 font-semibold">Important:</p>
          <p>
            CAM reconciliation is not the same as base rent adjustment. It strictly relates to recoverable operating expenses defined in your lease. Misunderstanding this distinction is one of the most common reasons tenants overpay without realizing it.
          </p>
        </div>
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
          Because <Link href="/marketing/cam-charges" className="underline hover:text-black">CAM charges</Link> recur every year, unchallenged errors compound over time. Reviewing your structure against a formal <Link href="/marketing/cam-reconciliation-checklist" className="underline hover:text-black">CAM reconciliation checklist</Link> can help quantify exposure before deadlines close.
        </p>
        <div className="mt-6 rounded-lg border p-6 text-sm text-gray-700">
          <h3 className="mb-2 font-semibold">Exposure Compounds Over Time</h3>
          <p className="mb-2">
            Even a $1.25 per square foot overcharge on a 10,000 SF space equals $12,500 annually.
          </p>
          <p>
            Over a 5-year term, that becomes $62,500 — excluding escalation impacts or admin fee layering.
          </p>
        </div>
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
          Many disputes arise from misunderstood{" "}
          <Link href="/marketing/cam-fee-meaning" className="underline hover:text-black">
            CAM fee meaning
          </Link>{" "}
          and improper classification of expenses. Tenants operating under <Link href="/marketing/nnn" className="underline hover:text-black">NNN (triple net) leases</Link> or evaluating <Link href="/marketing/cam-vs-nnn" className="underline hover:text-black">CAM vs NNN structures</Link> should pay particular attention to allocation language.
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

  <p className="mt-4 text-gray-700">
    Understanding <Link href="/marketing/audit-window-deadlines" className="underline hover:text-black">audit window deadlines</Link> and formal notice requirements ensures reconciliation disputes preserve contractual leverage.
  </p>
</section>

      {/* ---------------- RECONCILIATION CALCULATION EXAMPLE ---------------- */}
      <section className="mb-16 border-t pt-10">
        <h2 className="mb-4 text-2xl font-semibold">
          CAM Reconciliation Calculation Example (With Math)
        </h2>

        <p className="mb-6 text-gray-700">
          Below is a simplified example of how CAM reconciliation math works in a multi‑tenant retail property.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Item</th>
                <th className="border px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Total Property CAM Expenses</td>
                <td className="border px-4 py-2">$500,000</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Tenant Square Footage</td>
                <td className="border px-4 py-2">10,000 SF</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Total Leasable SF</td>
                <td className="border px-4 py-2">100,000 SF</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Pro‑Rata Share</td>
                <td className="border px-4 py-2">10%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Tenant CAM Obligation</td>
                <td className="border px-4 py-2">$50,000</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Estimated CAM Paid</td>
                <td className="border px-4 py-2">$42,000</td>
              </tr>
              <tr className="font-semibold">
                <td className="border px-4 py-2">Reconciliation Balance Due</td>
                <td className="border px-4 py-2">$8,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-gray-700">
          Errors typically occur in the total expense pool, the square footage denominator,
          admin fee layering, or inclusion of non‑allowable categories.
        </p>
      </section>

      {/* ---------------- SAMPLE STATEMENT BREAKDOWN ---------------- */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold">
          Sample CAM Reconciliation Statement Breakdown
        </h2>

        <p className="mb-6 text-gray-700">
          A typical reconciliation statement may group expenses into broad categories:
        </p>

        <ul className="ml-6 list-disc space-y-2 text-gray-700">
          <li>Repairs & Maintenance</li>
          <li>Landscaping & Snow Removal</li>
          <li>Insurance</li>
          <li>Property Taxes</li>
          <li>Utilities</li>
          <li>Management / Administrative Fee (5–15%)</li>
        </ul>

        <p className="mt-6 text-gray-700">
          Red flags include vague “miscellaneous” categories, year‑over‑year spikes without explanation,
          capital projects passed through as operating expenses, and admin fees applied to excluded items.
        </p>
      </section>

      {/* ---------------- EXPOSURE CALCULATOR ---------------- */}
      <section className="mb-16 rounded-xl border bg-gray-50 p-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Estimate Your Potential CAM Overcharge Exposure
        </h2>

        <p className="mb-6 text-gray-700">
          Even small per‑square‑foot discrepancies compound quickly. Use the simplified example below:
        </p>

        <div className="grid gap-4 md:grid-cols-3 text-sm text-gray-700">
          <div>
            <p className="font-semibold">Space Size</p>
            <p>12,000 SF</p>
          </div>
          <div>
            <p className="font-semibold">Potential Overcharge</p>
            <p>$1.50 / SF</p>
          </div>
          <div>
            <p className="font-semibold">Annual Exposure</p>
            <p className="font-semibold">$18,000</p>
          </div>
        </div>

        <p className="mt-6 text-gray-700">
          Over a 5‑year term, that equals $90,000 — excluding escalation.
          This is why reconciliation review before audit windows close is critical.
        </p>
      </section>

      {/* ---------------- STATE-SPECIFIC VARIATIONS ---------------- */}
      <section className="mb-16 border-t pt-10">
        <h2 className="mb-4 text-2xl font-semibold">
          State‑Specific Audit Window Variations
        </h2>

        <p className="mb-6 text-gray-700">
          Audit rights and enforceability vary by jurisdiction. While commercial leases
          are primarily contract‑driven, state law can affect interpretation and enforcement.
        </p>

        <div className="space-y-6 text-gray-700 text-sm">
          <div>
            <h3 className="font-semibold">California</h3>
            <p>
              Commercial tenants often negotiate detailed audit clauses. Courts generally enforce
              clearly written notice deadlines strictly.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Texas</h3>
            <p>
              Strong contract enforcement environment. Missing audit deadlines may significantly
              reduce leverage in disputes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">New York</h3>
            <p>
              Complex commercial leasing market. Detailed lease language governs reconciliation,
              and expense categorization disputes are common.
            </p>
          </div>
        </div>

        <p className="mt-6 text-gray-700">
          Regardless of state, audit windows are usually short and strictly applied.
          Reviewing reconciliation detail promptly preserves negotiating leverage.
        </p>
      </section>

      {/* ---------------- RELATED DEEP DIVES ---------------- */}
      <section className="mb-16 border-t pt-10">
        <h2 className="mb-6 text-2xl font-semibold">
          Related CAM & NNN Deep Dive Resources
        </h2>
        <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Definitions & Structure</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li><Link href="/marketing/cam-fee-meaning" className="underline hover:text-black">CAM fee meaning</Link></li>
              <li><Link href="/marketing/triple-net-lease" className="underline hover:text-black">Triple net lease (NNN)</Link></li>
              <li><Link href="/marketing/cam-vs-nnn" className="underline hover:text-black">CAM vs NNN comparison</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Overcharges & Errors</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li><Link href="/marketing/real-cam-nnn-overcharge-examples" className="underline hover:text-black">Real overcharge examples</Link></li>
              <li><Link href="/marketing/non-allowable-cam-nnn-expenses" className="underline hover:text-black">Non-allowable expenses</Link></li>
              <li><Link href="/marketing/cam-reconciliation-errors" className="underline hover:text-black">Reconciliation errors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Audit & Deadlines</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li><Link href="/marketing/audit-window-deadlines" className="underline hover:text-black">Audit window deadlines</Link></li>
              <li><Link href="/marketing/nnn-audit-rights" className="underline hover:text-black">NNN audit rights</Link></li>
              <li><Link href="/marketing/commercial-lease-audit" className="underline hover:text-black">Lease audit process</Link></li>
            </ul>
          </div>
        </div>
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
