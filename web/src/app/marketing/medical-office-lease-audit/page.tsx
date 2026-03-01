import Link from "next/link";

export default function MedicalOfficeLeaseAudit() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          CAM & NNN Lease Audit for Independent Medical Practices
        </h1>
        <p className="text-lg text-gray-700">
          Independent medical practices frequently overpay $20,000–$100,000 per year
          in CAM and NNN charges due to improper admin fees, capital expense
          pass-throughs, tax allocation errors, and compliance-driven cost shifts.
        </p>
        <p className="text-gray-600">
          Imaging centers, urgent care operators, dental groups, and
          multi-specialty clinics face unique operating cost exposure that most
          healthcare tenants never audit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Why Medical Office Leases Are Uniquely Risky
        </h2>
        <p className="text-gray-700">
          Outpatient buildings operate differently than retail or standard office.
          High electrical loads for imaging equipment, generator redundancy,
          infection-control HVAC, parking structures, and extended-hour staffing
          materially increase operating expenses. Without clear caps and
          exclusions, tenants absorb unpredictable pass-through risk.
        </p>
      </section>

      <section className="text-center pt-10">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Upload Your Medical Lease
        </Link>
      </section>

    </main>
  );
}