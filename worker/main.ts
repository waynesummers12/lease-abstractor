// worker/main.ts
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import stripeCheckoutRoutes from "./routes/checkout.ts";
import ingestLeasePdfRoutes from "./routes/ingestLeasePdf.ts";

const app = new Application();
const router = new Router();

const WORKER_KEY = Deno.env.get("LEASE_WORKER_KEY") ?? "";

/* -------------------- CORS + AUTH -------------------- */

app.use(async (ctx, next) => {
  ctx.response.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, x-lease-worker-key"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  // Stripe checkout is PUBLIC
  if (ctx.request.url.pathname.startsWith("/checkout")) {
    await next();
    return;
  }

  if (ctx.request.headers.get("x-lease-worker-key") !== WORKER_KEY) {
    ctx.response.status = 401;
    ctx.response.body = "Unauthorized";
    return;
  }

  await next();
});

/* -------------------- BASE ROUTE -------------------- */

router.get("/", (ctx) => {
  ctx.response.body = "Lease Abstractor Worker Running";
});

/* -------------------- ROUTES -------------------- */
app.use(ingestLeasePdfRoutes.routes());
app.use(ingestLeasePdfRoutes.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(stripeCheckoutRoutes.routes());
app.use(stripeCheckoutRoutes.allowedMethods());

/* -------------------- START -------------------- */

const PORT = 8000;
console.log(`🚀 Worker listening on http://localhost:${PORT}`);
await app.listen({ port: PORT });
