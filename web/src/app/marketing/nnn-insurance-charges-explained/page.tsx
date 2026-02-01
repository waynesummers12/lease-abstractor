// web/src/app/marketing/nnn-insurance-charges-explained/page.tsx

import Link from "next/link";

export const metadata = {
  title:
    "NNN Insurance Charges Explained — What Tenants Pay, What’s Allowed, and What’s Not",
  description:
    "NNN insurance charges are commonly misunderstood and frequently overcharged. Learn what landlords can pass through, common insurance overcharges, and what tenants can challenge.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* HERO */}
      <header className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          NNN Insurance Charges Explained — What Tenants Really Pay
        </h1>

        <p className="mb-6 text-gray-600">
          Insurance is one of the largest and least-questioned components of NNN
          charges. Many tenants overpay simply because insurance costs are
          bundled, opaque, and rarely reviewed.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to review NNN insurance charges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure & private · No obligation · Takes 2–3 minutes
        </p>
      </header>

      {/* WHAT ARE NNN INSURANCE CHARGES */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Are NNN Insurance Charges?
        </h2>

        <p className="text-gray-700">
          In a triple-net (NNN) lease, tenants typically reimburse the landlord
          for property insurance covering the building and common areas. These
          charges are passed through annually as part of NNN expenses.
        </p>

        <p className="mt-4 text-gray-700">
          Insurance charges usually include premiums for policies such as:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Property (hazard) insurance</li>
          <li>General liability insurance</li>
          <li>Umbrella or excess liability coverage</li>
          <li>Occasionally flood or specialty coverage</li>
        </ul>
      </section>

      {/* HOW IT SHOULD WORK */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          How Insurance Charges Should Be Calculated
        </h2>

        <ol className="list-decimal space-y-2 pl-5 text-gray-700">
          <li>Landlord pays insurance premiums for the building</li>
          <li>Total premium cost is identified</li>
          <li>Costs are allocated using tenant pro-rata share</li>
          <li>Only lease-permitted policies are passed through</li>
        </ol>

        <p className="mt-4 text-gray-700">
          Problems arise when policies, allocation methods, or markups exceed
          what the lease allows.
        </p>
      </section>

      {/* COMMON INSURANCE OVERCHARGES */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          Common NNN Insurance Overcharges
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Passing through landlord-specific insurance</li>
          <li>Including excessive umbrella coverage</li>
          <li>Charging for unrelated properties</li>
          <li>Applying admin or management fees on insurance</li>
          <li>Using inflated pro-rata calculations</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Insurance is often bundled into reconciliation statements, making these
          errors hard to spot.
        </p>
      </section>

      {/* WHEN INSURANCE IS NOT ALLOWED */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          When Insurance Charges Are Not Allowed
        </h2>

        <p className="text-gray-700">
          Many leases restrict insurance pass-throughs. Charges may be
          challengeable when they include:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Landlord business insurance</li>
          <li>Excessive or duplicative policies</li>
          <li>Coverage beyond the leased premises</li>
          <li>Insurance unrelated to operating expenses</li>
        </ul>
      </section>

      {/* WHY TENANTS MISS IT */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Why Tenants Rarely Review Insurance Charges
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Insurance language is dense and technical</li>
          <li>Premiums fluctuate year-to-year</li>
          <li>Statements lack policy-level detail</li>
          <li>Audit windows close quickly</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Once the audit window closes, insurance overcharges often become final.
        </p>
      </section>

      {/* CAN IT BE CHALLENGED */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Can NNN Insurance Charges Be Challenged?
        </h2>

        <p className="text-gray-700">
          Yes. Tenants often have audit rights that allow them to request backup
          documentation and dispute insurance charges that exceed lease
          allowances.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/marketing/pro-rata-share-explained" className="underline">
            Pro-rata share explained →
          </Link>

          <Link href="/marketing/nnn-audit-rights" className="underline">
            NNN audit rights →
          </Link>

          <Link href="/marketing/cam-expense-caps" className="underline">
            CAM & NNN expense caps →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <h3 className="mb-3 text-xl font-semibold">
          Review Your NNN Insurance Charges Automatically
        </h3>

        <p className="mb-6 text-gray-600">
          Our lease audit checks insurance policies, allocations, and admin fees
          against your lease — before audit windows close.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check insurance charges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure · Private · No obligation
        </p>
      </section>
    </main>
  );
}
