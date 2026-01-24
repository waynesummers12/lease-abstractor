// worker/main.ts
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import ingestLeasePdfRoutes from "./routes/ingestLeasePdf.ts";
import checkoutRoutes from "./routes/checkout.ts";
import auditPdfRoutes from "./routes/auditPdf.ts";
import latestAuditRoutes from "./routes/latestAudit.ts";
import auditsRoutes from "./routes/audits.ts";
import stripeWebhookRoutes from "./routes/stripeWebhook.ts";
import auditByIdRoutes from "./routes/auditById.ts";
import downloadAuditPdfRoutes from "./routes/downloadAuditPdf.ts";

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

/* -------------------- ROUTES -------------------- */
/**
 * Stripe webhook MUST be mounted early
 */
router.use(stripeWebhookRoutes.routes());
router.use(stripeWebhookRoutes.allowedMethods());

/**
 * Read-only audit APIs
 * IMPORTANT: auditById MUST come before latest
 */
router.use(auditByIdRoutes.routes());
router.use(auditByIdRoutes.allowedMethods());

router.use(latestAuditRoutes.routes());
router.use(latestAuditRoutes.allowedMethods());

router.use(auditsRoutes.routes());
router.use(auditsRoutes.allowedMethods());

/**
 * Mutating / generation routes
 */
router.use(ingestLeasePdfRoutes.routes());
router.use(ingestLeasePdfRoutes.allowedMethods());

router.use(checkoutRoutes.routes());
router.use(checkoutRoutes.allowedMethods());

router.use(auditPdfRoutes.routes());
router.use(auditPdfRoutes.allowedMethods());

/* -------------------- APP -------------------- */
app.use(router.routes());
app.use(router.allowedMethods());

app.use(downloadAuditPdfRoutes.routes());

/* -------------------- LISTEN -------------------- */
const PORT = Number(Deno.env.get("PORT") ?? 8000);
console.log(`🚀 Lease Abstractor Worker running on http://localhost:${PORT}`);
await app.listen({ port: PORT });
