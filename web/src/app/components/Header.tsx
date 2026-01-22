"use client";

// web/src/app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 z-[1000] flex justify-center">
      <div className="flex items-center gap-6 rounded-full bg-black px-6 py-3 text-sm text-white shadow-lg">
        {/* Brand */}
        <Link
          href="/"
          className="font-semibold text-white hover:text-gray-200 transition"
        >
          SaveOnLease
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-4">
          <Link
            href="/marketing/what-we-find"
            className="text-white/80 hover:text-white transition"
          >
            What We Find
          </Link>

          <Link
            href="/marketing/how-it-works"
            className="text-white/80 hover:text-white transition"
          >
            How It Works
          </Link>

          <Link
            href="/marketing/pricing"
            className="text-white/80 hover:text-white transition"
          >
            Pricing
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/product/app"
          className="rounded-full bg-white px-4 py-1.5 font-semibold text-black hover:bg-gray-200 transition"
        >
          Start Audit
        </Link>
      </div>
    </header>
  );
}

