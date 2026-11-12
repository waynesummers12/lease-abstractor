-- Customers explicitly enable reminders for each saved lease.
alter table public.portfolio_leases
  add column if not exists renewal_reminders_enabled boolean not null default false;

create table if not exists public.portfolio_renewal_reminder_events (
  lease_id uuid not null references public.portfolio_leases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  renewal_date date not null,
  days_before integer not null check (days_before in (180, 90, 30, 7)),
  claimed_at timestamptz not null default now(),
  sent_at timestamptz,
  primary key (lease_id, renewal_date, days_before)
);

alter table public.portfolio_renewal_reminder_events enable row level security;
revoke all on public.portfolio_renewal_reminder_events from anon, authenticated;

create index if not exists portfolio_leases_renewal_reminder_due_idx
  on public.portfolio_leases (renewal_date)
  where renewal_reminders_enabled = true and deleted_at is null;
