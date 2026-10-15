import Link from "next/link";

export default function AnnualStatementEntry() {
  return (
    <section aria-labelledby="annual-statement-entry-title" className="bg-[#e9f4ec] px-5 py-16 text-[#102c25] sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-9 rounded-[30px] border border-[#c8dfcf] bg-white p-7 shadow-[0_18px_55px_rgba(16,44,37,0.08)] sm:p-10 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:gap-14 lg:p-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#087055]">Your annual bill, clearer next steps</p>
          <h2 id="annual-statement-entry-title" className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Got your annual CAM or NNN statement?</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#4d6358]">Bring your signed lease and the landlord&apos;s annual statement. See the lease terms and initial billing questions before deciding whether to buy a full report.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1c4b3c]">Review my lease and statement ↗</Link>
            <Link href="/marketing/pricing" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#b9d5c1] px-6 py-3 text-sm font-semibold text-[#102c25] transition hover:bg-[#f3faf4]">See what&apos;s included</Link>
          </div>
          <p className="mt-4 text-xs leading-6 text-[#60736a]">Start free · No credit card for the preview · You can begin with the lease alone.</p>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#dce9df] bg-[#f7faf6] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087055]">Bring these two PDFs</p>
            <p className="mt-3 text-sm leading-6"><strong>1. Signed lease</strong> with amendments, as a text-readable PDF.</p>
            <p className="mt-2 text-sm leading-6"><strong>2. Annual CAM or NNN statement</strong> from your landlord. Add it with the lease or on the preview page.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#dce9df] p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087055]">Free preview</p><p className="mt-2 text-sm leading-6 text-[#40584d]">See extracted lease terms and initial statement checks when you provide the bill.</p></div>
            <div className="rounded-2xl border border-[#c8dfcf] bg-[#e9f4ec] p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087055]">$49.99 once, if useful</p><p className="mt-2 text-sm leading-6 text-[#40584d]">Get page-referenced questions, conditional calculations, a records checklist, and a PDF to keep.</p></div>
          </div>
          <p className="px-1 text-xs leading-6 text-[#60736a]">A flagged charge is a question to verify against invoices and other source records, not a confirmed refund.</p>
        </div>
      </div>
    </section>
  );
}
