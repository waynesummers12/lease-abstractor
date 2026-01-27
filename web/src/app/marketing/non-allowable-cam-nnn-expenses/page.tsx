// web/src/app/marketing/non-allowable-cam-nnn-expenses/page.tsx

import Link from "next/link";

export const metadata = {
  title:
    "Non-Allowable CAM & NNN Expenses — What Landlords Often Charge Illegally",
  description:
    "Many CAM and NNN charges are not allowed under commercial leases. Learn which expenses tenants can challenge and how to identify overcharges.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* HERO */}
      <header className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Non-Allowable CAM & NNN Expenses — What Tenants Should Never Pay
        </h1>

        <p className="mb-6 text-gray-600">
          Many CAM and NNN charges appear legitimate — but are explicitly
          excluded by lease language. These “non-allowable” expenses are one of
          the most common sources of tenant overpayment.
        </p>

        <Link
          href="/product/app"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check for non-allowable charges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure & private · No obligation · Takes 2–3 minutes
        </p>
      </header>

      {/* WHAT DOES NON-ALLOWABLE MEAN */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Does “Non-Allowable” Mean?
        </h2>

        <p className="text-gray-700">
          Non-allowable CAM or NNN expenses are costs that landlords are not
          permitted to pass through to tenants under the lease — even if they
          appear on a reconciliation statement.
        </p>

        <p className="mt-4 text-gray-700">
          These exclusions are often buried deep in lease language and missed by
          tenants reviewing annual reconciliations.
        </p>
      </section>

      {/* COMMON NON-ALLOWABLE EXPENSES */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          Common Non-Allowable CAM / NNN Expenses
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Capital improvements and major repairs</li>
          <li>Roof replacement and structural work</li>
          <li>Leasing commissions and marketing costs</li>
          <li>Landlord overhead and corporate expenses</li>
          <li>Legal fees unrelated to operations</li>
          <li>Costs benefiting vacant space</li>
          <li>Duplicate or bundled admin fees</li>
        </ul>

        <p className="mt-4 text-gray-700">
          These charges are frequently passed through anyway — relying on tenant
          inattention.
        </p>
      </section>

      {/* HOW THEY SLIP THROUGH */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          How Non-Allowable Charges Slip Through
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Vague or undefined expense categories</li>
          <li>Bundled line items hiding excluded costs</li>
          <li>Admin fees applied to non-recoverable expenses</li>
          <li>Tenants assuming charges are “standard”</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Reconciliation statements often look official — but accuracy is not
          guaranteed.
        </p>
      </section>

      {/* CHALLENGE RIGHTS */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Can Tenants Challenge Non-Allowable Expenses?
        </h2>

        <p className="text-gray-700">
          Yes. Most commercial leases allow tenants to dispute charges that
          violate lease terms — but only within a limited audit window.
        </p>

        <p className="mt-3 text-gray-700">
          Once the audit window closes, even incorrect charges may become final.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <Link
            href="/marketing/cam-admin-page"
            className="underline"
          >
            CAM admin fees explained →
          </Link>

          <Link
            href="/marketing/cam-expense-caps"
            className="underline"
          >
            CAM expense caps →
          </Link>

          <Link
            href="/marketing/nnn-audit-rights"
            className="underline"
          >
            NNN audit rights →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <h3 className="mb-3 text-xl font-semibold">
          Find Non-Allowable Charges Hidden in Your Lease
        </h3>

        <p className="mb-6 text-gray-600">
          Our automated lease review flags excluded expenses, admin fee abuse,
          and reconciliation errors before audit deadlines expire.
        </p>

        <Link
          href="/product/app"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check CAM / NNN charges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure · Private · No obligation
        </p>
      </section>
    </main>
  );
}
