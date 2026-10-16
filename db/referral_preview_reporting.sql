-- Attribute free lease previews to the referral link used when the audit starts.
alter table public.lease_audits
  add column if not exists referrer_code text
  check (referrer_code is null or referrer_code ~ '^[a-z0-9_-]{1,48}$');

create index if not exists lease_audits_referrer_preview_idx
  on public.lease_audits (referrer_code, created_at)
  where referrer_code is not null;

drop view if exists public.referral_monthly_report;
create or replace view public.referral_monthly_report
with (security_invoker = true) as
with previews as (
  select referrer_code, date_trunc('month', created_at)::date as month_utc,
    count(*)::integer as free_previews
  from public.lease_audits
  where referrer_code is not null and status in ('analyzed', 'paid', 'complete')
  group by referrer_code, date_trunc('month', created_at)::date
), purchases as (
  select referrer_code, date_trunc('month', created_at)::date as month_utc,
    count(*)::integer as paid_reports,
    round(coalesce(sum(amount_paid), 0), 2) as gross_revenue_usd,
    round(coalesce(sum(commission), 0), 2) as commission_earned_usd,
    round(coalesce(sum(commission) filter (where paid is true), 0), 2) as commission_marked_paid_usd,
    round(coalesce(sum(commission) filter (where paid is not true), 0), 2) as commission_unpaid_usd
  from public.referrals
  where referrer_code is not null and referrer_code <> ''
  group by referrer_code, date_trunc('month', created_at)::date
)
select
  coalesce(previews.referrer_code, purchases.referrer_code) as referrer_code,
  p.contact_name,
  p.contact_email,
  coalesce(previews.month_utc, purchases.month_utc) as month_utc,
  coalesce(previews.free_previews, 0) as free_previews,
  coalesce(purchases.paid_reports, 0) as paid_reports,
  coalesce(purchases.gross_revenue_usd, 0) as gross_revenue_usd,
  coalesce(purchases.commission_earned_usd, 0) as commission_earned_usd,
  coalesce(purchases.commission_marked_paid_usd, 0) as commission_marked_paid_usd,
  coalesce(purchases.commission_unpaid_usd, 0) as commission_unpaid_usd
from previews
full join purchases on purchases.referrer_code = previews.referrer_code
  and purchases.month_utc = previews.month_utc
left join public.referral_partners p
  on p.code = coalesce(previews.referrer_code, purchases.referrer_code);

revoke all on public.referral_monthly_report from public, anon, authenticated;
grant select on public.referral_monthly_report to service_role;

comment on view public.referral_monthly_report is
  'Private monthly summary. Free previews count analyzed leases; commissions count completed paid reports. Months are UTC.';
