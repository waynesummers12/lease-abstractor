// src/app/components/Header.tsx

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="SaveOnLease"
            width={36}
            height={36}
            priority
          />
          <span className="text-lg font-semibold text-gray-900">
            SaveOnLease
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/what-we-find"
            className="text-gray-600 hover:text-gray-900"
          >
            What We Find
          </Link>

          <Link
            href="/how-it-works"
            className="text-gray-600 hover:text-gray-900"
          >
            How It Works
          </Link>

          <Link
            href="/pricing"
            className="text-gray-600 hover:text-gray-900"
          >
            Pricing
          </Link>

          <Link
            href="/security"
            className="text-gray-600 hover:text-gray-900"
          >
            Security
          </Link>

          {/* CTA */}
          <Link
            href="/upload"
            className="ml-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Upload Lease
          </Link>
        </nav>
      </div>
    </header>
  );
}
