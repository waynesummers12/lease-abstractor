# Referral reporting in Supabase

Open the SaveOnLease `leases` project in Supabase and use the SQL Editor.
The report views and partner registry are private to database administrators and
the service role. They are not available to signed-in customers.

## Register a partner after receiving their email

Use the Table Editor on `public.referral_partners`, or run:

```sql
insert into public.referral_partners (code, contact_name, contact_email)
values ('partner-code', 'Partner name', 'partner@example.com')
on conflict (code) do update
set contact_name = excluded.contact_name,
    contact_email = excluded.contact_email;
```

The referral page only **generates** a link; it does not register a partner.
Check that the requested code is not already assigned before confirming it.

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

This report does not send emails or payments automatically. Review the numbers
and confirm reporting and payout timing with each partner by email.
