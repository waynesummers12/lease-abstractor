"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="text-lg font-bold">
          SaveOnLease
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-8 text-sm">
          <Link href="/marketing/what-we-find">What We Find</Link>
          <Link href="/marketing/how-it-works">How It Works</Link>
          <Link href="/marketing/pricing">Pricing</Link>

          <Link
            href="/product/app"
            className="rounded-md bg-white px-4 py-2 font-semibold text-black hover:bg-gray-200"
          >
            Start Audit
          </Link>
        </div>
      </div>
    </nav>
  );
}

