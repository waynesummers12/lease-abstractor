"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { daysUntilSavedDate } from "@/lib/portfolioAlerts";

type Lease = {
  id: string;
  property_name: string | null;
  landlord: string | null;
  square_feet: number | null;
  lease_type: string | null;
  renewal_date: string | null;
};

type Audit = {
  id: string;
  completed_at: string | null;
  analysis: { tenant?: string | null; property_name?: string | null } | null;
};

const sampleName = /^(?:1sample-commercial-lease|📄\s*sample complex commercial lease)$/i;

function isSampleLease(lease: Lease) {
  return sampleName.test((lease.property_name ?? "").trim());
}

function dateLabel(value: string | null) {
  if (!value) return "Date not saved";
  const date = new Date(`${value.slice(0, 10)}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? "Date not saved"
    : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function timingLabel(days: number | null) {
  if (days === null) return "Add a renewal date";
  if (days < 0) return "Saved date passed";
  if (days === 0) return "Saved date is today";
  return `${days} days away`;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function GuestDashboardOverview() {
  const features = [
    { number: "01", title: "Keep every lease in one place", description: "Save each property, landlord, lease type, square footage, and renewal date. Search your leases when you need a specific record." },
    { number: "02", title: "See what needs attention", description: "View lease counts, upcoming saved renewal dates, missing dates, and a twelve-month renewal outlook in one workspace." },
    { number: "03", title: "Take your list with you", description: "Export your saved lease list as a CSV when you need to review or share your portfolio outside SaveOnLease." },
    { number: "04", title: "Return to completed reports", description: "Find the reviews you created while signed in and reopen their questions and available PDF reports." },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7f3] text-[#122c25]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <section className="relative overflow-hidden rounded-[30px] bg-[#102c25] px-6 py-12 text-white shadow-[0_22px_70px_rgba(16,44,37,0.16)] sm:px-12 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-52 h-[520px] w-[520px] rounded-full border border-white/10" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Dashboard Leases · Free</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Your lease command center, <span className="text-[#a9e9be]">all in one place.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9e9df]">Manage the lease details and dates you save across your properties. See what is coming up, find a lease quickly, and return to your completed reviews.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 py-3 text-sm font-semibold text-[#102c25] hover:bg-[#c7f4d5]">Sign in or get started <Arrow diagonal /></Link>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Start a free lease preview <Arrow diagonal /></Link>
            </div>
            <p className="mt-5 text-sm text-[#d9e9df]">The dashboard is free. A full lease review report is optional and costs $49.99 per lease.</p>
          </div>
        </section>

        <section className="py-16 sm:py-20" aria-labelledby="dashboard-tour-title">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d7459]">See the dashboard</p>
            <h2 id="dashboard-tour-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A real look inside your free workspace.</h2>
            <p className="mt-4 text-lg leading-8 text-[#60736a]">These screens show the lease command center with a saved lease. Your own dashboard fills in as you add properties, dates, and reports.</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-[28px] border border-[#dce5dc] bg-white shadow-[0_18px_50px_rgba(16,44,37,0.1)]">
              <div className="aspect-[1.55] overflow-hidden bg-[#f5f7f3]">
                <Image src="/dashboard/lease-command-center.png" alt="Actual SaveOnLease dashboard showing a saved lease, next step, portfolio counts, and lease activity" width={1640} height={1308} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full" style={{ marginTop: "-11.6%" }} />
              </div>
              <figcaption className="border-t border-[#e7eee7] p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0d7459]">01 / At a glance</p><h3 className="mt-2 text-xl font-semibold">Know your next step.</h3><p className="mt-2 text-sm leading-6 text-[#60736a]">See lease counts, missing dates, and the property that needs attention.</p></figcaption>
            </figure>
            <figure className="overflow-hidden rounded-[28px] border border-[#dce5dc] bg-white shadow-[0_18px_50px_rgba(16,44,37,0.1)]">
              <div className="aspect-[1.55] overflow-hidden bg-[#f5f7f3]">
                <Image src="/dashboard/lease-list-and-renewals.png" alt="Actual SaveOnLease dashboard showing the searchable lease list, twelve-month renewal outlook, and completed reports area" width={1650} height={1321} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full" style={{ marginTop: "-11.6%" }} />
              </div>
              <figcaption className="border-t border-[#e7eee7] p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0d7459]">02 / Your portfolio</p><h3 className="mt-2 text-xl font-semibold">Find leases and see what is ahead.</h3><p className="mt-2 text-sm leading-6 text-[#60736a]">Search saved leases, review the renewal outlook, and return to completed reports in the same workspace.</p></figcaption>
            </figure>
          </div>
        </section>

        <section className="pb-16 sm:pb-20" aria-labelledby="dashboard-benefits-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d7459]">Inside your workspace</p>
          <h2 id="dashboard-benefits-title" className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">A clearer view of all your leases.</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.number} className="rounded-3xl border border-[#dce5dc] bg-white p-7 shadow-sm">
                <span className="text-sm font-bold text-[#0d7459]">{feature.number}</span>
                <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-[#60736a]">{feature.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-[#60736a]">Renewal dates are based on what you save and serve as reminders. Check your signed lease for separate notice and audit deadlines. Sample records stay out of your real lease counts.</p>
        </section>

        <section className="mb-10 flex flex-col gap-6 rounded-3xl bg-[#e4f2e8] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div><h2 className="text-2xl font-semibold">Ready to organize your leases?</h2><p className="mt-2 max-w-2xl leading-7 text-[#526b5d]">Sign in to open your free dashboard and begin adding leases. You can start a free lease preview whenever you are ready to review the document itself.</p></div>
          <Link href="/login" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#102c25] px-6 py-3 text-sm font-semibold text-white hover:bg-[#195040]">Open your free dashboard <Arrow diagonal /></Link>
        </section>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  const { session, loading: authLoading } = useAuth();
  const userId = session?.user.id;
  const accessToken = session?.access_token;
  const [leases, setLeases] = useState<Lease[]>([]);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaseError, setLeaseError] = useState(false);
  const [auditError, setAuditError] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);
  const [leaseQuery, setLeaseQuery] = useState("");

  useEffect(() => {
    if (authLoading || !userId || !accessToken) return;
    let active = true;
    const request = (url: string) => fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    Promise.allSettled([
      request("/api/portfolio-leases"),
      request("/api/portfolio-audits"),
    ]).then(async ([leaseResult, auditResult]) => {
      if (!active) return;
      if (leaseResult.status === "fulfilled" && leaseResult.value.ok) {
        const data = await leaseResult.value.json().catch(() => null);
        if (active && Array.isArray(data?.leases)) { setLeases(data.leases); setLeaseError(false); }
        else if (active) setLeaseError(true);
      } else setLeaseError(true);

      if (auditResult.status === "fulfilled" && auditResult.value.ok) {
        const data = await auditResult.value.json().catch(() => null);
        if (active && Array.isArray(data?.audits)) { setAudits(data.audits); setAuditError(false); }
        else if (active) setAuditError(true);
      } else setAuditError(true);
    }).finally(() => {
      if (active) setLoading(false);
    });

    return () => { active = false; };
  }, [authLoading, userId, accessToken]);

  const realLeases = useMemo(() => leases.filter((lease) => !isSampleLease(lease)), [leases]);
  const sampleLeases = useMemo(() => leases.filter(isSampleLease), [leases]);
  const datedLeases = useMemo(() => realLeases.map((lease) => ({
    lease,
    days: daysUntilSavedDate(lease.renewal_date),
  })).sort((a, b) => (a.days ?? Infinity) - (b.days ?? Infinity)), [realLeases]);
  const upcoming = datedLeases.filter(({ days }) => days !== null && days >= 0 && days <= 180);
  const urgent = datedLeases.filter(({ days }) => days !== null && days >= 0 && days <= 90).length;
  const needsDates = datedLeases.filter(({ days }) => days === null).length;
  const sortedAudits = useMemo(() => [...audits].sort((a, b) =>
    (b.completed_at ?? "").localeCompare(a.completed_at ?? "")
  ), [audits]);
  const visibleAudits = showAllReports ? sortedAudits : sortedAudits.slice(0, 5);
  const visibleLeases = useMemo(() => datedLeases.filter(({ lease }) =>
    `${lease.property_name ?? ""} ${lease.landlord ?? ""} ${lease.lease_type ?? ""}`.toLowerCase().includes(leaseQuery.trim().toLowerCase())
  ), [datedLeases, leaseQuery]);
  const leaseTypes = useMemo(() => realLeases.reduce<Record<string, number>>((counts, lease) => {
    const type = lease.lease_type?.trim() || "Unspecified";
    counts[type] = (counts[type] ?? 0) + 1;
    return counts;
  }, {}), [realLeases]);
  const nextLease = upcoming[0] ?? datedLeases.find(({ days }) => days === null) ?? datedLeases[0];

  function downloadLeasesCsv() {
    const safeCell = (value: string | number | null) => {
      const text = String(value ?? "");
      const guarded = /^[\s]*[=+@\-]/.test(text) ? `'${text}` : text;
      return `"${guarded.replaceAll('"', '""')}"`;
    };
    const rows = [
      ["Property", "Landlord", "Lease type", "Square feet", "Renewal date"],
      ...realLeases.map((lease) => [lease.property_name, lease.landlord, lease.lease_type, lease.square_feet, lease.renewal_date]),
    ];
    const blob = new Blob(["\uFEFF", rows.map((row) => row.map(safeCell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "saveonlease-leases.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() + index, 1);
      const count = realLeases.filter((lease) => {
        if (!lease.renewal_date) return false;
        const saved = lease.renewal_date.slice(0, 7);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        return saved === month;
      }).length;
      return { label: date.toLocaleDateString(undefined, { month: "short" }), count };
    });
  }, [realLeases]);

  if (authLoading) {
    return <div className="min-h-[70vh] bg-[#f5f7f3] px-6 py-20 text-center text-sm text-[#53665e]">Preparing your workspace…</div>;
  }

  if (!session) return <GuestDashboardOverview />;

  if (loading) {
    return <div className="min-h-[70vh] bg-[#f5f7f3] px-6 py-20 text-center text-sm text-[#53665e]">Preparing your workspace…</div>;
  }

  return (
    <main className="min-h-screen bg-[#f5f7f3] text-[#122c25]">
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#557466]">
          <span>SaveOnLease / Your workspace</span>
          <span className="rounded-full border border-[#d4e5d9] bg-white px-3 py-1.5 text-[10px] tracking-[0.12em]">Your documents, your next steps</span>
        </div>

        <section className="relative overflow-hidden rounded-[30px] bg-[#102c25] px-6 py-8 text-white shadow-[0_22px_70px_rgba(16,44,37,0.16)] sm:px-10 sm:py-11 lg:px-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-52 h-[520px] w-[520px] rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute right-10 -top-32 h-[440px] w-[440px] rounded-full border border-white/10" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#a9e9be]">Your lease command center</p>
              <h1 className="max-w-[800px] text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                Know what&apos;s next for <span className="text-[#a9e9be]">every lease.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#d9e9df]">
                Keep your lease dates, reports, and follow-up questions together. Start with a free lease preview, then add a statement when you&apos;re ready to compare the bill.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/app/step-1-upload" className="inline-flex items-center gap-3 rounded-xl bg-[#a9e9be] px-5 py-3.5 text-sm font-semibold text-[#102c25] transition hover:-translate-y-0.5 hover:bg-[#c7f4d5]">
                  Start a free lease preview <Arrow />
                </Link>
                <Link href="/product/app/add-lease" className="inline-flex items-center gap-3 rounded-xl border border-white/30 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                  Add a lease to track <Arrow />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a9e9be]">Your next useful step</p>
              <h2 className="mt-4 text-xl font-semibold leading-snug text-white">
                {nextLease ? nextLease.lease.property_name || "Review your saved lease" : audits.length > 0 ? "Return to your latest report" : "Add your first real lease"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#d9e9df]">
                {nextLease
                  ? nextLease.days === null
                    ? "Add a renewal date so this lease can appear in your timeline."
                    : `Saved renewal date: ${dateLabel(nextLease.lease.renewal_date)}. Confirm any notice deadlines in the lease.`
                  : audits.length > 0
                    ? "Your completed review is ready whenever you need to revisit its questions and source pages."
                    : "Save the property and its renewal date to create a useful workspace."}
              </p>
              <Link href={nextLease ? `/product/app/leases/${encodeURIComponent(nextLease.lease.id)}` : audits.length > 0 ? `/product/app/audits/${encodeURIComponent(sortedAudits[0]?.id ?? audits[0].id)}` : "/product/app/add-lease"} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a9e9be] hover:underline">
                {nextLease ? "Open lease details" : audits.length > 0 ? "View latest report" : "Add a lease"} <Arrow diagonal />
              </Link>
            </div>
          </div>
        </section>

        {(leaseError || auditError) && (
          <div role="alert" className="mt-6 rounded-2xl border border-[#e4c9aa] bg-[#fff8ec] px-5 py-4 text-sm text-[#684d2f]">
            Some workspace information could not be loaded. Refresh the page to try again.
          </div>
        )}

        <section aria-label="Workspace overview" className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Your leases", value: leaseError ? "—" : String(realLeases.length), detail: "Excludes sample records", accent: "#0c6652" },
            { label: "Within 180 days", value: leaseError ? "—" : String(upcoming.length), detail: "Based on saved renewal dates", accent: "#b46c2a" },
            { label: "Missing renewal dates", value: leaseError ? "—" : String(needsDates), detail: "Add dates to complete your outlook", accent: "#a65d48" },
            { label: "Completed reports", value: auditError ? "—" : String(audits.length), detail: "Created while signed in", accent: "#5264a5" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#e1e8e0] bg-white p-5 shadow-[0_8px_28px_rgba(16,44,37,0.04)] sm:p-6">
              <div className="mb-7 h-1 w-10 rounded-full" style={{ background: item.accent }} />
              <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#64776c]">{item.label}</p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.05em]">{item.value}</p>
              <p className="mt-2 text-xs text-[#65776e]">{item.detail}</p>
            </div>
          ))}
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]">
          <section id="leases" className="scroll-mt-32 rounded-[24px] border border-[#e1e8e0] bg-white p-5 shadow-[0_8px_28px_rgba(16,44,37,0.04)] sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0d7459]">Lease activity</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Your leases</h2>
                <p className="mt-2 text-sm text-[#60736a]">Renewal dates are reminders. Check each lease for separate notice and audit deadlines.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/product/app/add-lease" className="rounded-lg border border-[#d8e5d9] px-3 py-2 text-xs font-semibold text-[#0c6652] hover:bg-[#f5faf5]">Add lease</Link>
                <button type="button" onClick={downloadLeasesCsv} disabled={realLeases.length === 0} className="rounded-lg border border-[#d8e5d9] px-3 py-2 text-xs font-semibold text-[#0c6652] hover:bg-[#f5faf5] disabled:cursor-not-allowed disabled:opacity-50">Export CSV</button>
              </div>
            </div>
            {realLeases.length === 0 ? (
              <div className="mt-7 rounded-2xl border border-dashed border-[#cbded0] bg-[#f8fbf7] px-6 py-10">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e0f4e6] text-xl text-[#0d7459]" aria-hidden="true">⌁</div>
                <h3 className="text-xl font-semibold">A clean start for your real leases.</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#61766a]">Add a property and its saved renewal date. Your timeline and reminders will fill in as you build your portfolio.</p>
                <Link href="/product/app/add-lease" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#102c25] px-4 py-3 text-sm font-semibold text-white hover:bg-[#195040]">Add your first lease <Arrow /></Link>
              </div>
            ) : (
              <div className="mt-7">
                <label htmlFor="lease-search" className="block text-xs font-semibold text-[#526b5d]">Find a lease</label>
                <input id="lease-search" type="search" value={leaseQuery} onChange={(event) => setLeaseQuery(event.target.value)} placeholder="Search property, landlord, or lease type" className="mt-2 w-full rounded-xl border border-[#d8e5d9] px-4 py-3 text-sm outline-none focus:border-[#0c6652] focus:ring-2 focus:ring-[#c4e7d0]" />
                <p className="mt-3 text-xs text-[#6e8076]">{visibleLeases.length} of {realLeases.length} real {realLeases.length === 1 ? "lease" : "leases"} shown · {urgent} within 90 days</p>
                <div className="mt-4 divide-y divide-[#e9eee9]">
                {visibleLeases.map(({ lease, days }) => (
                  <Link key={lease.id} href={`/product/app/leases/${encodeURIComponent(lease.id)}`} className="group flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 hover:text-[#0c6652]">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{lease.property_name || "Unnamed lease"}</p>
                      <p className="mt-1 text-xs text-[#697b71]">{lease.lease_type || "Lease type not saved"} · {dateLabel(lease.renewal_date)}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${days !== null && days <= 90 ? "bg-[#fff0e6] text-[#985020]" : "bg-[#edf6ee] text-[#176d51]"}`}>{timingLabel(days)} <Arrow /></span>
                  </Link>
                ))}
                {visibleLeases.length === 0 && <p className="py-5 text-sm text-[#6e8076]">No leases match that search.</p>}
                </div>
              </div>
            )}
            {needsDates > 0 && <p className="mt-4 rounded-xl bg-[#fff8ec] px-4 py-3 text-xs text-[#806043]">{needsDates} {needsDates === 1 ? "lease needs" : "leases need"} a saved renewal date to appear on the timeline.</p>}
          </section>

          <section className="rounded-[24px] border border-[#e1e8e0] bg-white p-5 shadow-[0_8px_28px_rgba(16,44,37,0.04)] sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0d7459]">Next twelve months</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Renewal outlook</h2>
            <p className="mt-2 text-sm leading-6 text-[#60736a]">A simple view of the renewal dates you saved.</p>
            <div className="mt-7 grid grid-cols-6 gap-2">
              {months.map((month) => (
                <div key={month.label} className="text-center">
                  <div className="flex h-28 flex-col items-center justify-end rounded-xl bg-[#f0f4ef] p-2">
                    <span className="mb-2 text-sm font-semibold">{month.count || "·"}</span>
                    <div className={`w-full rounded-md ${month.count ? "bg-[#1a8a68]" : "bg-[#d8e5d9]"}`} style={{ height: `${month.count ? Math.min(18 + month.count * 12, 68) : 4}px` }} />
                  </div>
                  <span className="mt-2 block text-[10px] font-semibold uppercase text-[#6a7d72]">{month.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-[#e8eee8] pt-4 text-xs leading-5 text-[#6e8076]">This chart uses saved renewal dates only; it does not calculate notice deadlines or potential savings.</p>
            {realLeases.length > 0 && <div className="mt-5 border-t border-[#e8eee8] pt-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#61766a]">By lease type</p><div className="mt-3 flex flex-wrap gap-2">{Object.entries(leaseTypes).sort(([a], [b]) => a.localeCompare(b)).map(([type, count]) => <span key={type} className="rounded-full bg-[#f0f6f0] px-3 py-1.5 text-xs text-[#245746]">{type}: {count}</span>)}</div></div>}
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]">
          <section id="reports" className="scroll-mt-32 rounded-[24px] border border-[#e1e8e0] bg-white p-5 shadow-[0_8px_28px_rgba(16,44,37,0.04)] sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0d7459]">Your work</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Completed reports</h2>
              </div>
              {sortedAudits.length > 5 && <button type="button" onClick={() => setShowAllReports((value) => !value)} className="text-sm font-semibold text-[#0c6652] hover:underline">{showAllReports ? "Show recent" : `Show all ${sortedAudits.length}`}</button>}
            </div>
            {visibleAudits.length ? (
              <div className="mt-6 divide-y divide-[#e9eee9]">
                {visibleAudits.map((audit) => (
                  <Link key={audit.id} href={`/product/app/audits/${encodeURIComponent(audit.id)}`} className="group flex items-center justify-between gap-4 py-4 first:pt-0">
                    <div>
                      <p className="text-sm font-semibold group-hover:text-[#0c6652]">{audit.analysis?.property_name || audit.analysis?.tenant || "Lease review"}</p>
                      <p className="mt-1 text-xs text-[#6e8076]">{audit.completed_at ? `Completed ${new Date(audit.completed_at).toLocaleDateString()}` : "Report available"}</p>
                    </div>
                    <span className="rounded-lg border border-[#d8e5d9] px-3 py-2 text-xs font-semibold text-[#0c6652]">View report <Arrow /></span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-[#f7faf6] p-6">
                <p className="text-sm font-semibold">Your reports will appear here.</p>
                <p className="mt-2 text-sm leading-6 text-[#64776c]">Reports created while signed in appear here. Start with a free lease preview, then add an annual statement and supporting PDFs if you have them.</p>
                <Link href="/app/step-1-upload" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0c6652] hover:underline">Start a preview <Arrow /></Link>
              </div>
            )}
          </section>

          <section className="rounded-[24px] bg-[#e4f2e8] p-5 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0d7459]">Make the most of your review</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em]">From lease terms to better questions.</h2>
            <ol className="mt-7 space-y-5">
              {[
                ["01", "Start with the lease", "See extracted terms in a free preview."],
                ["02", "Add the annual statement", "Compare visible charges and calculations."],
                ["03", "Keep the evidence together", "Return to reports and source pages here."],
              ].map(([number, title, description]) => (
                <li key={number} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/75 text-xs font-bold text-[#0d7459]">{number}</span>
                  <div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-[#526b5d]">{description}</p></div>
                </li>
              ))}
            </ol>
            <Link href="/marketing/how-it-works" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0c6652] hover:underline">See how it works <Arrow /></Link>
          </section>
        </div>

        {sampleLeases.length > 0 && (
          <section className="mt-6 rounded-[24px] border border-[#dce5df] bg-[#edf2ed] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b7d72]">Sample data</p>
                <h2 className="mt-2 text-lg font-semibold">{sampleLeases.length} example lease records</h2>
                <p className="mt-1 text-sm text-[#5c6e62]">These are kept out of your lease counts and renewal outlook.</p>
              </div>
              <button type="button" onClick={() => setShowSamples((value) => !value)} className="rounded-lg border border-[#cbd9ce] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#f9fcf9]" aria-expanded={showSamples}>
                {showSamples ? "Hide examples" : "Show examples"} <span aria-hidden="true">{showSamples ? "↑" : "↓"}</span>
              </button>
            </div>
            {showSamples && (
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {sampleLeases.map((lease) => (
                  <Link key={lease.id} href={`/product/app/leases/${encodeURIComponent(lease.id)}`} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-xs font-medium hover:text-[#0c6652]">
                    <span className="truncate">{lease.property_name || "Sample lease"}</span><Arrow />
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
