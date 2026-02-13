import Link from "next/link";

export const metadata = {
  title: "NNN Expenses Explained | Triple Net Lease Costs for Tenants | SaveOnLease",
  description:
    "Understand common NNN expenses in commercial leases, how Triple Net charges work, and when tenants can dispute improper or overstated costs.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are NNN expenses in a commercial lease?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "NNN expenses typically include property taxes, insurance premiums, and Common Area Maintenance costs passed through to tenants.",
      },
    },
    {
      "@type": "Question",
      name: "Do NNN expenses increase every year?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "NNN expenses often increase annually due to rising taxes, insurance premiums, and operating costs, especially when leases lack caps or base-year protections.",
      },
    },
    {
      "@type": "Question",
      name: "Can tenants dispute NNN charges?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Tenants may dispute NNN charges if they exceed lease limits, include excluded expenses, or are calculated incorrectly within the audit window.",
      },
    },
  ],
};

export default function NnnExpensesExplainedPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 space-y-12">
      {/* HERO */}
      <section>
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight">
          NNN Expenses Explained
        </h1>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          NNN expenses in Triple Net (NNN) leases require tenants to pay property taxes,
          insurance, and common area maintenance costs — often on top of base rent.
           Understanding NNN expenses clearly is essential to avoiding overcharges.  
        </p>
      </section>

      {/* CORE EXPLANATION */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          NNN expenses are designed to pass certain property operating costs
          directly to tenants. While this can reduce base rent, it also shifts
          financial risk and complexity onto tenants — especially when costs
          rise faster than revenue.
        </p>

        <p>
          The scope of NNN charges is controlled entirely by lease language.
          Broad definitions, vague exclusions, or missing caps can lead to
          unexpected and escalating costs over time.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          The Three Core NNN Expense Categories
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>
            <strong>Property Taxes:</strong> Real estate taxes assessed by local
            authorities, including reassessments and supplemental bills.
          </li>
          <li>
            <strong>Insurance:</strong> Property and liability insurance
            premiums, often allocated across all tenants.
          </li>
          <li>
            <strong>Common Area Maintenance (CAM):</strong> Costs related to
            maintaining shared areas of the property.
          </li>
        </ul>
      </section>

      {/* REAL TENANT EXAMPLES (NEW) */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Real NNN Cost Surprises Tenants Encounter
        </h2>

        <p>
          Many tenants assume NNN charges are predictable, only to discover
          large increases after the first reconciliation. One office tenant
          experienced a sharp property tax increase following a reassessment,
          resulting in thousands of dollars in additional charges with little
          notice. Another tenant saw insurance premiums spike due to claims
          unrelated to their own space.
        </p>

        <p>
          Because these expenses sit outside base rent, they often escape
          scrutiny until invoices arrive — at which point tenants feel
          obligated to pay before asking questions.
        </p>
      </section>

      {/* COMMON ISSUES */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Common NNN Billing Issues
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Insurance premiums allocated incorrectly</li>
          <li>Taxes billed for vacant or non-tenant spaces</li>
          <li>Capital improvements treated as operating expenses</li>
          <li>
            Charges exceeding lease-defined caps. See how these caps are analyzed during{" "}
            <Link
              href="/marketing/cam-reconciliation"
              className="underline hover:text-black"
            >
              CAM reconciliation
            </Link>.
          </li>
          <li>Duplicate charges across CAM and NNN categories</li>
        </ul>
      </section>

      {/* WHY COSTS RISE */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Why NNN Expenses Increase Over Time
        </h2>

        <p>
          Property taxes and insurance premiums tend to rise annually and can
          spike unexpectedly after reassessments, zoning changes, or market-wide
          insurance repricing. Without caps or base-year protections, tenants
          absorb the full impact of these increases.
        </p>

        <p>
          Because NNN expenses recur every year, even small billing errors can
          compound into significant long-term overpayments if left unchecked.
        </p>
      </section>

      {/* WHEN THIS CROSSES THE LINE (NEW) */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="pt-6 text-3xl font-light tracking-tight">
          When NNN Charges Cross the Line
        </h2>

        <p>
          NNN charges become problematic when they exceed what the lease allows.
          This may include passing through landlord overhead, misallocating
          expenses, charging for capital projects that should be amortized, or
          ignoring negotiated caps.
        </p>

        <p>
          If NNN charges feel inconsistent, unusually high, or disconnected
          from actual services provided, it’s often worth reviewing the lease
          language carefully and verifying the calculations.
        </p>
      </section>

      {/* TENANT ACTION */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="pt-6 text-3xl font-light tracking-tight">
          How Tenants Can Manage NNN Exposure
        </h2>

        <p>
          Managing NNN exposure starts with understanding what your lease
          permits. Reviewing billed expenses against definitions, exclusions,
          and allocation methods allows tenants to identify issues early and
          act within audit windows.
          Understanding your{" "}
         <Link href="/marketing/audit-window-deadlines" className="underline hover:text-black">
  audit window deadlines
          </Link>{" "}
          is critical before disputes expire.    
        </p>
      </section>

<section className="space-y-4 text-lg text-gray-700 leading-relaxed">
  <h2 className="text-3xl font-light tracking-tight">
    Why NNN Errors Matter Financially
  </h2>

  <p>
    Even modest NNN billing errors can cost tenants thousands annually.
    Because property taxes and insurance premiums fluctuate each year,
    small misallocations compound over time.
  </p>

  <p>
    Reviewing NNN expenses proactively preserves leverage and prevents
    long-term overpayment.
  </p>
</section>

      {/* CTA */}
      <section className="rounded-2xl bg-gray-50 p-8 text-center">
        <h3 className="text-2xl font-semibold">
          Unsure if your NNN charges are accurate?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          Upload your lease and receive a tenant-first audit highlighting NNN
          risks, caps, and potential overcharges.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-6 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start CAM & NNN Audit (Free Preview)
        </Link>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
