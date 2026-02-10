// CONTRACT:
// - Component must not overlap content
// - Must return updated cursorY reflecting ALL rendered height
// - Must not mutate external cursor state

import { PDFPage, PDFFont, rgb } from "npm:pdf-lib@1.17.1";
import { PAGE } from "../layout.ts";

/* ---------------------------------
   Types
---------------------------------- */

type HeroOptions = {
  font: PDFFont;
  boldFont: PDFFont;
  low: number;
  high: number;
};

/* ---------------------------------
   Hero Section
---------------------------------- */

export function drawHero(
  page: PDFPage,
  cursorY: number | undefined,
  opts: HeroOptions
): number {
  const { font, boldFont, low, high } = opts;

  const { width, height } = page.getSize();
  const contentWidth = width - PAGE.margin * 2;

  // 🔒 HARD SAFETY: Hero always anchors from top margin
  let y =
    typeof cursorY === "number" && Number.isFinite(cursorY)
      ? cursorY
      : height - PAGE.margin;

  /* BRAND */
  page.drawText("SAVEONLEASE", {
    x: PAGE.margin,
    y,
    size: 12,
    font: boldFont,
    color: rgb(0.45, 0.45, 0.45),
  });

  y -= 32;

  /* TITLE */
  page.drawText("CAM / NNN Lease Audit Summary", {
    x: PAGE.margin,
    y,
    size: 28,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  y -= 48;

  /* SUBTITLE */
  page.drawText("Estimated Avoidable Exposure (Next 12 Months)", {
    x: PAGE.margin,
    y,
    size: 18,
    font: boldFont,
  });

  y -= 44;

  /* RANGE */
  page.drawText(`$${low.toLocaleString()} – $${high.toLocaleString()}`, {
    x: PAGE.margin,
    y,
    size: 36,
    font: boldFont,
  });

  y -= 40;

  /* DIVIDER */
  page.drawLine({
    start: { x: PAGE.margin, y },
    end: { x: width - PAGE.margin, y },
    thickness: 1.5,
    color: rgb(0.8, 0.8, 0.8),
  });

  y -= 26;

  /* EXPLANATION */
  page.drawText(
    "This estimate reflects CAM, NNN, escalation, and reconciliation language identified in your lease.",
    {
      x: PAGE.margin,
      y,
      size: 11,
      font,
      color: rgb(0.35, 0.35, 0.35),
      maxWidth: contentWidth,
      lineHeight: 14,
    }
  );

  y -= 64;

  return y;
}