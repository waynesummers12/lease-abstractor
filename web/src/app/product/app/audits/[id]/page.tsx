"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { authenticatedPortfolioFetch } from "@/lib/portfolioFetch";
import type { FollowUpTask } from "@/lib/reportFollowups";
import ReportFeedback from "@/components/ReportFeedback";

type Audit = {
  id: string;
  completed_at: string | null;
  portfolio_lease_id: string | null;
  analysis: { tenant?: string; premises?: string; property_name?: string } | null;
};
type Status = "open" | "waiting" | "reviewed";
type Progress = { item_key: string; status: Status; note: string; due_date: string | null; reminder_enabled: boolean; updated_at?: string };
type Draft = { status: Status; note: string; dueDate: string; reminderEnabled: boolean };
type SourceDocument = { label: string; url: string };

const statusLabels: Record<Status, string> = {
  open: "To check",
  waiting: "Waiting on records",
  reviewed: "Reviewed",
};
const groups: FollowUpTask["group"][] = ["First actions", "Records to request", "Statement questions", "Lease terms", "Next year"];

export default function PortfolioAuditPage() {
  const { id } = useParams<{ id: string }>();
  const [audit, setAudit] = useState<Audit | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [sourceDocuments, setSourceDocuments] = useState<SourceDocument[]>([]);
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
      setSourceDocuments(report.sourceDocuments ?? []);
      setTasks(followUp.tasks ?? []);
      setDrafts(Object.fromEntries((followUp.progress as Progress[] ?? []).map((item) => [item.item_key, { status: item.status, note: item.note, dueDate: item.due_date ?? "", reminderEnabled: item.reminder_enabled ?? false }])));
      setSavedStatuses(Object.fromEntries((followUp.progress as Progress[] ?? []).map((item) => [item.item_key, item.status])));
      setLoadState("ready");
    }).catch((cause) => { if (active) { setError(cause instanceof Error ? cause.message : "Unable to load report"); setLoadState("error"); } });
    return () => { active = false; };
  }, [id]);

  const reviewed = useMemo(() => tasks.filter((task) => savedStatuses[task.key] === "reviewed").length, [tasks, savedStatuses]);
  const waiting = useMemo(() => tasks.filter((task) => savedStatuses[task.key] === "waiting").length, [tasks, savedStatuses]);
  const reportName = audit?.analysis?.premises || audit?.analysis?.property_name || audit?.analysis?.tenant || "Your lease review";

  async function save(task: FollowUpTask) {
    const draft = drafts[task.key] ?? { status: "open" as Status, note: "", dueDate: "", reminderEnabled: false };
    setSavingKey(task.key);
    setSavedKey(null);
    setError(null);
    try {
      const response = await authenticatedPortfolioFetch(`/api/portfolio-audits/${encodeURIComponent(id)}/follow-ups`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: task.key, status: draft.status, note: draft.note, dueDate: draft.dueDate || null, reminderEnabled: draft.reminderEnabled }),
      });
      if (!response.ok) throw new Error("Could not save this follow-up. Please try again.");
      const result = await response.json();
      setDrafts((current) => ({ ...current, [task.key]: { status: result.progress.status, note: result.progress.note, dueDate: result.progress.due_date ?? "", reminderEnabled: result.progress.reminder_enabled } }));
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
        <a href="/product/app/dashboard#reports" className="text-sm font-semibold text-[#087055] underline underline-offset-4">← Back to reports</a>
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

          <section className="mt-8 rounded-[24px] border border-[#dce7dd] bg-white p-6 sm:p-8" aria-labelledby="source-documents-title">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#087055]">Your source files</p>
            <h2 id="source-documents-title" className="mt-2 text-2xl font-semibold">Return to the documents behind this review.</h2>
            <p className="mt-2 text-sm leading-6 text-[#60736a]">These private links expire after ten minutes. Refresh this page to get a new link. Keep your own copies for your records.</p>
            {sourceDocuments.length ? <div className="mt-5 flex flex-wrap gap-3">{sourceDocuments.map((document) => <a key={document.label} href={document.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#cbded0] px-4 py-3 text-sm font-semibold text-[#0d624c] hover:bg-[#edf6ef]">{document.label} ↗</a>)}</div> : <p className="mt-4 text-sm text-[#60736a]">Original uploads are unavailable for this report. Your completed PDF is available above.</p>}
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
                const draft = drafts[task.key] ?? { status: "open" as Status, note: "", dueDate: "", reminderEnabled: false };
                return <article key={task.key} className="rounded-[24px] border border-[#dce7dd] bg-white p-6 shadow-[0_8px_28px_rgba(16,44,37,0.04)] sm:p-7"><div className="flex flex-col gap-5 md:flex-row md:justify-between"><div className="max-w-2xl"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#087055]">{group === "Statement questions" || group === "Lease terms" ? "Question" : "Action"} {String(index + 1).padStart(2, "0")}</span><h4 className="mt-2 text-xl font-semibold">{task.title}</h4><p className="mt-3 text-sm leading-7 text-[#53675d]">{task.detail}</p>{task.key === "next:statement" && <Link href={`/app/step-1-upload${audit.portfolio_lease_id ? `?portfolioLeaseId=${encodeURIComponent(audit.portfolio_lease_id)}` : ""}`} className="mt-4 inline-block text-sm font-semibold text-[#087055] underline underline-offset-4">Start a new lease and statement review ↗</Link>}</div><div className="min-w-48"><label htmlFor={`status-${task.key}`} className="block text-xs font-semibold text-[#53675d]">Status</label><select id={`status-${task.key}`} value={draft.status} onChange={(event) => { setSavedKey(null); setDrafts((current) => ({ ...current, [task.key]: { ...draft, status: event.target.value as Status } })); }} className="mt-2 w-full rounded-xl border border-[#cbded0] bg-[#f5f7f3] px-3 py-3 text-sm font-medium">{(Object.keys(statusLabels) as Status[]).map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></div></div>{(task.key === "first:deadline" || task.key === "next:statement") && <div className="mt-5"><label htmlFor={`due-${task.key}`} className="block text-sm font-semibold">{task.key === "first:deadline" ? "Date you confirmed from your documents" : "Date to revisit next year's statement"}</label><input id={`due-${task.key}`} type="date" value={draft.dueDate} onChange={(event) => { setSavedKey(null); setDrafts((current) => ({ ...current, [task.key]: { ...draft, dueDate: event.target.value, reminderEnabled: event.target.value ? draft.reminderEnabled : false } })); }} className="mt-2 rounded-xl border border-[#cbded0] bg-white px-4 py-3 text-sm" /><p className="mt-2 text-xs text-[#60736a]">Confirm actual receipt, lease terms, and notice rules before relying on this date. Email reminders are a convenience, not a legal deadline service.</p><label className="mt-4 flex max-w-xl items-start gap-3 rounded-xl border border-[#dce7dd] bg-[#f5f9f5] p-4 text-sm leading-6"><input type="checkbox" checked={draft.reminderEnabled} disabled={!draft.dueDate} onChange={(event) => { setSavedKey(null); setDrafts((current) => ({ ...current, [task.key]: { ...draft, reminderEnabled: event.target.checked } })); }} className="mt-1 h-4 w-4 accent-[#087055]" /><span><strong>Email me on this date</strong><span className="mt-1 block text-xs text-[#60736a]">Optional. We’ll email your account address once on or shortly after the saved date. Turn this off here anytime; save your changes below.</span></span></label></div>}<div className="mt-6 border-t border-[#e6ede6] pt-5"><label htmlFor={`note-${task.key}`} className="text-sm font-semibold">Your note</label><textarea id={`note-${task.key}`} rows={2} maxLength={2000} placeholder="Record what you checked, requested, or learned." value={draft.note} onChange={(event) => { setSavedKey(null); setDrafts((current) => ({ ...current, [task.key]: { ...draft, note: event.target.value } })); }} className="mt-2 w-full resize-y rounded-xl border border-[#cbded0] bg-white px-4 py-3 text-sm outline-none focus:border-[#087055]" /><div className="mt-3 flex items-center gap-4"><button type="button" disabled={savingKey === task.key} onClick={() => save(task)} className="rounded-xl bg-[#102c25] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{savingKey === task.key ? "Saving…" : "Save progress"}</button>{savedKey === task.key && <span role="status" className="text-sm text-[#087055]">Saved</span>}</div></div></article>;
              })}</div></div>;
            })}
          </section>
          <ReportFeedback auditId={id} />
        </>}
      </div>
    </main>
  );
}
