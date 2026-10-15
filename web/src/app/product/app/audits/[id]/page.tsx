"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { authenticatedPortfolioFetch } from "@/lib/portfolioFetch";
import type { FollowUpTask } from "@/lib/reportFollowups";

type Audit = {
  id: string;
  completed_at: string | null;
  portfolio_lease_id: string | null;
  analysis: { tenant?: string; premises?: string; property_name?: string } | null;
};
type Status = "open" | "waiting" | "reviewed";
type Progress = { item_key: string; status: Status; note: string; updated_at?: string };
type Draft = { status: Status; note: string };

const statusLabels: Record<Status, string> = {
  open: "To check",
  waiting: "Waiting on records",
  reviewed: "Reviewed",
};
const groups: FollowUpTask["group"][] = ["First actions", "Statement questions", "Lease terms"];

export default function PortfolioAuditPage() {
  const { id } = useParams<{ id: string }>();
  const [audit, setAudit] = useState<Audit | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [tasks, setTasks] = useState<FollowUpTask[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [savedStatuses, setSavedStatuses] = useState<Record<string, Status>>({});
  const [error, setError] = useState<string | null>(null);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!id) return;
    let active = true;
    Promise.all([
      authenticatedPortfolioFetch(`/api/portfolio-audits/${encodeURIComponent(id)}`),
      authenticatedPortfolioFetch(`/api/portfolio-audits/${encodeURIComponent(id)}/follow-ups`),
    ]).then(async ([reportResponse, followUpResponse]) => {
      if (!reportResponse.ok) throw new Error(reportResponse.status === 404 ? "Report not found" : "Unable to load report");
      if (!followUpResponse.ok) throw new Error("Unable to load follow-up checklist");
      const [report, followUp] = await Promise.all([reportResponse.json(), followUpResponse.json()]);
      if (!active) return;
      setAudit(report.audit);
      setDownloadUrl(report.downloadUrl);
      setTasks(followUp.tasks ?? []);
      setDrafts(Object.fromEntries((followUp.progress as Progress[] ?? []).map((item) => [item.item_key, { status: item.status, note: item.note }])));
      setSavedStatuses(Object.fromEntries((followUp.progress as Progress[] ?? []).map((item) => [item.item_key, item.status])));
      setLoadState("ready");
    }).catch((cause) => { if (active) { setError(cause instanceof Error ? cause.message : "Unable to load report"); setLoadState("error"); } });
    return () => { active = false; };
  }, [id]);

  const reviewed = useMemo(() => tasks.filter((task) => savedStatuses[task.key] === "reviewed").length, [tasks, savedStatuses]);
  const waiting = useMemo(() => tasks.filter((task) => savedStatuses[task.key] === "waiting").length, [tasks, savedStatuses]);
  const reportName = audit?.analysis?.premises || audit?.analysis?.property_name || audit?.analysis?.tenant || "Your lease review";

  async function save(task: FollowUpTask) {
    const draft = drafts[task.key] ?? { status: "open" as Status, note: "" };
    setSavingKey(task.key);
    setSavedKey(null);
    setError(null);
    try {
      const response = await authenticatedPortfolioFetch(`/api/portfolio-audits/${encodeURIComponent(id)}/follow-ups`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: task.key, status: draft.status, note: draft.note }),
      });
      if (!response.ok) throw new Error("Could not save this follow-up. Please try again.");
      const result = await response.json();
      setDrafts((current) => ({ ...current, [task.key]: { status: result.progress.status, note: result.progress.note } }));
      setSavedStatuses((current) => ({ ...current, [task.key]: result.progress.status }));
      setSavedKey(task.key);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save this follow-up.");
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7f3] pb-24 text-[#102c25]">
      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <Link href="/product/app/dashboard#reports" className="text-sm font-semibold text-[#087055] underline underline-offset-4">← Back to reports</Link>
        {loadState === "loading" && <p className="mt-10" role="status">Loading your report workspace…</p>}
        {loadState === "error" && <p className="mt-10 rounded-xl bg-red-50 p-5 text-red-800" role="alert">{error}</p>}
        {audit && <>
          <section className="relative mt-6 overflow-hidden rounded-[30px] bg-[#102c25] px-7 py-10 text-white shadow-[0_24px_60px_rgba(16,44,37,0.14)] sm:px-12 sm:py-14">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full border border-white/10" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your report · Your next steps</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">Turn your lease review into a plan.</h1>
              <p className="mt-5 text-lg leading-8 text-[#d9e9df]">Keep every question, records request, and follow-up note with this report. The PDF remains your source for lease and statement page references.</p>
              <p className="mt-5 text-sm text-[#b8d4c3]">{reportName} · Completed {audit.completed_at ? new Date(audit.completed_at).toLocaleDateString() : "recently"}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {downloadUrl ? <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#a9e9be] px-6 py-3 text-sm font-semibold text-[#102c25]">Open full PDF report ↗</a> : <span className="rounded-xl border border-white/20 px-6 py-3 text-sm">PDF is being prepared</span>}
                {audit.portfolio_lease_id && <Link href={`/product/app/leases/${encodeURIComponent(audit.portfolio_lease_id)}`} className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white">View linked lease ↗</Link>}
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Follow-up progress">
            {[{ label: "Questions and actions", value: tasks.length }, { label: "Reviewed", value: reviewed }, { label: "Waiting on records", value: waiting }].map((stat) => <div key={stat.label} className="rounded-2xl border border-[#dce7dd] bg-white p-6"><p className="text-3xl font-semibold">{stat.value}</p><p className="mt-2 text-sm text-[#60736a]">{stat.label}</p></div>)}
          </section>
          <section className="mt-10" aria-labelledby="follow-up-title">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#087055]">Follow-up checklist</p>
            <h2 id="follow-up-title" className="mt-3 text-3xl font-semibold tracking-[-0.035em]">Work through what your report found.</h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#60736a]">Open the PDF to check each cited page. A flag is a question to verify, not proof of an overcharge. “Reviewed” records your progress; it does not mean a refund is confirmed.</p>
            {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
            {groups.map((group) => {
              const groupTasks = tasks.filter((task) => task.group === group);
              if (!groupTasks.length) return null;
              return <div key={group} className="mt-10"><h3 className="mb-4 text-xl font-semibold">{group} <span className="ml-2 text-sm font-normal text-[#60736a]">{groupTasks.length}</span></h3><div className="space-y-4">{groupTasks.map((task, index) => {
                const draft = drafts[task.key] ?? { status: "open" as Status, note: "" };
                return <article key={task.key} className="rounded-[24px] border border-[#dce7dd] bg-white p-6 shadow-[0_8px_28px_rgba(16,44,37,0.04)] sm:p-7"><div className="flex flex-col gap-5 md:flex-row md:justify-between"><div className="max-w-2xl"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#087055]">{group === "First actions" ? "Action" : "Question"} {String(index + 1).padStart(2, "0")}</span><h4 className="mt-2 text-xl font-semibold">{task.title}</h4><p className="mt-3 text-sm leading-7 text-[#53675d]">{task.detail}</p></div><div className="min-w-48"><label htmlFor={`status-${task.key}`} className="block text-xs font-semibold text-[#53675d]">Status</label><select id={`status-${task.key}`} value={draft.status} onChange={(event) => { setSavedKey(null); setDrafts((current) => ({ ...current, [task.key]: { ...draft, status: event.target.value as Status } })); }} className="mt-2 w-full rounded-xl border border-[#cbded0] bg-[#f5f7f3] px-3 py-3 text-sm font-medium">{(Object.keys(statusLabels) as Status[]).map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></div></div><div className="mt-6 border-t border-[#e6ede6] pt-5"><label htmlFor={`note-${task.key}`} className="text-sm font-semibold">Your note</label><textarea id={`note-${task.key}`} rows={2} maxLength={2000} placeholder="Record what you checked, requested, or learned." value={draft.note} onChange={(event) => { setSavedKey(null); setDrafts((current) => ({ ...current, [task.key]: { ...draft, note: event.target.value } })); }} className="mt-2 w-full resize-y rounded-xl border border-[#cbded0] bg-white px-4 py-3 text-sm outline-none focus:border-[#087055]" /><div className="mt-3 flex items-center gap-4"><button type="button" disabled={savingKey === task.key} onClick={() => save(task)} className="rounded-xl bg-[#102c25] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{savingKey === task.key ? "Saving…" : "Save progress"}</button>{savedKey === task.key && <span role="status" className="text-sm text-[#087055]">Saved</span>}</div></div></article>;
              })}</div></div>;
            })}
          </section>
        </>}
      </div>
    </main>
  );
}
