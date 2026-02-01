# 🚫 DO_NOT_TOUCH — SaveOnLease V1 (LOCKED)

This repository contains **SaveOnLease V1**, a production-live SaaS.

The system has been deployed, validated end-to-end, and intentionally stabilized
after multiple architecture iterations.

---

## 🔒 ARCHITECTURE IS LOCKED

Unless you are explicitly instructed by the founder, **DO NOT**:

- Refactor folder structure
- Rename routes, pages, or APIs
- Introduce new frameworks, ORMs, or services
- Replace Supabase, Stripe, Oak, Next.js, or Render
- “Clean up” code that is already working
- Re-architect ingestion, billing, or download flows
- Move logic between `web/` and `worker/`
- Change environment variable strategy
- Add background jobs, queues, or workers
- Convert pages to different rendering strategies

**Stability > elegance at this stage.**

---

## ✅ WHAT IS ALLOWED

You MAY work on:

- Marketing pages (`/marketing/*`)
- Copy changes
- Styling / UI polish
- SEO improvements
- Content pages
- Text, labels, and UX clarity
- Analytics (post-V1 approval)
- Bug fixes **only if scoped, isolated, and approved**

If unsure → **ask first**.

---

## 🧠 WHY THIS EXISTS

This system went through **multiple deployment paths** and edge-case failures.
The current version is the result of hard-won fixes across:

- Next.js App Router
- Client/server boundaries
- Supabase build-time constraints
- Stripe webhooks
- PDF generation + download flow
- Worker ingestion timing
- Vercel prerendering behavior

Small changes can easily break:
- Production builds
- Checkout → PDF delivery
- Vercel deployments
- Client-side navigation

---

## 📚 REQUIRED READING (BEFORE ANY WORK)

1. `ENGINEER_HANDOFF.md`
2. `V1_LOCKED_CHECKLIST.md`

If you have not read those files, **do not make changes**.

---

## 🛑 FINAL RULE

If your change is not **strictly necessary**, **don’t make it**.

When in doubt:
> Preserve behavior. Ship polish. Avoid cleverness.

— SaveOnLease Founder
