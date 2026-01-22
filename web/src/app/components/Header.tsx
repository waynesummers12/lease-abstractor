// src/app/components/Header.tsx
import "../globals.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-[9999]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between rounded-2xl bg-white/80 px-6 shadow-sm backdrop-blur">
          {/* Logo */}
          <Link href="/" className="text-sm font-semibold">
            SaveOnLease
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/marketing/what-we-find" className="hover:underline">
              What We Find
            </Link>

            <Link href="/marketing/how-it-works" className="hover:underline">
              How It Works
            </Link>

            <Link href="/marketing/pricing" className="hover:underline">
              Pricing
            </Link>

            <Link
              href="/product/app"
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
            >
              Start Audit
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
