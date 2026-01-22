// src/app/marketing/cam-audit-rights/page.tsx
import Link from "next/link";

export const metadata = {
  title: "CAM Audit Rights Explained | Commercial Tenants | SaveOnLease",
  description:
    "Understand CAM audit rights in commercial leases, typical audit windows, and how tenants can dispute improper charges before deadlines expire.",
};

export default function CamAuditRightsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 space-y-12">
      {/* HERO */}
      <section>
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight">
          CAM Audit Rights Explained
        </h1>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          Most commercial leases give tenants the right to audit CAM charges —
          but only for a limited time. Missing this window can permanently waive
          your ability to dispute overcharges.
        </p>
      </section>

      {/* CONTENT */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          CAM audit rights allow tenants to review, verify, and challenge Common
          Area Maintenance charges billed by a landlord. These rights are
          governed strictly by lease language and timing requirements.
        </p>

        <p>
          While landlords often provide annual reconciliation statements, they
          rarely highlight tenant audit rights or deadlines. As a result, many
          tenants lose their ability to recover improper charges without
          realizing it.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          What CAM Audit Rights Typically Include
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>The right to review CAM expense documentation</li>
          <li>The ability to dispute charges not allowed by the lease</li>
          <li>Limits on administrative and management fees</li>
          <li>Verification of pro-rata share and allocation methods</li>
          <li>Potential reimbursement or credit for improper charges</li>
        </ul>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          CAM Audit Windows and Deadlines
        </h2>

        <p>
          Audit rights are almost always subject to strict deadlines. Common
          audit windows range from 30 to 120 days after receipt of a CAM
          reconciliation statement.
        </p>

        <p>
          If a tenant does not object in writing within the audit window, the
          charges are typically deemed final — even if they are incorrect.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Why Tenants Miss Audit Opportunities
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Reconciliation statements are dense and hard to interpret</li>
          <li>Lease language around CAM is complex and technical</li>
          <li>Deadlines are buried in lease provisions</li>
          <li>Tenants underestimate the dollar impact of small errors</li>
        </ul>

        <p>
          By the time issues are discovered, the audit window has often already
          closed.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          How Tenants Can Protect Their Rights
        </h2>

        <p>
          The best way to protect CAM audit rights is to review lease language
          and reconciliation statements as soon as they are received. A
          structured audit can surface issues early and quantify exposure before
          deadlines expire.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-gray-50 p-8 text-center">
        <h3 className="text-2xl font-semibold">
          Not sure if your audit window is still open?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          Upload your lease and receive a tenant-first CAM audit that highlights
          risks, deadlines, and potential overcharges.
        </p>
        <Link
          href="/product/app"
          className="mt-6 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start CAM Audit
        </Link>
      </section>
    </main>
  );
}
