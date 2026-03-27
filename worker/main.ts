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

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

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

app.use(portfolioLeasesRoutes.routes());
app.use(portfolioLeasesRoutes.allowedMethods());

/* -------------------------------------------------
   PORTFOLIO BOARD PDF (INSTITUTIONAL ENGINE)
-------------------------------------------------- */

const portfolioBoardRouter = new Router();

portfolioBoardRouter.post("/portfolio-board-pdf", async (ctx) => {
  try {
    const body = await ctx.request.body({ type: "json" }).value;

    const {
      leases = [],
      totalExposure = 0,
      riskBuckets = { critical: 0, watch: 0, safe: 0 },
      companyName = "SaveOnLease Client",
      confidential = false,
    } = body;

    interface PortfolioLease {
      renewal_date?: string;
      estimated_exposure?: number;
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // Landscape A4

    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Dark background
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.06, 0.09, 0.16),
    });

    // Header
    page.drawText(companyName, {
      x: 40,
      y: height - 60,
      size: 22,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    page.drawText("Institutional Lease Risk Report", {
      x: 40,
      y: height - 85,
      size: 12,
      font,
      color: rgb(0.7, 0.8, 0.95),
    });

    // KPIs
    page.drawText(`Total Leases: ${leases.length}`, {
      x: 40,
      y: height - 140,
      size: 14,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    page.drawText(`Critical (<90 days): ${riskBuckets.critical}`, {
      x: 40,
      y: height - 165,
      size: 14,
      font,
      color: rgb(1, 0.4, 0.4),
    });

    page.drawText(`Total Exposure: $${Number(totalExposure).toLocaleString()}`, {
      x: 40,
      y: height - 190,
      size: 14,
      font,
      color: rgb(0.6, 0.9, 1),
    });

    // Exposure-weighted renewal bars
    const now = new Date();
    const monthlyExposure = Array(12).fill(0);

    (leases as PortfolioLease[]).forEach((l) => {
      if (!l.renewal_date) return;
      const diffMonths =
        (new Date(l.renewal_date).getFullYear() - now.getFullYear()) * 12 +
        (new Date(l.renewal_date).getMonth() - now.getMonth());

      if (diffMonths >= 0 && diffMonths < 12) {
        monthlyExposure[diffMonths] += l.estimated_exposure || 0;
      }
    });

    const maxExposure = Math.max(...monthlyExposure, 1);

    const chartBaseY = height - 260;

    monthlyExposure.forEach((value, i) => {
      const barHeight = (value / maxExposure) * 120;

      page.drawRectangle({
        x: 40 + i * 50,
        y: chartBaseY,
        width: 30,
        height: barHeight,
        color: rgb(0.4, 0.65, 1),
      });
    });

    page.drawText("12-Month Exposure Forecast", {
      x: 40,
      y: chartBaseY + 140,
      size: 12,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    // Confidential watermark
    if (confidential) {
      page.drawText("CONFIDENTIAL", {
        x: width / 2 - 120,
        y: height / 2,
        size: 60,
        font: boldFont,
        color: rgb(1, 1, 1),
        opacity: 0.05,
      });
    }

    const pdfBytes = await pdfDoc.save();

    ctx.response.status = 200;
    ctx.response.headers.set("Content-Type", "application/pdf");
    ctx.response.headers.set(
      "Content-Disposition",
      `attachment; filename="portfolio_board_report.pdf"`
    );
    ctx.response.body = pdfBytes;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to generate portfolio PDF" };
  }
});

app.use(portfolioBoardRouter.routes());
app.use(portfolioBoardRouter.allowedMethods());

/* -------------------------------------------------
   START SERVER
-------------------------------------------------- */
const port = Number(Deno.env.get("PORT") ?? 8000);
console.log(`🚀 Lease Abstractor Worker running on port ${port}`);
await app.listen({ port });
