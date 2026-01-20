export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-12 p-8">
      {/* HERO */}
      <section>
        <h1 className="text-4xl font-bold">Security & Data Protection</h1>
        <p className="mt-4 text-lg text-gray-700">
          SaveOnLease is built to handle sensitive lease documents safely,
          privately, and responsibly.
        </p>
      </section>

      {/* DOCUMENT HANDLING */}
      <section>
        <h2 className="text-2xl font-semibold">
          How We Handle Your Lease Documents
        </h2>
        <p className="mt-3 text-gray-700">
          Lease agreements often contain confidential business information.
          We treat every document as private by default.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Documents are uploaded over secure connections</li>
          <li>Files are processed only for your audit</li>
          <li>Access is restricted to your account</li>
          <li>Audit PDFs are delivered via time-limited secure links</li>
        </ul>
      </section>

      {/* STORAGE */}
      <section>
        <h2 className="text-2xl font-semibold">
          Secure Storage & Access Control
        </h2>
        <p className="mt-3 text-gray-700">
          Generated audit reports are stored securely and are never publicly
          accessible.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Private file storage with restricted access</li>
          <li>Signed, expiring download URLs</li>
          <li>No public file links</li>
          <li>Access limited to the audit owner</li>
        </ul>
      </section>

      {/* DATA USAGE */}
      <section>
        <h2 className="text-2xl font-semibold">
          Data Usage & Privacy
        </h2>
        <p className="mt-3 text-gray-700">
          SaveOnLease does not sell, share, or reuse your lease data.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Your documents are used only to generate your audit</li>
          <li>No training on customer leases</li>
          <li>No resale of document data</li>
          <li>No third-party marketing use</li>
        </ul>
      </section>

      {/* AI & AUTOMATION */}
      <section>
        <h2 className="text-2xl font-semibold">
          Use of Automation & AI
        </h2>
        <p className="mt-3 text-gray-700">
          SaveOnLease uses automation to analyze lease language and identify
          common CAM and NNN risk patterns.
        </p>
        <p className="mt-2 text-gray-700">
          The system highlights potential issues but does not replace legal,
          accounting, or professional judgment.
        </p>
      </section>

      {/* COMPLIANCE POSITIONING */}
      <section className="rounded bg-gray-50 p-6">
        <h3 className="text-xl font-semibold">
          Designed with Business Standards in Mind
        </h3>
        <p className="mt-3 text-gray-700">
          While SaveOnLease is not a regulated legal or accounting service,
          we follow modern SaaS best practices for security, access control,
          and data handling.
        </p>
        <p className="mt-2 text-gray-700">
          This makes SaveOnLease suitable for use by small and mid-sized
          businesses, multi-location operators, and professional advisors.
        </p>
      </section>

      {/* CTA */}
      <section>
        <a
          href="/"
          className="inline-block rounded bg-black px-6 py-3 text-white"
        >
          Upload a Lease Securely
        </a>
      </section>
    </main>
  );
}
