// src/app/marketing/audit-rights/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Commercial Lease Audit Rights Explained | CAM & NNN | SaveOnLease",
  description:
    "Learn what audit rights commercial tenants have, common CAM & NNN audit deadlines, and how to preserve your right to dispute overcharges.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What audit rights do commercial tenants have?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Commercial tenants often have audit rights allowing them to review CAM, NNN, tax, and insurance charges, subject to lease terms.",
      },
    },
    {
      "@type": "Question",
      name: "Are audit rights automatic?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Audit rights are not automatic; they are governed by lease language and usually require written notice within a defined timeframe.",
      },
    },
    {
      "@type": "Question",
      name: "Why do tenants lose audit rights?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Tenants often lose audit rights due to missed deadlines, unclear lease language, or lack of awareness about reconciliation timelines.",
      },
    },
  ],
};

export default function AuditRightsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 space-y-12">
      {/* HERO */}
      <section>
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight">
          Commercial Lease Audit Rights Explained
        </h1>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          Most commercial leases give tenants the right to audit CAM and NNN
          charges — but only if strict notice and timing requirements are met.
          Missing these deadlines can permanently waive recovery rights.
        </p>
      </section>

      {/* CONTENT */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          Audit rights allow tenants to review and dispute operating expenses
          billed by a landlord. These rights are governed entirely by lease
          language and typically apply to CAM, NNN, tax, and insurance charges.
        </p>

        <p>
          Landlords often provide reconciliation statements without clearly
          calling out tenant audit deadlines, which leads many tenants to miss
          their opportunity to object.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          What Audit Rights Typically Cover
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Review of CAM, NNN, tax, and insurance documentation</li>
          <li>Verification of lease-defined caps and exclusions</li>
          <li>Confirmation of pro-rata share calculations</li>
          <li>Identification of misclassified or duplicate charges</li>
          <li>Potential reimbursement or credits for overcharges</li>
        </ul>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Common Audit Deadlines
        </h2>

        <p>
          Most leases require tenants to object in writing within a defined audit
          window after receiving a reconciliation statement.
        </p>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>30 days after reconciliation delivery</li>
          <li>60 days after year-end statements</li>
          <li>90–120 days in more tenant-favorable leases</li>
        </ul>

        <p>
          If objections are not made within this window, the charges are
          typically deemed final — even if they are incorrect.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          How to Preserve Your Audit Rights
        </h2>

        <p>
          The best way to protect audit rights is to review lease language and
          reconciliation statements as soon as they are received. A structured
          audit can surface issues early and help tenants act before deadlines
          expire.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-gray-50 p-8 text-center">
        <h3 className="text-2xl font-semibold">
          Not sure if your audit window is still open?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          Upload your lease and receive a tenant-first CAM & NNN audit that
          highlights deadlines, risks, and potential overcharges.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-6 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start Lease Audit
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
