import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-white">
        {/* Brand */}
        <Link href="/" className="text-sm font-semibold">
          SaveOnLease
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm">
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
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
        >
          Start Audit
        </Link>
      </div>
    </header>
  );
}
