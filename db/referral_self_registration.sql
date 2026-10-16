-- Link a registered referral code to a real SaveOnLease account.
-- Keep partner rows private; registration is performed by an authenticated API.
alter table public.referral_partners
  add column if not exists user_id uuid references auth.users(id) on delete restrict;

create index if not exists referral_partners_user_id_idx
  on public.referral_partners (user_id)
  where user_id is not null;

comment on column public.referral_partners.user_id is
  'Account that claimed this referral code. Null is reserved for legacy/manual partner records.';
