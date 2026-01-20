// worker/main.ts
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import ingestLeasePdfRoutes from "./routes/ingestLeasePdf.ts";
import checkoutRoutes from "./routes/checkout.ts";
import auditPdfRoutes from "./routes/auditPdf.ts";
import latestAuditRoutes from "./routes/latestAudit.ts";
import auditsRoutes from "./routes/audits.ts";

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

/* -------------------- ROUTES -------------------- */
router.get("/", (ctx) => {
  ctx.response.body = "Lease Abstractor Worker Running";
});

router.use(latestAuditRoutes.routes());
router.use(auditsRoutes.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(ingestLeasePdfRoutes.routes());
app.use(ingestLeasePdfRoutes.allowedMethods());

app.use(checkoutRoutes.routes());
app.use(checkoutRoutes.allowedMethods());

app.use(auditPdfRoutes.routes());
app.use(auditPdfRoutes.allowedMethods());

/* -------------------- LISTEN -------------------- */
const PORT = Number(Deno.env.get("PORT") ?? 8000);
console.log(`🚀 Lease Abstractor Worker running on http://localhost:${PORT}`);
await app.listen({ port: PORT });

