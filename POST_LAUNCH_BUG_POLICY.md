# 🛑 POST_LAUNCH_BUG_POLICY — SaveOnLease V1

This document defines **what qualifies as a bug**, **what actions are allowed**, and **what is explicitly forbidden** after V1 launch.

This policy exists to protect:
- Stability
- Velocity
- Revenue focus
- Mental sanity

---

## 🎯 PRIMARY GOAL

After V1 launch, the goal is **NOT perfection**.

The goal is:
> **Revenue signal + user behavior validation**

Anything that does not directly support that is deferred.

---

## ✅ WHAT QUALIFIES AS A BUG (ALLOWED FIXES)

Only the following are considered valid post-launch bugs:

### 1️⃣ Blocking Bugs (Fix Immediately)

Fix allowed if **ANY** of the following are true:

- User cannot upload a lease
- Analysis never completes
- Checkout cannot be initiated
- Payment succeeds but PDF cannot be accessed
- App crashes or throws fatal errors
- Security issue (leak, auth bypass, exposed keys)

✅ These may be fixed **immediately and surgically**.

---

### 2️⃣ Revenue Impacting Bugs

Fix allowed if:

- User reaches checkout but cannot pay
- Payment succeeds but confirmation is unclear
- Download button does not work
- User is redirected incorrectly after payment

✅ Fix must be minimal and isolated.

---

### 3️⃣ Data Integrity Bugs

Fix allowed if:

- Audit row is not created
- Analysis is not saved
- PDF path is not persisted
- Status transitions break (`processing → paid → complete`)

⚠️ Fix only the broken edge — **no refactors**.

---

## 🚫 WHAT IS *NOT* A BUG (DO NOT FIX)

The following are **explicitly NOT bugs** post-launch:

- UI polish issues
- Styling inconsistencies
- Copy changes
- Layout spacing
- Animation improvements
- Code “cleanup”
- Re-naming variables
- Refactoring for “clarity”
- Performance optimizations
- Removing “unused” files
- Changing architecture
- Introducing new abstractions

❌ These are deferred to **V2 planning only**.

---

## 🧨 FORBIDDEN ACTIONS (HARD NO)

After V1 launch, **DO NOT**:

- Change routing structure
- Modify API contracts
- Touch worker ingestion logic
- Touch Stripe webhook flow
- Change Supabase schema
- Move files “for cleanliness”
- Replace libraries
- Introduce new state managers
- Add caching layers
- Add background jobs
- “Simplify” async flows

If it works → **do not touch it**

---

## 🧪 FIX RULES (MANDATORY)

Every allowed fix must follow ALL rules below:

1. Fix touches **≤ 3 files**
2. No new dependencies
3. No folder restructuring
4. No renamed exports
5. No behavior change outside the bug
6. Manual test immediately after fix
7. Commit message must include:
