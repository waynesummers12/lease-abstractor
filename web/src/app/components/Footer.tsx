// web/src/app/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <Link href="/marketing/what-we-find" className="hover:text-gray-900">
            What We Find
          </Link>

          <Link href="/marketing/how-it-works" className="hover:text-gray-900">
            How It Works
          </Link>

          <Link href="/marketing/pricing" className="hover:text-gray-900">
            Pricing
          </Link>

          <Link href="/product/app" className="font-medium text-gray-900">
            Start Audit
          </Link>
        </nav>

        <p className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} SaveOnLease. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
