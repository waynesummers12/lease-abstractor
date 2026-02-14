import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

import { drawHero } from "./pdf/components/Hero.ts";
import { drawSummaryTable as _drawSummaryTable } from "./pdf/components/SummaryTable.ts";
import { drawCallout as _drawCallout } from "./pdf/components/Callout.ts";
import { drawExplanationBox } from "./pdf/components/ExplanationBox.ts";
import { drawBottomLine } from "./pdf/components/BottomLine.ts";

import { PAGE, CONTENT, SPACING } from "./pdf/layout.ts";
import {
  FONT_SIZES,
  COLORS,
  drawHeading,
  drawParagraph,
} from "./pdf/typography.ts";

/* -------------------------------------------------
   Types
-------------------------------------------------- */

type ExposureRange = {
  low: number;
  high: number;
};

type Rollup = {
  camEscalation: { low: number; high: number };
  capitalItems: { low: number; high: number };
  managementFees: { low: number; high: number };
};

type AuditAnalysis = {
  tenant: string | null;
  landlord: string | null;
  audit_id?: string | null;
  exposureRange: ExposureRange;
  rollup: Rollup;
};

/* -------------------------------------------------
   Helpers
-------------------------------------------------- */

function currency(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

function _estimateLines(text: string, charsPerLine = 90) {
  return Math.ceil(text.length / charsPerLine);
}

function computeLeaseHealthScore(analysis: AuditAnalysis) {
  const { rollup } = analysis;

  const total =
    rollup.camEscalation.high +
    rollup.capitalItems.high +
    rollup.managementFees.high;

  if (total === 0) {
    return {
      score: 85,
      breakdown: {
        capProtection: 80,
        allocationClarity: 85,
        feeDiscipline: 90,
        costPredictability: 85,
      },
    };
  }

  const capProtection = Math.max(
    40,
    100 - Math.min(rollup.camEscalation.high / 1000, 60)
  );

  const allocationClarity = Math.max(
    35,
    100 - Math.min(rollup.capitalItems.high / 1000, 65)
  );

  const feeDiscipline = Math.max(
    50,
    100 - Math.min(rollup.managementFees.high / 1000, 50)
  );

  const costPredictability = Math.round(
    (capProtection + allocationClarity + feeDiscipline) / 3
  );

  const overall = Math.round(
    (capProtection +
      allocationClarity +
      feeDiscipline +
      costPredictability) /
      4
  );

  return {
    score: overall,
    breakdown: {
      capProtection: Math.round(capProtection),
      allocationClarity: Math.round(allocationClarity),
      feeDiscipline: Math.round(feeDiscipline),
      costPredictability,
    },
  };
}

function createPage(pdfDoc: PDFDocument) {
  const page = pdfDoc.addPage();
  const { height } = page.getSize();
  // Start content lower to avoid header overlap
  return { page, y: height - PAGE.margin - 40 };
}

function drawHeader(
  page: import("npm:pdf-lib@1.17.1").PDFPage,
  analysis: AuditAnalysis,
  font: import("npm:pdf-lib@1.17.1").PDFFont
) {
  const { width, height } = page.getSize();

  const headerText = `Tenant: ${analysis.tenant ?? "N/A"}   |   Landlord: ${
    analysis.landlord ?? "N/A"
  }`;

  page.drawText(headerText, {
    x: PAGE.margin,
    y: height - 28,
    size: 9,
    font,
    color: COLORS.subtle,
    maxWidth: width - PAGE.margin * 2,
  });

  page.drawLine({
    start: { x: PAGE.margin, y: height - 34 },
    end: { x: width - PAGE.margin, y: height - 34 },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.85),
  });
}

