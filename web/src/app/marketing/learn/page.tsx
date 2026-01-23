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
    href: "/marketing/audit-rights",
  },
  {
    id: "commercial-audit-rights",
    title: "Commercial Lease Audit Rights",
    description:
      "A complete overview of audit rights for commercial tenants covering CAM, NNN, tax, and insurance charges.",
    href: "/marketing/audit-rights",
  },
  {
    id: "common-cam-fees",
    title: "Common CAM Fees Explained",
    description:
      "A breakdown of common CAM fees, which charges are typically allowed, and which are frequently disputed.",
    href: "/marketing/common-cam-fees",
  },
  {
    id: "nnn-expenses",
    title: "NNN Expenses Explained",
    description:
      "Learn how Triple Net (NNN) expenses work, why they increase, and when tenants can dispute them.",
    href: "/marketing/nnn-expenses-explained",
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
          href="/product/app"
          className="mt-8 inline-flex rounded-xl bg-black px-10 py-5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start CAM & NNN Audit
        </Link>
      </section>
    </main>
  );
}
