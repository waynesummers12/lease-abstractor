import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Medical Office CAM Reconciliation | How Healthcare Tenants Recover Overcharges",
  description:
    "Deep-dive guide to CAM reconciliations in medical office buildings. Learn how imaging centers and outpatient practices identify overcharges, capital expense violations, admin fee stacking, and NNN allocation errors.",
};

export default function MedicalOfficeCAM() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          Medical Office CAM Reconciliation — What Healthcare Tenants Must Review
        </h1>
        <p className="text-lg text-gray-700">
          CAM reconciliations in medical office buildings are materially more
          complex than traditional office properties. Imaging infrastructure,
          generator systems, parking structures, elevator modernization, and
          compliance-driven upgrades create recurring volatility that can add
          15–35% to total occupancy costs.
        </p>
        <p className="text-gray-600">
          Without structured review, medical tenants often absorb capital
          improvements and inflated admin allocations that exceed lease limits.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          How CAM Reconciliations Work in Medical Buildings
        </h2>
        <p className="text-gray-700">
          Landlords estimate operating expenses at the beginning of the year
          and bill tenants monthly. After year-end, actual expenses are compared
          against those estimates. Any shortfall is billed as a reconciliation.
        </p>
        <p className="text-gray-700">
          In healthcare buildings, expense categories frequently include
          infrastructure not seen in general office properties — including
          medical-grade HVAC systems, emergency power testing, clinical security
          monitoring, and high-load electrical balancing.
        </p>
      </section>

      {/* COST EXAMPLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Example: 12,000 SF Imaging Center Exposure
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-1">
          <p>$32 Base Rent = $384,000 Annual Base Rent</p>
          <p>$10 CAM/NNN = $120,000 Annual NNN</p>
          <p className="font-bold mt-2">Total Annual Occupancy Cost: $504,000</p>
        </div>
        <p className="text-gray-700">
          A $2 PSF misallocation increases annual exposure by $24,000 for this
          tenant. Over a 7-year term, that equals $168,000 in cumulative impact.
        </p>
      </section>

      {/* HIGH RISK ITEMS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          High-Risk CAM Line Items in Medical Buildings
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Lobby concierge and shared clinical staffing allocations</li>
          <li>Parking structure structural repairs and resurfacing</li>
          <li>Elevator modernization programs</li>
          <li>HVAC upgrades tied to imaging load increases</li>
          <li>Generator replacement and fuel reserve allocations</li>
          <li>Security system upgrades and compliance monitoring</li>
          <li>Capital projects classified as “operating expenses”</li>
        </ul>
      </section>

      {/* OVERCHARGE PATTERNS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Where Overcharges Commonly Occur
        </h2>
        <p className="text-gray-700">
          Overcharges frequently stem from capital improvements improperly
          passed through, administrative fees exceeding negotiated caps,
          duplicate vendor billing, or pro-rata share miscalculations.
        </p>
        <p className="text-gray-700">
          See related examples of
          {" "}
          <Link
            href="/marketing/medical-practice-lease-overcharges"
            className="text-emerald-600 underline"
          >
            medical lease overcharges
          </Link>.
        </p>
      </section>

      {/* INTERNAL CLUSTER LINKS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Related Medical Lease Resources
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-emerald-700">
          <li>
            <Link href="/marketing/medical-office-lease-audit">
              Medical Office Lease Audit Hub
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-nnn-expenses">
              Medical Office NNN Expense Breakdown
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-lease-audit-checklist">
              Medical Lease Audit Checklist
            </Link>
          </li>
          <li>
            <Link href="/marketing/how-medical-practices-can-dispute-cam-charges">
              How to Dispute CAM Charges
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">
          Medical CAM Reconciliation FAQ
        </h2>

        <div>
          <h3 className="font-semibold">
            Are capital improvements allowed in CAM reconciliations?
          </h3>
          <p className="text-gray-700">
            Many medical leases prohibit capital expenditures from being passed
            through as operating expenses unless tied to energy savings or
            legally required upgrades.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            How often do medical tenants overpay CAM?
          </h3>
          <p className="text-gray-700">
            In complex outpatient buildings, discrepancies are common due to
            allocation errors and infrastructure-heavy expense categories.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            What is the audit window for medical CAM charges?
          </h3>
          <p className="text-gray-700">
            Most leases provide 6–12 months after reconciliation delivery to
            formally dispute charges.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-10">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Audit My Medical CAM Charges
        </Link>
      </section>

    </main>
  );
}