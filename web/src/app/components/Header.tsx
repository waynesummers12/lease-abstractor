"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useAuth } from "@/app/providers/AuthProvider";
import EducationDropdown from "./EducationDropdown";
import AvatarDropdown from "./AvatarDowndown";
import MobileMenu from "./MobileMenu";


export default function Header() {
  const pathname = usePathname();
  const isAppPage =
    pathname.startsWith("/app") || pathname.startsWith("/product/app");

  const { session, loading, plan } = useAuth();
  const user = session?.user ?? null;
  console.log("HEADER SESSION:", session);

  const supabase = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )[0];

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isProUser = plan === "pro" || plan === "enterprise";
  const isEnterprise = plan === "enterprise";

  const navTextColor = isAppPage ? "text-gray-900" : "text-white";
  const bgClass = isAppPage
    ? "bg-white border-b border-gray-200"
    : "bg-black shadow-md";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] ${bgClass}`}>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 ${navTextColor}`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SaveOnLease" width={24} height={44} />
          <span className="text-lg font-medium">SaveOnLease</span>
        </Link>

        {/* 🔥 DEBUG STATUS (you can remove later) */}
        <span className="text-[10px] opacity-60">
          {loading ? "..." : user ? plan.toUpperCase() : "anon"}
        </span>

        <nav className="hidden md:flex items-center gap-6 text-sm relative whitespace-nowrap">
          <EducationDropdown />

          <Link href="/marketing/what-we-find" className="opacity-90 hover:opacity-100 font-medium transition">
            What We Find
          </Link>
          <Link href="/marketing/how-it-works" className="opacity-70 hover:opacity-100 transition">
            How It Works
          </Link>
          <Link href="/marketing/referral" className="opacity-90 hover:opacity-100 font-medium transition">
            Refer & Earn 20%
          </Link>
          <Link href="/marketing/contact" className="opacity-70 hover:opacity-100 transition">
            Contact
          </Link>
          <Link href="/marketing/pricing" className="opacity-70 hover:opacity-100 transition">
            Pricing
          </Link>

          <div className={`h-5 w-px mx-3 ${isAppPage ? "bg-gray-200" : "bg-white/20"}`} />

          {/* =============================
              NOT LOGGED IN
          ============================= */}
          {loading ? null : !user ? (
            <>
              <Link href="/login" className="opacity-80 hover:opacity-100 transition font-medium">
                Login
              </Link>
              <Link
                href="/app/step-1-upload"
                className="rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200 shadow-md hover:shadow-lg transition-all ml-2"
              >
                Run Audit (Free Preview)
              </Link>
            </>
          ) : (
            <>
              {/* =============================
                  LOGGED IN
              ============================= */}

              {/* Dashboard */}
              <div className="flex items-center gap-2">
                <Link
                  href="/product/app/dashboard"
                  className={`font-semibold transition ${
                    isAppPage ? "text-black" : "text-white"
                  }`}
                >
                  Dashboard
                </Link>

                {/* PLAN BADGE */}
                <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-400 text-black font-semibold">
                  {plan.toUpperCase()}
                </span>
              </div>

              {/* Portfolio */}
              <Link
                href={plan === "free" ? "/marketing/pricing" : "/product/app/portfolio"}
                className="text-sm opacity-80 hover:opacity-100 flex items-center gap-1"
              >
                Portfolio {plan === "free" && "🔒"}
              </Link>

              {/* Benchmarks */}
              <Link
                href={plan !== "enterprise" ? "/marketing/pricing" : "/product/app/benchmarks"}
                className="text-sm opacity-80 hover:opacity-100 flex items-center gap-1"
              >
                Benchmarks {plan !== "enterprise" && "🔒"}
              </Link>

              {/* Upgrade CTA */}
              {plan === "free" && !isAppPage && (
                <Link
                  href="/marketing/pricing"
                  className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold hover:bg-white hover:text-black transition"
                >
                  Upgrade
                </Link>
              )}

              {/* Run Audit */}
              {!isAppPage && (
                <Link
                  href="/app/step-1-upload"
                  className="rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200 shadow-md hover:shadow-lg transition-all ml-2"
                >
                  Run Audit
                </Link>
              )}

              {/* Avatar */}
              {session && (
                <AvatarDropdown session={session} isProUser={isProUser} />
              )}

              {/* Enterprise Label */}
              {isEnterprise && (
                <span className="text-[10px] text-gray-500 ml-2">
                  Enterprise
                </span>
              )}
            </>
          )}
        </nav>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
          ☰
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        user={user}
        onLogout={async () => {
          await supabase.auth.signOut();
          setMenuOpen(false);
        }}
      />
    </header>
  );
}
