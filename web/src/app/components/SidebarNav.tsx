"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

const navItems = [
  {
    label: "Dashboard",
    href: "/app/dashboard",
    roles: ["admin", "analyst", "viewer"],
  },
  {
    label: "Leases",
    href: "/app/leases",
    roles: ["admin", "analyst"],
  },
  {
    label: "Portfolio",
    href: "/app/portfolio",
    roles: ["admin", "analyst"],
    planRequired: "pro",
  },
  {
    label: "Benchmarks",
    href: "/app/benchmarks",
    roles: ["admin"],
    planRequired: "enterprise",
  },
  {
    label: "Alerts",
    href: "/app/alerts",
    roles: ["admin", "analyst"],
  },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
  const [role, setRole] = useState<"admin" | "analyst" | "viewer">("viewer");
  const [plan, setPlan] = useState<"free" | "pro" | "enterprise">("free");
  const [lockedModal, setLockedModal] = useState<string | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) return;

      const userRole = (user.user_metadata?.role ?? "viewer") as
        | "admin"
        | "analyst"
        | "viewer";

      const userPlan = (user.user_metadata?.plan ?? "free") as
        | "free"
        | "pro"
        | "enterprise";

      setRole(userRole);
      setPlan(userPlan);
    }

    loadSession();
  }, [supabase]);

  const filteredNav = useMemo(() => {
    return navItems.filter((item) => item.roles.includes(role));
  }, [role]);


  useEffect(() => {
    const activeEl = document.querySelector("[data-active='true']") as HTMLElement | null;
    if (activeEl && indicatorRef.current) {
      indicatorRef.current.style.top = `${activeEl.offsetTop}px`;
      indicatorRef.current.style.height = `${activeEl.offsetHeight}px`;
    }
  }, [pathname, collapsed]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setLockedModal(null);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div
      className={`relative transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="mb-4 text-xs text-gray-500 hover:text-black"
      >
        {collapsed ? "→" : "Collapse"}
      </button>

      <nav className="flex flex-col gap-2 text-sm relative">
        <div
          ref={indicatorRef}
          className="absolute left-0 w-1 bg-black rounded transition-all duration-300"
          style={{ top: 0 }}
        />
        {filteredNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const locked =
            item.planRequired &&
            plan !== item.planRequired &&
            plan !== "enterprise";

          return (
            <div
              key={item.href}
              className="relative group"
              data-active={pathname.startsWith(item.href)}
            >
              <Link
                href={locked ? "#" : item.href}
                onClick={(e) => {
                  if (locked) {
                    e.preventDefault();
                    setLockedModal(item.label);
                  }
                }}
                className={`flex items-center justify-between px-3 py-2 rounded transition-all duration-200 h-8 ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                } ${locked ? "opacity-70" : ""}`}
              >
                <span className="flex items-center gap-3">
                  {!collapsed && <span>{item.label}</span>}
                </span>

                {!collapsed && item.planRequired && (
                  <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded">
                    {item.planRequired.toUpperCase()}
                  </span>
                )}
              </Link>

              {collapsed && (
                <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {lockedModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setLockedModal(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Upgrade Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              {lockedModal} is available on a higher-tier plan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setLockedModal(null)}
                className="text-sm text-gray-500"
              >
                Close
              </button>
              <a
                href="/pricing"
                className="text-sm bg-black text-white px-4 py-2 rounded"
              >
                Upgrade
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}