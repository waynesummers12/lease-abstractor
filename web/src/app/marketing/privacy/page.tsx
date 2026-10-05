export const metadata = {
  title: "Privacy Policy | SaveOnLease",
  description:
    "How SaveOnLease collects, uses, and protects lease documents and personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6">
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight">Privacy Policy</h1>

      <p className="text-gray-700">
        SaveOnLease is committed to protecting your privacy. This policy
        explains how we collect, use, and safeguard information when you
        use our website and services.
      </p>

      <section>
        <h2 className="text-lg sm:text-xl font-light tracking-tight">Information We Collect</h2>
        <p className="mt-2 text-gray-700">
          We may collect the following types of information:
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-2">
          <li>Lease documents you upload for analysis</li>
          <li>Basic contact information such as email address</li>
          <li>Payment status, amount, currency, and Checkout reference; Stripe handles card entry</li>
          <li>Technical information such as browser type and IP address</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-light tracking-tight">How We Use Information</h2>
        <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-2">
          <li>To generate your CAM / NNN lease audit</li>
          <li>To deliver audit results and PDFs</li>
          <li>To provide customer support</li>
          <li>To improve our service and user experience</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-light tracking-tight">Data Sharing</h2>
        <p className="mt-2 text-gray-700">
          SaveOnLease does not sell, rent, or trade your personal
          information or lease documents.
        </p>
        <p className="mt-2 text-gray-700">
          We use Supabase for accounts and document storage, Stripe for
          checkout, Resend for report emails, and hosting providers to run
          the site and audit service. Google Analytics collects site usage
          information. These providers receive information needed for their
          respective services.
        </p>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-light tracking-tight">Data Security</h2>
        <p className="mt-2 text-gray-700">
          We use reasonable technical and organizational safeguards to
          protect your information, including secure connections and
          restricted access to stored documents.
        </p>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-light tracking-tight">Data Retention</h2>
        <p className="mt-2 text-gray-700">
          We keep uploaded leases and audit results so you can return to
          your reports. Payment and support records may be kept for
          accounting, dispute resolution, and legal obligations. We do
          not currently apply a fixed automatic deletion period. You may
          request deletion of your lease documents and audit results by
          emailing us; we will verify the request and explain any records
          we must retain.
        </p>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-light tracking-tight">Contact</h2>
        <p className="mt-2 text-gray-700">
          For privacy questions or requests to access or delete your data,
          email <a className="underline" href="mailto:audits@saveonlease.com">audits@saveonlease.com</a>.
        </p>
      </section>

      <p className="pt-4 text-sm text-gray-500">
        Last updated: October 5, 2026
      </p>
    </div>
  );
}
