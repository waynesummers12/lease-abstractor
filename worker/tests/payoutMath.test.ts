import assert from "node:assert/strict";
import test from "node:test";
import { commissionCents, ownerPayoutCents } from "../utils/payoutMath.ts";

test("commission is rounded per paid report", () => {
  assert.equal(commissionCents(49.99 * 0.2), 1000);
  assert.throws(() => commissionCents(-1));
});

test("owner payout retains every unpaid commission", () => {
  assert.equal(ownerPayoutCents(4999, 1000), 3999);
  assert.equal(ownerPayoutCents(500, 1000), 0);
  assert.equal(ownerPayoutCents(1099, 1000), 0);
  assert.equal(ownerPayoutCents(1100, 1000), 100);
  assert.throws(() => ownerPayoutCents(500, -1));
});
