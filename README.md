SaveOnLease (Lease Abstractor) — V1

Status: ✅ Production Deployed
Stack: 🔒 Locked (Do Not Change)
Phase: Polish, SEO, and Conversion Only

Overview

SaveOnLease is a tenant-first SaaS that analyzes commercial lease PDFs to identify CAM / NNN overcharges and audit exposure.

The product is intentionally narrow and optimized for a single outcome:

Upload a lease → see avoidable exposure → pay → download audit PDF

This flow is complete, deployed, and working in production.

Core User Flow (V1)

User uploads a commercial lease PDF

System creates an audit record

Lease is ingested and analyzed by a worker

User sees a green summary box with estimated avoidable exposure

User completes payment

User downloads a generated audit PDF

Nothing outside this flow is in scope for V1.

Architecture (Locked)

⚠️ DO NOT re-architect. DO NOT refactor. DO NOT “clean up.”
This system has already been deployed multiple times; this version is the V1 baseline.

Frontend

Next.js (App Router)

Hosted on Vercel

Uses force-dynamic where required

Frontend never accesses Supabase during build or SSR

Backend / Worker

Deno + Oak

Hosted on Render

Responsible for:

PDF ingestion

Lease parsing

Analysis

Audit PDF generation

Worker owns all Supabase service-role access

Database / Storage

Supabase

Used for:

lease_audits table

audit-pdfs storage bucket

Frontend does not initialize Supabase server-side

🚨 Critical Constraint (Read This)
Supabase + Vercel Build Rule

Any Supabase import or initialization during SSR WILL break Vercel builds.

Symptoms previously seen:

Error: supabaseUrl is required
Error occurred prerendering page "/app/step-1-upload"

Therefore:

❌ Not Allowed

getSupabaseServer() in frontend routes

Supabase imports in pages rendered at build time

Accessing process.env.SUPABASE_URL during SSR

✅ Allowed

Frontend calling its own API routes (/api/audits)

Frontend sending files directly to the worker

Worker using Supabase service role

Client-only, runtime-only logic

This rule is non-negotiable.

Upload Flow (Authoritative V1 Behavior)
/app/step-1-upload/page.tsx

Client-only

export const dynamic = "force-dynamic"

No Supabase usage

Flow:

Generate auditId

POST /api/audits → create audit row

Send file + auditId directly to worker:

POST {WORKER_URL}/ingest/lease/pdf


Redirect to /app/step-3-review?auditId=...

/api/audits

Lightweight API route

Creates / fetches audit metadata only

No Supabase server client used during frontend build

Worker

Receives lease PDF

Stores file

Runs analysis

Persists results

Generates audit PDF after payment

Deployment Status

✅ Vercel production build is green

✅ Multiple successful redeploys

✅ No active build errors

✅ Current deployment is the canonical version

If something breaks:

Do not redeploy blindly

Do not refactor

Investigate SSR touching Supabase

What Is Allowed From Here On Out
✅ Allowed

Marketing copy edits

SEO pages (static content only)

UI polish (spacing, typography, colors)

Button text changes

Client-side analytics

PDF formatting improvements (worker-side)

❌ Not Allowed

Changing upload architecture

Moving Supabase into frontend SSR

Replacing the worker

Refactoring API routes

Changing payment flow

Reworking ingestion logic

Analytics (Future)

Analytics may be added client-side only.

Potential options:

Vercel Analytics

PostHog

Plausible

Suggested events:

Upload started

Upload completed

Analysis displayed

Checkout started

PDF downloaded

No backend changes required for V1 analytics.

Mental Model

Vercel = fragile at build time

Worker = does the real work

Frontend = dumb, dynamic, safe

If it builds green, don’t touch it

Current Phase

Phase: V1 Polish & Launch

Focus is now on:

Trust

Clarity

Conversion

SEO

Stack experimentation is finished.

One-Line Instruction for Any Engineer

“This system is already deployed and working. Do not change architecture. Do not touch Supabase in frontend SSR. Only make UI, content, or SEO changes.”

⚠️ This repo contains a production-live SaaS.
Read DO_NOT_TOUCH.md and ENGINEER_HANDOFF.md before making changes.