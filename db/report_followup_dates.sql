-- Dates are entered and confirmed by the customer; the report does not establish a legal deadline.
alter table public.report_followups add column if not exists due_date date;
