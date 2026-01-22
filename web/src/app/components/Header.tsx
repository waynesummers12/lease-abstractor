// web/src/app/components/Header.tsx

import Link from "next/link";

export default function Header() {
  const navLink =
    "text-sm font-medium text-white/80 hover:text-white transition no-underline";

  return (
    <header className="fixed top-4 left-0 right-0 z-[9999] flex justify-center">
      <div className="flex items-center gap-6 rounded-full bg-black px-6 py-3 shadow-xl">
        {/* Brand */}
        <Link
          href="/"
          className="text-sm font-semibold text-white no-underline"
        >
          SaveOnLease
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-5">
          <Link href="/marketing/what-we-find" className={navLink}>
            What We Find
          </Link>

          <Link href="/marketing/how-it-works" className={navLink}>
            How It Works
          </Link>

          <Link href="/marketing/pricing" className={navLink}>
            Pricing
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/product/app"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 transition no-underline"
        >
          Start Audit
        </Link>
      </div>
    </header>
  );
}
