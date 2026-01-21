// src/app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between rounded-2xl bg-black px-6 shadow-lg">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-semibold text-white hover:opacity-90"
          >
            SaveOnLease
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm text-gray-300">
            <Link
              href="/marketing/what-we-find"
              className="hover:text-white"
            >
              What We Find
            </Link>

            <Link
              href="/marketing/how-it-works"
              className="hover:text-white"
            >
              How It Works
            </Link>

            <Link
              href="/marketing/pricing"
              className="hover:text-white"
            >
              Pricing
            </Link>

            <Link
              href="/product/app"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-100"
            >
              Start Audit
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}


