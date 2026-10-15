-- Follow-up state for paid reports. The PDF and analysis remain unchanged.
create table if not exists public.report_followups (
  audit_id uuid not null references public.lease_audits(id) on delete cascade,
  item_key text not null check (char_length(item_key) between 1 and 128),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'open' check (status in ('open', 'waiting', 'reviewed')),
  note text not null default '' check (char_length(note) <= 2000),
  updated_at timestamptz not null default now(),
  primary key (audit_id, item_key)
);

create index if not exists report_followups_user_id_idx on public.report_followups(user_id);
alter table public.report_followups enable row level security;

grant select, insert, update on public.report_followups to authenticated;

create policy "Customers read their report follow-ups" on public.report_followups
  for select to authenticated
  using (user_id = (select auth.uid()) and exists (
    select 1 from public.lease_audits a
    where a.id = audit_id and a.user_id = (select auth.uid()) and a.status = 'complete'
  ));
create policy "Customers add their report follow-ups" on public.report_followups
  for insert to authenticated
  with check (user_id = (select auth.uid()) and exists (
    select 1 from public.lease_audits a
    where a.id = audit_id and a.user_id = (select auth.uid()) and a.status = 'complete'
  ));
create policy "Customers update their report follow-ups" on public.report_followups
  for update to authenticated
  using (user_id = (select auth.uid()) and exists (
    select 1 from public.lease_audits a
    where a.id = audit_id and a.user_id = (select auth.uid()) and a.status = 'complete'
  ))
  with check (user_id = (select auth.uid()) and exists (
    select 1 from public.lease_audits a
    where a.id = audit_id and a.user_id = (select auth.uid()) and a.status = 'complete'
  ));
