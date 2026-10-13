import Link from "next/link";

const guides = [
  { href: "/marketing/retail-lease-hub", label: "Retail hub" },
  { href: "/marketing/franchise-cam-audit", label: "Franchise CAM" },
  { href: "/marketing/restaurant-nnn-overcharges", label: "Restaurant NNN" },
];

export default function RetailGuideNav({ current, embedded = false }: { current: string; embedded?: boolean }) {
  return (
    <div className={embedded ? "mb-10" : "mx-auto max-w-5xl px-6 pt-12"}>
      <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#9a4f25]">Retail &amp; franchise learning center</p>
      <nav aria-label="Retail and franchise guides" className="flex flex-wrap gap-2 border-b border-[#ead8c5] pb-6">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            aria-current={guide.href === current ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              guide.href === current
                ? "border-[#9a4f25] bg-[#9a4f25] text-white"
                : "border-[#ead8c5] bg-white text-[#755340] hover:border-[#c99672] hover:text-[#663b20]"
            }`}
          >
            {guide.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
