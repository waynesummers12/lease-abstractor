// CONTRACT:
// - Component is atomic (renders as a single block)
// - Must return { page, cursorY } after consuming full height
// - Caller is responsible for page breaks
// worker/utils/pdf/components/RiskBox.ts

import {
  PDFPage,
  PDFFont,
  rgb,
} from "npm:pdf-lib@1.17.1";

import {
  PAGE,
  CONTENT,
  advanceY,
  drawParagraph,
  SPACING,
} from "../layout.ts";

/* -------------------------------------------------
   Types
-------------------------------------------------- */

type RiskBoxOptions = {
  title: string;
  accentColor: { r: number; g: number; b: number };
  body: string[];
  footer?: string;
  severity?: "primary" | "moderate" | "low";
};

/* -------------------------------------------------
   Helpers
-------------------------------------------------- */

function estimateRiskBoxHeight(
  body: string[],
  hasFooter: boolean
): number {
  const base = 52; // title + top padding
  const perParagraph = 26; // average paragraph height
  const footer = hasFooter ? 24 : 0;
  return base + body.length * perParagraph + footer + SPACING.lg;
}

/* -------------------------------------------------
   Component
-------------------------------------------------- */

export function drawRiskBox(
  page: PDFPage,
  cursorY: number,
  options: {
    title: string;
    accentColor: { r: number; g: number; b: number };
    body: string[];
    footer?: string;
    severity?: "primary" | "moderate" | "low";
    font: PDFFont;
    boldFont: PDFFont;
  }
): { page: PDFPage; cursorY: number } {
  if (!options || !Array.isArray(options.body)) {
    throw new Error("drawRiskBox called without body content");
  }

  const { font, boldFont } = options;

  const estimatedHeight = estimateRiskBoxHeight(
    options.body,
    Boolean(options.footer)
  );

  // ensureSpace is handled by the caller now

  const boxX = PAGE.margin;
  const boxWidth = CONTENT.maxWidth;
  const boxPadding = 16;
  const boxHeight = estimatedHeight;

  /* -------- Background -------- */

  // Removed unsupported borderRadius property
  page.drawRectangle({
    x: boxX,
    y: cursorY - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: rgb(0.96, 0.96, 0.96),
    // borderRadius: 6, // unsupported, removed
  });

  /* -------- Accent bar -------- */

  page.drawRectangle({
    x: boxX,
    y: cursorY - boxHeight,
    width: 4,
    height: boxHeight,
    color: rgb(
      options.accentColor.r,
      options.accentColor.g,
      options.accentColor.b
    ),
  });

  /* -------- Content -------- */

  let y = cursorY - boxPadding;

  // Optional severity badge (right-aligned)
  if (options.severity) {
    const badgeText =
      options.severity === "primary"
        ? "PRIMARY RISK"
        : options.severity === "moderate"
        ? "MODERATE RISK"
        : "LOW RISK";

    page.drawText(badgeText, {
      x: boxX + boxWidth - boxPadding - 90,
      y,
      size: 9,
      font: boldFont,
      color: rgb(
        options.accentColor.r,
        options.accentColor.g,
        options.accentColor.b
      ),
    });
  }

  // Subtle top separator to mimic depth
  page.drawLine({
    start: { x: boxX + boxPadding, y: y - 10 },
    end: { x: boxX + boxWidth - boxPadding, y: y - 10 },
    thickness: 0.75,
    color: rgb(0.9, 0.9, 0.9),
  });

  y = advanceY(y, SPACING.sm);

  // Title
  page.drawText(options.title, {
    x: boxX + boxPadding,
    y,
    size: 14.5,
    font: boldFont,
    color: rgb(0.15, 0.15, 0.15),
  });

  // Divider under title
  page.drawLine({
    start: { x: boxX + boxPadding, y: y - 6 },
    end: { x: boxX + boxWidth - boxPadding, y: y - 6 },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.85),
  });

  y = advanceY(y, SPACING.sm);

  // Body paragraphs
  for (const paragraph of options.body) {
    y = drawParagraph(
      page,
      paragraph,
      boxX + boxPadding,
      y,
      font,
      10,
      boxWidth - boxPadding * 2
    );
    y = advanceY(y, 6);
  }

  // Footer emphasis
  if (options.footer) {
    y = advanceY(y, SPACING.sm);
    page.drawText(options.footer, {
      x: boxX + boxPadding,
      y,
      size: 11,
      font: boldFont,
      color: rgb(0.12, 0.12, 0.12),
    });
  }

  return {
    page,
    cursorY: cursorY - boxHeight - SPACING.lg,
  };
}