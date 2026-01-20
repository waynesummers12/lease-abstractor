import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/icon-512.png"
            alt="SaveOnLease"
            className="h-10 w-10"
          />
          <span className="text-lg font-semibold">SaveOnLease</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/what-we-find" className="hover:underline">
            What We Find
          </Link>
          <Link href="/how-it-works" className="hover:underline">
            How It Works
          </Link>
          <Link href="/pricing" className="hover:underline">
            Pricing
          </Link>
          <Link href="/security" className="hover:underline">
            Security
          </Link>

          <Link
            href="/"
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Upload Lease
          </Link>
        </nav>
      </div>
    </header>
  );
}
