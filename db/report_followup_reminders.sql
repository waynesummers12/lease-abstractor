-- Reminders are off by default and only apply to dates a customer saves.
alter table public.report_followups
  add column if not exists reminder_enabled boolean not null default false,
  add column if not exists reminder_sent_at timestamptz;

create index if not exists report_followups_pending_reminders_idx
  on public.report_followups (due_date)
  where reminder_enabled = true and reminder_sent_at is null;
