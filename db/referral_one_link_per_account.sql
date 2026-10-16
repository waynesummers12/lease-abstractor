-- One active partner identity per account keeps self-service signup unambiguous.
create unique index if not exists referral_partners_one_account_idx
  on public.referral_partners (user_id)
  where user_id is not null;
