-- Reserve at most 50 $50 gift cards for distinct paid customers who complete
-- all three feedback fields. Fulfillment remains a manual operation.
create table if not exists public.feedback_gift_card_claims (
  id bigint generated always as identity primary key,
  audit_id uuid not null unique references public.lease_audits(id) on delete restrict,
  recipient_email text not null unique,
  claimed_at timestamptz not null default now(),
  delivery_status text not null default 'pending' check (delivery_status in ('pending', 'sent')),
  delivered_at timestamptz,
  check (recipient_email = lower(btrim(recipient_email)))
);

alter table public.feedback_gift_card_claims enable row level security;
revoke all on public.feedback_gift_card_claims from anon, authenticated;
revoke all on sequence public.feedback_gift_card_claims_id_seq from anon, authenticated;

create or replace function public.reserve_feedback_gift_card(p_audit_id uuid, p_email text)
returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  normalized_email text := lower(btrim(coalesce(p_email, '')));
  existing_audit uuid;
  claim_count integer;
begin
  -- Serialize the cap check and insert, even when submissions arrive together.
  perform pg_catalog.pg_advisory_xact_lock(50499, 50);

  if normalized_email = '' or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$' then
    return 'ineligible';
  end if;

  if not exists (
    select 1 from public.lease_audits a
    join public.report_feedback f on f.audit_id = a.id
    where a.id = p_audit_id
      and a.status = 'complete'
      and coalesce(a.amount_paid, 0) > 0
      and char_length(btrim(f.note)) >= 10
      and f.useful_question in ('yes', 'no', 'not_sure')
      and f.next_action in ('not_yet', 'reviewing', 'requested_records', 'contacted_landlord', 'resolved', 'other')
  ) then
    return 'ineligible';
  end if;

  select audit_id into existing_audit
  from public.feedback_gift_card_claims
  where recipient_email = normalized_email;
  if existing_audit is not null then
    return case when existing_audit = p_audit_id then 'reserved' else 'already_claimed' end;
  end if;

  select count(*) into claim_count from public.feedback_gift_card_claims;
  if claim_count >= 50 then
    return 'full';
  end if;

  insert into public.feedback_gift_card_claims (audit_id, recipient_email)
  values (p_audit_id, normalized_email)
  on conflict do nothing;

  if found then return 'reserved'; end if;
  return 'already_claimed';
end;
$$;

revoke all on function public.reserve_feedback_gift_card(uuid, text) from public, anon, authenticated;
grant execute on function public.reserve_feedback_gift_card(uuid, text) to service_role;

-- Operations: select id, audit_id, recipient_email, claimed_at, delivery_status
-- from public.feedback_gift_card_claims order by claimed_at;
