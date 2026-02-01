// web/src/app/marketing/nnn-property-tax-charges-explained/page.tsx

import Link from "next/link";

export const metadata = {
  title:
    "NNN Property Tax Charges Explained — What Tenants Pay, What’s Allowed, and What’s Not",
  description:
    "NNN property tax charges are one of the largest and fastest-growing tenant expenses. Learn how they’re calculated, common overcharges, and what tenants can challenge.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* HERO */}
      <header className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          NNN Property Tax Charges Explained — Why Your Costs Keep Rising
        </h1>

        <p className="mb-6 text-gray-600">
          Property taxes are often the single largest component of NNN charges —
          and one of the most misunderstood. Many tenants unknowingly absorb tax
          increases they are not required to pay.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to review property tax charges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure & private · No obligation · Takes 2–3 minutes
        </p>
      </header>

      {/* WHAT ARE PROPERTY TAX CHARGES */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Are NNN Property Tax Charges?
        </h2>

        <p className="text-gray-700">
          In a triple-net (NNN) lease, tenants typically reimburse the landlord
          for real estate taxes assessed on the property. These costs are passed
          through annually as part of NNN expenses.
        </p>

        <p className="mt-4 text-gray-700">
          Property tax charges are based on:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Local tax assessments</li>
          <li>Assessed property value</li>
          <li>Tax rate changes by jurisdiction</li>
        </ul>
      </section>

      {/* HOW TAXES ARE CALCULATED */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          How Property Taxes Should Be Passed Through
        </h2>

        <ol className="list-decimal space-y-2 pl-5 text-gray-700">
          <li>Government assesses property value</li>
          <li>Tax rate is applied</li>
          <li>Total tax bill is issued to landlord</li>
          <li>Tenant pays pro-rata share (per lease terms)</li>
        </ol>

        <p className="mt-4 text-gray-700">
          Errors often arise in how increases, reassessments, and allocations
          are handled.
        </p>
      </section>

      {/* COMMON TAX OVERCHARGES */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          Common Property Tax Overcharges
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Passing through reassessment spikes improperly</li>
          <li>Charging tenants for tax appeals initiated by landlord</li>
          <li>Including penalties or late fees</li>
          <li>Incorrect pro-rata calculations</li>
          <li>Applying taxes to excluded lease periods</li>
        </ul>

        <p className="mt-4 text-gray-700">
          These errors often compound year over year, quietly inflating rent
          obligations.
        </p>
      </section>

      {/* BASE YEAR & CAPS */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Base Year and Property Tax Caps
        </h2>

        <p className="text-gray-700">
          Many leases limit tax pass-throughs using a base year or escalation
          cap. Tenants are often only responsible for increases above that base.
        </p>

        <p className="mt-3 text-gray-700">
          If base year calculations are wrong, tenants may pay increases they
          never agreed to.
        </p>

        <Link
          href="/marketing/cam-expense-caps"
          className="mt-4 inline-block text-sm font-semibold underline"
        >
          Learn how expense caps work →
        </Link>
      </section>

      {/* WHY TENANTS MISS TAX ERRORS */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Why Tenants Rarely Question Property Taxes
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Taxes feel “government-mandated”</li>
          <li>Reconciliation statements lack detail</li>
          <li>Tenants assume increases are unavoidable</li>
          <li>Audit windows expire quickly</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Once audit deadlines pass, incorrect tax charges often become final.
        </p>
      </section>

      {/* CAN IT BE CHALLENGED */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Can Property Tax Charges Be Challenged?
        </h2>

        <p className="text-gray-700">
          Yes. Tenants can often challenge incorrect allocations, base year
          errors, and improper pass-throughs — but only within the lease’s audit
          window.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/marketing/pro-rata-share-explained" className="underline">
            Pro-rata share explained →
          </Link>

          <Link href="/marketing/nnn-audit-rights" className="underline">
            NNN audit rights →
          </Link>

          <Link href="/marketing/nnn-insurance-charges-explained" className="underline">
            NNN insurance charges →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <h3 className="mb-3 text-xl font-semibold">
          Check Your NNN Property Tax Charges Automatically
        </h3>

        <p className="mb-6 text-gray-600">
          Our lease audit flags incorrect tax allocations, base year errors,
          and hidden increases — before audit windows close.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to review tax charges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure · Private · No obligation
        </p>
      </section>
    </main>
  );
}
