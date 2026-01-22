// web/src/app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[9999] bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          SaveOnLease
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm font-medium">
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
