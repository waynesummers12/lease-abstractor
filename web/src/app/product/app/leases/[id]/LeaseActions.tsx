"use client";

import { useEffect, useState } from "react";
import { authenticatedPortfolioFetch } from "@/lib/portfolioFetch";
import { actionDateLabel, actionTiming, type PortfolioLeaseAction } from "@/lib/portfolioLeaseActions";

const categories = [
  ["renewal", "Renewal or option"],
  ["billing", "Rent or billing"],
  ["insurance", "Lease insurance requirement"],
  ["maintenance", "Lease maintenance obligation"],
  ["other", "Other lease obligation"],
] as const;

export default function LeaseActions({ leaseId }: { leaseId: string }) {
  const [actions, setActions] = useState<PortfolioLeaseAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", ownerName: "", dueDate: "", category: "renewal", sourceNote: "" });

  useEffect(() => {
    let active = true;
    authenticatedPortfolioFetch(`/api/portfolio-lease-actions?leaseId=${encodeURIComponent(leaseId)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load actions");
        if (active) setActions(data.actions);
      })
      .catch(() => { if (active) setError("Could not load lease actions. Refresh to try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [leaseId]);

  async function saveAction(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await authenticatedPortfolioFetch("/api/portfolio-lease-actions", {
        method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leaseId, id: editingId, ...form }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save action");
      setActions((current) => editingId
        ? current.map((item) => item.id === editingId ? data.action : item)
        : [data.action, ...current]);
      setEditingId(null);
      setForm({ title: "", ownerName: form.ownerName, dueDate: "", category: "renewal", sourceNote: "" });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save action");
    } finally { setSaving(false); }
  }

  async function toggleComplete(action: PortfolioLeaseAction) {
    setError(null);
    try {
      const response = await authenticatedPortfolioFetch("/api/portfolio-lease-actions", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: action.id, completed: !action.completed_at }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update action");
      setActions((current) => current.map((item) => item.id === action.id ? data.action : item));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update action");
    }
  }

  const sortedActions = [...actions].sort((a, b) => {
    if (Boolean(a.completed_at) !== Boolean(b.completed_at)) return a.completed_at ? 1 : -1;
    return (a.due_date ?? "9999-12-31").localeCompare(b.due_date ?? "9999-12-31") || a.created_at.localeCompare(b.created_at);
  });

  return <section id="actions" className="scroll-mt-32 rounded-2xl border border-[#dce8de] bg-white p-6 text-[#122c25] sm:p-8">
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d7459]">Next steps</p>
    <h2 className="mt-2 text-2xl font-semibold">What does this lease need?</h2>
    <p className="mt-2 text-sm leading-6 text-[#60736a]">Keep the next task, the person handling it, and the date to check together. Enter dates from the signed lease yourself; SaveOnLease does not calculate notice deadlines here or send alerts for these tasks.</p>
    {error && <p role="alert" className="mt-4 rounded-lg bg-[#fff0e6] px-4 py-3 text-sm text-[#8b3f1a]">{error}</p>}
    {loading ? <p className="mt-6 text-sm text-[#60736a]">Loading actions…</p> : <div className="mt-6 space-y-3">
      {sortedActions.length === 0 && <p className="rounded-xl bg-[#f7faf7] px-4 py-5 text-sm text-[#60736a]">No actions saved for this lease yet. Add the first obligation below.</p>}
      {sortedActions.map((action) => <div key={action.id} className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-[#e1e8e0] p-4">
        <div className="min-w-0">
          <p className={`font-semibold ${action.completed_at ? "text-[#708077] line-through" : ""}`}>{action.title}</p>
          <p className="mt-1 text-sm text-[#60736a]">Handled by {action.owner_name} · {actionDateLabel(action.due_date)}</p>
          {!action.completed_at && <p className="mt-1 text-xs text-[#99612c]">{actionTiming(action.due_date)}</p>}
          {action.source_note && <p className="mt-2 text-xs text-[#60736a]">Source to check: {action.source_note}</p>}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => { setEditingId(action.id); setForm({ title: action.title, ownerName: action.owner_name, dueDate: action.due_date ?? "", category: action.category, sourceNote: action.source_note ?? "" }); }} className="rounded-lg border border-[#cbded0] px-3 py-2 text-xs font-semibold text-[#0c6652] hover:bg-[#f5faf5]">Edit</button>
          <button type="button" onClick={() => toggleComplete(action)} className="rounded-lg border border-[#cbded0] px-3 py-2 text-xs font-semibold text-[#0c6652] hover:bg-[#f5faf5]">{action.completed_at ? "Reopen" : "Mark done"}</button>
        </div>
      </div>)}
    </div>}
    <form onSubmit={saveAction} className="mt-8 border-t border-[#e1e8e0] pt-6">
      <h3 className="font-semibold">{editingId ? "Edit next step" : "Add a next step"}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">What needs to happen?<input required maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Review renewal option" className="mt-2 w-full rounded-lg border border-[#cbded0] px-3 py-2.5 text-sm" /></label>
        <label className="text-sm font-medium">Who is handling it?<input required maxLength={100} value={form.ownerName} onChange={(event) => setForm({ ...form, ownerName: event.target.value })} placeholder="Name or team" className="mt-2 w-full rounded-lg border border-[#cbded0] px-3 py-2.5 text-sm" /></label>
        <label className="text-sm font-medium">Date to check (if known)<input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} className="mt-2 w-full rounded-lg border border-[#cbded0] px-3 py-2.5 text-sm" /></label>
        <label className="text-sm font-medium">Type<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-2 w-full rounded-lg border border-[#cbded0] bg-white px-3 py-2.5 text-sm">{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="text-sm font-medium sm:col-span-2">Lease page or source note (optional)<input maxLength={500} value={form.sourceNote} onChange={(event) => setForm({ ...form, sourceNote: event.target.value })} placeholder="e.g. Section 12, page 18 — confirm notice period" className="mt-2 w-full rounded-lg border border-[#cbded0] px-3 py-2.5 text-sm" /></label>
      </div>
      <div className="mt-5 flex gap-3"><button type="submit" disabled={saving} className="rounded-lg bg-[#102c25] px-5 py-3 text-sm font-semibold text-white hover:bg-[#195040] disabled:opacity-50">{saving ? "Saving…" : editingId ? "Save changes" : "Save next step"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: "", ownerName: "", dueDate: "", category: "renewal", sourceNote: "" }); }} className="rounded-lg border border-[#cbded0] px-5 py-3 text-sm font-semibold text-[#0c6652]">Cancel</button>}
      </div>
    </form>
  </section>;
}
