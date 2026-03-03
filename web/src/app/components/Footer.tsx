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
            <Link href="/marketing/learn" className="hover:text-gray-900">
              Learn
            </Link>
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
            <Link href="/marketing/terms" className="hover:text-gray-900">
              Terms
            </Link>
            <a
              href="https://www.linkedin.com/company/saveonlease.com/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:text-[#0A66C2]"
              aria-label="SaveOnLease LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-gray-500 group-hover:text-[#0A66C2] transition-colors"
              >
                <path d="M20.451 20.451h-3.554v-5.569c0-1.329-.024-3.039-1.852-3.039-1.853 0-2.137 1.446-2.137 2.94v5.668H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.6 0 4.266 2.37 4.266 5.455v6.287zM5.337 7.433a2.06 2.06 0 11.001-4.121 2.06 2.06 0 01-.001 4.121zM6.814 20.451H3.86V9h2.954v11.451z" />
              </svg>
            </a>
            <span className="text-xs text-gray-400 hidden md:inline">
              Follow for CAM insights
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
