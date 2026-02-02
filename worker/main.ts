import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import stripeWebhookRouter from "./routes/stripeWebhook.ts";

import auditByIdRoutes from "./routes/auditById.ts";
import latestAuditRoutes from "./routes/latestAudit.ts";
import auditsRoutes from "./routes/audits.ts";
import checkoutRoutes from "./routes/checkout.ts";
import ingestLeasePdfRoutes from "./routes/ingestLeasePdf.ts";
import auditPdfRoutes from "./routes/auditPdf.ts";
import downloadAuditPdfRoutes from "./routes/downloadAuditPdf.ts";

const app = new Application();

/* -------------------------------------------------
   STRIPE WEBHOOK
   MUST be registered BEFORE CORS / body parsing
-------------------------------------------------- */
app.use(stripeWebhookRouter.routes());
app.use(stripeWebhookRouter.allowedMethods());

/* -------------------------------------------------
   CORS (REQUIRED FOR VERCEL → RENDER)
-------------------------------------------------- */
app.use(async (ctx, next) => {
  const origin = ctx.request.headers.get("origin");

  const allowedOrigins = [
    "http://localhost:3000",
    "https://lease-abstractor-livid.vercel.app",
    "https://saveonlease.com",
    "https://www.saveonlease.com",
  ];

  if (origin && allowedOrigins.includes(origin)) {
    ctx.response.headers.set("Access-Control-Allow-Origin", origin);
  }

  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Lease-Worker-Key, stripe-signature"
  );

  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
});

/* -------------------------------------------------
   NORMAL API ROUTES
-------------------------------------------------- */
app.use(downloadAuditPdfRoutes.routes());
app.use(downloadAuditPdfRoutes.allowedMethods());

app.use(auditByIdRoutes.routes());
app.use(auditByIdRoutes.allowedMethods());

app.use(latestAuditRoutes.routes());
app.use(latestAuditRoutes.allowedMethods());

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
