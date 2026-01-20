export const metadata = {
  title: "Terms of Service | SaveOnLease",
  description:
    "Terms and conditions governing the use of SaveOnLease and its lease audit services.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-12">
      <h1 className="text-3xl font-bold">Terms of Service</h1>

      <p className="text-gray-700">
        These Terms of Service govern your use of SaveOnLease. By using
        the site or uploading a lease, you agree to these terms.
      </p>

      <section>
        <h2 className="text-xl font-semibold">Service Description</h2>
        <p className="mt-2 text-gray-700">
          SaveOnLease provides automated analysis of commercial lease
          documents to identify potential CAM and NNN cost risks.
        </p>
        <p className="mt-2 text-gray-700">
          The service is informational and does not constitute legal,
          accounting, or professional advice.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">User Responsibilities</h2>
        <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-2">
          <li>You confirm that you have the right to upload the lease</li>
          <li>You are responsible for how you use the audit results</li>
          <li>You agree not to misuse the service</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Payments</h2>
        <p className="mt-2 text-gray-700">
          Fees are charged on a per-lease basis. All payments are
          processed securely by third-party payment providers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">No Guarantees</h2>
        <p className="mt-2 text-gray-700">
          SaveOnLease does not guarantee that errors or overcharges will
          be found in every lease. Results vary based on lease language
          and billing practices.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Limitation of Liability</h2>
        <p className="mt-2 text-gray-700">
          To the fullest extent permitted by law, SaveOnLease shall not
          be liable for any indirect, incidental, or consequential
          damages arising from the use of the service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Changes to These Terms</h2>
        <p className="mt-2 text-gray-700">
          We may update these Terms from time to time. Continued use of
          the service constitutes acceptance of any updates.
        </p>
      </section>

      <p className="pt-4 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </main>
  );
}
