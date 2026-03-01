import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office Lease Audit | CAM & NNN Review for Healthcare Tenants",
  description:
    "Audit your medical office lease for CAM overcharges, NNN pass-through errors, and admin fee violations. Built for imaging centers, urgent care, and multi-specialty practices.",
};

export default function MedicalOfficeLeaseAudit() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">
          CAM & NNN Lease Audit for Independent Medical Practices
        </h1>
        <p className="text-lg text-gray-700">
          Medical office leases carry unique cost exposure driven by equipment loads,
          compliance infrastructure, and shared building systems.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">
          Estimated Savings Range
        </h2>
        <p className="text-gray-700">
          Practices between 5,000–20,000 SF commonly uncover $15,000–$85,000 in
          annual exposure depending on lease structure and building allocation methods.
        </p>
      </section>

      <section className="text-center pt-6">
        <Link href="/app" className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg">
          Upload Your Medical Lease
        </Link>
      </section>
    </main>
  );
}