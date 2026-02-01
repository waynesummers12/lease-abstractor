export const metadata = {
  title: "CAM vs NNN Charges Explained | What Commercial Tenants Actually Pay",
  description:
    "Understand the difference between CAM and NNN charges, how they affect your rent, and where tenants are often overcharged. Learn what’s negotiable and what to audit.",
};

export default function CamVsNnnPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      {/* ---------- HERO ---------- */}
      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          CAM vs NNN Charges: What’s the Difference — and Why It Matters
        </h1>
        <p className="text-lg text-gray-600">
          CAM and NNN charges are often lumped together, poorly explained, and
          quietly inflated. For many tenants, these costs add{" "}
          <strong>15–35% on top of base rent</strong>.
        </p>
      </header>

      {/* ---------- SECTION 1 ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-bold">
          What CAM (Common Area Maintenance) Charges Are
        </h2>
        <p className="text-gray-700">
          CAM charges cover shared property expenses like landscaping, snow
          removal, lighting, parking lots, and general upkeep of common areas.
          These fees are typically billed monthly and reconciled annually.
        </p>

        <p className="mt-4 text-gray-700">
          While CAM sounds straightforward, disputes often arise over{" "}
          <strong>what gets included</strong>, how increases are calculated, and
          whether capital improvements or management fees are improperly passed
          through.
        </p>
      </section>

      {/* ---------- SECTION 2 ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-bold">
          What NNN (Triple Net) Charges Include
        </h2>
        <p className="text-gray-700">
          NNN charges typically include three major expense categories:
        </p>

        <ul className="mt-4 list-disc pl-6 text-gray-700">
          <li>Property taxes</li>
          <li>Property insurance</li>
          <li>CAM charges</li>
        </ul>

        <p className="mt-4 text-gray-700">
          In a true NNN lease, tenants are responsible for their proportionate
          share of all three. However, many leases labeled “NNN” still contain
          carve-outs, caps, or exclusions that landlords may ignore.
        </p>
      </section>

      {/* ---------- SECTION 3 ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-bold">
          CAM vs NNN: The Key Differences
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 font-semibold">Category</th>
                <th className="py-2 font-semibold">CAM</th>
                <th className="py-2 font-semibold">NNN</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-2">Scope</td>
                <td className="py-2">Common area expenses only</td>
                <td className="py-2">CAM + taxes + insurance</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Audit complexity</td>
                <td className="py-2">Medium</td>
                <td className="py-2">High</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Typical disputes</td>
                <td className="py-2">Admin fees, capex, reconciliation</td>
                <td className="py-2">Tax spikes, insurance, double counting</td>
              </tr>
              <tr>
                <td className="py-2">Negotiability</td>
                <td className="py-2">Often capped</td>
                <td className="py-2">Often misunderstood</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- SECTION 4 ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-bold">
          Why Tenants Get Overcharged
        </h2>
        <p className="text-gray-700">
          Most tenants focus on base rent and overlook operating expenses.
          Landlords rely on this blind spot — especially during annual
          reconciliations.
        </p>

        <ul className="mt-4 list-disc pl-6 text-gray-700">
          <li>CAM admin fees quietly increasing each year</li>
          <li>Expenses billed outside the lease definition</li>
          <li>No enforcement of CAM caps or exclusions</li>
          <li>NNN tax or insurance spikes passed through without review</li>
        </ul>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-2 text-xl font-bold">
          Not sure whether your charges are CAM or NNN?
        </h3>
        <p className="mb-4 text-gray-700">
          Our automated lease audit identifies CAM vs NNN obligations, flags
          overcharges, and estimates what you may be able to recover.
        </p>

        <a
          href="/app/step-1-upload"
          className="inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease & check now →
        </a>
      </section>
    </main>
  );
}
