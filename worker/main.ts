import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import stripeWebhookRouter from "./routes/stripeWebhook.ts";

import auditByIdRoutes from "./routes/auditById.ts";
import latestAuditRoutes from "./routes/latestAudit.ts";
import auditsRoutes from "./routes/audits.ts";
import checkoutRoutes from "./routes/checkout.ts";
import ingestLeasePdfRoutes from "./routes/ingestLeasePdf.ts";
import auditPdfRoutes from "./routes/auditPdf.ts";

import { downloadAuditPdf } from "./routes/downloadAuditPdf.ts";

const app = new Application();

/* -------------------------------------------------
   STRIPE WEBHOOK
   MUST be registered BEFORE any body/CORS middleware
-------------------------------------------------- */
app.use(stripeWebhookRouter.routes());
app.use(stripeWebhookRouter.allowedMethods());

/* -------------------------------------------------
   CORS / COMMON MIDDLEWARE
-------------------------------------------------- */
app.use(async (ctx, next) => {
  const origin = ctx.request.headers.get("origin");

  if (origin === "http://localhost:3000") {
    ctx.response.headers.set("Access-Control-Allow-Origin", origin);
  }

  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Lease-Worker-Key, X-Worker-Key, x-worker-key, stripe-signature"
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

app.use(async (ctx, next) => {
  console.log(
    "🔥 Incoming:",
    ctx.request.method,
    ctx.request.url.pathname
  );
  await next();
});

/* -------------------------------------------------
   DOWNLOAD AUDIT PDF (HANDLER ROUTE)
-------------------------------------------------- */
const downloadRouter = new Router();
downloadRouter.get("/downloadAuditPdf/:auditId", downloadAuditPdf);

app.use(downloadRouter.routes());
app.use(downloadRouter.allowedMethods());

/* -------------------------------------------------
   NORMAL API ROUTES
-------------------------------------------------- */
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
