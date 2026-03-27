import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

interface PortfolioLease {
  property_name?: string;
  lease_type?: string;
  renewal_date?: string;
  estimated_exposure?: number;
  diffDays?: number;
}

interface PortfolioRequest {
  leases: PortfolioLease[];
  totalExposure: number;
  riskBuckets: {
    critical: number;
    watch: number;
    safe: number;
  };
  companyName: string;
  confidential: boolean;
}

const router = new Router();

router.post("/portfolio-board-pdf", async (ctx) => {
  try {
    const body = await ctx.request.body({ type: "json" }).value as PortfolioRequest;

    const {
      leases = [],
      totalExposure = 0,
      riskBuckets = { critical: 0, watch: 0, safe: 0 },
      companyName = "SaveOnLease Client",
      confidential = false,
    } = body;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // Landscape A4

    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Dark executive background
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

    // Executive narrative
    const narrative = `As of ${new Date().toLocaleDateString()}, the portfolio includes ${leases.length} active leases. ${riskBuckets.critical} leases require immediate attention within 90 days. Total modeled exposure across the portfolio is $${Number(totalExposure).toLocaleString()}.`;

    page.drawText(narrative, {
      x: 40,
      y: height - 120,
      size: 11,
      font,
      color: rgb(0.85, 0.9, 1),
      maxWidth: width - 80,
      lineHeight: 14,
    });

    // KPI section
    page.drawText(`Total Leases: ${leases.length}`, {
      x: 40,
      y: height - 170,
      size: 14,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    page.drawText(`Critical (<90 days): ${riskBuckets.critical}`, {
      x: 40,
      y: height - 195,
      size: 14,
      font,
      color: rgb(1, 0.4, 0.4),
    });

    page.drawText(`Total Exposure: $${Number(totalExposure).toLocaleString()}`, {
      x: 40,
      y: height - 220,
      size: 14,
      font,
      color: rgb(0.6, 0.9, 1),
    });

    // Exposure-weighted 12 month forecast
    const now = new Date();
    const monthlyExposure = Array(12).fill(0);

    leases.forEach((lease) => {
      if (!lease.renewal_date) return;

      const renewal = new Date(lease.renewal_date);
      const diffMonths =
        (renewal.getFullYear() - now.getFullYear()) * 12 +
        (renewal.getMonth() - now.getMonth());

      if (diffMonths >= 0 && diffMonths < 12) {
        monthlyExposure[diffMonths] += lease.estimated_exposure ?? 0;
      }
    });

    const maxExposure = Math.max(...monthlyExposure, 1);
    const chartBaseY = height - 360;

    page.drawText("12-Month Exposure Forecast", {
      x: 40,
      y: chartBaseY + 150,
      size: 12,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    monthlyExposure.forEach((value, i) => {
      const barHeight = (value / maxExposure) * 120;

      page.drawRectangle({
        x: 40 + i * 55,
        y: chartBaseY,
        width: 35,
        height: barHeight,
        color: rgb(0.4, 0.65, 1),
      });
    });

    // Confidential watermark
    if (confidential) {
      page.drawText("CONFIDENTIAL", {
        x: width / 2 - 150,
        y: height / 2,
        size: 60,
        font: boldFont,
        color: rgb(1, 1, 1),
        opacity: 0.05,
      });
    }

    // Footer
    page.drawText(`Generated ${new Date().toLocaleString()}`, {
      x: 40,
      y: 30,
      size: 8,
      font,
      color: rgb(0.7, 0.8, 0.95),
    });

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

export default router;