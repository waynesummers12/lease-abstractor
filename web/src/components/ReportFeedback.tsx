"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

type UsefulAnswer = "yes" | "no" | "not_sure" | "";
type NextAction = "not_yet" | "reviewing" | "requested_records" | "contacted_landlord" | "resolved" | "other";
type Feedback = { useful_question: Exclude<UsefulAnswer, "">; next_action: NextAction; note: string };

const answers: { value: Exclude<UsefulAnswer, "">; label: string }[] = [
  { value: "yes", label: "Yes" }, { value: "no", label: "No" }, { value: "not_sure", label: "Not sure yet" },
];
const actions: { value: NextAction; label: string }[] = [
  { value: "not_yet", label: "I haven't taken a next step yet" },
  { value: "reviewing", label: "I'm checking the lease or statement" },
  { value: "requested_records", label: "I requested supporting records" },
  { value: "contacted_landlord", label: "I contacted my landlord or manager" },
  { value: "resolved", label: "I resolved a question" },
  { value: "other", label: "Something else" },
];

export default function ReportFeedback({ auditId }: { auditId: string }) {
  const { session, loading: authLoading } = useAuth();
  const [useful, setUseful] = useState<UsefulAnswer>("");
  const [action, setAction] = useState<NextAction>("not_yet");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    const controller = new AbortController();
    fetch(`/api/audits/${encodeURIComponent(auditId)}/feedback`, {
      headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {},
      cache: "no-store", signal: controller.signal,
    }).then(async (response) => {
      if (!response.ok) throw new Error("Could not load your response. Please try again later.");
      const result = await response.json() as { feedback: Feedback | null };
      if (!controller.signal.aborted && result.feedback) {
        setUseful(result.feedback.useful_question);
        setAction(result.feedback.next_action);
        setNote(result.feedback.note);
        setSaved(true);
      }
    }).catch(() => {
      if (!controller.signal.aborted) setError("Could not load your response. Please try again later.");
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [auditId, authLoading, session?.access_token]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!useful || saving) return;
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const response = await fetch(`/api/audits/${encodeURIComponent(auditId)}/feedback`, {
        method: "PUT", headers: { "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}) },
        body: JSON.stringify({ usefulQuestion: useful, nextAction: action, note }),
      });
      if (!response.ok) throw new Error("Could not save your response. Please try again.");
      setSaved(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save your response.");
    } finally {
      setSaving(false);
    }
  }

  return <section aria-labelledby="report-feedback-title" className="mt-8 rounded-[1.5rem] border border-[#dce8de] bg-white p-6 shadow-sm sm:p-8">
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b776e]">Help us make reports more useful</p>
      <h2 id="report-feedback-title" className="mt-3 text-2xl font-semibold tracking-tight text-[#102820]">Did your report give you a useful question to check?</h2>
      <p className="mt-2 text-sm leading-6 text-[#53675d]">After you read the PDF, tell us what helped and what you did next. You can return and update your answer later.</p>
    </div>
    {loading ? <p role="status" className="mt-6 text-sm text-[#53675d]">Loading feedback…</p> :
      <form onSubmit={submit} className="mt-6 max-w-3xl space-y-5">
        <fieldset>
          <legend className="text-sm font-semibold text-[#102820]">Was at least one question useful?</legend>
          <div className="mt-3 flex flex-wrap gap-3">{answers.map((answer) => <label key={answer.value} className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium ${useful === answer.value ? "border-[#087055] bg-[#e3f1e8] text-[#102820]" : "border-[#cbded0] text-[#53675d]"}`}><input type="radio" name={`useful-${auditId}`} value={answer.value} checked={useful === answer.value} onChange={() => { setUseful(answer.value); setSaved(false); }} />{answer.label}</label>)}</div>
        </fieldset>
        <div><label htmlFor={`feedback-action-${auditId}`} className="text-sm font-semibold text-[#102820]">What have you done next?</label><select id={`feedback-action-${auditId}`} value={action} onChange={(event) => { setAction(event.target.value as NextAction); setSaved(false); }} className="mt-2 block w-full max-w-lg rounded-xl border border-[#cbded0] bg-white px-4 py-3 text-sm text-[#102820]">{actions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
        <div><label htmlFor={`feedback-note-${auditId}`} className="text-sm font-semibold text-[#102820]">What could we improve? <span className="font-normal text-[#53675d]">Optional</span></label><textarea id={`feedback-note-${auditId}`} rows={3} maxLength={500} value={note} onChange={(event) => { setNote(event.target.value); setSaved(false); }} placeholder="Tell us what was clear, confusing, or missing." className="mt-2 block w-full rounded-xl border border-[#cbded0] bg-white px-4 py-3 text-sm text-[#102820]" /></div>
        <div className="flex flex-wrap items-center gap-4"><button type="submit" disabled={!useful || saving} className="min-h-11 rounded-xl bg-[#102c25] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{saving ? "Saving…" : saved ? "Update feedback" : "Send feedback"}</button>{saved && <span role="status" className="text-sm font-medium text-[#087055]">Saved. Thank you.</span>}</div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </form>}
  </section>;
}
