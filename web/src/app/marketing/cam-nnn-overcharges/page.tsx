// src/app/marketing/cam-nnn-overcharges/page.tsx
import Link from "next/link";

export const metadata = {
  title: "CAM & NNN Overcharges Explained | SaveOnLease",
  description:
    "Learn what CAM and NNN overcharges are, how they happen, and how commercial tenants can identify billing errors before audit deadlines expire.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are CAM and NNN overcharges?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "CAM and NNN overcharges occur when landlords bill tenants for expenses that exceed lease limits, are excluded by the lease, or are calculated incorrectly.",
      },
    },
    {
      "@type": "Question",
      name: "How common are CAM and NNN billing errors?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "CAM and NNN billing errors are common due to complex lease language, administrative fees, allocation mistakes, and reconciliation errors.",
      },
    },
    {
      "@type": "Question",
      name: "Can tenants recover CAM and NNN overcharges?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Tenants may recover overcharges if they identify errors within the lease’s audit window and follow the required dispute process.",
      },
    },
  ],
};

export default function CamNnnOverchargesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 space-y-12">
      {/* HERO */}
      <section>
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight">
          CAM & NNN Overcharges Explained
        </h1>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          Many commercial tenants unknowingly overpay CAM and NNN charges due to
          unclear lease language, billing errors, and missed audit rights.
        </p>
      </section>

      {/* CONTENT */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          Common Area Maintenance (CAM) and Triple Net (NNN) charges are often
          complex, inconsistently billed, and difficult for tenants to verify.
          Landlords typically reconcile these costs annually, leaving tenants a
          short window to review and dispute errors.
        </p>

        <p>
          Overcharges usually occur when expenses that are excluded or limited by
          the lease are passed through anyway, or when calculations are applied
          incorrectly.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Common CAM & NNN Overcharge Examples
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Administrative and management fees exceeding lease caps</li>
          <li>Capital expenditures improperly charged to tenants</li>
          <li>Insurance and tax pass-throughs applied incorrectly</li>
          <li>Incorrect square footage or pro-rata share calculations</li>
          <li>Expenses billed outside allowable CAM definitions</li>
        </ul>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Why Audit Windows Matter
        </h2>

        <p>
          Most commercial leases give tenants only 30 to 120 days to audit and
          dispute CAM and NNN charges after receiving a reconciliation statement.
          Missing this window often means losing recovery rights permanently.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          How Tenants Can Protect Themselves
        </h2>

        <p>
          A structured audit compares lease language against billed expenses to
          surface errors early and quantify potential exposure before deadlines
          expire.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-gray-50 p-8 text-center">
        <h3 className="text-2xl font-semibold">
          Think you might be overpaying?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          Upload your lease and receive a tenant-first CAM & NNN audit with clear
          findings and estimated exposure.
        </p>
        <Link
          href="/product/app"
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
