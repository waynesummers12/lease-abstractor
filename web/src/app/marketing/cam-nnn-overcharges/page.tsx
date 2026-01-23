// src/app/marketing/cam-nnn-overcharges/page.tsx
import Link from "next/link";
import FaqSchema from "@/app/components/FaqSchema";

export const metadata = {
  title: "CAM & NNN Overcharges Explained | SaveOnLease",
  description:
    "Learn what CAM and NNN overcharges are, how they happen, and how commercial tenants can identify billing errors before audit deadlines expire.",
};

export default function ArticlePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 space-y-10">
      {/* HERO */}
      <section>
        <h1 className="text-5xl font-light tracking-tight leading-tight">
          CAM & NNN Overcharges Explained
        </h1>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          Many commercial tenants unknowingly overpay CAM and NNN charges due to
          unclear lease language, billing errors, and missed audit rights.
        </p>
      </section>

      {/* CONTENT */}
      <section className="space-y-6 text-gray-700 text-lg leading-relaxed">
        <p>
          Common Area Maintenance (CAM) and Triple Net (NNN) charges are often
          complex, inconsistently billed, and difficult for tenants to verify.
        </p>

        <p>
          Overcharges typically occur when landlords pass through expenses that
          are excluded by the lease, exceed negotiated caps, or apply incorrect
          pro-rata allocations.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Common CAM & NNN Overcharge Examples
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Administrative or management fees above lease limits</li>
          <li>Capital expenses passed through improperly</li>
          <li>Insurance and tax charges misapplied</li>
          <li>Incorrect square footage or occupancy assumptions</li>
        </ul>

        <p>
          These errors often go unnoticed because tenants lack the time or
          expertise to reconcile complex lease language against annual
          statements.
        </p>

        <h2 className="pt-6 text-3xl font-light tracking-tight">
          Why Audit Windows Matter
        </h2>

        <p>
          Most leases allow tenants only a limited period—often 30 to 120
          days—to dispute CAM and NNN charges. Missing this window can permanently
          forfeit recovery rights.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-gray-50 p-8 text-center">
        <h3 className="text-2xl font-semibold">
          Unsure if you’re overpaying?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          Upload your lease and receive a tenant-first CAM & NNN audit with clear
          findings and estimated exposure.
        </p>
        <Link
          href="/product/app"
          className="mt-6 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Start CAM Audit
        </Link>
      </section>
      {/* FAQ Schema */}
      <FaqSchema />
    </main>
  );
}
