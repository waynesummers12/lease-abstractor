import Link from "next/link";

const guides = [
  { href: "/marketing/medical-hub", label: "Overview" },
  { href: "/marketing/medical-office-lease-audit", label: "Lease audit" },
  { href: "/marketing/medical-office-cam-reconciliation", label: "Medical CAM" },
  { href: "/marketing/medical-office-nnn-expenses", label: "Medical NNN" },
];

export default function MedicalGuideNav({ current }: { current: string }) {
  return (
    <nav aria-label="Medical lease guides" className="mb-10 flex flex-wrap gap-2 border-b border-[#d8e6f6] pb-6">
      {guides.map((guide) => (
        <Link
          key={guide.href}
          href={guide.href}
          aria-current={guide.href === current ? "page" : undefined}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            guide.href === current
              ? "border-[#1b5a97] bg-[#1b5a97] text-white"
              : "border-[#d8e6f6] bg-white text-[#315c83] hover:border-[#88b5e1] hover:text-[#123f70]"
          }`}
        >
          {guide.label}
        </Link>
      ))}
    </nav>
  );
}
