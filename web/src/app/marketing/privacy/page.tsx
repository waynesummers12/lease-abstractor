import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SaveOnLease collects, uses, and protects lease documents and personal information.",
  alternates: { canonical: "https://www.saveonlease.com/marketing/privacy" },
};

const sections = [
  { id: "information-we-collect", number: "01", title: "Information We Collect" },
  { id: "how-we-use-information", number: "02", title: "How We Use Information" },
  { id: "data-sharing", number: "03", title: "Data Sharing" },
  { id: "data-security", number: "04", title: "Data Security" },
  { id: "data-retention", number: "05", title: "Data Retention" },
  { id: "contact", number: "06", title: "Contact" },
];

const sectionClass = "scroll-mt-32 border-b border-[#dce7dd] py-8 first:pt-0 last:border-0 last:pb-0 sm:py-10";
const headingClass = "text-xl font-semibold tracking-tight text-[#102b25] sm:text-2xl";
const bodyClass = "mt-4 max-w-2xl text-base leading-8 text-[#4b5d55]";

export default function PrivacyPage() {
  return <main className="bg-[#f7f9f6] text-[#102b25]">
    <section className="relative overflow-hidden bg-[#102b25] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 h-[380px] w-[380px] rounded-full border border-white/10" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a8edbf]">SaveOnLease / Legal</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.07] tracking-tight text-white sm:text-6xl">Privacy <span className="text-[#a8edbf]">Policy.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9e9df]">SaveOnLease is committed to protecting your privacy. This policy explains how we collect, use, and safeguard information when you use our website and services.</p>
        <p className="mt-8 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-[#e5f3e9]">Last updated October 5, 2026</p>
      </div>
    </section>

    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
      <nav aria-label="Privacy sections" className="self-start rounded-2xl border border-[#dce7dd] bg-white p-5 shadow-sm lg:sticky lg:top-28">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087055]">On this page</p>
        <ol className="mt-5 space-y-1">{sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="flex min-h-10 items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-[#40574b] transition hover:bg-[#edf6ee] hover:text-[#006d57]"><span className="text-xs font-bold text-[#087055]">{section.number}</span>{section.title}</a></li>)}</ol>
      </nav>

      <div className="min-w-0 rounded-[1.75rem] border border-[#dce7dd] bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-10 rounded-2xl border border-[#c9e1d0] bg-[#eef7ef] p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087055]">At a glance</p>
          <p className="mt-3 text-base leading-7 text-[#28493a]">Your lease documents help us produce your review. We keep them so you can return to your reports, and you can ask us to delete them subject to records we must retain.</p>
        </div>

        <section id="information-we-collect" className={sectionClass} aria-labelledby="information-we-collect-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">01</span><h2 id="information-we-collect-title" className={headingClass}>Information We Collect</h2></div>
          <p className={bodyClass}>We may collect the following types of information:</p>
          <ul className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-[#4b5d55]"><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>Lease documents you upload for analysis</li><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>Basic contact information such as email address</li><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>Payment status, amount, currency, and Checkout reference; Stripe handles card entry</li><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>Technical information such as browser type and IP address</li></ul>
        </section>

        <section id="how-we-use-information" className={sectionClass} aria-labelledby="how-we-use-information-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">02</span><h2 id="how-we-use-information-title" className={headingClass}>How We Use Information</h2></div>
          <ul className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-[#4b5d55]"><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>To generate your CAM / NNN lease audit</li><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>To deliver audit results and PDFs</li><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>To provide customer support</li><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>To improve our service and user experience</li></ul>
        </section>

        <section id="data-sharing" className={sectionClass} aria-labelledby="data-sharing-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">03</span><h2 id="data-sharing-title" className={headingClass}>Data Sharing</h2></div>
          <p className={bodyClass}>SaveOnLease does not sell, rent, or trade your personal information or lease documents.</p>
          <p className={bodyClass}>We use Supabase for accounts and document storage, Stripe for checkout, Resend for report emails, and hosting providers to run the site and audit service. Google Analytics collects site usage information. These providers receive information needed for their respective services.</p>
        </section>

        <section id="data-security" className={sectionClass} aria-labelledby="data-security-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">04</span><h2 id="data-security-title" className={headingClass}>Data Security</h2></div>
          <p className={bodyClass}>We use reasonable technical and organizational safeguards to protect your information, including secure connections and restricted access to stored documents.</p>
        </section>

        <section id="data-retention" className={sectionClass} aria-labelledby="data-retention-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">05</span><h2 id="data-retention-title" className={headingClass}>Data Retention</h2></div>
          <p className={bodyClass}>We keep uploaded leases and audit results so you can return to your reports. Payment and support records may be kept for accounting, dispute resolution, and legal obligations. We do not currently apply a fixed automatic deletion period. You may request deletion of your lease documents and audit results by emailing us; we will verify the request and explain any records we must retain.</p>
        </section>

        <section id="contact" className={sectionClass} aria-labelledby="contact-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">06</span><h2 id="contact-title" className={headingClass}>Contact</h2></div>
          <p className={bodyClass}>For privacy questions or requests to access or delete your data, email <a className="font-semibold text-[#006d57] underline underline-offset-4" href="mailto:audits@saveonlease.com">audits@saveonlease.com</a>.</p>
        </section>
      </div>
    </div>

    <section className="border-t border-[#dce7dd] bg-white"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087055]">Need help?</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Ask us about your data or documents.</h2></div><Link href="/marketing/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#bad6c2] px-6 py-3 text-sm font-semibold text-[#006d57] transition hover:bg-[#edf6ee]">Contact SaveOnLease ↗</Link></div></section>
  </main>;
}
