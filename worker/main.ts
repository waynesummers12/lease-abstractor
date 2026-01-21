// worker/main.ts
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import ingestLeasePdfRoutes from "./routes/ingestLeasePdf.ts";
import checkoutRoutes from "./routes/checkout.ts";
import auditPdfRoutes from "./routes/auditPdf.ts";
import latestAuditRoutes from "./routes/latestAudit.ts";
import auditsRoutes from "./routes/audits.ts";
import stripeWebhookRoutes from "./routes/stripeWebhook.ts";
import auditByIdRoutes from "./routes/auditById.ts";

const app = new Application();
const router = new Router();

/* -------------------- CORS -------------------- */
app.use(async (ctx, next) => {
  const origin = ctx.request.headers.get("origin");

  if (origin === "http://localhost:3000") {
    ctx.response.headers.set("Access-Control-Allow-Origin", origin);
  }

  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    [
      "Content-Type",
      "X-Lease-Worker-Key",
      "x-lease-worker-key",
    ].join(", ")
  );

  ctx.response.headers.set("Access-Control-Allow-Credentials", "true");

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
});

/* -------------------- HEALTH -------------------- */
router.get("/", (ctx) => {
  ctx.response.body = "Lease Abstractor Worker Running";
});

app.use(router.routes());
app.use(router.allowedMethods());

/* -------------------- ROUTES -------------------- */
/**
 * Stripe webhook MUST be mounted early
 */
app.use(stripeWebhookRoutes.routes());
app.use(stripeWebhookRoutes.allowedMethods());

/**
 * Read-only audit APIs
 */
app.use(latestAuditRoutes.routes());
app.use(latestAuditRoutes.allowedMethods());

app.use(auditsRoutes.routes());
app.use(auditsRoutes.allowedMethods());

/**
 * Mutating / generation routes
 */
app.use(ingestLeasePdfRoutes.routes());
app.use(ingestLeasePdfRoutes.allowedMethods());

app.use(checkoutRoutes.routes());
app.use(checkoutRoutes.allowedMethods());

app.use(auditPdfRoutes.routes());
app.use(auditPdfRoutes.allowedMethods());

router.use(auditByIdRoutes.routes());


/* -------------------- LISTEN -------------------- */
const PORT = Number(Deno.env.get("PORT") ?? 8000);
console.log(`🚀 Lease Abstractor Worker running on http://localhost:${PORT}`);
await app.listen({ port: PORT });
