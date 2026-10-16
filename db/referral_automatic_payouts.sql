-- Stripe Connect payout state stays private to the service role.
alter table public.referral_partners
  add column if not exists stripe_account_id text,
  add column if not exists stripe_platform_account_id text;

create unique index if not exists referral_partners_stripe_account_idx
  on public.referral_partners (stripe_account_id)
  where stripe_account_id is not null;

alter table public.referrals
  add column if not exists stripe_transfer_id text,
  add column if not exists transfer_amount_cents integer,
  add column if not exists transfer_reversed_cents integer not null default 0,
  add column if not exists payout_claimed_at timestamptz,
  add column if not exists payout_paid_at timestamptz,
  add column if not exists payout_error text;

create unique index if not exists referrals_stripe_transfer_idx
  on public.referrals (stripe_transfer_id)
  where stripe_transfer_id is not null;

create index if not exists referrals_payout_queue_idx
  on public.referrals (created_at, id)
  where paid is not true;

comment on column public.referral_partners.stripe_account_id is
  'Stripe Connect recipient account for automated commission transfers.';
comment on column public.referrals.stripe_transfer_id is
  'Stripe transfer for this referral; one transfer per purchase.';
