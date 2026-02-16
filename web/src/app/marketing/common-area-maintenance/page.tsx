import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Common Area Maintenance (CAM) Explained | Commercial Lease Guide",
  description:
    "Learn what Common Area Maintenance (CAM) means in commercial leases, what expenses are included, how CAM fees are calculated, and how tenants can identify overcharges.",
};

export default function CommonAreaMaintenancePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          Common Area Maintenance (CAM) in Commercial Leases
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Common Area Maintenance (CAM) refers to the shared operating expenses
          tenants pay in addition to base rent under many commercial leases.
          These charges typically cover maintenance, repairs, and management of
          shared spaces such as parking lots, hallways, landscaping, and other
          common areas of a property.
        </p>
      </section>

      {/* WHAT IS CAM */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Is Common Area Maintenance?
        </h2>
        <p>
          In a triple net (NNN) lease or modified gross lease, tenants often
          contribute to the cost of maintaining shared areas of a building or
          shopping center. These costs are referred to as {" "}
          <Link href="/marketing/cam-charges" className="underline hover:text-black">
            CAM charges
          </Link>{" "}
          or {" "}
          <Link href="/marketing/cam-fee-meaning" className="underline hover:text-black">
            CAM fees
          </Link>
          .
        </p>
        <p>
          CAM expenses are usually allocated to tenants based on their
          <Link
            href="/marketing/pro-rata-share-explained"
            className="underline hover:text-black"
          >
            pro rata share
          </Link>
          , meaning each tenant pays a percentage based on the size of their
          leased space compared to the total rentable area.
        </p>
      </section>

      {/* WHAT CAM INCLUDES */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Do CAM Fees Typically Include?
        </h2>
        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Landscaping and snow removal</li>
          <li>Parking lot maintenance and striping</li>
          <li>Lighting for common areas</li>
          <li>Janitorial services for shared spaces</li>
          <li>Security services</li>
          <li>Property management administrative fees</li>
          <li>Repairs and routine maintenance</li>
        </ul>
        <p>
          However, not all expenses are automatically allowable. Many leases
          include caps, exclusions, and audit rights that limit what landlords
          can pass through.
        </p>
      </section>

      {/* CAM VS NNN */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          CAM vs. NNN: What’s the Difference?
        </h2>
        <p>
          CAM is often one component of a triple net (NNN) lease. In fact, under a{" "}
          <Link href="/marketing/nnn" className="underline hover:text-black">
            NNN (Triple Net) lease
          </Link>
          , tenants are typically responsible for property taxes, insurance, and
          Common Area Maintenance. NNN typically includes:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Property taxes</li>
          <li>Insurance</li>
          <li>Common Area Maintenance (CAM)</li>
        </ul>
        <p>
          Learn more about how these charges compare in our
          <Link
            href="/marketing/cam-vs-nnn"
            className="underline hover:text-black"
          >
            CAM vs NNN guide
          </Link>
          .
        </p>
      </section>

      {/* COMMON ISSUES */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Common CAM Billing Issues
        </h2>
        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Capital improvements incorrectly treated as operating expenses</li>
          <li>Charges exceeding lease-defined caps</li>
          <li>Administrative fees layered on top of CAM totals</li>
          <li>Vacant space costs allocated to tenants</li>
          <li>Duplicate charges across CAM and other expense categories</li>
        </ul>
        <p>
          These issues often surface during annual
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black"
          >
            CAM reconciliation
          </Link>{" "}
          and detailed reviews of {" "}
          <Link
            href="/marketing/cam-reconciliation-errors"
            className="underline hover:text-black"
          >
            CAM reconciliation errors
          </Link>
          .
        </p>
      </section>

      {/* CTA */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Concerned About CAM Overcharges?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Many commercial tenants overpay CAM expenses due to unclear lease
          language or improper expense allocation. Reviewing your lease and
          reconciliation statements through a {" "}
          <Link
            href="/marketing/commercial-lease-audit"
            className="underline hover:text-black"
          >
            commercial lease audit
          </Link>{" "}
          can uncover potential savings before {" "}
          <Link
            href="/marketing/audit-window-deadlines"
            className="underline hover:text-black"
          >
            audit window deadlines
          </Link>
          close.
        </p>
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:opacity-90"
        >
          Upload Your Lease
        </Link>
      </section>
    </main>
  );
}
