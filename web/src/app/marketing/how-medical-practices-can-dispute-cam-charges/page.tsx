import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Medical Practices Can Dispute CAM Charges (Audit Rights & Recovery Guide)",
  description:
    "Step-by-step guidance for medical tenants disputing CAM charges, admin fee violations, and improper capital expense pass-through in outpatient buildings.",
};

export default function DisputeMedicalCAMChargesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can medical tenants legally dispute CAM charges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Most medical office leases include audit rights allowing tenants to review and challenge CAM reconciliations within defined timeframes."
        }
      },
      {
        "@type": "Question",
        "name": "What CAM charges are most commonly disputed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Admin fee cap violations, capital improvements improperly passed through, reserve fund allocations, and incorrect pro-rata share calculations."
        }
      },
      {
        "@type": "Question",
        "name": "How long do medical practices have to dispute charges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many leases provide a 12-month audit window after reconciliation delivery, though timelines vary by agreement."
        }
      },
      {
        "@type": "Question",
        "name": "Do medical office leases typically include CAM caps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some medical office leases include caps on controllable CAM expenses or administrative fees, but many exclude taxes and insurance from caps. Lease language must be reviewed carefully."
        }
      }
    ]
  };
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          How Medical Practices Can Dispute CAM Charges
        </h1>
        <p className="text-lg text-gray-700">
          Medical office tenants often overpay thousands in CAM and NNN charges
          due to improper admin fees, capital expense misclassification, and
          incorrect cost allocation. Most leases grant audit rights — but only
          within strict time windows.
        </p>
      </section>

      <section className="space-y-6">
        <p className="text-gray-700">
          In medical office buildings, CAM disputes often involve high-voltage
          electrical loads, generator redundancy systems, infection-control
          HVAC infrastructure, and healthcare compliance costs. These technical
          components make operating expense audits more complex than traditional
          retail or general office leases.
        </p>
      </section>

      {/* FINANCIAL CONTEXT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          What a CAM Dispute Can Actually Recover
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700">
          <p>8,000 SF practice × $3 PSF improper allocation = $24,000/year</p>
          <p>10,000 SF imaging center × $4 PSF misclassification = $40,000/year</p>
          <p className="font-semibold">
            Over a 5-year term, unresolved CAM errors can exceed $150,000.
          </p>
        </div>
      </section>

      {/* STEP 1 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 1: Review the Lease Language Carefully
        </h2>
        <p className="text-gray-700">
          Confirm CAM definitions, admin fee caps, capital expenditure
          exclusions, amortization rules, audit rights, notice requirements,
          and reconciliation timelines. Medical leases often contain narrow
          dispute windows (commonly 12 months).
          For deeper context, review our <Link href="/marketing/medical-office-cam-reconciliation" className="text-emerald-600 hover:underline">medical CAM reconciliation guide</Link> and <Link href="/marketing/medical-office-nnn-expenses" className="text-emerald-600 hover:underline">medical NNN expense breakdown</Link>.
        </p>
      </section>

      {/* STEP 2 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 2: Request Supporting Documentation
        </h2>
        <p className="text-gray-700">
          Request invoices, vendor contracts, allocation schedules, and
          supporting reconciliation detail. Tenants are generally entitled to
          review backup documentation supporting CAM charges.
        </p>
      </section>

      {/* STEP 3 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 3: Identify Healthcare-Specific Overcharges
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Generator replacements passed through as operating expense</li>
          <li>Parking structure repairs classified as CAM</li>
          <li>HVAC upgrades tied to imaging load treated as tenant expense</li>
          <li>Admin fees exceeding stated percentage caps</li>
          <li>Capital improvements amortized improperly</li>
        </ul>
      </section>

      {/* DISPUTE STRUCTURE */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          How to Structure a CAM Dispute Letter
        </h2>
        <p className="text-gray-700">
          Medical tenants typically structure disputes by:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Referencing the specific lease section governing CAM</li>
          <li>Identifying the disputed category or calculation</li>
          <li>Requesting detailed backup documentation</li>
          <li>Preserving audit rights in writing</li>
          <li>Reserving all contractual rights pending review</li>
        </ul>
      </section>

      {/* URGENCY */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Timing Matters
        </h2>
        <p className="text-gray-700">
          Most medical office leases require formal notice within a defined
          audit window. Failure to dispute within that period may waive
          recovery rights for that reconciliation year.
        </p>
      </section>

      {/* INTERNAL CLUSTER LINKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Medical Lease Resources</h2>
        <ul className="list-disc pl-6 space-y-2 text-emerald-700">
          <li>
            <Link href="/marketing/medical-office-lease-audit">
              Medical Office Lease Audit Guide
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-cam-reconciliation">
              Medical CAM Reconciliation Guide
            </Link>
          </li>
          <li>
            <Link href="/marketing/multi-location-medical-lease-risk">
              Multi-Location Medical Lease Risk
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-practice-lease-overcharges">
              Identifying Medical Lease Overcharges
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold">Can medical tenants legally dispute CAM charges?</h3>
            <p>
              Yes. Most medical office leases include audit rights allowing
              tenants to review and challenge CAM reconciliations within
              defined timeframes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">What CAM charges are most commonly disputed?</h3>
            <p>
              Admin fee cap violations, capital improvements improperly passed
              through, reserve fund allocations, and incorrect pro-rata share
              calculations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">How long do medical practices have to dispute charges?</h3>
            <p>
              Many leases provide a 12-month audit window after reconciliation
              delivery, though timelines vary by agreement.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Do medical office leases typically include CAM caps?</h3>
            <p>
              Some medical office leases include caps on controllable CAM
              expenses or administrative fees, but many exclude taxes and
              insurance from caps. Lease language must be reviewed carefully.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-gray-700">
          Need help reviewing your reconciliation before the audit window closes?
          Our <Link href="/marketing/medical-office-lease-audit" className="text-emerald-600 hover:underline">medical lease audit</Link>
          identifies improper allocations, admin fee violations, and capital expense
          misclassification while preserving your dispute rights.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Analyze My CAM Reconciliation Before the Audit Window Closes
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

    </main>
  );
}