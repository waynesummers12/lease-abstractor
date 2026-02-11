// src/app/marketing/learn/page.tsx
import Link from "next/link";

export const metadata = {
  title: "CAM & NNN Lease Education for Tenants | SaveOnLease",
  description:
    "Learn how CAM and NNN charges work, common overcharges, audit deadlines, and how commercial tenants can protect themselves before audit windows expire.",
};

const articles = [
  {
    id: "cam-nnn-overcharges",
    title: "CAM & NNN Overcharges Explained",
    description:
      "Understand how CAM and NNN overcharges happen and why many tenants unknowingly overpay.",
    href: "/marketing/cam-nnn-overcharges",
  },
  {
    id: "audit-window-deadlines",
    title: "Audit Window Deadlines Explained",
    description:
      "Learn how CAM and NNN audit windows work, typical 30–120 day deadlines, and what happens if tenants miss them.",
    href: "/marketing/audit-window-deadlines",
  },
  {
    id: "commercial-audit-rights",
    title: "Commercial Lease Audit Rights",
    description:
      "A complete overview of audit rights for commercial tenants covering CAM, NNN, tax, and insurance charges.",
    href: "/marketing/audit-rights",
  },
  {
    id: "cam-admin-fees",
    title: "CAM Admin Fees Explained",
    description:
      "How CAM administrative and management fees work, what is typical, and when they become excessive.",
    href: "/marketing/cam-admin-page",
  },
  {
    id: "cam-expense-caps",
    title: "CAM Expense Caps Explained",
    description:
      "What CAM caps are, how they are structured, and how uncapped leases increase tenant risk.",
    href: "/marketing/cam-expense-caps",
  },
  {
    id: "cam-reconciliation-checklist",
    title: "CAM Reconciliation Checklist",
    description:
      "A step-by-step tenant checklist for reviewing CAM reconciliations before audit windows expire.",
    href: "/marketing/cam-reconciliation-checklist",
  },
  {
    id: "cam-reconciliation",
    title: "CAM Reconciliation Explained",
    description:
      "How annual CAM reconciliations work and how tenants identify discrepancies.",
    href: "/marketing/cam-reconciliation",
  },
  {
    id: "cam-vs-nnn",
    title: "CAM vs. NNN Explained",
    description:
      "Understand the difference between CAM and NNN charges and how each impacts your lease.",
    href: "/marketing/cam-vs-nnn",
  },
  {
    id: "nnn-audit-rights",
    title: "NNN Audit Rights Explained",
    description:
      "Specific audit rights related to NNN charges including tax and insurance allocations.",
    href: "/marketing/nnn-audit-rights",
  },
  {
    id: "nnn-calculation-examples",
    title: "NNN Calculation Examples",
    description:
      "Real-world examples of how NNN charges are calculated and where errors commonly occur.",
    href: "/marketing/nnn-calculation-examples",
  },
  {
    id: "nnn-insurance-charges",
    title: "NNN Insurance Charges Explained",
    description:
      "How insurance costs are allocated in NNN leases and when they are challengeable.",
    href: "/marketing/nnn-insurance-charges-explained",
  },
  {
    id: "nnn-property-tax-charges",
    title: "NNN Property Tax Charges Explained",
    description:
      "How property tax increases flow through NNN leases and when reassessments matter.",
    href: "/marketing/nnn-property-tax-charges-explained",
  },
  {
    id: "nnn-reconciliation",
    title: "NNN Reconciliation Explained",
    description:
      "How NNN reconciliations work and what tenants should verify each year.",
    href: "/marketing/nnn-reconciliation",
  },
  {
    id: "non-allowable-expenses",
    title: "Non-Allowable CAM / NNN Expenses",
    description:
      "Charges that are frequently disputed and often non-recoverable under standard lease interpretation.",
    href: "/marketing/non-allowable-cam-nnn-expenses",
  },
  {
    id: "pro-rata-share",
    title: "Pro Rata Share Explained",
    description:
      "How pro rata share is calculated and how small miscalculations can significantly impact tenants.",
    href: "/marketing/pro-rata-share-explained",
  },
  {
    id: "real-overcharge-examples",
    title: "Real CAM / NNN Overcharge Examples",
    description:
      "Actual examples of CAM and NNN overcharges and how they were identified.",
    href: "/marketing/real-cam-nnn-overcharge-examples",
  },
  {
    id: "lease-score-explained",
    title: "Lease Score Explained",
    description:
      "See how Lease Score reveals hidden CAM / NNN risk, uncapped expenses, and audit leverage that often drive commercial lease overcharges.",
    href: "/marketing/lease-score-explained",
  },
];

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 space-y-16">
      {/* HERO */}
      <section className="text-center">
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight">
          CAM & NNN Lease Education
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-700 leading-relaxed">
          Clear, tenant-first explanations of CAM and NNN charges, audit windows,
          and common overcharges — so you can act before deadlines expire.
        </p>
      </section>

      {/* ARTICLES GRID */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={article.href}
            className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold group-hover:underline">
              {article.title}
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              {article.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-black">
              Read article →
            </p>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gray-50 p-10 text-center">
        <h3 className="text-3xl font-light tracking-tight">
          Ready to apply this to your lease?
        </h3>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700">
          Upload your commercial lease and receive a tenant-first CAM & NNN audit
          with clear findings and estimated exposure.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-8 inline-flex rounded-xl bg-black px-10 py-5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start CAM & NNN Audit (Free Preview)
        </Link>
      </section>
    </main>
  );
}
