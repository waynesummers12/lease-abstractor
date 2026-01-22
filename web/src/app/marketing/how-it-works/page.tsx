import Link from "next/link";
export const metadata = {
  title: "How SaveOnLease Works | CAM & NNN Lease Audit",
  description:
    "See how SaveOnLease analyzes commercial leases to identify CAM and NNN overcharges quickly and securely.",
};

export default function HowItWorksPage() {
  return (
  <div className="mx-auto max-w-3xl space-y-10 px-6 py-12">
      {/* HERO */}
      <section>
        <h1 className="text-4xl font-bold">How SaveOnLease Works</h1>
        <p className="mt-4 text-lg text-gray-700">
          SaveOnLease helps commercial tenants identify CAM and NNN overcharges
          by analyzing lease language and expense structures — quickly,
          securely, and without long-term commitments.
        </p>
      </section>

      {/* STEP 1 */}
      <section>
        <h2 className="text-2xl font-semibold">Step 1: Upload Your Lease</h2>
        <p className="mt-3 text-gray-700">
          Upload a copy of your commercial lease agreement. We support standard
          PDF leases, including amendments and exhibits.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>No formatting required</li>
          <li>Your document remains private and secure</li>
          <li>Most uploads take less than 30 seconds</li>
        </ul>
      </section>

      {/* STEP 2 */}
      <section>
        <h2 className="text-2xl font-semibold">
          Step 2: Automated CAM / NNN Analysis
        </h2>
        <p className="mt-3 text-gray-700">
          Our system reviews your lease to understand what expenses are allowed,
          limited, or excluded — then evaluates where tenants commonly overpay.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>CAM definitions and exclusions</li>
          <li>Administrative and management fee limits</li>
          <li>Capital expenditure responsibility</li>
          <li>Insurance and tax pass-through language</li>
          <li>Pro-rata share calculations</li>
        </ul>
      </section>

      {/* STEP 3 */}
      <section>
        <h2 className="text-2xl font-semibold">
          Step 3: Review Your Audit Results
        </h2>
        <p className="mt-3 text-gray-700">
          You’ll receive a clear summary of potential CAM and NNN risks,
          including estimated avoidable exposure where applicable.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Plain-English explanations</li>
          <li>Risk flags and recommendations</li>
          <li>Downloadable audit PDF</li>
          <li>Email delivery for easy sharing</li>
        </ul>
      </section>

      {/* STEP 4 */}
      <section>
        <h2 className="text-2xl font-semibold">
          Step 4: Decide What to Do Next
        </h2>
        <p className="mt-3 text-gray-700">
          SaveOnLease does not pressure you into action. The audit gives you
          clarity so you can decide whether it’s worth pursuing corrections,
          negotiations, or further review.
        </p>
        <p className="mt-2 text-gray-700">
          Many tenants use the audit to prepare questions for their landlord,
          property manager, or advisor.
        </p>
      </section>

      {/* CTA */}
<section className="rounded-2xl bg-gray-50 p-8">
  <h3 className="text-xl font-semibold">
    Ready to get started?
  </h3>

  <p className="mt-2 max-w-md text-gray-700">
    Upload your lease and see what your CAM and NNN charges really allow.
  </p>

  <Link
    href="/product/app"
    className="mt-5 inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
  >
    Upload a Lease
  </Link>
</section>
    </div>
);
}
