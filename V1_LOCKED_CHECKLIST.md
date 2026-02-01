V1 Locked Checklist — SaveOnLease

Status: ✅ V1 is LIVE
Rule: If an item below is checked, it must not be changed.

🔒 V1 LOCK CONDITIONS (ALL MUST BE TRUE)
Deployment

 Vercel production build passes without errors

 No Supabase errors during prerender or build

 Worker reachable and responding

 Upload → analysis → payment → PDF works end-to-end

 At least one successful production deployment confirmed

Once all are true → V1 is frozen

🚨 HARD NO-CHANGE ZONE (ABSOLUTE)

These items are not negotiable in V1.

Architecture

 ❌ Do NOT change frontend stack (Next.js App Router)

 ❌ Do NOT change worker stack (Deno + Oak)

 ❌ Do NOT move logic between frontend and worker

 ❌ Do NOT refactor “for cleanliness”

 ❌ Do NOT consolidate services

 ❌ Do NOT “simplify” Supabase usage

Supabase Rules (Critical)

 ❌ Frontend must NEVER require Supabase at build time

 ❌ No getSupabaseServer() in frontend

 ❌ No Supabase imports in prerendered pages

 ❌ No SSR Supabase access

 ❌ No new Supabase env vars added to Vercel

Violation = broken production build

✅ ALLOWED CHANGES (SAFE ZONE)

These are explicitly allowed and encouraged.

UI / UX

 Copy edits

 Button text

 Headings

 Spacing / typography

 Colors

 Icons / illustrations

 Loading states

 Error message wording

Marketing & SEO

 Add new /marketing/* pages

 Edit existing marketing copy

 Improve CTAs

 Add internal links

 Add schema (FAQ / HowTo)

 Metadata (title, description)

Analytics (Client-Only)

 Page views

 Upload started

 Analysis visible

 Checkout started

 PDF downloaded

⚠️ Analytics must be:

Client-side only

Lazy-loaded

Zero SSR impact

🧪 WHAT TO TEST AFTER ANY CHANGE

Before deploying:

 npm run build passes locally

 /app/step-1-upload loads

 File upload works

 Redirect to step-3 works

 Analysis appears

 Checkout redirects correctly

 PDF downloads successfully

If any fail → stop and revert.

🛑 STOP CONDITIONS

Immediately stop work if:

You see supabaseUrl is required

Build fails during prerender

Vercel shows repeated failed deployments

You feel tempted to “just refactor one thing”

When in doubt → do nothing

🔁 DEPLOYMENT RULES

 One deploy per fix

 No rapid retries

 No guessing in production

 Fix locally first

 Green build = stop touching code

🧠 DECISION FILTER (USE THIS)

Before changing anything, ask:

“Does this increase conversions or clarity without touching architecture?”

If no → don’t do it
If maybe → defer
If yes → proceed carefully

🧾 ONE-LINE RULE (PRINT THIS)

V1 exists to prove demand, not engineering elegance.

---

## 🧠 DECISION CHECKLIST (BEFORE FIXING)

Ask:

- Does this stop users from paying?
- Does this break the funnel?
- Does this risk introducing new bugs?
- Can this wait one week?

If unsure → **DO NOT FIX**

---

## 🗂 BUG TRACKING PRACTICE

- Log bugs in plain text (Notion / GitHub issue / doc)
- Group by:
- Blocking
- Revenue
- Cosmetic
- Only Blocking + Revenue are actionable

---

## 🚦 ESCALATION RULE

If a bug requires:
- More than 30 minutes of thought
- More than 3 files
- Any architectural discussion

⛔ STOP  
⏸ Document it  
➡️ Defer to V2

---

## 🔒 CHANGE CONTROL

This policy may ONLY be modified if:
- V1 is generating revenue OR
- V2 planning has begun

Until then:
> **Stability > Cleverness**

---

## ✅ STATUS

- V1 is LIVE
- Stack is LOCKED
- Bugs are triaged, not chased

— SaveOnLease
