"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-2 py-1 rounded ${
      pathname === path
        ? "bg-black text-white"
        : "text-gray-600 hover:text-black"
    }`;

  return (
    <div className="flex min-h-screen bg-white">

      {/* Sidebar */}
      <aside className="w-64 border-r p-6 space-y-6 bg-gray-50">

        <h2 className="text-lg font-semibold">
          SaveOnLease
        </h2>

        <nav className="flex flex-col gap-3 text-sm">

          <Link href="/product/app/dashboard" className={linkClass("/product/app/dashboard")}>
            Dashboard
          </Link>

          <Link href="/product/app/leases" className={linkClass("/product/app/leases")}>
            Leases
          </Link>

          <Link href="/product/app/portfolio" className={linkClass("/product/app/portfolio")}>
            Portfolio
          </Link>

          <Link href="/product/app/benchmarks" className={linkClass("/product/app/benchmarks")}>
            Benchmarks
          </Link>

          <Link href="/product/app/alerts" className={linkClass("/product/app/alerts")}>
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