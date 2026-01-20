// src/app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold">
        CAM & NNN Lease Audit — Built for Tenants
      </h1>

      <p className="mb-6 max-w-xl text-gray-600">
        Upload your commercial lease and instantly identify CAM / NNN
        overcharges, uncapped expenses, and audit-window risk — before
        reconciliation deadlines expire.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/app"
          className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Start CAM Audit
        </Link>

        <a
          href="#how-it-works"
          className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          How it works
        </a>
      </div>

      <div
        id="how-it-works"
        className="mt-12 max-w-2xl text-left text-sm text-gray-700"
      >
        <h2 className="mb-2 text-lg font-semibold">How it works</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Upload your commercial lease (PDF)</li>
          <li>AI analyzes CAM / NNN clauses, caps, and escalation terms</li>
          <li>Get a clear estimate of avoidable overcharges</li>
          <li>Download a tenant-ready audit summary</li>
        </ol>
      </div>

      <footer className="mt-16 text-xs text-gray-400">
        © {new Date().getFullYear()} · Tenant-first lease intelligence
      </footer>
    </main>
  );
}
