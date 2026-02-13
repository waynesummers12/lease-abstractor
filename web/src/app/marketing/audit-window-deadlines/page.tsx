// src/app/marketing/audit-window-deadlines/page.tsx
import Link from "next/link";
import FaqSchema from "@/app/components/FaqSchema";

export const metadata = {
  title: "Commercial Lease Audit Rights Explained | CAM & NNN | SaveOnLease",
  description:
    "Learn how commercial lease audit rights work, common CAM & NNN audit deadlines, and how tenants can preserve their right to dispute overcharges.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/audit-window-deadlines",
  },
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
          language and typically apply to{" "}
          <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">
            CAM reconciliation
          </Link>,{" "}
          <Link href="/marketing/cam-nnn-overcharges" className="underline hover:text-black">
            CAM & NNN overcharges
          </Link>, tax, and insurance charges.
        </p>

        <p>
          Landlords often provide annual reconciliation statements without
          highlighting tenant audit deadlines, leaving many tenants unaware of
          their limited window to object.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          What Audit Rights Typically Cover
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Review of CAM and NNN expense documentation</li>
          <li>Verification of lease-defined caps and exclusions</li>
          <li>Confirmation of pro-rata share calculations</li>
          <li>Identification of misclassified or duplicate charges</li>
          <li>Potential reimbursement or credit for overcharges</li>
        </ul>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Common Audit Deadlines
        </h2>

        <p>
          Most leases require tenants to object to charges within a defined
          audit window after receiving a reconciliation statement.
        </p>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>30 days after reconciliation delivery</li>
          <li>60 days after year-end statement</li>
          <li>90–120 days in more tenant-favorable leases</li>
        </ul>

        <p>
          If objections are not made in writing within this window, the charges
          are typically deemed final — even if incorrect.
        </p>
        <p>
          Missing a 60-day audit window can lock in five-figure CAM or NNN
          overcharges for the life of a lease. Because operating expenses recur
          annually, even a modest $5,000 error can compound into tens of
          thousands of dollars over a multi-year term.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Example Lease Audit Deadline Clause
        </h2>

        <p>
          Many commercial leases include language similar to the following:
        </p>

        <div className="rounded-lg border bg-gray-100 p-6 text-base text-gray-800">
          <p className="italic">
            “Tenant shall notify Landlord in writing of any objection to the
            annual reconciliation statement within sixty (60) days after
            receipt. Failure to object within such period shall constitute
            Tenant’s acceptance of the statement as final and binding.”
          </p>
        </div>

        <p>
          While the exact wording varies, the structure is consistent: a defined
          objection period, a written notice requirement, and automatic
          acceptance if no action is taken. Understanding this language is
          critical before audit windows expire.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Why Tenants Lose Audit Rights
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Deadlines buried deep in lease language</li>
          <li>Reconciliation statements arrive during busy periods</li>
          <li>Assumption that charges are non-negotiable</li>
          <li>Lack of time or expertise to review documentation</li>
        </ul>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          How to Preserve Your Audit Rights
        </h2>

        <p>
          The best way to protect audit rights is to review lease language and
          reconciliation statements as soon as they are received. A structured
          audit — particularly of{" "}
          <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">
            annual CAM reconciliation statements
          </Link>{" "}
          — can surface issues early and help tenants act before deadlines
          expire.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          What If the Audit Window Has Already Closed?
        </h2>

        <p>
          Even if the formal audit window has expired, all leverage is not necessarily lost.
          Some leases allow limited follow-up review, and many landlords remain open to
          discussion when presented with clear documentation of errors.
        </p>

        <p>
          Identifying reconciliation mistakes can still strengthen negotiations,
          protect future years, and prevent recurring overcharges. Understanding what
          happened — even after a deadline — is often financially valuable.
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
          Start Lease Audit (Free Preview)
        </Link>
      </section>

      {/* FAQ Schema (SEO) */}
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
                name: "Audit Window Deadlines",
                item: "https://saveonlease.com/marketing/audit-window-deadlines",
              },
            ],
          }),
        }}
      />
      <FaqSchema
        faqs={[
          {
            question: "What are audit rights in a commercial lease?",
            answer:
              "Audit rights give tenants the contractual ability to review and challenge CAM, NNN, tax, and insurance charges billed by a landlord.",
          },
          {
            question: "Are CAM and NNN audit rights time-limited?",
            answer:
              "Yes. Most leases impose strict deadlines—often 30 to 90 days after reconciliation delivery—after which audit rights are waived.",
          },
          {
            question: "What happens if a tenant misses the audit deadline?",
            answer:
              "If the audit window closes, charges are usually deemed final, even if they include errors or non-lease-compliant expenses.",
          },
          {
            question: "Can tenants audit prior years of CAM or NNN charges?",
            answer:
              "In most cases, audit rights apply only to the defined window for each reconciliation year. However, identifying past errors can still inform negotiations or prevent similar issues in future years.",
          },
          {
            question: "Do tenants need an accountant or attorney to audit CAM charges?",
            answer:
              "Not necessarily. While professionals can assist in complex situations, many audit rights issues relate directly to lease language, expense caps, and allocation math that can be reviewed systematically.",
          },
          {
            question: "How can tenants protect their audit rights?",
            answer:
              "Tenants should review leases carefully, track reconciliation receipt dates, and conduct structured audits as soon as statements are received.",
          },
        ]}
      />
    </main>
  );
}
