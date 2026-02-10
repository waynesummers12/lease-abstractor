// CONTRACT:
// - Component is atomic
// - Must return { page, cursorY } after full table render
// - Must NOT assume page breaks; caller controls pagination

import { PDFPage, PDFFont, rgb } from "npm:pdf-lib@1.17.1";
import {
  PAGE,
  CONTENT,
  SPACING,
  advanceY,
} from "../layout.ts";

const HEADER_FONT_SIZE = 12;
const BODY_FONT_SIZE = 12;
const ROW_HEIGHT = 26;
const ROW_GAP = 6;

/**
 * Row format:
 * [ label, conservative, aggressive ]
 */
type TableRow = [string, string, string];

export function drawSummaryTable(
  page: PDFPage,
  cursorY: number,
  opts: {
    title?: string;
    columns?: string[];
    rows: TableRow[];
  },
  fonts: {
    font: PDFFont;
    boldFont: PDFFont;
  }
): { page: PDFPage; cursorY: number } {
  const { rows } = opts;
  const { font, boldFont } = fonts;

  if (!page || typeof page.drawText !== "function") {
    throw new Error("drawSummaryTable received invalid PDFPage");
  }

  let y = cursorY;

  const colX = {
    label: PAGE.margin,
    low: PAGE.margin + CONTENT.maxWidth * 0.55,
    high: PAGE.margin + CONTENT.maxWidth * 0.78,
  };

  /* ---------- Header ---------- */

  page.drawText("Risk Source", {
    x: colX.label,
    y,
    size: HEADER_FONT_SIZE,
    font: boldFont,
  });

  page.drawText("Conservative", {
    x: colX.low,
    y,
    size: HEADER_FONT_SIZE,
    font: boldFont,
  });

  page.drawText("Aggressive", {
    x: colX.high,
    y,
    size: HEADER_FONT_SIZE,
    font: boldFont,
  });

  y = advanceY(y, SPACING.sm);

  page.drawLine({
    start: { x: PAGE.margin, y },
    end: { x: PAGE.margin + CONTENT.maxWidth, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });

  y = advanceY(y, SPACING.lg);

  /* ---------- Rows ---------- */

  rows.forEach((row, i) => {
    const isTotal = i === rows.length - 1;

    // alternating background
    if (!isTotal && i % 2 === 0) {
      page.drawRectangle({
        x: PAGE.margin - 4,
        y: y - 4,
        width: CONTENT.maxWidth + 8,
        height: ROW_HEIGHT + 4,
        color: rgb(0.97, 0.97, 0.97),
      });
    }

    page.drawText(row[0], {
      x: colX.label,
      y,
      size: BODY_FONT_SIZE,
      font: isTotal ? boldFont : font,
      maxWidth: colX.low - colX.label - 8,
    });

    page.drawText(row[1], {
      x: colX.low,
      y,
      size: BODY_FONT_SIZE,
      font: isTotal ? boldFont : font,
    });

    page.drawText(row[2], {
      x: colX.high,
      y,
      size: BODY_FONT_SIZE,
      font: isTotal ? boldFont : font,
    });

    y = advanceY(y, ROW_HEIGHT + ROW_GAP);
  });

  return {
    page,
    cursorY: y - SPACING.sm,
  };
}