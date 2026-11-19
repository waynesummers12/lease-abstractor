-- Lease obligations entered and confirmed by the portfolio owner.
create table if not exists public.portfolio_lease_actions (
  id uuid primary key default gen_random_uuid(),
  lease_id uuid not null references public.portfolio_leases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 160),
  owner_name text not null check (char_length(trim(owner_name)) between 1 and 100),
  due_date date,
  source_note text check (source_note is null or char_length(source_note) <= 500),
  category text not null default 'other' check (category in ('renewal', 'billing', 'insurance', 'maintenance', 'other')),
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_lease_actions_user_due_idx
  on public.portfolio_lease_actions (user_id, due_date, created_at)
  where completed_at is null;
create index if not exists portfolio_lease_actions_lease_idx
  on public.portfolio_lease_actions (lease_id, created_at desc);

alter table public.portfolio_lease_actions enable row level security;
revoke all on public.portfolio_lease_actions from anon;
grant select, insert, update, delete on public.portfolio_lease_actions to authenticated;

create policy "Owners read their lease actions"
  on public.portfolio_lease_actions for select to authenticated
  using ((select auth.uid()) = user_id and exists (
    select 1 from public.portfolio_leases leases
    where leases.id = lease_id and leases.user_id = (select auth.uid()) and leases.deleted_at is null
  ));
create policy "Owners add their lease actions"
  on public.portfolio_lease_actions for insert to authenticated
  with check ((select auth.uid()) = user_id and exists (
    select 1 from public.portfolio_leases leases
    where leases.id = lease_id and leases.user_id = (select auth.uid()) and leases.deleted_at is null
  ));
create policy "Owners update their lease actions"
  on public.portfolio_lease_actions for update to authenticated
  using ((select auth.uid()) = user_id and exists (
    select 1 from public.portfolio_leases leases
    where leases.id = lease_id and leases.user_id = (select auth.uid()) and leases.deleted_at is null
  ))
  with check ((select auth.uid()) = user_id and exists (
    select 1 from public.portfolio_leases leases
    where leases.id = lease_id and leases.user_id = (select auth.uid()) and leases.deleted_at is null
  ));
create policy "Owners remove their lease actions"
  on public.portfolio_lease_actions for delete to authenticated
  using ((select auth.uid()) = user_id);
