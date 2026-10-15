import Image from "next/image";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.saveonlease.com"),
  title: "Tenant-First CAM Audit Checklist (Free Download)",
  description:
    "Download the Tenant-First CAM Audit Checklist for retail and office leases. Identify administrative overcharges, capital misclassification, pro rata errors, and audit window risks before exposure compounds.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/cam-audit-checklist",
  },
  openGraph: {
    title: "Tenant-First CAM Audit Checklist | SaveOnLease",
    description:
      "Free CAM audit checklist for commercial tenants. Identify overcharges, allocation errors, and capital misclassification before audit windows close.",
    url: "https://www.saveonlease.com/marketing/cam-audit-checklist",
    siteName: "SaveOnLease",
    images: [
      {
        url: "https://www.saveonlease.com/og-cam-audit-checklist.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenant-First CAM Audit Checklist | SaveOnLease",
    description:
      "Download the CAM audit checklist built for retail and office tenants.",
    images: ["https://www.saveonlease.com/og-cam-audit-checklist.jpg"],
  },
};

export default function CamAuditChecklistPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a CAM audit checklist in a commercial lease?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A CAM audit checklist is a structured framework commercial tenants use to review Common Area Maintenance (CAM) reconciliation charges for administrative overapplication, capital misclassification, pro rata allocation errors, and audit window exposure.",
        },
      },
      {
        "@type": "Question",
        name: "What are common CAM reconciliation errors in retail and office leases?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Common CAM reconciliation errors include management fee overapplication, capital expenses improperly passed through, pro rata share miscalculations, gross-up distortion during vacancy, and controllable expense cap violations.",
        },
      },
      {
        "@type": "Question",
        name: "Does the checklist calculate an overcharge?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. It organizes questions and records to request. Any overcharge or recoverable amount depends on the lease and verified billing documents.",
        },
      },
      {
        "@type": "Question",
        name: "When should a tenant review CAM reconciliation charges?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Tenants should review CAM reconciliation charges immediately upon receipt, especially before contractual audit windows close. Most commercial leases limit dispute rights to a defined period after reconciliation delivery.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if CAM charges increase significantly year over year?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "If CAM charges increase materially year over year, tenants should review lease caps, allocation methodology, expense classifications, and audit window deadlines before accepting the reconciliation statement.",
        },
      },
    ],
  };
  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-36 h-[560px] w-[560px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Free tenant field guide</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              A clearer way to review your <span className="text-[#a9e9be]">CAM charges.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              The Tenant-First CAM Audit Checklist helps you compare your lease with an annual reconciliation, organize questions, and request the records that matter.
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold text-[#d9e9df]">
              {["25 practical checks", "8-page PDF", "Working worksheet", "Records request draft"].map((item) => (
                <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-2">{item}</span>
              ))}
            </div>
            <a href="/assets/Tenant-First-CAM-Audit-Checklistv1.pdf" target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">
              Open the free checklist ↗
            </a>
            <p className="mt-4 text-xs text-[#b9d1c2]">Instant PDF · No signup required · Your lease and records determine what applies</p>
          </div>
          <div className="mx-auto w-full max-w-[390px] rounded-[25px] border border-white/20 bg-white/10 p-4 shadow-2xl shadow-black/20 sm:p-5">
            <div className="overflow-hidden rounded-[15px] bg-white shadow-lg">
              <Image src="/assets/tenant-first-cam-checklist-cover.png" alt="Cover of the eight-page Tenant-First CAM Audit Checklist" width={1044} height={1350} sizes="(max-width: 1024px) 80vw, 390px" className="h-auto w-full" priority />
            </div>
            <p className="mt-3 text-center text-xs text-[#d9e9df]">A preview of the actual guide</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">For tenant representatives</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Review it with your clients.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Commercial brokers can share this checklist with clients reviewing CAM reconciliations. It gives you a consistent way to discuss fees, allocations, records, and lease-specific deadlines together.</p>
          </div>
          <Link href="/marketing/referral" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Create your broker referral link ↗</Link>
        </div>
      </section>
      {/* Authority Section */}
      <section className="bg-white py-16 px-6 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102c25] mb-6">
            What you can check in the guide
          </h2>

          <ul className="grid list-none gap-3 text-[#425b50] sm:grid-cols-2 [&>li]:rounded-xl [&>li]:border [&>li]:border-[#dbe6dc] [&>li]:bg-[#f9fbf8] [&>li]:px-4 [&>li]:py-3">
            <li>✓ Administrative & management fee review</li>
            <li>✓ Capital expenditure classification</li>
            <li>✓ Pro rata allocation verification</li>
            <li>✓ Gross-up & vacancy distortion analysis</li>
            <li>✓ Controllable vs. uncontrollable expense testing</li>
            <li>✓ Year-over-year variance review methodology</li>
            <li>✓ Audit window review</li>
            <li>✓ A worksheet and records request draft</li>
          </ul>
          <p className="mt-8 text-[#516073] leading-7">
            If you&apos;re new to CAM structures, you may also want to review our{" "}
            <Link href="/marketing/common-area-maintenance-cam" className="font-medium text-[#006d57] underline underline-offset-4">
              overview of Common Area Maintenance (CAM)
            </Link>{" "}
            and our guide to{" "}
            <Link href="/marketing/nnn" className="font-medium text-[#006d57] underline underline-offset-4">
              NNN (Triple Net) leases
            </Link>{" "}
            to understand how operating expenses are structured before applying this checklist.
          </p>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-16 px-6 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102c25] mb-6">
            Why a careful review matters
          </h2>

          <p className="text-[#516073] leading-7 mb-4">
            Rising insurance premiums, post-COVID vacancy shifts, operating
            volatility, and inflation in controllable expense categories have
            materially increased CAM variability.
          </p>

          <p className="text-[#516073] leading-7 mb-4">
            Structural lease complexity combined with expense volatility
            increases the probability of misapplication — even in good-faith
            reconciliations.
          </p>

          <p className="text-[#516073] leading-7">
            A structured review helps you ask clearer questions and gather the records needed to verify a charge.
            Tenants reviewing CAM exposure should also understand how charges appear in practice within{" "}
            <Link href="/marketing/cam-commercial-real-estate" className="font-medium text-[#006d57] underline underline-offset-4">
              commercial real estate CAM structures
            </Link>{" "}
            and how allocation mechanics differ under{" "}
            <Link href="/marketing/triple-net-lease" className="font-medium text-[#006d57] underline underline-offset-4">
              triple net lease agreements
            </Link>.
            For a deeper breakdown of reconciliation mechanics, see our{" "}
            <Link href="/marketing/cam-reconciliation" className="font-medium text-[#006d57] underline underline-offset-4">
              CAM reconciliation guide
            </Link>{" "}
            and our analysis of{" "}
            <Link href="/marketing/cam-vs-nnn" className="font-medium text-[#006d57] underline underline-offset-4">
              CAM vs. NNN lease structures
            </Link>.
          </p>
        </div>
      </section>

      {/* Visible FAQ Section */}
      <section className="py-16 px-6 sm:py-20 bg-white border-t border-[#dbe6dc]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102c25] mb-10">
            Frequently Asked Questions
          </h2>

          <div className="grid gap-4 md:grid-cols-2 text-[#516073] [&>div]:rounded-2xl [&>div]:border [&>div]:border-[#dbe6dc] [&>div]:bg-[#f9fbf8] [&>div]:p-6 [&>div>p]:leading-7">

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#102c25] mb-2">
                What is a CAM audit checklist in a commercial lease?
              </h3>
              <p>
                A CAM audit checklist is a structured framework commercial tenants use to review Common Area Maintenance (CAM) reconciliation charges for administrative overapplication, capital misclassification, pro rata allocation errors, and audit window exposure.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#102c25] mb-2">
                What are common CAM reconciliation errors in retail and office leases?
              </h3>
              <p>
                Common CAM reconciliation errors include management fee overapplication,
                capital expenses improperly passed through, pro rata share miscalculations,
                gross-up distortion during vacancy, and controllable expense cap violations.
                For a detailed explanation of how these errors appear in practice, review our{" "}
                <Link href="/marketing/cam-reconciliation" className="font-medium text-[#006d57] underline underline-offset-4">
                  CAM reconciliation breakdown
                </Link>.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#102c25] mb-2">
                Does the checklist calculate an overcharge?
              </h3>
              <p>
                No. It organizes questions and records to request. Any overcharge or recoverable amount depends on the lease and verified billing documents.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#102c25] mb-2">
                When should a tenant review CAM reconciliation charges?
              </h3>
              <p>
                Tenants should review CAM reconciliation charges immediately upon receipt,
                especially before contractual audit windows close. Most commercial leases
                limit dispute rights to a defined period after reconciliation delivery.
                Learn more about timing risks in our{" "}
                <Link href="/marketing/audit-window-deadlines" className="font-medium text-[#006d57] underline underline-offset-4">
                  audit window deadlines guide
                </Link>.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#102c25] mb-2">
                What should I do if CAM charges increase significantly year over year?
              </h3>
              <p>
                If CAM charges increase materially year over year, tenants should review
                lease caps, allocation methodology, expense classifications, and audit
                window deadlines before accepting the reconciliation statement. You may
                also want to reference our{" "}
                <Link href="/marketing/cam-reconciliation-checklist" className="font-medium text-[#006d57] underline underline-offset-4">
                  CAM reconciliation checklist overview
                </Link>{" "}
                for a structured review sequence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="bg-[#f5f7f3] py-16 px-6 sm:py-20 border-t border-[#dbe6dc]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[#516073] mb-6">
            Continue your CAM & NNN lease research with these structured tenant-side guides.
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102c25] mb-8 text-center">
            Related CAM & NNN Guides
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-[#516073] leading-7">
            <div className="bg-white p-6 rounded-2xl border border-[#dbe6dc] shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight text-[#102c25] mb-3">CAM Reconciliation Guide</h3>
              <p className="text-sm mb-4">
                Step-by-step breakdown of how CAM reconciliations are calculated,
                where errors occur, and how to review allocations.
              </p>
              <Link href="/marketing/cam-reconciliation" className="font-medium text-[#006d57] underline underline-offset-4">
                Read Guide →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#dbe6dc] shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight text-[#102c25] mb-3">Audit Window Deadlines</h3>
              <p className="text-sm mb-4">
                Understand 30, 60, and 90-day audit notice requirements and how
                missed deadlines eliminate dispute leverage.
              </p>
              <Link href="/marketing/audit-window-deadlines" className="font-medium text-[#006d57] underline underline-offset-4">
                Review Deadlines →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#dbe6dc] shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight text-[#102c25] mb-3">CAM vs. NNN Explained</h3>
              <p className="text-sm mb-4">
                Compare CAM charges and Triple Net lease structures to understand
                how operating expenses are passed through.
              </p>
              <Link href="/marketing/cam-vs-nnn" className="font-medium text-[#006d57] underline underline-offset-4">
                Compare Structures →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#102c25] text-white py-16 px-6 sm:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102c25] mb-6 text-white">
            Before Your Audit Window Closes
          </h2>

          <p className="text-lg text-gray-300 mb-8">
            Start with a free lease preview. Add an annual statement when you have it,
            then decide whether the full report will help you verify the questions raised.
          </p>

          <Link
            href="/app/step-1-upload"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white"
          >
            Start a free lease preview ↗
          </Link>
        </div>
      </section>

      {/* ARTICLE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "The Tenant-First CAM Audit Checklist",
            description:
              "Downloadable CAM audit checklist for commercial tenants to identify reconciliation errors, capital misclassification, and allocation overcharges.",
            author: {
              "@type": "Organization",
              name: "SaveOnLease",
            },
            publisher: {
              "@type": "Organization",
              name: "SaveOnLease",
              logo: {
                "@type": "ImageObject",
                url: "https://www.saveonlease.com/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.saveonlease.com/marketing/cam-audit-checklist",
            },
            articleSection: ["Commercial Real Estate", "CAM", "NNN Lease"],
            datePublished: "2026-02-01",
            dateModified: "2026-10-14",
          }),
        }}
      />

      {/* BREADCRUMB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.saveonlease.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Learn",
                item: "https://www.saveonlease.com/marketing/learn",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "CAM Audit Checklist",
                item: "https://www.saveonlease.com/marketing/cam-audit-checklist",
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
