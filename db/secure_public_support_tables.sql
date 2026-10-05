-- Restrict public support tables to their intended access paths.
-- Browser clients may read their own profile and create a free profile.
-- Checklist leads, lease abstracts, and referrals are server/worker only.

alter table public.profiles enable row level security;
alter table public.checklist_leads enable row level security;
alter table public.lease_abstracts enable row level security;
alter table public.referrals enable row level security;

revoke all on table public.profiles, public.checklist_leads,
  public.lease_abstracts, public.referrals from public, anon, authenticated;

grant select, insert on table public.profiles to authenticated;

create policy "Users read own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Users create own free profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id and plan = 'free');
