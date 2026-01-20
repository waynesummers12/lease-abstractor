import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/icon-192.png"
            alt="SaveOnLease logo"
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold">
            SaveOnLease
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/what-we-find"
            className="text-sm text-gray-700 hover:text-black"
          >
            What We Find
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm text-gray-700 hover:text-black"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-gray-700 hover:text-black"
          >
            Pricing
          </Link>
          <Link
            href="/security"
            className="text-sm text-gray-700 hover:text-black"
          >
            Security
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/"
          className="rounded bg-black px-4 py-2 text-sm text-white"
        >
          Upload Lease
        </Link>
      </div>
    </header>
  );
}
