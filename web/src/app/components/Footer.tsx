// web/src/app/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-gray-600">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div>
            © {new Date().getFullYear()} SaveOnLease. All rights reserved.
          </div>

          {/* Right */}
          <nav className="flex flex-wrap gap-6">
            <Link href="/marketing/what-we-find" className="hover:text-gray-900">
              What We Find
            </Link>
            <Link href="/marketing/how-it-works" className="hover:text-gray-900">
              How It Works
            </Link>
            <Link href="/marketing/pricing" className="hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/marketing/privacy" className="hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/marketing/terms" className="hover:text-red-1100">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}


