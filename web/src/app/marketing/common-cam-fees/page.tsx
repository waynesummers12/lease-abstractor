// src/app/marketing/common-cam-fees/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Common CAM Fees Explained | Commercial Lease CAM Charges | SaveOnLease",
  description:
    "Learn the most common CAM fees charged to commercial tenants, which costs are typically allowed, and where landlords often overcharge.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What expenses are typically included in CAM fees?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "CAM fees often include landscaping, snow removal, parking lot maintenance, common area utilities, janitorial services, and security.",
      },
    },
    {
      "@type": "Question",
      name: "Are administrative fees part of CAM charges?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Administrative fees may be included in CAM charges, but they are often capped or limited by lease language and frequently exceed those limits.",
      },
    },
    {
      "@type": "Question",
      name: "Which CAM fees are commonly disputed?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Commonly disputed CAM fees include excessive administrative fees, capital repairs, costs benefiting vacant space, and duplicate charges.",
      },
    },
  ],
};

export default function CommonCamFeesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 space-y-12">
      {/* HERO */}
      <section>
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight">
          Common CAM Fees Explained
        </h1>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          Common Area Maintenance (CAM) fees can include a wide range of costs.
          Understanding which fees are allowed — and which are frequently
          overcharged — is critical for commercial tenants.
        </p>
      </section>

      {/* CONTENT */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          CAM fees are intended to cover the costs of maintaining shared areas of
          a commercial property. Lease definitions vary widely, and many expenses
          billed as CAM are limited, capped, or excluded entirely by the lease.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Typical CAM Fee Categories
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Landscaping and exterior maintenance</li>
          <li>Snow removal and ice management</li>
          <li>Parking lot maintenance and striping</li>
          <li>Common area utilities (lighting, water)</li>
          <li>Janitorial services for shared spaces</li>
          <li>Security and monitoring services</li>
        </ul>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Fees That Often Raise Red Flags
        </h2>

        <p>
          Certain CAM charges are frequently disputed because they exceed lease
          limits or shift landlord responsibilities to tenants.
        </p>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Administrative or management fees above stated caps</li>
          <li>Capital repairs billed as routine maintenance</li>
          <li>Costs benefiting vacant or non-common areas</li>
          <li>Duplicate charges across CAM and other categories</li>
          <li>Expenses unrelated to property operations</li>
        </ul>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Why CAM Fees Are Often Overstated
        </h2>

        <p>
          CAM reconciliations are typically prepared in bulk and rely on internal
          accounting assumptions. Small allocation errors or broad expense
          definitions can materially increase tenant charges over time.
        </p>

        <p>
          Because CAM costs recur annually, even modest overcharges can compound
          into significant dollar exposure.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          How Tenants Can Review CAM Fees
        </h2>

        <p>
          A proper CAM review compares billed expenses against lease definitions,
          caps, and exclusions. Identifying issues early allows tenants to act
          within audit windows and avoid waiving dispute rights.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-gray-50 p-8 text-center">
        <h3 className="text-2xl font-semibold">
          Unsure which CAM fees apply to your lease?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          Upload your lease and receive a tenant-first CAM audit highlighting
          questionable fees and potential overcharges.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-6 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start CAM Audit (Free Preview)
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
