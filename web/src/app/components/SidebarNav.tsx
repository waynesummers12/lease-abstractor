"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

const navItems = [
  { label: "Dashboard", href: "/product/app/dashboard", roles: ["admin", "analyst", "viewer"] },
  { label: "Leases", href: "/product/app/leases", roles: ["admin", "analyst"] },
  { label: "Portfolio", href: "/product/app/portfolio", roles: ["admin", "analyst"], planRequired: "pro" },
  { label: "Benchmarks", href: "/product/app/benchmarks", roles: ["admin"], planRequired: "enterprise" },
  { label: "Alerts", href: "/product/app/alerts", roles: ["admin", "analyst"] },
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
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) return;

      setRole(
        (user.user_metadata?.role ?? "viewer") as "admin" | "analyst" | "viewer"
      );
      setPlan(
        (user.user_metadata?.plan ?? "free") as "free" | "pro" | "enterprise"
      );
    }

    loadSession();
  }, [supabase]);

  const filteredNav = useMemo(() => {
  if (role === "viewer") {
    return navItems.filter((item) =>
      ["Dashboard", "Leases", "Portfolio", "Alerts", "Benchmarks"].includes(item.label)
    );
  }
  return navItems;
}, [role]);

  useEffect(() => {
    const activeEl = document.querySelector("[data-active='true']") as HTMLElement | null;
    if (activeEl && indicatorRef.current) {
      indicatorRef.current.style.top = `${activeEl.offsetTop}px`;
      indicatorRef.current.style.height = `${activeEl.offsetHeight}px`;
    }
  }, [pathname, collapsed]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLockedModal(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div
      className={`border-r bg-gray-50 flex flex-col transition-all duration-300 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* HEADER */}
      <div className="px-4 py-2 border-b space-y-[2px]">
        {!collapsed && (
          <>
            <div className="font-semibold text-sm leading-tight">SaveOnLease</div>
            <div className="text-[11px] text-gray-500 leading-tight">Lease Intelligence Platform</div>
          </>
        )}

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-xs text-gray-500 hover:text-black"
        >
          {collapsed ? "→" : "Collapse"}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-3 text-sm overflow-y-auto relative">
        <div
          ref={indicatorRef}
          className="absolute left-0 w-1 bg-black rounded transition-all duration-300 hidden"
        />

        <div className="flex flex-col gap-[2px]">
          {filteredNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const locked =
              item.planRequired &&
              plan !== item.planRequired &&
              plan !== "enterprise";

            return (
              <div key={item.href} className="relative group" data-active={isActive}>
                <Link
                  href={locked ? "/pricing" : item.href}
                  onClick={(e) => {
                    if (locked) {
                      e.preventDefault();
                      window.location.href = "/pricing";
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-1 rounded-md transition-all text-[12.5px] font-medium ${
                    isActive
                      ? "bg-black text-white border-l-2 border-black"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black border-l-2 border-transparent"
                  } ${locked ? "opacity-70 cursor-pointer hover:bg-gray-100" : ""}`}
                >
                  {!collapsed && <span>{item.label}</span>}

                  {!collapsed && item.planRequired && (
                    <span className="text-[10px] bg-yellow-400 px-1.5 py-[2px] rounded ml-2">
                      {item.planRequired.toUpperCase()}
                    </span>
                  )}
                </Link>

                {collapsed && (
                  <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-black text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* ACTIONS */}
      <div className="px-4 py-3 border-t flex flex-col gap-2 mt-auto">
        <Link
          href="/product/app/add-lease"
          className="w-full text-center border rounded-md px-3 py-1 text-[12.5px] font-medium hover:bg-gray-100"
        >
          Add Lease
        </Link>

        <Link
          href="/app/step-1-upload"
          className="w-full text-center bg-black text-white rounded-md px-3 py-1 text-[12.5px] font-medium"
        >
          Run Audit (Free Preview)
        </Link>
      </div>

      {/* LOCK MODAL */}
      {lockedModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
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