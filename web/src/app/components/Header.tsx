// src/app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-4 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex h-14 items-center justify-between rounded-full bg-black/90 px-6 backdrop-blur shadow-lg">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-semibold text-white tracking-tight"
          >
            SaveOnLease
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <Link
              href="/marketing/what-we-find"
              className="hover:text-white transition"
            >
              What We Find
            </Link>

            <Link
              href="/marketing/how-it-works"
              className="hover:text-white transition"
            >
              How It Works
            </Link>

            <Link
              href="/marketing/pricing"
              className="hover:text-white transition"
            >
              Pricing
            </Link>

            <Link
              href="/product/app"
              className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black hover:bg-gray-100 transition"
            >
              Start Audit
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

