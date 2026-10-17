# Feedback gift card fulfillment

The report feedback form reserves one $50 Starbucks gift card for each of the first 50 distinct paid customer email addresses that submit all three answers, including a written note of at least 10 characters. The reservation is automatic and capped in the database. Gift card purchase and sending are manual.

In the Supabase SQL Editor, list unsent reservations:

```sql
select id, recipient_email, claimed_at, audit_id
from public.feedback_gift_card_claims
where delivery_status = 'pending'
order by claimed_at, id;
```

After verifying a reservation and emailing the gift card, record delivery using that row's ID:

```sql
update public.feedback_gift_card_claims
set delivery_status = 'sent', delivered_at = now()
where id = <claim_id> and delivery_status = 'pending';
```

Review the list regularly while the promotion is active. Do not put gift card codes or payment details in this table.
