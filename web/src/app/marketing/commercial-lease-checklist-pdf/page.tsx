"use client";

import Link from "next/link";

export default function CommercialLeaseChecklistPdfPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-center">

      {/* HERO */}
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">
        Commercial Lease Checklist (PDF)
        <span className="block font-medium">
          Free Tenant‑First CAM & NNN Audit Checklist
        </span>
      </h1>

      <p className="text-gray-700 max-w-2xl mx-auto mb-8">
        Download a free commercial lease review checklist used by tenants
        to identify CAM overcharges, NNN expense errors, administrative
        fee increases, and reconciliation discrepancies before audit
        windows expire.
      </p>

      <p className="text-green-700 font-medium mb-10">
        ✓ Many tenants uncover $5K–$50K+ in potential CAM exposure
      </p>

      {/* DOWNLOAD SECTION */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value;

          if (email) {
            console.log("Checklist download email:", email);
          }

          window.open("/assets/Tenant-First-CAM-Audit-Checklistv1.pdf", "_blank");
        }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
      >
        <input
          name="email"
          type="email"
          required
          placeholder="Enter your email to download the checklist"
          className="w-full sm:w-80 px-4 py-3 border border-gray-300 rounded-md text-gray-800"
        />

        <button
          type="submit"
          className="inline-block bg-black text-white px-8 py-3 text-lg font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Download Checklist PDF →
        </button>
      </form>

      <p className="text-xs text-gray-500 mb-12">
        Instant PDF download • No signup required • Tenant-side review framework
      </p>

      {/* CHECKLIST CONTENT PREVIEW */}
      <div className="max-w-3xl mx-auto text-left mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          What the Commercial Lease Checklist Covers
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 marker:text-green-600">
          <li>CAM administrative fee review</li>
          <li>Capital expense misclassification checks</li>
          <li>Pro‑rata share allocation verification</li>
          <li>CAM reconciliation variance testing</li>
          <li>Property tax and insurance pass‑through validation</li>
          <li>Gross‑up adjustments and vacancy cost impacts</li>
        </ul>
      </div>

      {/* WHY THIS MATTERS */}
      <div className="max-w-3xl mx-auto text-left mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Why Commercial Tenants Use Lease Checklists
        </h2>

        <p className="text-gray-700 mb-4">
          Many commercial tenants review CAM reconciliation statements
          annually but lack a structured framework for identifying
          operating expense allocation errors.
        </p>

        <p className="text-gray-700">
          A checklist ensures lease language, expense caps, and
          reconciliation calculations are reviewed consistently before
          the lease audit window expires.
        </p>
      </div>

      {/* CTA TO TOOL */}
      <div className="border-t pt-12 mt-16">
        <h3 className="text-lg font-semibold mb-4">
          Want an Instant Lease Risk Review?
        </h3>

        <p className="text-gray-700 mb-6">
          Upload your commercial lease and instantly identify potential
          CAM exposure, operating expense allocation risks, and
          negotiation opportunities.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black text-white px-8 py-4 text-sm font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Check Your Commercial Lease for Hidden Costs
        </Link>
      </div>

    </main>
  );
}