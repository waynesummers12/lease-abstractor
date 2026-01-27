import Link from "next/link";

export const metadata = {
  title: "NNN Audit Rights Explained — Don’t Miss Your Chance to Challenge Charges",
  description:
    "Most commercial leases give tenants limited audit rights for NNN and CAM charges. Learn how audit windows work, what you can challenge, and how to act before deadlines expire.",
};

export default function NnnAuditRightsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      {/* ---------- HERO ---------- */}
      <header className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Lease Education
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          NNN Audit Rights — What Tenants Can Challenge (and When)
        </h1>

        <p className="mb-6 text-lg text-gray-600">
          Most commercial leases give tenants the right to audit NNN and CAM
          charges — but only for a short window. Miss the deadline, and
          overcharges may become final.
        </p>
      </header>

      {/* ---------- WHAT ARE NNN AUDIT RIGHTS ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Are NNN Audit Rights?
        </h2>

        <p className="text-gray-700">
          NNN audit rights give tenants the ability to review, verify, and
          challenge charges passed through by the landlord — including CAM,
          taxes, insurance, administrative fees, and whether your lease enforces
          <a
            href="/marketing/cam-expense-caps"
            className="ml-1 text-gray-900 underline hover:text-black"
          >
            CAM increase limits
          </a>.
        </p>

        <p className="mt-4 text-gray-700">
          These rights are almost always governed by strict lease language,
          including:
        </p>

        <ul className="mt-4 list-disc pl-6 text-gray-700">
          <li>How long you have to request documentation</li>
          <li>What expenses you are allowed to challenge</li>
          <li>Whether errors must be refunded or credited</li>
          <li>Whether silence counts as acceptance</li>
        </ul>
      </section>

      {/* ---------- WHY TIMING MATTERS ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Why Timing Matters More Than Most Tenants Realize
        </h2>

        <p className="text-gray-700">
          Most leases impose an audit window of{" "}
          <strong>30 to 90 days</strong> after you receive a reconciliation
          statement.
        </p>

        <p className="mt-4 text-gray-700">
          If you don’t dispute charges within that window:
        </p>

        <ul className="mt-4 list-disc pl-6 text-gray-700">
          <li>The charges may become final</li>
          <li>Your audit rights may be waived</li>
          <li>Future overcharges may compound</li>
          <li>You lose leverage to negotiate corrections</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Many tenants assume they can “look later.” In reality, waiting can
          permanently eliminate your ability to recover money.
        </p>
      </section>

      {/* ---------- WHAT YOU CAN CHALLENGE ---------- */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          What Tenants Can (and Can’t) Challenge
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">Often Challengeable</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Admin fees above lease caps</li>
              <li>Excluded expense categories</li>
              <li>Capital expenses passed through improperly</li>
              <li>Incorrect pro-rata allocations</li>
              <li>Unsupported or undocumented charges</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Often Not Challengeable</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Clearly permitted operating expenses</li>
              <li>Properly calculated lease-compliant costs</li>
              <li>Charges accepted after the audit window closes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- WHY TENANTS MISS THIS ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Why Most Tenants Miss Audit Rights
        </h2>

        <ul className="list-disc pl-6 text-gray-700">
          <li>Lease language is dense and inconsistent</li>
          <li>Reconciliation statements arrive without warning</li>
          <li>Deadlines are buried in legal sections</li>
          <li>Tenants assume landlords “got it right”</li>
        </ul>

        <p className="mt-4 text-gray-700">
          By the time questions arise, the audit window may already be closing —
          or closed.
        </p>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="rounded-xl border bg-gray-50 p-8 text-center">
        <h2 className="mb-2 text-2xl font-semibold">
          Check Your Audit Rights Before It’s Too Late
        </h2>

        <p className="mb-6 text-gray-600">
          A quick lease review can identify audit deadlines, challengeable
          charges, and potential overpayments.
        </p>

        <Link
          href="/product/app"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to review audit rights
        </Link>

        <p className="mt-2 text-sm text-gray-500">
          🔒 Secure & private · No obligation · Takes 2–3 minutes
        </p>
      </section>

      {/* ---------- FAQ SCHEMA ---------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do tenants have audit rights for NNN charges?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Most commercial leases grant tenants audit rights for NNN and CAM charges, but those rights are limited by strict deadlines and lease language.",
                },
              },
              {
                "@type": "Question",
                "name": "How long do tenants have to audit CAM or NNN charges?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Audit windows typically range from 30 to 90 days after receiving a reconciliation statement, depending on the lease.",
                },
              },
              {
                "@type": "Question",
                "name": "What happens if I miss the audit deadline?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Missing the audit deadline may waive your right to challenge charges, making them final and non-refundable.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
