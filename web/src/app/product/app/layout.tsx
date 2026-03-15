"use client";

import Link from "next/link";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">

      {/* Sidebar */}
      <aside className="w-64 border-r p-6 space-y-6 bg-gray-50">

        <h2 className="text-lg font-semibold">
          SaveOnLease
        </h2>

        <nav className="flex flex-col gap-3 text-sm">

          <Link href="/product/app/dashboard" className="text-gray-600 hover:text-black">
            Dashboard
          </Link>

          <Link href="/product/app/leases" className="text-gray-600 hover:text-black">
            Leases
          </Link>

          <Link href="/product/app/portfolio" className="text-gray-600 hover:text-black">
            Portfolio
          </Link>

          <Link href="/product/app/benchmarks" className="text-gray-600 hover:text-black">
            Benchmarks
          </Link>

          <Link href="/product/app/alerts" className="text-gray-600 hover:text-black">
            Alerts
          </Link>

        </nav>

        <div className="pt-6 border-t">
          <Link
            href="/app/step-1-upload"
            className="bg-black text-white px-4 py-2 rounded text-sm"
          >
            Upload Lease
          </Link>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}