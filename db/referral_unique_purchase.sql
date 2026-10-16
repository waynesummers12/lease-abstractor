-- A paid report may only produce one referral commission, even if Stripe
-- delivers a webhook and the success page recovers the same checkout.
create unique index if not exists referrals_audit_id_unique
  on public.referrals (audit_id)
  where audit_id is not null;
