-- One owner payout per UTC day. The recorded amount keeps Stripe retries
-- idempotent even if available balance changes between attempts.
create table if not exists public.referral_owner_payouts (
  payout_date date primary key,
  amount_cents integer not null check (amount_cents > 0),
  commission_reserve_cents integer not null check (commission_reserve_cents >= 0),
  stripe_payout_id text unique,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  error text
);

alter table public.referral_owner_payouts enable row level security;
revoke all on public.referral_owner_payouts from public, anon, authenticated;
grant select, insert, update on public.referral_owner_payouts to service_role;

comment on table public.referral_owner_payouts is
  'Private daily owner payout ledger; available Stripe funds less unpaid referral commissions.';
