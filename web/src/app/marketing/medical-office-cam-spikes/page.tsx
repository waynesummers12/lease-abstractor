import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CAM Spikes in Medical Office Buildings | Healthcare Tenant Risk",
  description:
    "Why CAM costs spike in medical office buildings. Insurance increases, property tax reassessments, capital improvements, compliance upgrades, and admin fee stacking explained for imaging centers and outpatient practices.",
};

export default function CAMSpikesMedical() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          CAM Spikes in Medical Buildings
        </h1>
        <p className="text-lg text-gray-700">
          Medical office CAM expenses can increase dramatically within just a few
          years. Insurance premiums, property tax reassessments, compliance
          upgrades, and capital improvements are frequently pushed through as
          operating costs.
        </p>
      </section>

      {/* Why Spikes Happen */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Why Medical CAM Costs Rise Faster Than Standard Office
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Sharp insurance premium increases for healthcare properties</li>
          <li>Property tax reassessments tied to medical tenant demand</li>
          <li>Post‑COVID ventilation and air filtration upgrades</li>
          <li>Security, monitoring, and compliance system expansion</li>
          <li>Capital improvements reclassified as CAM</li>
        </ul>
      </section>

      {/* Example Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Example CAM Spike Scenario
        </h2>
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Year</th>
              <th className="p-3">CAM PSF</th>
              <th className="p-3">10,000 SF Annual Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">Year 1</td>
              <td className="p-3">$7.00</td>
              <td className="p-3">$70,000</td>
            </tr>
            <tr>
              <td className="p-3">Year 3</td>
              <td className="p-3">$12.00</td>
              <td className="p-3">$120,000</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-gray-700">
          A $5 PSF increase on a 10,000 SF imaging center equals $50,000 in
          additional annual operating exposure.
        </p>
      </section>

      {/* Hidden Risk */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Hidden Risk: Admin Fee Stacking
        </h2>
        <p className="text-gray-700">
          Many medical leases cap CAM admin fees at 8–12%. When CAM increases,
          percentage-based admin fees increase proportionally. If caps are
          ignored or layered incorrectly, tenants pay compounded overcharges.
        </p>
        <p className="mt-4 text-gray-600">
          Review common <Link href="/marketing/medical-practice-lease-overcharges" className="underline text-blue-600">medical lease overcharge patterns</Link>.
        </p>
      </section>

      {/* Internal Linking */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Protect Your Practice
        </h2>
        <p className="text-gray-700">
          CAM spikes are not always unavoidable. Lease language determines
          whether increases are contractually permitted.
        </p>
        <div className="space-y-2 mt-4">
          <p>
            Start with the <Link href="/marketing/medical-office-lease-audit" className="underline text-blue-600">medical lease audit hub</Link>.
          </p>
          <p>
            Understand <Link href="/marketing/medical-office-cam-reconciliation" className="underline text-blue-600">medical CAM reconciliations</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Review My CAM Charges
        </Link>
      </section>

    </main>
  );
}