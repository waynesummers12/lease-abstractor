// src/app/components/Header.tsx
import Link from "next/link";
console.log("HEADER RENDERED");

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold">
          SaveOnLease
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/what-we-find">What We Find</Link>
          <Link href="/pricing">Pricing</Link>
          <Link
            href="/app"
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Start Audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
