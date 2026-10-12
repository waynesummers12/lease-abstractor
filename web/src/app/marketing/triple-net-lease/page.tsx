import Link from "next/link";
import type { Metadata } from "next";

const url = "https://www.saveonlease.com/marketing/triple-net-lease";

export const metadata: Metadata = {
  title: "What Is a Triple Net (NNN) Lease? | SaveOnLease",
  description:
    "Learn what taxes, insurance, and CAM mean in a triple net lease, how estimates are reconciled, and which lease terms to check against a statement.",
  alternates: { canonical: url },
  openGraph: {
    title: "What Is a Triple Net (NNN) Lease?",
    description:
      "A practical guide to NNN charges, annual reconciliations, and lease terms to verify.",
    url,
    siteName: "SaveOnLease",
    type: "article",
    images: [{ url: "https://www.saveonlease.com/og-triple-net-lease.jpg" }],
  },
};

export default function TripleNetLeasePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is a Triple Net (NNN) Lease?",
    description:
      "A practical guide to taxes, insurance, CAM, and reconciliation in a triple net lease.",
    author: { "@type": "Organization", name: "SaveOnLease" },
    publisher: { "@type": "Organization", name: "SaveOnLease" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <main className="mx-auto max-w-4xl space-y-12 px-6 py-16 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          What is a triple net (NNN) lease?
        </h1>
        <p className="text-lg text-slate-700">
          A triple net lease generally requires the tenant to pay base rent
          plus a share of three expense groups: property taxes, building
          insurance, and common area maintenance (CAM). The lease defines
          exactly which costs belong in each group and how the tenant&apos;s
          share is calculated.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">The three NNN expense groups</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-slate-700">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-5">Group</th>
                <th className="py-3 pr-5">Typical statement entry</th>
                <th className="py-3">What to compare with the lease</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 pr-5 font-semibold">Property taxes</td>
                <td className="py-3 pr-5">Real estate tax bill</td>
                <td className="py-3">Property included, share, and adjustments</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-5 font-semibold">Insurance</td>
                <td className="py-3 pr-5">Building insurance premium</td>
                <td className="py-3">Covered policies and allocation method</td>
              </tr>
              <tr>
                <td className="py-3 pr-5 font-semibold">CAM</td>
                <td className="py-3 pr-5">Shared area and operating costs</td>
                <td className="py-3">Included costs, exclusions, caps, and fees</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-700">
          Learn more about{" "}
          <Link href="/marketing/common-area-maintenance" className="text-emerald-800 underline">
            common area maintenance
          </Link>
          . A category name on a bill does not establish that every amount in
          it is permitted by your lease.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How a tenant share is calculated</h2>
        <p className="text-slate-700">
          Some leases use the ratio of the tenant&apos;s rentable area to a
          defined building or project area. For example, 5,000 square feet
          divided by 50,000 square feet equals 10%. Applying that share to
          $100,000 in allowed costs gives $10,000. Your lease may use a
          different denominator, cost pool, or allocation method, so check
          the actual definition before using this example.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why the annual bill can change</h2>
        <p className="text-slate-700">
          Under many NNN arrangements, tenants make estimated payments during
          the year. An annual statement compares those payments with the
          tenant&apos;s calculated share of actual costs and shows a balance or
          credit. Check the period covered, each expense group, the share
          applied, and all payments credited. The lease controls the timing
          and treatment of any adjustment.
        </p>
        <p className="text-slate-700">
          Our{" "}
          <Link href="/marketing/cam-reconciliation" className="text-emerald-800 underline">
            CAM reconciliation guide
          </Link>{" "}
          walks through that comparison in more detail.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">A simple occupancy cost example</h2>
        <p className="text-slate-700">
          Suppose a 5,000 square foot tenant pays annual base rent of $25 per
          square foot, taxes of $4, insurance of $1, and CAM of $6. The total
          is $36 per square foot, or $180,000 for the year. This is only an
          arithmetic illustration; it is not a quote or a forecast for any
          property.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          What to check before claiming an overcharge
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-700">
          <li>Does the lease include or exclude the billed cost?</li>
          <li>Does a cap or administrative fee limit apply to that category?</li>
          <li>Was a capital project treated as the lease requires?</li>
          <li>Was the correct area, cost pool, and tenant share used?</li>
          <li>Were all estimated payments and credits counted?</li>
          <li>What records and notice procedure does the lease provide?</li>
        </ul>
        <p className="text-slate-700">
          A surprising charge is a reason to ask for backup, not proof of an
          error. Use the{" "}
          <Link href="/marketing/cam-audit-checklist" className="text-emerald-800 underline">
            CAM review checklist
          </Link>{" "}
          to organize the lease language, statement, and supporting records.
        </p>
      </section>

      <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-2xl font-semibold">Review your own NNN terms</h2>
        <p className="mt-3 text-slate-700">
          Start with a free lease preview. Add an annual statement and
          supporting PDFs before checkout if you have them. The $49.99 report
          compares visible billing details with extracted lease terms and
          identifies what still needs verification.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-5 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          Upload your lease for a free preview
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Related guides</h2>
        <ul className="list-disc space-y-2 pl-6 text-emerald-800">
          <li>
            <Link href="/marketing/triple-net-lease-vs-gross">
              Triple net versus gross leases
            </Link>
          </li>
          <li>
            <Link href="/marketing/nnn-expenses-explained">
              NNN expenses explained
            </Link>
          </li>
          <li>
            <Link href="/marketing/nnn-audit-rights">
              Check your lease&apos;s review and notice terms
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
