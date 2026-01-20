export const metadata = {
  title: "Privacy Policy | SaveOnLease",
  description:
    "How SaveOnLease collects, uses, and protects lease documents and personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p className="text-gray-700">
        SaveOnLease is committed to protecting your privacy. This policy
        explains how we collect, use, and safeguard information when you
        use our website and services.
      </p>

      <section>
        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <p className="mt-2 text-gray-700">
          We may collect the following types of information:
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-2">
          <li>Lease documents you upload for analysis</li>
          <li>Basic contact information such as email address</li>
          <li>Payment confirmation details (processed by Stripe)</li>
          <li>Technical information such as browser type and IP address</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How We Use Information</h2>
        <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-2">
          <li>To generate your CAM / NNN lease audit</li>
          <li>To deliver audit results and PDFs</li>
          <li>To provide customer support</li>
          <li>To improve our service and user experience</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Data Sharing</h2>
        <p className="mt-2 text-gray-700">
          SaveOnLease does not sell, rent, or trade your personal
          information or lease documents.
        </p>
        <p className="mt-2 text-gray-700">
          We may share limited information with trusted service providers
          (such as payment or email delivery services) solely to operate
          the service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Data Security</h2>
        <p className="mt-2 text-gray-700">
          We use reasonable technical and organizational safeguards to
          protect your information, including secure connections and
          restricted access to stored documents.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Data Retention</h2>
        <p className="mt-2 text-gray-700">
          Lease documents and audit results are retained only as long as
          necessary to provide the service and comply with legal or
          operational requirements.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-gray-700">
          If you have questions about this Privacy Policy, please contact
          us through the SaveOnLease website.
        </p>
      </section>

      <p className="pt-4 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </main>
  );
}
