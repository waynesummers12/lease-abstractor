-- Apply with the matching web and worker release.
-- Existing rows remain unowned and preserved until their owners are verified.
alter table public.portfolio_leases
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists deleted_at timestamptz;

create index if not exists portfolio_leases_user_active_idx
  on public.portfolio_leases (user_id, created_at desc)
  where deleted_at is null;

alter table public.portfolio_leases enable row level security;

revoke all on public.portfolio_leases from anon;
grant select, insert, update on public.portfolio_leases to authenticated;

create policy "Owners read active portfolio leases"
  on public.portfolio_leases for select to authenticated
  using ((select auth.uid()) = user_id and deleted_at is null);

create policy "Owners add portfolio leases"
  on public.portfolio_leases for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Owners update active portfolio leases"
  on public.portfolio_leases for update to authenticated
  using ((select auth.uid()) = user_id and deleted_at is null)
  with check ((select auth.uid()) = user_id);
