-- Referral administration and reports. Run in the Supabase SQL editor as an owner.
-- Codes are registered manually after the partner emails SaveOnLease.

create table if not exists public.referral_partners (
  code text primary key check (code ~ '^[a-z0-9_-]{1,48}$'),
  contact_name text not null,
  contact_email text not null,
  registered_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active', 'paused'))
);

alter table public.referral_partners enable row level security;
revoke all on public.referral_partners from public, anon, authenticated;
grant select, insert, update, delete on public.referral_partners to service_role;

create or replace view public.referral_monthly_report
with (security_invoker = true) as
select
  r.referrer_code,
  p.contact_name,
  p.contact_email,
  date_trunc('month', r.created_at)::date as purchase_month_utc,
  count(*)::integer as paid_reports,
  round(coalesce(sum(r.amount_paid), 0), 2) as gross_revenue_usd,
  round(coalesce(sum(r.commission), 0), 2) as commission_earned_usd,
  round(coalesce(sum(r.commission) filter (where r.paid is true), 0), 2) as commission_marked_paid_usd,
  round(coalesce(sum(r.commission) filter (where r.paid is not true), 0), 2) as commission_unpaid_usd,
  max(r.created_at) as latest_purchase_at_utc
from public.referrals r
left join public.referral_partners p on p.code = r.referrer_code
where r.referrer_code is not null and r.referrer_code <> ''
group by r.referrer_code, p.contact_name, p.contact_email,
  date_trunc('month', r.created_at)::date;

create or replace view public.referral_transaction_report
with (security_invoker = true) as
select
  r.id as referral_id,
  r.audit_id,
  r.referrer_code,
  r.created_at as purchase_at_utc,
  round(r.amount_paid, 2) as amount_paid_usd,
  round(r.commission, 2) as commission_usd,
  coalesce(r.paid, false) as commission_marked_paid
from public.referrals r;

revoke all on public.referral_monthly_report,
  public.referral_transaction_report from public, anon, authenticated;
grant select on public.referral_monthly_report,
  public.referral_transaction_report to service_role;

comment on view public.referral_monthly_report is
  'Private monthly summary of completed referred purchases and commissions. No visits or free uploads are counted.';
comment on view public.referral_transaction_report is
  'Private referred purchase details for reconciling commissions. Mark referrals.paid only after a payout is made.';
