import Link from "next/link";

const guides = [
  { href: "/marketing/cam-reconciliation", label: "Reconciliation" },
  { href: "/marketing/cam-reconciliation-errors", label: "Errors" },
  { href: "/marketing/cam-expense-caps", label: "Expense caps" },
  { href: "/marketing/cam-admin-page", label: "Admin fees" },
];

export default function CamGuideNav({ current }: { current: string }) {
  return (
    <nav aria-label="CAM guides" className="mb-10 flex flex-wrap gap-2 border-b border-[#dce9e1] pb-6">
      {guides.map((guide) => (
        <Link
          key={guide.href}
          href={guide.href}
          aria-current={guide.href === current ? "page" : undefined}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            guide.href === current
              ? "border-[#102c25] bg-[#102c25] text-white"
              : "border-[#dce9e1] bg-white text-[#36544a] hover:border-[#6da68d] hover:text-[#102c25]"
          }`}
        >
          {guide.label}
        </Link>
      ))}
    </nav>
  );
}
