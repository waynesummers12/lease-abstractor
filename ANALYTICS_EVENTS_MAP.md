# 📊 ANALYTICS_EVENTS_MAP — SaveOnLease V1

This document defines **what events should be tracked**, **when**, and **why**
for SaveOnLease.

⚠️ This is a **tracking specification only**.
It does NOT authorize architectural changes.

---

## 🎯 ANALYTICS GOALS (V1)

Primary goals:

1. Understand funnel drop-off
2. Validate user intent & traction
3. Measure conversion from upload → payment → PDF
4. Inform SEO & marketing decisions
5. Enable ROI-driven iteration (not vanity metrics)

---

## 🚦 GLOBAL RULES

- Analytics must be **non-blocking**
- Analytics must **never break core flows**
- No tracking may alter business logic
- No tracking may delay navigation or uploads
- No PII unless explicitly approved
- No Supabase queries for analytics

---

## 🧭 USER FUNNEL OVERVIEW

Landing → Upload → Analysis → Checkout → Payment → PDF Download


---

## 🧩 CORE EVENTS

### 1️⃣ Page Views

| Event Name | Trigger | Properties |
|-----------|--------|------------|
| `page_view` | Any page load | `path`, `referrer`, `utm_*` |

---

### 2️⃣ Upload Funnel

#### Upload Page Loaded
```json
{
  "event": "upload_page_viewed",
  "properties": {
    "source": "direct | marketing",
    "path": "/app/step-1-upload"
  }
}

File Selected
{
  "event": "lease_file_selected",
  "properties": {
    "file_type": "pdf",
    "file_size_kb": "<number>"
  }
}

Upload Started
{
  "event": "lease_upload_started",
  "properties": {
    "audit_id": "<uuid>"
  }
}

Upload Failed
{
  "event": "lease_upload_failed",
  "properties": {
    "audit_id": "<uuid>",
    "error": "<string>"
  }
}

3️⃣ Analysis Phase
Analysis Polling Started
{
  "event": "analysis_polling_started",
  "properties": {
    "audit_id": "<uuid>"
  }
}

Analysis Completed
{
  "event": "analysis_completed",
  "properties": {
    "audit_id": "<uuid>",
    "risk_level": "low | medium | high",
    "has_avoidable_exposure": true
  }
}

4️⃣ Checkout Funnel
Checkout Initiated
{
  "event": "checkout_started",
  "properties": {
    "audit_id": "<uuid>",
    "price": "<amount>"
  }
}

Checkout Abandoned
{
  "event": "checkout_abandoned",
  "properties": {
    "audit_id": "<uuid>"
  }
}

5️⃣ Payment & Delivery
Payment Completed
{
  "event": "payment_completed",
  "properties": {
    "audit_id": "<uuid>",
    "amount": "<amount>"
  }
}

PDF Generated
{
  "event": "audit_pdf_generated",
  "properties": {
    "audit_id": "<uuid>"
  }
}

PDF Downloaded
{
  "event": "audit_pdf_downloaded",
  "properties": {
    "audit_id": "<uuid>",
    "location": "success_page | dashboard"
  }
}

🧠 MARKETING & SEO EVENTS
CTA Clicks
{
  "event": "cta_clicked",
  "properties": {
    "cta_text": "Start Audit",
    "page": "/marketing/pricing"
  }
}

Pricing Page Viewed
{
  "event": "pricing_viewed"
}

🚫 EXPLICITLY NOT TRACKED (V1)

Lease content

Tenant names

Dollar values beyond buckets

PDF contents

Supabase row-level data

Stripe card or customer details

🛠 IMPLEMENTATION NOTES

Prefer client-side tracking only

Fire-and-forget events

Wrap all analytics calls in try/catch

Feature-flag analytics if needed

Analytics code should live in:

lib/analytics/ (future)

NOT inside core logic

🔒 CHANGE CONTROL

Any new event requires:

Updating this document

Explicit approval

No breaking changes

✅ STATUS

Documented ✔

Not yet implemented ✔

Safe to ship V1 without analytics ✔

— SaveOnLease


---

## 🛠 How to add it

From repo root:

```bash
cd lease-abstractor
touch ANALYTICS_EVENTS_MAP.md
code ANALYTICS_EVENTS_MAP.md