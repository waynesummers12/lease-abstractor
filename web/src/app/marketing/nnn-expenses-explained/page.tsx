// src/app/marketing/nnn-expenses-explained/page.tsx
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
          Triple Net (NNN) leases require tenants to pay property taxes,
          insurance, and common area maintenance costs — often on top of base
          rent. Understanding these expenses is essential to avoiding
          overcharges.
        </p>
      </section>

      {/* CONTENT */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          NNN expenses are designed to pass certain property operating costs
          directly to tenants. While this can reduce base rent, it also shifts
          financial risk and complexity onto tenants.
        </p>

        <p>
          The scope of NNN charges is controlled entirely by lease language.
          Broad definitions or missing caps can lead to unexpected and
          escalating costs over time.
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

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Common NNN Billing Issues
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Insurance premiums allocated incorrectly</li>
          <li>Taxes billed for vacant or non-tenant spaces</li>
          <li>Capital improvements treated as operating expenses</li>
          <li>Charges exceeding lease-defined caps</li>
          <li>Duplicate charges across CAM and NNN categories</li>
        </ul>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Why NNN Expenses Increase Over Time
        </h2>

        <p>
          Property taxes and insurance premiums tend to rise annually, sometimes
          sharply. Without caps or base-year protections, tenants may face
          unpredictable increases year over year.
        </p>

        <p>
          Because NNN expenses recur annually, even small errors can compound
          into significant long-term overpayments.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          How Tenants Can Manage NNN Exposure
        </h2>

        <p>
          Reviewing NNN charges requires comparing billed expenses against lease
          definitions, exclusions, and allocation methods. Identifying issues
          early allows tenants to act within audit windows and preserve dispute
          rights.
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
          Start CAM & NNN Audit
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
