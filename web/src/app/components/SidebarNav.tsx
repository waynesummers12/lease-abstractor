"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarNavProps {
  role: "admin" | "analyst" | "viewer";
  plan?: "free" | "pro" | "enterprise";
}

const navItems = [
  {
    label: "Dashboard",
    href: "/product/app/dashboard",
    roles: ["admin", "analyst", "viewer"],
  },
  {
    label: "Leases",
    href: "/product/app/leases",
    roles: ["admin", "analyst"],
  },
  {
    label: "Portfolio",
    href: "/product/app/portfolio",
    roles: ["admin", "analyst"],
    planRequired: "pro",
  },
  {
    label: "Benchmarks",
    href: "/product/app/benchmarks",
    roles: ["admin"],
    planRequired: "enterprise",
  },
  {
    label: "Alerts",
    href: "/product/app/alerts",
    roles: ["admin", "analyst"],
  },
];

export default function SidebarNav({ role, plan = "free" }: SidebarNavProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  const filteredNav = navItems.filter((item) =>
    item.roles.includes(role)
  );

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
        {filteredNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const locked = item.planRequired && plan !== item.planRequired && plan !== "enterprise";

          return (
            <div key={item.href} className="relative group">
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-black rounded transition-all" />
              )}

              <Link
                href={locked ? "#" : item.href}
                className={`flex items-center justify-between px-3 py-2 rounded transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                } ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
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

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}