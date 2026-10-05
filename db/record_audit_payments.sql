-- The webhook and recovery path record Stripe's payment timestamp here.
alter table public.lease_audits
  add column if not exists paid_at timestamptz;

-- A Checkout Session can pay for only one audit.
create unique index if not exists lease_audits_stripe_session_unique_idx
  on public.lease_audits (stripe_session_id)
  where stripe_session_id is not null;
