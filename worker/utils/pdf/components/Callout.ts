// CONTRACT:
// - Component must use layout helpers for vertical spacing
// - Must return updated cursorY reflecting wrapped text height
// - Must never overlap following content
// worker/utils/pdf/components/Callout.ts

import { PDFPage, PDFFont, rgb } from "npm:pdf-lib@1.17.1";
import { PAGE, SPACING, drawParagraph } from "../layout.ts";

export function drawCallout(
  page: PDFPage,
  cursorY: number,
  title: string,
  accent: "warning" | "info",
  lines: string[],
  font: PDFFont,
  boldFont: PDFFont
): number {
  const boxX = PAGE.margin;
  const boxWidth = page.getSize().width - PAGE.margin * 2;
  const padding = 16;

  const accentColor =
    accent === "warning"
      ? rgb(0.85, 0.33, 0.31)
      : rgb(0.25, 0.55, 0.85);

    // Add internal top padding so content sits inside the block visually
  let y = cursorY - SPACING.md;

  /* ---------- Title ---------- */
  page.drawText(title, {
    x: boxX + padding,
    y,
    size: 14,
    font: boldFont,
  });

    // Space between title and first paragraph
  y -= SPACING.md;

  /* ---------- Body (no overlap) ---------- */
  for (const line of lines) {
    y = drawParagraph(
      page,
      line,
      boxX + padding,
      y,
      font,
      11,
      boxWidth - padding * 2
    );
    y -= SPACING.sm;
  }

  const contentHeight = cursorY - y + SPACING.sm;

  /* ---------- Accent bar ---------- */
  page.drawRectangle({
    x: boxX,
        y: cursorY - contentHeight,
    width: 4,
    height: contentHeight,
    color: accentColor,
  });

  return y - SPACING.lg;
}