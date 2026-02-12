import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "How SaveOnLease Works | CAM & NNN Lease Audit",
  description:
    "See how SaveOnLease analyzes commercial leases to identify CAM and NNN overcharges quickly and securely.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 space-y-24">
      {/* HERO */}
      <section className="text-center">
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight">
          How SaveOnLease Works
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-700 leading-relaxed">
          SaveOnLease helps commercial tenants identify CAM and NNN overcharges by
          analyzing lease language and expense structures — quickly, securely,
          and without long-term commitments.
        </p>
      </section>

      {/* STEPS GRID */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Step 1</h2>
          <h3 className="mt-1 text-lg font-medium">Upload Your Lease</h3>
          <p className="mt-3 text-gray-700">
            Upload your commercial lease agreement, including amendments and exhibits.
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 marker:text-green-600">
            <li>No formatting required</li>
            <li>Private and secure</li>
            <li>Usually under 30 seconds</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Step 2</h2>
          <h3 className="mt-1 text-lg font-medium">
            Automated CAM / NNN Analysis
          </h3>
          <p className="mt-3 text-gray-700">
            We analyze your lease to identify uncapped expenses, capital pass-throughs,
            management fees, and reconciliation risks.
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 marker:text-green-600">
            <li>CAM definitions & exclusions</li>
            <li>Admin & management fee limits</li>
            <li>Capital expense responsibility</li>
            <li>Insurance & tax language</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Step 3</h2>
          <h3 className="mt-1 text-lg font-medium">Review Your Results</h3>
          <p className="mt-3 text-gray-700">
            Receive a clear summary of CAM and NNN risks with estimated avoidable
            exposure.
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 marker:text-green-600">
            <li>Exposure estimate</li>
            <li>Plain-English explanations</li>
            <li>Downloadable audit PDF</li>
            <li>Email delivery</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Step 4</h2>
          <h3 className="mt-1 text-lg font-medium">Decide What to Do Next</h3>
          <p className="mt-3 text-gray-700">
            Use the audit to pursue corrections, negotiations, or further review —
            with no pressure.
          </p>
        </div>
      </section>

      {/* VISUAL WALKTHROUGH */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-light tracking-tight">
            What You’ll See
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            From lease upload to exposure summary, here’s what the process looks like.
          </p>
        </div>

        {/* Upload Visual */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">1. Upload Your Lease</h3>
          <div className="rounded-2xl border shadow-sm overflow-hidden">
            <Image
              src="/demo/lease-example.png"
              alt="Commercial lease document example"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Free Preview Visual */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">
            2. Instant Exposure Estimate (Free Analysis)
          </h3>
          <p className="text-gray-700 max-w-2xl">
            This is the free exposure estimate you’ll see immediately after uploading your lease — before any payment.
          </p>
          <div className="rounded-2xl border shadow-sm overflow-hidden">
            <Image
              src="/demo/free-preview.png"
              alt="Free preview exposure estimate example"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Final Report Visual */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">
            3. CAM / NNN Audit Summary (Sample)
          </h3>
          <div className="rounded-2xl border shadow-sm overflow-hidden">
            <Image
              src="/demo/final-report.png"
              alt="Final CAM NNN audit PDF example"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gray-50 p-10 text-center">
        <h3 className="text-2xl font-semibold">Ready to get started?</h3>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          Upload your lease and see what your CAM and NNN charges really allow.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-6 inline-flex items-center rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Upload Lease (Free Preview)
        </Link>
      </section>
    </div>
  );
}
