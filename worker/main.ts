import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import stripeWebhookRouter from "./routes/stripeWebhook.ts";
import checklistLeads from "./routes/checklistLeads.ts";
import auditByIdRoutes from "./routes/auditById.ts";
import latestAuditRoutes from "./routes/latestAudit.ts";
import auditsRoutes from "./routes/audits.ts";
import checkoutRoutes from "./routes/checkout.ts";
import ingestLeasePdfRoutes from "./routes/ingestLeasePdf.ts";
import auditPdfRoutes from "./routes/auditPdf.ts";
import downloadAuditPdfRoutes from "./routes/downloadAuditPdf.ts";

const app = new Application();

/* -------------------------------------------------
   STRIPE WEBHOOK (FIRST, NO CORS/BODY TOUCHING)
-------------------------------------------------- */
app.use(stripeWebhookRouter.routes());
app.use(stripeWebhookRouter.allowedMethods());

/* -------------------------------------------------
   CORS (SINGLE SOURCE OF TRUTH)
-------------------------------------------------- */
app.use(
  oakCors({
    origin: [
      "https://lease-abstractor-livid.vercel.app",
      "https://saveonlease.com",
      "https://www.saveonlease.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Lease-Worker-Key",
    ],
  })
);

/* -------------------------------------------------
   ROUTES
-------------------------------------------------- */
app.use(downloadAuditPdfRoutes.routes());
app.use(downloadAuditPdfRoutes.allowedMethods());

app.use(auditByIdRoutes.routes());
app.use(auditByIdRoutes.allowedMethods());

app.use(latestAuditRoutes.routes());
app.use(latestAuditRoutes.allowedMethods());

app.use(checklistLeads.routes());
app.use(checklistLeads.allowedMethods());

app.use(auditsRoutes.routes());
app.use(auditsRoutes.allowedMethods());

app.use(ingestLeasePdfRoutes.routes());
app.use(ingestLeasePdfRoutes.allowedMethods());

app.use(checkoutRoutes.routes());
app.use(checkoutRoutes.allowedMethods());

app.use(auditPdfRoutes.routes());
app.use(auditPdfRoutes.allowedMethods());

/* -------------------------------------------------
   START SERVER
-------------------------------------------------- */
const port = Number(Deno.env.get("PORT") ?? 8000);
console.log(`🚀 Lease Abstractor Worker running on port ${port}`);
await app.listen({ port });
