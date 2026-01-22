// web/src/app/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  const linkClass =
    "text-sm text-gray-600 hover:text-gray-900 transition no-underline";

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* Brand */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} SaveOnLease. All rights reserved.
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6">
            <Link href="/marketing/what-we-find" className={linkClass}>
              What We Find
            </Link>

            <Link href="/marketing/how-it-works" className={linkClass}>
              How It Works
            </Link>

            <Link href="/marketing/pricing" className={linkClass}>
              Pricing
            </Link>

            <Link href="/marketing/privacy" className={linkClass}>
              Privacy
            </Link>

            <Link href="/marketing/terms" className={linkClass}>
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

