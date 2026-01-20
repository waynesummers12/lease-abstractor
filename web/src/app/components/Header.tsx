import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="SaveOnLease"
            width={40}
            height={40}
            priority
          />
          <span className="text-lg font-semibold">SaveOnLease</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
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

          {/* Primary CTA */}
          <Link
            href="/upload"
            className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Upload Lease
          </Link>
        </nav>
      </div>
    </header>
  );
}

