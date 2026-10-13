import Link from "next/link";

const guides = [
  { href: "/marketing/nnn-audit-rights", label: "Audit rights" },
  { href: "/marketing/nnn-expenses-explained", label: "NNN expenses" },
  { href: "/marketing/nnn-reconciliation", label: "Reconciliation" },
  { href: "/marketing/non-allowable-cam-nnn-expenses", label: "Expenses to check" },
];

export default function NnnGuideNav({ current }: { current: string }) {
  return (
    <nav aria-label="NNN guides" className="mb-10 flex flex-wrap gap-2 border-b border-[#e2def2] pb-6">
      {guides.map((guide) => (
        <Link
          key={guide.href}
          href={guide.href}
          aria-current={guide.href === current ? "page" : undefined}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            guide.href === current
              ? "border-[#443581] bg-[#443581] text-white"
              : "border-[#e2def2] bg-white text-[#554b82] hover:border-[#a99ed4] hover:text-[#28215b]"
          }`}
        >
          {guide.label}
        </Link>
      ))}
    </nav>
  );
}
