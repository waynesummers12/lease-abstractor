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
import portfolioLeasesRoutes from "./routes/portfolioleases.ts";
import portfolioBoardPdfRoutes from "./routes/portfolioBoardPdf.ts";

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
      "X-Audit-Capability",
    ],
  })
);

// Report routes are callable only by the web server after it checks audit access.
app.use(async (ctx, next) => {
  const path = ctx.request.url.pathname;
  if (ctx.request.method === "GET" && ["/audits", "/audit/latest", "/api/audits/latest"].includes(path)) {
    ctx.response.status = 403;
    ctx.response.body = { error: "Use your account to view audits" };
    return;
  }
  const protectedRoute = path.startsWith("/auditById/") ||
    path.startsWith("/downloadAuditPdf/") ||
    (path === "/audits" && ctx.request.method === "POST") ||
    path === "/checkout/create" || path === "/audit/generate-pdf";
  if (protectedRoute) {
    const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!secret) {
      ctx.response.status = 503;
      return;
    }
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signed = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(`worker:${ctx.request.method}:${path}`)));
    const expected = Array.from(signed, (byte) => byte.toString(16).padStart(2, "0")).join("");
    const supplied = ctx.request.headers.get("X-Audit-Proxy-Proof") ?? "";
    let difference = expected.length ^ supplied.length;
    for (let index = 0; index < expected.length; index++) difference |= expected.charCodeAt(index) ^ (supplied.charCodeAt(index) || 0);
    if (difference !== 0) {
      ctx.response.status = 403;
      ctx.response.body = { error: "Access denied" };
      return;
    }
  }
  await next();
});

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

app.use(portfolioLeasesRoutes.routes());
app.use(portfolioLeasesRoutes.allowedMethods());

app.use(portfolioBoardPdfRoutes.routes());
app.use(portfolioBoardPdfRoutes.allowedMethods());

/* -------------------------------------------------
   START SERVER
-------------------------------------------------- */
const port = Number(Deno.env.get("PORT") ?? 8000);
console.log(`🚀 Lease Abstractor Worker running on port ${port}`);
await app.listen({ port });
