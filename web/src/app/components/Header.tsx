import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 z-[9999] flex justify-center">
      <div className="flex items-center gap-6 rounded-full bg-black px-6 py-3 text-sm text-white shadow-lg">
        {/* Brand */}
        <Link href="/" className="font-semibold">
          SaveOnLease
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/marketing/what-we-find" className="opacity-80 hover:opacity-100">
            What We Find
          </Link>

          <Link href="/marketing/how-it-works" className="opacity-80 hover:opacity-100">
            How It Works
          </Link>

          <Link href="/marketing/pricing" className="opacity-80 hover:opacity-100">
            Pricing
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/product/app"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black hover:bg-gray-200"
        >
          Start Audit
        </Link>
      </div>
    </header>
  );
}