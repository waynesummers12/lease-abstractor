import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnnualStatementEntry from "@/components/AnnualStatementEntry";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heroLead: string;
  heroAccent: string;
  intro: string;
  heroSteps: [string, string][];
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  checks: { title: string; text: string; source: string }[];
  exampleEyebrow: string;
  exampleTitle: string;
  exampleText: string;
  exampleRows: [string, string][];
  exampleNote: string;
  bridgeTitle: string;
  bridgeText: string;
  bridgeHref: string;
  bridgeLabel: string;
  related: { href: string; title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
  download?: boolean;
};

const pdfHref = "/assets/Tenant-First-CAM-Audit-Checklistv1.pdf";
const pageUrl = (slug: string) => `https://www.saveonlease.com/marketing/${slug}`;

export function guideMetadata(guide: Guide): Metadata {
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: pageUrl(guide.slug) },
    openGraph: { title: `${guide.title} | SaveOnLease`, description: guide.description, url: pageUrl(guide.slug), siteName: "SaveOnLease", type: "article" },
  };
}

export default function GuidePage({ guide }: { guide: Guide }) {
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.saveonlease.com/marketing" }, { "@type": "ListItem", position: 2, name: "Learn", item: "https://www.saveonlease.com/marketing/learn" }, { "@type": "ListItem", position: 3, name: guide.title, item: pageUrl(guide.slug) }] };

  return <main className="bg-[#f5f7f3] text-[#17243a]">
    <nav aria-label="Guide navigation" className="border-b border-[#dbe6dc] bg-white px-6 py-4"><div className="mx-auto flex max-w-6xl flex-wrap gap-2">{[{ href: "/marketing/learn", label: "All guides" }, { href: pageUrl(guide.slug), label: guide.title }, { href: guide.bridgeHref, label: guide.bridgeLabel }].map((item) => <Link key={item.href} href={item.href} aria-current={item.href === pageUrl(guide.slug) ? "page" : undefined} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item.href === pageUrl(guide.slug) ? "border-[#102c25] bg-[#102c25] text-white" : "border-[#dbe6dc] bg-white text-[#36554a] hover:border-[#006d57] hover:text-[#006d57]"}`}>{item.label}</Link>)}</div></nav>

    <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" /><div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.07fr_.93fr] lg:items-center lg:gap-16"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">{guide.eyebrow}</p><h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">{guide.heroLead} <span className="text-[#a9e9be]">{guide.heroAccent}</span></h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">{guide.intro}</p><div className="mt-8 flex flex-wrap gap-3">{guide.download ? <a href={pdfHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Open the free checklist PDF ↗</a> : <a href="#guide-checks" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">See what to check ↓</a>}<Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link></div>{guide.download && <p className="mt-4 text-xs text-[#d9e9df]">Instant download · No email or account required</p>}</div><div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">{guide.download ? <><div className="overflow-hidden rounded-xl bg-white p-3"><Image src="/assets/checklist-preview.png" alt="Preview of the tenant-first CAM audit checklist" width={800} height={600} className="h-auto w-full rounded-lg" /></div><p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">A take-along review worksheet</p></> : <><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">At a glance</p><div className="mt-6 space-y-3">{guide.heroSteps.map(([title, detail], index) => <div key={title} className="flex gap-4 rounded-xl border border-white/20 bg-white/10 p-4"><span className="text-sm font-bold text-[#a9e9be]">0{index + 1}</span><div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p></div></div>)}</div></>}<p className="mt-5 text-xs leading-6 text-[#d9e9df]">The signed lease, annual statement, and available records determine what can be verified.</p></div></div></section>

    {guide.slug === "cam-reconciliation-statement" && <AnnualStatementEntry />}

    <section id="guide-checks" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">{guide.sectionEyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">{guide.sectionTitle}</h2><p className="mt-5 text-base leading-8 text-[#516073]">{guide.sectionIntro}</p></div><div className="mt-9 grid gap-4 md:grid-cols-2">{guide.checks.map((check, index) => <article key={check.title} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7"><span className="inline-flex h-9 w-9 items-center justify-center self-start rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">0{index + 1}</span><h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{check.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#516073]">{check.text}</p><p className="mt-5 border-t border-[#e0e9e1] pt-4 text-xs font-semibold leading-6 text-[#006d57]">Check: {check.source}</p></article>)}</div></section>

    <section className="bg-white px-6 py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">{guide.exampleEyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">{guide.exampleTitle}</h2><p className="mt-5 text-base leading-8 text-[#516073]">{guide.exampleText}</p><p className="mt-5 border-l-4 border-[#006d57] pl-5 text-sm leading-7 text-[#36554a]">{guide.exampleNote}</p></div><div className="overflow-hidden rounded-[28px] border border-[#dbe6dc] bg-[#f9fbf8] shadow-xl shadow-[#102c25]/10"><div className="bg-[#102c25] px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-[#a9e9be] sm:px-8">Illustrative review worksheet</div><div className="space-y-3 p-6 sm:p-8">{guide.exampleRows.map(([label, value]) => <div key={label} className="rounded-xl border border-[#dbe6dc] bg-white px-5 py-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#006d57]">{label}</p><p className="mt-2 text-sm leading-6 text-[#324b40]">{value}</p></div>)}</div></div></div></section>

    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20"><div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Go one step deeper</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">{guide.bridgeTitle}</h2><p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">{guide.bridgeText}</p></div><Link href={guide.bridgeHref} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">{guide.bridgeLabel} ↗</Link></div></section>

    <section className="bg-white px-6 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Related guides</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Keep the document trail together.</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{guide.related.map((item) => <article key={item.href} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6"><h3 className="text-xl font-semibold text-[#102c25]">{item.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#516073]">{item.text}</p><Link href={item.href} className="mt-5 text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Read the guide ↗</Link></article>)}</div></div></section>

    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Common questions</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">What the documents can tell you.</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{guide.faqs.map((faq) => <div key={faq.question} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm"><h3 className="text-lg font-semibold text-[#102c25]">{faq.question}</h3><p className="mt-3 text-sm leading-7 text-[#516073]">{faq.answer}</p></div>)}</div></section>

    <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20"><div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{guide.ctaTitle}</h2><p className="mt-4 text-base leading-8 text-[#d9e9df]">{guide.ctaText}</p></div><Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
  </main>;
}
