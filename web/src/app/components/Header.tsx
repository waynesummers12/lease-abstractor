// src/app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-[9999]">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="
            relative
            flex h-14 items-center justify-between
            rounded-2xl
            bg-black/70
            backdrop-blur-md
            px-6
            shadow-xl
            ring-1 ring-white/10
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-semibold text-white tracking-tight"
          >
            SaveOnLease
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/marketing/what-we-find"
              className="text-gray-300 hover:text-white transition"
            >
              What We Find
            </Link>

            <Link
              href="/marketing/how-it-works"
              className="text-gray-300 hover:text-white transition"
            >
              How It Works
            </Link>

            <Link
              href="/marketing/pricing"
              className="text-gray-300 hover:text-white transition"
            >
              Pricing
            </Link>

            {/* CTA with subtle brand accent */}
            <Link
              href="/product/app"
              className="
                relative
                rounded-lg
                bg-white
                px-4 py-2
                text-sm font-semibold
                text-black
                hover:bg-gray-100
                transition
                shadow
                after:absolute
                after:inset-0
                after:rounded-lg
                after:ring-2
                after:ring-emerald-400/40
                after:opacity-0
                hover:after:opacity-100
                after:transition
              "
            >
              Start Audit
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
