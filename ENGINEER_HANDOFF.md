Engineer Handoff — SaveOnLease (Lease Abstractor) V1

⚠️ This system is production-live. Do NOT refactor, rename folders,
or change architecture without explicit founder approval.

Read this document in full before touching any code.
This system has already been deployed successfully multiple times.
The current version is locked as V1.

Project Status

Product: SaveOnLease (Lease Abstractor)

Environment: Production

Hosting:

Frontend: Vercel

Worker: Render

Database/Storage: Supabase

Phase: Polish, SEO, and conversion optimization only

No architectural changes are permitted in V1.

What This Product Does (Scope)

SaveOnLease analyzes commercial lease PDFs to identify CAM / NNN overcharges and produces a paid audit PDF.

Core Flow (Do Not Modify)

User uploads lease PDF

Audit record is created

Lease is ingested and analyzed by worker

User sees estimated avoidable exposure

User pays

User downloads audit PDF

If a change does not support this exact flow, it is out of scope.

Architecture (Locked)
Frontend

Next.js (App Router)

Deployed on Vercel

Uses dynamic rendering where required

Frontend must never access Supabase during SSR or build

Worker

Deno + Oak

Deployed on Render

Handles:

PDF ingestion

Lease parsing

Analysis

PDF generation

Supabase service-role access

Supabase

Tables:

lease_audits

Storage buckets:

audit-pdfs

Only the worker uses Supabase service role

🚨 Critical Rule (Most Important)
❌ Supabase + Vercel SSR Is Forbidden

Any Supabase usage during frontend build or server rendering will break production builds.

Previously observed failure:

Error: supabaseUrl is required
Error occurred prerendering page "/app/step-1-upload"

Therefore:

❌ Not Allowed

getSupabaseServer() in frontend routes

Supabase imports in pages rendered at build time

Reading SUPABASE_URL during SSR

“Refactoring” Supabase access into frontend

✅ Allowed

Frontend calling internal API routes

Frontend sending files directly to worker

Worker using Supabase service role

Client-only runtime logic

Violating this rule will break Vercel builds.

Authoritative Upload Flow (V1)
/app/step-1-upload/page.tsx

Client-only page

export const dynamic = "force-dynamic"

No Supabase usage

Behavior:

Generate auditId

POST /api/audits to create audit row

Send file + auditId directly to worker:

POST {WORKER_URL}/ingest/lease/pdf


Redirect to /app/step-3-review?auditId=...

/api/audits

Lightweight Next.js API route

Creates or fetches audit metadata

Must not initialize Supabase server-side in frontend

Worker

Receives lease PDF

Stores file

Runs lease analysis

Persists results

Generates PDF after payment

Environment Variables
Frontend (Vercel)
NEXT_PUBLIC_WORKER_URL
NEXT_PUBLIC_WORKER_KEY


⚠️ Supabase variables must not be required at build time.

Worker (Render)
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY

What You Are Allowed to Change
✅ Allowed

Marketing copy

SEO pages (static)

UI polish (spacing, fonts, colors)

Button text and CTA wording

Client-side analytics

PDF layout and styling (worker-side)

❌ Not Allowed

Upload architecture

API route contracts

Supabase access patterns

Worker responsibilities

Payment flow

Ingestion pipeline

“Cleanup” refactors

Analytics (Optional, Later)

Analytics must be client-side only.

Recommended events:

Upload started

Upload completed

Analysis visible

Checkout started

PDF downloaded

Analytics must not introduce SSR dependencies.

Debugging Rules

If a build fails:

Look for Supabase being imported or initialized

Check SSR / prerender logs

Verify no environment variables are required during build

Do not add more environment variables to Vercel

If uncertain, stop and escalate.

Deployment Rules

Do not redeploy repeatedly

Do not experiment in production

Fix locally, then deploy once

Green build = stop touching code

Mental Model

Frontend = dumb, dynamic, safe

Worker = does the real work

Supabase = worker-only

If it builds green, don’t touch it

One-Sentence Summary for New Engineers

“This system is already live and working. Do not change architecture. Do not touch Supabase in frontend SSR. Only make UI, SEO, or content changes.”