function drawFooter(
  page: import("npm:pdf-lib@1.17.1").PDFPage,
  auditId: string,
  font: import("npm:pdf-lib@1.17.1").PDFFont
) {
  const { width } = page.getSize();

  page.drawText(
    `Prepared by SaveOnLease • ${new Date().toLocaleDateString()} • Audit ID: ${auditId}`,
    {
      x: PAGE.margin,
      y: PAGE.bottom - 20,
      size: 8,
      font,
      color: COLORS.subtle,
      maxWidth: width - PAGE.margin * 2,
    }
  );
}

/* -------------------------------------------------
   Main
-------------------------------------------------- */

export async function generateAuditPdfV4(
  analysis: AuditAnalysis
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const rollup = analysis.rollup ?? {
    camEscalation: { low: 0, high: 0 },
    capitalItems: { low: 0, high: 0 },
    managementFees: { low: 0, high: 0 },
  };

  const totalLow =
    rollup.camEscalation.low +
    rollup.capitalItems.low +
    rollup.managementFees.low;

  const totalHigh =
    rollup.camEscalation.high +
    rollup.capitalItems.high +
    rollup.managementFees.high;

  /* ============================
     PAGE 1 — HERO + EXEC SUMMARY
  ============================ */

  let { page, y } = createPage(pdfDoc);
  drawHeader(page, analysis, font);

  y = drawHero(page, y - SPACING.lg, {
    font,
    boldFont,
    low: analysis.exposureRange.low,
    high: analysis.exposureRange.high,
  });

  y -= SPACING.md;

  y = drawHeading(
    page,
    "Executive Summary",
    PAGE.margin,
    y,
    boldFont,
    FONT_SIZES.h2,
    SPACING.sm
  );

  const executiveParagraphs = [
    `Our review of your lease structure and cost pass-through provisions indicates an estimated ${currency(
      totalLow
    )} - ${currency(
      totalHigh
    )} in avoidable operating expense exposure over the next 12 months alone.`,
    "The primary exposure drivers are structural — uncapped CAM escalation, landlord-controlled capital allocations, and management fees without defined limits.",
    "Absent proactive review, these provisions typically compound year-over-year and materially weaken tenant leverage prior to reconciliation, audit, or renewal discussions.",
  ];

  for (const p of executiveParagraphs) {
    y = drawParagraph(
      page,
      p,
      PAGE.margin,
      y,
      font,
      CONTENT.maxWidth
    );
    y -= SPACING.sm;
  }

  y -= SPACING.lg;

  y = drawHeading(
    page,
    "Scope of Review",
    PAGE.margin,
    y,
    boldFont,
    FONT_SIZES.h3,
    SPACING.sm
  );

  const scopeItems = [
    "• Lease-defined CAM and NNN escalation mechanics",
    "• Capital expenditure recoverability language",
    "• Management and administrative fee limitations",
    "• Pro-rata allocation methodology",
    "• Audit window provisions and dispute deadlines",
  ];

  for (const item of scopeItems) {
    y = drawParagraph(
      page,
      item,
      PAGE.margin + 8,
      y,
      font,
      CONTENT.maxWidth - 8
    );
    y -= SPACING.sm;
  }

  drawFooter(page, analysis.audit_id ?? "N/A", font);

  /* ============================
     PAGE 2 — ROLLUP TABLE
  ============================ */

  ({ page, y } = createPage(pdfDoc));
  drawHeader(page, analysis, font);

  y = drawHeading(
    page,
    "Estimated Avoidable Exposure - 12 Month Roll-Up",
    PAGE.margin,
    y,
    boldFont,
    FONT_SIZES.h2,
    SPACING.lg
  );

  const rollupRows: [string, string, string][] = [
    [
      "CAM Escalation Exposure",
      currency(rollup.camEscalation.low),
      currency(rollup.camEscalation.high),
    ],
    [
      "Capital Expenditure Allocation",
      currency(rollup.capitalItems.low),
      currency(rollup.capitalItems.high),
    ],
    [
      "Management Fee Overages",
      currency(rollup.managementFees.low),
      currency(rollup.managementFees.high),
    ],
    [
      "Total Estimated Avoidable Exposure",
      currency(totalLow),
      currency(totalHigh),
    ],
  ];

  const tableResult = _drawSummaryTable(
    page,
    y,
    { rows: rollupRows },
    { font, boldFont }
  );

  y = tableResult.cursorY;

  y = _drawCallout(
    page,
    y,
    "Why This Matters",
    "warning",
    [
      "Operating expenses across retail and office properties are increasing due to insurance repricing, tax reassessments, and capital items being allocated through CAM.",
      "Most commercial leases restrict audit rights to a 12-24 month window. Once closed, recovery of overcharges is typically unavailable.",
      "Addressing structural exposure before reconciliation or renewal materially improves negotiating position and reduces long-term cost creep.",
    ],
    font,
    boldFont
  );

  y -= SPACING.lg;

  y = drawHeading(
    page,
    "Multi-Year Exposure Illustration",
    PAGE.margin,
    y,
    boldFont,
    FONT_SIZES.h3,
    SPACING.sm
  );

  const multiYearExample = `Even modest annual exposure can compound significantly across a multi-year lease term. For example, ${currency(
    totalLow
  )} annually over a five-year term represents approximately ${currency(
    totalLow * 5
  )} in cumulative exposure if structural provisions remain unchanged.`;

  y = drawParagraph(
    page,
    multiYearExample,
    PAGE.margin,
    y,
    font,
    CONTENT.maxWidth
  );

  y -= SPACING.lg;

  drawBottomLine(
    pdfDoc,
    page,
    y,
    {
      rangeLow: currency(totalLow),
      rangeHigh: currency(totalHigh),
    },
    { font, boldFont }
  );

  drawFooter(page, analysis.audit_id ?? "N/A", font);

/* ============================
   PAGE 3 — WHAT WE CHECK (Borrowed Authority Layer)
============================ */

({ page, y } = createPage(pdfDoc));
drawHeader(page, analysis, font);

y = drawHeading(
  page,
  "What We Review in Your CAM / NNN Structure",
  PAGE.margin,
  y,
  boldFont,
  FONT_SIZES.h2,
  SPACING.lg
);

const reviewIntro =
  "We analyze your lease language and operating expense structure to identify structural provisions that commonly lead to overcharges or compounding cost exposure.";

y = drawParagraph(
  page,
  reviewIntro,
  PAGE.margin,
  y,
  font,
  CONTENT.maxWidth
);

y -= SPACING.lg;

const reviewItems = [
  "Administrative & management fees above lease-defined limits",
  "Insurance and tax pass-throughs applied outside allowable categories",
  "Capital expenses shifted to tenants improperly",
  "Pro-rata share and square-footage allocation errors",
  "Charges billed outside defined audit periods",
];

for (const item of reviewItems) {
  y = drawParagraph(
    page,
    `• ${item}`,
    PAGE.margin + 8,
    y,
    font,
    CONTENT.maxWidth - 8
  );
  y -= SPACING.md;
}

drawFooter(page, analysis.audit_id ?? "N/A", font);

/* ============================
   PAGE 4 — HOW EXPOSURE IS DERIVED
============================ */

({ page, y } = createPage(pdfDoc));
drawHeader(page, analysis, font);

const explanationResult = drawExplanationBox(
  pdfDoc,
  page,
  y - SPACING.sm,
  {
    title: "How Exposure Is Derived",
    paragraphs: [
      "Exposure modeling is based on specific lease provisions identified within your agreement.",
      "Applied market-observed CAM inflation sensitivity ranges (10–25%) to uncapped categories.",
      "Modeled capital expenditure allocation using standard amortization and recoverability benchmarks.",
      "Benchmarked management fee structures against prevailing 3–5% industry norms for comparable asset classes.",
      "Modeled exposure conservatively — not worst-case assumptions.",
    ],
  },
  { font, boldFont }
);

page = explanationResult.page;
y = explanationResult.cursorY;

y -= SPACING.lg;

y = drawHeading(
  page,
  "Audit Windows & Timing Risk",
  PAGE.margin,
  y,
  boldFont,
  FONT_SIZES.h3,
  SPACING.sm
);

const timingContext =
  "Most commercial leases provide tenants a limited window — often 30 to 120 days — to dispute CAM and NNN charges after reconciliation statements are delivered. Once that window closes, even incorrect charges may become difficult to recover.";

y = drawParagraph(
  page,
  timingContext,
  PAGE.margin,
  y,
  font,
  CONTENT.maxWidth
);

drawFooter(page, analysis.audit_id ?? "N/A", font);

/* ============================
   PAGE 5 — RECOMMENDED NEXT STEPS
============================ */

({ page, y } = createPage(pdfDoc));
drawHeader(page, analysis, font);

y = drawHeading(
  page,
  "Recommended Next Steps",
  PAGE.margin,
  y,
  boldFont,
  FONT_SIZES.h2,
  SPACING.lg
);

const actions = [
  "Confirm audit window deadlines and upcoming reconciliation timelines.",
  "Formally request detailed CAM backup, capital allocation schedules, and supporting invoices.",
  "Evaluate management fee structure against market benchmarks and lease-defined limits.",
  "Initiate structured tenant inquiry prior to reconciliation, renewal, or amendment negotiations.",
];

for (const step of actions) {
  y = drawParagraph(
    page,
    `• ${step}`,
    PAGE.margin + 8,
    y,
    font,
    CONTENT.maxWidth - 8
  );
  y -= SPACING.md;
}

drawFooter(page, analysis.audit_id ?? "N/A", font);

/* ============================
   PAGE 6 — LEASE HEALTH SCORE
============================ */

({ page, y } = createPage(pdfDoc));
drawHeader(page, analysis, font);

const health = computeLeaseHealthScore(analysis);

y = drawHeading(
  page,
  "Lease Health Score",
  PAGE.margin,
  y,
  boldFont,
  FONT_SIZES.h2,
  SPACING.sm
);

y = drawParagraph(
  page,
  "Overall Structural Risk Index",
  PAGE.margin,
  y,
  font,
  CONTENT.maxWidth,
  FONT_SIZES.small,
  SPACING.lg
);

const { width } = page.getSize();
const scoreText = `${health.score} / 100`;
const textWidth = boldFont.widthOfTextAtSize(scoreText, 52);

page.drawText(scoreText, {
  x: width / 2 - textWidth / 2,
  y,
  size: 52,
  font: boldFont,
  color: COLORS.text,
});

y -= 100;

const interpretation =
  health.score >= 80
    ? "This lease structure demonstrates comparatively strong cost controls. Continued monitoring is advisable to prevent erosion of protections."
    : health.score >= 60
    ? "This lease presents moderate structural exposure driven by pass-through provisions that warrant disciplined oversight."
    : "This lease presents elevated financial exposure requiring proactive audit positioning and strategic negotiation before costs compound.";

y = drawParagraph(
  page,
  interpretation,
  PAGE.margin,
  y,
  font,
  CONTENT.maxWidth
);

y -= SPACING.lg;

const breakdownLines = [
  `Cap Protection: ${health.breakdown.capProtection}`,
  `Allocation Clarity: ${health.breakdown.allocationClarity}`,
  `Fee Discipline: ${health.breakdown.feeDiscipline}`,
  `Cost Predictability: ${health.breakdown.costPredictability}`,
];

for (const line of breakdownLines) {
  y = drawParagraph(
    page,
    line,
    PAGE.margin,
    y,
    font,
    CONTENT.maxWidth,
    FONT_SIZES.body,
    SPACING.sm
  );
}

drawFooter(page, analysis.audit_id ?? "N/A", font);

  return await pdfDoc.save();
}