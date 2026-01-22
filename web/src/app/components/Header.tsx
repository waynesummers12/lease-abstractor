import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] flex justify-center bg-transparent">
      <div className="mx-auto mt-4 flex h-14 max-w-5xl items-center gap-6 rounded-full bg-black px-6 text-sm text-white shadow-xl">
        {/* Brand */}
        <Link href="/" className="font-semibold text-white no-underline">
          SaveOnLease
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-4">
          <Link href="/marketing/what-we-find" className="text-white opacity-80 hover:opacity-100">
            What We Find
          </Link>
          <Link href="/marketing/how-it-works" className="text-white opacity-80 hover:opacity-100">
            How It Works
          </Link>
          <Link href="/marketing/pricing" className="text-white opacity-80 hover:opacity-100">
            Pricing
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/product/app"
          className="rounded-full bg-white px-4 py-1.5 font-semibold text-black hover:bg-gray-200"
        >
          Start Audit
        </Link>
      </div>
    </header>
  );
}

