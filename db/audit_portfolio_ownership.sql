-- Signed-in uploads can be listed with their completed reports and linked to a saved lease.
alter table public.lease_audits
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists portfolio_lease_id uuid references public.portfolio_leases(id) on delete set null;

create index if not exists lease_audits_owner_completed_idx
  on public.lease_audits (user_id, completed_at desc)
  where status = 'complete';

create index if not exists lease_audits_portfolio_lease_idx
  on public.lease_audits (portfolio_lease_id)
  where portfolio_lease_id is not null;

-- Direct Data API reads are limited to the authenticated owner.
-- Writes still go through authenticated server routes and the trusted worker.
alter table public.lease_audits enable row level security;

create policy "Owners read their audits" on public.lease_audits
  for select to authenticated
  using ((select auth.uid()) = user_id);
