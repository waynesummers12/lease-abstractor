// web/src/app/marketing/pro-rata-share-explained/page.tsx

import Link from "next/link";

export const metadata = {
  title:
    "Pro-Rata Share Explained — How CAM & NNN Charges Are Calculated (and Overcharged)",
  description:
    "Pro-rata share errors are one of the most common CAM and NNN overcharges. Learn how pro-rata share works, how landlords miscalculate it, and what tenants can challenge.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* HERO */}
      <header className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Pro-Rata Share Explained — How CAM & NNN Charges Are Really Calculated
        </h1>

        <p className="mb-6 text-gray-600">
          Pro-rata share errors quietly cost tenants thousands every year. Even
          small miscalculations can inflate CAM and NNN charges far beyond what
          your lease allows.
        </p>

        <Link
          href="/product/app"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check pro-rata errors
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure & private · No obligation · Takes 2–3 minutes
        </p>
      </header>

      {/* WHAT IS PRO RATA */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Is Pro-Rata Share?
        </h2>

        <p className="text-gray-700">
          Pro-rata share is the percentage of a building’s operating expenses
          that a tenant is responsible for paying. It is typically based on the
          tenant’s square footage divided by the total leasable area.
        </p>

        <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
          <strong>Example:</strong>  
          If your space is 2,500 sq ft in a 25,000 sq ft building, your pro-rata
          share is <strong>10%</strong>.
        </div>

        <p className="mt-4 text-gray-700">
          That percentage is then applied to CAM, taxes, insurance, or other NNN
          expenses — year after year.
        </p>
      </section>

      {/* HOW IT SHOULD BE CALCULATED */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          How Pro-Rata Share Should Be Calculated
        </h2>

        <ol className="list-decimal space-y-2 pl-5 text-gray-700">
          <li>Determine your leased square footage</li>
          <li>Determine the building’s total leasable area</li>
          <li>Divide tenant space by total leasable space</li>
          <li>Apply that percentage consistently to allowed expenses only</li>
        </ol>

        <p className="mt-4 text-gray-700">
          Sounds simple — but this is where many overcharges begin.
        </p>
      </section>

      {/* COMMON PRO RATA ERRORS */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          Common Pro-Rata Share Errors
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Inflated total building square footage</li>
          <li>Including vacant or non-leasable space</li>
          <li>Using gross building size instead of leasable area</li>
          <li>Changing the denominator year-to-year</li>
          <li>Applying pro-rata share to non-allowable expenses</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Even a 1–2% error can compound into thousands of dollars annually.
        </p>
      </section>

      {/* WHY TENANTS MISS IT */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Why Tenants Rarely Catch Pro-Rata Errors
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Square footage assumptions go unchecked</li>
          <li>Reconciliation statements don’t show calculations</li>
          <li>Tenants trust landlord-provided numbers</li>
          <li>Audit windows close quickly</li>
        </ul>
      </section>

      {/* CAN IT BE CHALLENGED */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Can Pro-Rata Share Be Challenged?
        </h2>

        <p className="text-gray-700">
          Yes. Most leases allow tenants to dispute incorrect calculations —
          including square footage errors and improper allocations — but only
          within a defined audit window.
        </p>

        <p className="mt-3 text-gray-700">
          Once that window closes, incorrect pro-rata percentages may become
          locked in permanently.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/marketing/cam-expense-caps" className="underline">
            CAM expense caps →
          </Link>

          <Link href="/marketing/nnn-audit-rights" className="underline">
            NNN audit rights →
          </Link>

          <Link href="/marketing/non-allowable-cam-nnn-expenses" className="underline">
            Non-allowable expenses →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <h3 className="mb-3 text-xl font-semibold">
          Verify Your Pro-Rata Share Automatically
        </h3>

        <p className="mb-6 text-gray-600">
          Our lease audit checks square footage assumptions, allocation methods,
          and CAM / NNN calculations for hidden pro-rata errors.
        </p>

        <Link
          href="/product/app"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check pro-rata share
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure · Private · No obligation
        </p>
      </section>
    </main>
  );
}
