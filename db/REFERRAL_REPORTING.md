# Referral reporting in Supabase

Open the SaveOnLease `leases` project in Supabase and use the SQL Editor.
The report views and partner registry are private to database administrators and
the service role. They are not available to signed-in customers.

## Partner registration

Partners sign in on `/marketing/referral` and select **Register my code**. The
site stores the code with their account ID and email in `public.referral_partners`.
The primary key prevents two accounts from registering the same code.

For a legacy code that already has activity, confirm ownership before linking
it manually in the Table Editor or SQL Editor. New self-registration blocks
codes with earlier activity to prevent someone else claiming past referrals.
For a manually verified legacy code, use:

```sql
insert into public.referral_partners (code, contact_name, contact_email, user_id)
values ('partner-code', 'Partner name', 'partner@example.com', 'verified-user-uuid')
on conflict (code) do update
set contact_name = excluded.contact_name,
    contact_email = excluded.contact_email,
    user_id = excluded.user_id;
```

Check that the requested code is not already assigned before a manual change.

## Monthly report

```sql
select *
from public.referral_monthly_report
order by month_utc desc, referrer_code;
```

`free_previews` counts referred leases that reached analysis. `paid_reports`
counts completed reports recorded in `public.referrals`. These may fall in
different months if someone buys after their preview. Gross and commission
amounts are USD. The month is UTC. A code without a registered partner has
blank contact fields and needs investigation before payout.

## Reconcile a partner's purchases

```sql
select *
from public.referral_transaction_report
where referrer_code = 'partner-code'
order by purchase_at_utc desc;
```

After a payout is actually sent, mark the matching rows `paid = true` in the
`public.referrals` Table Editor. The monthly view then moves those commissions
from `commission_unpaid_usd` to `commission_marked_paid_usd`. Do not mark them
paid when merely scheduling or preparing a payout.

## Monthly partner emails

Partners may opt in on `/marketing/referral` when they register a code or later
change the checkbox for that code. The `referral-monthly-emails` Vercel cron runs
at 16:00 UTC on days 1–5 of each month. It reads the previous UTC month's
`referral_monthly_report` and emails each opted-in active partner the number of
analyzed leases, paid reports, and commission earned. A month with no activity
still produces a zero-activity summary. The account's current email address is
used, and no lease or customer details are included.

`public.referral_monthly_email_deliveries` records one delivery per code and
month so cron retries do not ordinarily duplicate emails. The job also uses a
Resend idempotency key. If delivery fails, inspect the Vercel function logs and
this table. The automated email is a report only: staff must still reconcile
commissions and arrange payouts, then mark paid referrals in Supabase.
