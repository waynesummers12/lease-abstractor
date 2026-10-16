export function commissionCents(value: number) {
  const cents = Math.round(value * 100);
  if (!Number.isSafeInteger(cents) || cents < 0) throw new Error("Invalid referral commission");
  return cents;
}

export function ownerPayoutCents(availableCents: number, reserveCents: number) {
  if (!Number.isSafeInteger(availableCents) || !Number.isSafeInteger(reserveCents) || reserveCents < 0) {
    throw new Error("Invalid owner payout balance");
  }
  const amount = Math.max(0, availableCents - reserveCents);
  return amount >= 100 ? amount : 0;
}
