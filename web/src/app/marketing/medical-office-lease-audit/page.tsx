import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office Lease Audit | CAM & NNN Review for Healthcare Tenants",
  description:
    "Audit your medical office lease for CAM overcharges, NNN pass-through errors, admin fee violations, and capital expense misallocations. Built for imaging centers, urgent care, dental and multi-specialty practices.",
};

export default function MedicalOfficeLeaseAudit() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Medical Office NNN Expenses Explained
        </h1>
        <p className="text-lg text-gray-700">
          Independent practices often underestimate total NNN exposure. In
          medical buildings, insurance premiums, tax reassessments, and layered
          CAM admin fees can materially increase annual occupancy cost.
        </p>
      </section>

      {/* Example Breakdown */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Real Example: 10,000 SF Imaging Center
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg text-gray-800 space-y-2">
          <p>Base Rent: $30 PSF = $300,000</p>
          <p>NNN: $9 PSF = $90,000</p>
          <p className="font-semibold">Total Annual Occupancy: $390,000+</p>
        </div>
        <p className="mt-4 text-gray-700">
          Small allocation errors in taxes, insurance, or CAM administration can
          shift tens of thousands of dollars annually.
        </p>
      </section>

      {/* NNN Components */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          What Medical Tenants Actually Pay
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Property taxes and reassessments</li>
          <li>Building insurance allocation</li>
          <li>Common Area Maintenance (CAM)</li>
          <li>CAM administrative fees</li>
          <li>Capital reserve contributions</li>
        </ul>
      </section>

      {/* Risk Framing */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Why Healthcare Properties Carry Higher Exposure
        </h2>
        <p className="text-gray-700">
          Medical buildings often carry higher operating intensity due to
          extended hours, equipment loads, compliance infrastructure, and
          redundancy systems. Without strict lease caps, tenants absorb these
          increases through NNN pass-through.
        </p>
      </section>

      {/* Internal Linking */}
      <section>
        <div className="space-y-2 text-gray-600">
          <p>
            Review the full <Link href="/marketing/medical-office-lease-audit" className="underline text-blue-600">medical lease audit hub</Link>.
          </p>
          <p>
            Learn about <Link href="/marketing/medical-practice-lease-overcharges" className="underline text-blue-600">medical lease overcharges</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-10">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Audit My Medical Lease
        </Link>
      </section>

    </main>
  );
}