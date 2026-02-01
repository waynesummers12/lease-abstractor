import Link from "next/link";

export const metadata = {
  title: "CAM Expense Caps Explained — How Tenants Limit Annual Increases",
  description:
    "Many commercial leases cap how much CAM charges can increase each year. Learn common CAM expense caps, how landlords violate them, and how tenants can challenge overcharges.",
};

export default function CamExpenseCapsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      {/* ---------- HERO ---------- */}
      <header className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Lease Education
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          CAM Expense Caps Explained — How Tenants Limit Annual Increases
        </h1>

        <p className="mb-6 text-lg text-gray-600">
          Many commercial leases limit how much CAM charges can increase each
          year. When those caps are ignored or misapplied, tenants often pay far
          more than their lease allows.
        </p>

        <Link
          href="/product/app/step-1-upload/upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Check if your CAM cap is being enforced
        </Link>

        <p className="mt-2 text-sm text-gray-500">
          🔒 Secure & private · No obligation · Takes 2–3 minutes
        </p>
      </header>

      {/* ---------- WHAT IS A CAM CAP ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Is a CAM Expense Cap?
        </h2>

        <p className="text-gray-700">
          A CAM expense cap limits how much a landlord can increase common area
          maintenance charges from year to year. These caps are designed to
          protect tenants from unpredictable or excessive cost increases.
        </p>

        <p className="mt-4 text-gray-700">
          CAM caps typically apply to operating expenses only and often exclude
          real estate taxes and insurance.
        </p>
      </section>

      {/* ---------- TYPICAL CAP RANGES ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Typical CAM Expense Cap Ranges
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>3%</strong> annually (very common)</li>
          <li><strong>5%</strong> annually</li>
          <li>CPI-based caps (inflation-linked)</li>
          <li>Fixed dollar caps (rare but powerful)</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Even small cap violations compound quickly. A 2–3% overage can turn
          into tens of thousands of dollars over a multi-year lease.
        </p>
      </section>

      {/* ---------- COMMON VIOLATIONS ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          How CAM Expense Caps Are Commonly Violated
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Applying the cap to the wrong base year</li>
          <li>Resetting the cap after reconciliation</li>
          <li>Including excluded expenses to bypass the cap</li>
          <li>Applying the cap to a subtotal instead of total CAM</li>
          <li>Misclassifying capital expenses as operating costs</li>
        </ul>

        <p className="mt-4 text-gray-700">
          These violations are rarely obvious unless the lease is reviewed
          alongside the reconciliation statement.
        </p>
      </section>

      {/* ---------- WHY TENANTS MISS THIS ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Why Most Tenants Miss CAM Cap Violations
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>CAM statements lack transparency</li>
          <li>Caps are buried deep in lease language</li>
          <li>Annual increases feel “normal”</li>
          <li>Audit windows quietly expire</li>
        </ul>

        <p className="mt-4 text-gray-700">
          By the time tenants realize something is wrong, their right to
          challenge the charges may already be limited.
        </p>
      </section>

      {/* ---------- WHAT CAN BE CHALLENGED ---------- */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Tenants Can Challenge
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>CAM increases above the lease cap</li>
          <li>Incorrect base year calculations</li>
          <li>Improperly classified expenses</li>
          <li>Unsupported reconciliation numbers</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Challenging these issues often leads to refunds, credits, or corrected
          future charges.
        </p>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="rounded-xl border bg-gray-50 p-8 text-center">
        <h2 className="mb-2 text-2xl font-semibold">
          Your CAM Cap May Already Be Violated
        </h2>

        <p className="mb-6 text-gray-600">
          Upload your lease to automatically check CAM caps, identify violations,
          and estimate potential recovery.
        </p>

        <Link
          href="/product/app/step-1-upload/upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check CAM caps
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
                "name": "What is a CAM expense cap?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "A CAM expense cap limits how much common area maintenance charges can increase from year to year under a commercial lease.",
                },
              },
              {
                "@type": "Question",
                "name": "How much can CAM charges increase each year?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Many leases cap increases at 3% to 5% annually, though some use CPI-based formulas or fixed dollar caps.",
                },
              },
              {
                "@type": "Question",
                "name": "Can tenants challenge CAM increases above the cap?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes. Increases above the lease cap are often challengeable and may result in refunds or credits.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
