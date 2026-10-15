-- One editable response per completed report. Only the server-side report
-- access route can read or write this table, including for guest purchases.
create table if not exists public.report_feedback (
  audit_id uuid primary key references public.lease_audits(id) on delete cascade,
  useful_question text not null check (useful_question in ('yes', 'no', 'not_sure')),
  next_action text not null check (next_action in ('not_yet', 'reviewing', 'requested_records', 'contacted_landlord', 'resolved', 'other')),
  note text not null default '' check (char_length(note) <= 500),
  updated_at timestamptz not null default now()
);

alter table public.report_feedback enable row level security;
revoke all on public.report_feedback from anon, authenticated;
