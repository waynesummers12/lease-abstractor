"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-4 inset-x-0 z-[9999]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between rounded-full bg-black/90 backdrop-blur shadow-lg px-6">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-semibold"
          >
            <span className="text-sm">SaveOnLease</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
            <Link href="/marketing/what-we-find" className="hover:text-white">
              What We Find
            </Link>
            <Link href="/marketing/how-it-works" className="hover:text-white">
              How It Works
            </Link>
            <Link href="/marketing/pricing" className="hover:text-white">
              Pricing
            </Link>
          </nav>

          {/* CTA */}
          <Link
            href="/product/app"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Start Audit
          </Link>
        </div>
      </div>
    </header>
  );
}


