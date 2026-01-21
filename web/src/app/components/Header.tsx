// src/app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-sm font-semibold">
          SaveOnLease
        </Link>

        {/* Navigation */}
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
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Start Audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
