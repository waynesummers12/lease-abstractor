// worker/main.ts
import { Application } from "npm:@oak/oak";
import Router from "npm:@oak/oak/router";

import stripeCheckoutRoutes from "./routes/checkout.ts";

const app = new Application();
const router = new Router();

const WORKER_KEY = Deno.env.get("LEASE_WORKER_KEY");

/* -------------------- MIDDLEWARE -------------------- */

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

  if (
    ctx.request.headers.get("x-lease-worker-key") !== WORKER_KEY &&
    ctx.request.url.pathname.startsWith("/checkout") === false
  ) {
    ctx.response.status = 401;
    ctx.response.body = "Unauthorized";
    return;
  }

  await next();
});

/* -------------------- ROUTES -------------------- */

router.get("/", (ctx) => {
  ctx.response.body = "Lease Abstractor Worker Running";
});

app.use(router.routes());
app.use(router.allowedMethods());

/* ---- STRIPE CHECKOUT ROUTES ---- */
app.use(stripeCheckoutRoutes.routes());
app.use(stripeCheckoutRoutes.allowedMethods());

/* -------------------- START SERVER -------------------- */

const PORT = 8000;
console.log(`🚀 Worker listening on http://localhost:${PORT}`);
await app.listen({ port: PORT });



