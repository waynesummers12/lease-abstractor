-- Partner-controlled monthly email summaries. Payment remains manual.
alter table public.referral_partners
  add column if not exists monthly_email_enabled boolean not null default false;

create table if not exists public.referral_monthly_email_deliveries (
  code text not null references public.referral_partners(code) on delete cascade,
  month_utc date not null,
  claimed_at timestamptz not null default now(),
  sent_at timestamptz,
  resend_email_id text,
  primary key (code, month_utc)
);

alter table public.referral_monthly_email_deliveries enable row level security;
revoke all on public.referral_monthly_email_deliveries from public, anon, authenticated;
grant select, insert, update, delete on public.referral_monthly_email_deliveries to service_role;

comment on column public.referral_partners.monthly_email_enabled is
  'Partner opt-in for a monthly email summary of the previous UTC month.';
comment on table public.referral_monthly_email_deliveries is
  'Private delivery ledger that prevents repeat monthly referral emails.';
