"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { useAuth } from "@/app/providers/AuthProvider";
import EducationDropdown from "./EducationDropdown";
import AvatarDropdown from "./AvatarDowndown";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const isAppPage = pathname.startsWith("/app") || pathname.startsWith("/product/app");

  const { session, loading } = useAuth();
  const user: User | null = session?.user ?? null;

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

  const plan = (user?.user_metadata?.plan ?? "free") as "free" | "pro" | "enterprise";
  const isProUser = plan === "pro" || plan === "enterprise";
  const isEnterprise = plan === "enterprise";

  const trackUpgradeClick = () => {
    try {
      // future: send to analytics (PostHog, Segment, etc.)
    } catch {}
  };

  const navTextColor = isAppPage ? "text-gray-900" : "text-white";
  const bgClass = isAppPage
    ? "bg-white border-b border-gray-200"
    : "bg-black shadow-md";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] ${bgClass}`}>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 ${navTextColor}`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SaveOnLease" width={24} height={44} />
          <span className="text-lg font-medium">SaveOnLease</span>
        </Link>
        <span className="text-[10px] opacity-60">
          {loading ? "..." : user ? "auth" : "anon"}
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
              {/* Dashboard (PRIMARY NAV FOR LOGGED IN USERS) */}
              <div className="flex items-center gap-2">
                <Link
                  href="/product/app/dashboard"
                  className={`font-semibold transition ${isAppPage ? "text-black" : "text-white"}`}
                >
                  Dashboard
                </Link>

                {plan !== "enterprise" && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-400 text-black font-semibold">
                    {plan === "pro" ? "PRO" : "FREE"}
                  </span>
                )}
              </div>

              {/* FEATURE LINKS (ROLE-AWARE) */}
              <div className="flex items-center gap-3 ml-3">
                {/* Portfolio */}
                <div className="relative group">
                  <Link
                    href={plan === "free" ? "/marketing/pricing" : "/product/app/portfolio"}
                    className={`text-sm transition ${
                      isAppPage ? "text-gray-700" : "text-white/80"
                    } hover:opacity-100 flex items-center gap-1`}
                  >
                    Portfolio
                    {plan === "free" && <span className="text-xs">🔒</span>}
                  </Link>

                  {plan === "free" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-md bg-black text-white text-[11px] px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-auto">
                      <div className="flex items-center gap-2">
                        <span>Available on Pro plan</span>
                        <Link
                          href="/marketing/pricing"
                          onClick={() => trackUpgradeClick()}
                          className="underline hover:opacity-80"
                        >
                          Upgrade →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Benchmarks */}
                <div className="relative group">
                  <Link
                    href={plan !== "enterprise" ? "/marketing/pricing" : "/product/app/benchmarks"}
                    className={`text-sm transition ${
                      isAppPage ? "text-gray-700" : "text-white/80"
                    } hover:opacity-100 flex items-center gap-1`}
                  >
                    Benchmarks
                    {plan !== "enterprise" && <span className="text-xs">🔒</span>}
                  </Link>

                  {plan !== "enterprise" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-md bg-black text-white text-[11px] px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-auto">
                      <div className="flex items-center gap-2">
                        <span>Available on Enterprise plan</span>
                        <Link
                          href="/marketing/pricing"
                          onClick={() => trackUpgradeClick()}
                          className="underline hover:opacity-80"
                        >
                          Upgrade →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {plan === "free" && !isAppPage && (
                <Link
                  href="/marketing/pricing"
                  onClick={() => trackUpgradeClick()}
                  className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold hover:bg-white hover:text-black transition"
                >
                  Upgrade
                </Link>
              )}

              {/* Only show marketing links when NOT inside app */}
              {!isAppPage && (
                <Link
                  href="/app/step-1-upload"
                  className="rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200 shadow-md hover:shadow-lg transition-all ml-2"
                >
                  Run Audit
                </Link>
              )}

              {session && <AvatarDropdown session={session!} isProUser={isProUser} />}
              {isEnterprise && (
                <span className="text-[10px] text-gray-500 ml-2">
                  Enterprise
                </span>
              )}
            </>
          )}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
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
