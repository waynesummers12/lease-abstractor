// worker/main.ts
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import ingestLeasePdfRoutes from "./routes/ingestLeasePdf.ts";
import checkoutRoutes from "./routes/checkout.ts"; // ✅ ADD THIS
import saveAuditRoutes from "./routes/saveAudit.ts";
import auditPdfRoutes from "./routes/auditPdf.ts";

const app = new Application();
const router = new Router();

const WORKER_KEY = Deno.env.get("LEASE_WORKER_KEY") ?? "";

/* -------------------- CORS -------------------- */
app.use(async (ctx, next) => {
  ctx.response.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Lease-Worker-Key"
  );

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
});

/* -------------------- AUTH (INGEST ONLY) -------------------- */
app.use(async (ctx, next) => {
  if (ctx.request.url.pathname.startsWith("/ingest")) {
    const key = ctx.request.headers.get("X-Lease-Worker-Key");
    if (!key || key !== WORKER_KEY) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }
  }
  await next();
});

/* -------------------- ROUTES -------------------- */
router.get("/", (ctx) => {
  ctx.response.body = "Lease Abstractor Worker Running";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(ingestLeasePdfRoutes.routes());
app.use(ingestLeasePdfRoutes.allowedMethods());

app.use(checkoutRoutes.routes());          // ✅ ADD THIS
app.use(checkoutRoutes.allowedMethods());  // ✅ ADD THIS

app.use(saveAuditRoutes.routes());
app.use(saveAuditRoutes.allowedMethods());

app.use(auditPdfRoutes.routes());
app.use(auditPdfRoutes.allowedMethods());

/* -------------------- LISTEN -------------------- */
const PORT = Number(Deno.env.get("PORT") ?? 8000);
console.log(`🚀 Lease Abstractor Worker running on http://localhost:${PORT}`);
await app.listen({ port: PORT });
