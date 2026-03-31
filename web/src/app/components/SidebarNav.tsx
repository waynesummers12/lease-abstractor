"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

const navItems = [
  { label: "Dashboard", href: "/product/app/dashboard", roles: ["admin", "analyst", "viewer"] },
  { label: "Leases", href: "/product/app/leases", roles: ["admin", "analyst"] },
  { label: "Portfolio", href: "/product/app/portfolio", roles: ["admin", "analyst"], planRequired: "pro" },
  { label: "Benchmarks", href: "/product/app/benchmarks", roles: ["admin"], planRequired: "enterprise" },
  { label: "Insights", href: "/product/app/insights", roles: ["admin", "analyst"] },
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

      setRole((user.user_metadata?.role ?? "viewer") as "admin" | "analyst" | "viewer");
      setPlan((user.user_metadata?.plan ?? "free") as "free" | "pro" | "enterprise");
    }

    loadSession();
  }, [supabase]);

  const filteredNav = useMemo(() => {
    return navItems.filter((item) => item.roles.includes(role));
  }, [role]);

  return (
    <div
      className={`h-full flex flex-col bg-gray-50 border-r ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* HEADER */}
      <div className="px-4 py-3 border-b">
        {!collapsed && (
          <>
            <div className="text-sm font-semibold leading-tight">
              SaveOnLease
            </div>
            <div className="text-[11px] text-gray-500 leading-tight">
              Lease Intelligence Platform
            </div>
          </>
        )}

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="mt-2 text-xs text-gray-400 hover:text-black"
        >
          {collapsed ? "→" : "Collapse"}
        </button>
      </div>

      {/* NAV */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="flex flex-col gap-0.5">
          {filteredNav.map((item) => {
            const isActive = pathname.startsWith(item.href);

            const locked =
              item.planRequired &&
              plan !== item.planRequired &&
              plan !== "enterprise";

            return (
              <div key={item.href} className="relative group">
                <Link
                  href={locked ? "#" : item.href}
                  onClick={(e) => {
                    if (locked) {
                      e.preventDefault();
                      setLockedModal(item.label);
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-1.5 text-[13px] rounded-md transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  } ${locked ? "opacity-60" : ""}`}
                >
                  {!collapsed && <span>{item.label}</span>}

                  {!collapsed && item.planRequired && (
                    <span className="text-[10px] bg-yellow-400 px-2 py-0.5 rounded">
                      {item.planRequired.toUpperCase()}
                    </span>
                  )}
                </Link>

                {collapsed && (
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="px-4 py-3 border-t mt-auto flex flex-col gap-2">
        <Link
          href="/product/app/add-lease"
          className="text-center border border-gray-300 rounded-md px-3 py-1.5 text-[13px] hover:bg-gray-100"
        >
          Add Lease
        </Link>

        <Link
          href="/app/step-1-upload"
          className="text-center bg-black text-white rounded-md px-3 py-1.5 text-[13px]"
        >
          Run Audit (Free Preview)
        </Link>
      </div>

      {/* MODAL */}
      {lockedModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setLockedModal(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">
              Upgrade Required
            </h3>

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