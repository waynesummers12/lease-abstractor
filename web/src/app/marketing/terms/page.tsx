import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of SaveOnLease and its lease audit services.",
  alternates: { canonical: "https://www.saveonlease.com/marketing/terms" },
};

const sections = [
  { id: "service-description", number: "01", title: "Service Description" },
  { id: "user-responsibilities", number: "02", title: "User Responsibilities" },
  { id: "payments", number: "03", title: "Payments" },
  { id: "no-guarantees", number: "04", title: "No Guarantees" },
  { id: "limitation-of-liability", number: "05", title: "Limitation of Liability" },
  { id: "changes-to-these-terms", number: "06", title: "Changes to These Terms" },
];

const sectionClass = "scroll-mt-32 border-b border-[#dce7dd] py-8 first:pt-0 last:border-0 last:pb-0 sm:py-10";
const headingClass = "text-xl font-semibold tracking-tight text-[#102b25] sm:text-2xl";
const bodyClass = "mt-4 max-w-2xl text-base leading-8 text-[#4b5d55]";

export default function TermsPage() {
  return <main className="bg-[#f7f9f6] text-[#102b25]">
    <section className="relative overflow-hidden bg-[#102b25] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 h-[380px] w-[380px] rounded-full border border-white/10" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a8edbf]">SaveOnLease / Legal</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.07] tracking-tight sm:text-6xl">Terms of <span className="text-[#a8edbf]">Service.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9e9df]">These Terms of Service govern your use of SaveOnLease. By using the site or uploading a lease, you agree to these terms.</p>
        <p className="mt-8 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-[#e5f3e9]">Last updated October 5, 2026</p>
      </div>
    </section>

    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
      <nav aria-label="Terms sections" className="self-start rounded-2xl border border-[#dce7dd] bg-white p-5 shadow-sm lg:sticky lg:top-28">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087055]">On this page</p>
        <ol className="mt-5 space-y-1">{sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="flex min-h-10 items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-[#40574b] transition hover:bg-[#edf6ee] hover:text-[#006d57]"><span className="text-xs font-bold text-[#087055]">{section.number}</span>{section.title}</a></li>)}</ol>
      </nav>

      <div className="min-w-0 rounded-[1.75rem] border border-[#dce7dd] bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-10 rounded-2xl border border-[#c9e1d0] bg-[#eef7ef] p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087055]">At a glance</p>
          <p className="mt-3 text-base leading-7 text-[#28493a]">SaveOnLease provides informational lease analysis. You decide how to use the results, and a report does not guarantee that an error or overcharge will be found.</p>
        </div>

        <section id="service-description" className={sectionClass} aria-labelledby="service-description-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">01</span><h2 id="service-description-title" className={headingClass}>Service Description</h2></div>
          <p className={bodyClass}>SaveOnLease provides automated analysis of commercial lease documents to identify potential CAM and NNN cost risks.</p>
          <p className={bodyClass}>The service is informational and does not constitute legal, accounting, or professional advice.</p>
        </section>

        <section id="user-responsibilities" className={sectionClass} aria-labelledby="user-responsibilities-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">02</span><h2 id="user-responsibilities-title" className={headingClass}>User Responsibilities</h2></div>
          <ul className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-[#4b5d55]"><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>You confirm that you have the right to upload the lease</li><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>You are responsible for how you use the audit results</li><li className="flex gap-3"><span aria-hidden="true" className="text-[#087055]">•</span>You agree not to misuse the service</li></ul>
        </section>

        <section id="payments" className={sectionClass} aria-labelledby="payments-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">03</span><h2 id="payments-title" className={headingClass}>Payments</h2></div>
          <p className={bodyClass}>Fees are charged on a per-lease basis. All payments are processed securely by third-party payment providers.</p>
        </section>

        <section id="no-guarantees" className={sectionClass} aria-labelledby="no-guarantees-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">04</span><h2 id="no-guarantees-title" className={headingClass}>No Guarantees</h2></div>
          <p className={bodyClass}>SaveOnLease does not guarantee that errors or overcharges will be found in every lease. Results vary based on lease language and billing practices.</p>
        </section>

        <section id="limitation-of-liability" className={sectionClass} aria-labelledby="limitation-of-liability-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">05</span><h2 id="limitation-of-liability-title" className={headingClass}>Limitation of Liability</h2></div>
          <p className={bodyClass}>To the fullest extent permitted by law, SaveOnLease shall not be liable for any indirect, incidental, or consequential damages arising from the use of the service.</p>
        </section>

        <section id="changes-to-these-terms" className={sectionClass} aria-labelledby="changes-to-these-terms-title">
          <div className="flex items-baseline gap-4"><span className="text-sm font-bold text-[#087055]">06</span><h2 id="changes-to-these-terms-title" className={headingClass}>Changes to These Terms</h2></div>
          <p className={bodyClass}>We may update these Terms from time to time. Continued use of the service constitutes acceptance of any updates.</p>
        </section>
      </div>
    </div>

    <section className="border-t border-[#dce7dd] bg-white"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087055]">Questions?</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">We’re here to help you understand the service.</h2></div><Link href="/marketing/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#bad6c2] px-6 py-3 text-sm font-semibold text-[#006d57] transition hover:bg-[#edf6ee]">Contact SaveOnLease ↗</Link></div></section>
  </main>;
}
