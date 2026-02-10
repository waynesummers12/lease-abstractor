// worker/utils/pdf/components/ExplanationBox.ts

import { PDFDocument, PDFPage, PDFFont, rgb } from "npm:pdf-lib@1.17.1";
import { PAGE, SPACING, ensureSpace } from "../layout.ts";
import { drawParagraph } from "../text.ts";

/**
 * ExplanationBox
 * Enterprise-grade explanatory container.
 *
 * Goals:
 * - Fill remaining space on page cleanly
 * - Wrap all content inside gray surface
 * - Sit tight under the RiskBox
 * - Never overflow or clip
 */
export function drawExplanationBox(
  pdfDoc: PDFDocument,
  page: PDFPage,
  cursorY: number,
  opts: {
    title: string;
    paragraphs: string[];
  },
  fonts: {
    font: PDFFont;
    boldFont: PDFFont;
  }
): { page: PDFPage; cursorY: number } {
  const { title, paragraphs } = opts;
  const { font, boldFont } = fonts;

  const boxX = PAGE.margin;
  const boxWidth = page.getSize().width - PAGE.margin * 2;
  const padding = 18;
  const accentWidth = 4;

  /* -------------------------------------------------
     Determine usable height on this page
  -------------------------------------------------- */

  const maxAvailableHeight =
    cursorY - PAGE.bottom - SPACING.md;

  ({ page, cursorY } = ensureSpace(
    pdfDoc,
    page,
    cursorY,
    maxAvailableHeight
  ));

  let y = cursorY;

  /* -------------------------------------------------
     Draw background FIRST (so text appears on top)
  -------------------------------------------------- */

  page.drawRectangle({
    x: boxX,
    y: cursorY - maxAvailableHeight,
    width: boxWidth,
    height: maxAvailableHeight,
    color: rgb(0.955, 0.955, 0.955),
  });

  page.drawRectangle({
    x: boxX,
    y: cursorY - maxAvailableHeight,
    width: accentWidth,
    height: maxAvailableHeight,
    color: rgb(0.85, 0.2, 0.2),
  });

  /* -------------------------------------------------
     Title
  -------------------------------------------------- */

  // Pull down slightly so it hugs RiskBox
  y -= SPACING.xs;

  page.drawText(title, {
    x: boxX + padding,
    y,
    size: 15,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  y -= 22;

  /* -------------------------------------------------
     Divider
  -------------------------------------------------- */

  page.drawLine({
    start: { x: boxX + padding, y },
    end: { x: boxX + boxWidth - padding, y },
    thickness: 0.75,
    color: rgb(0.82, 0.82, 0.82),
  });

  y -= SPACING.sm;

/* -------------------------------------------------
   Body paragraphs
-------------------------------------------------- */

for (const paragraph of paragraphs) {
  // Bullet lines
  if (paragraph.startsWith("•")) {
    y = drawParagraph({
      page,
      text: paragraph,
      x: boxX + padding + 6,
      y,
      font,
      size: 11,
      maxWidth: boxWidth - padding * 2 - 6,
      lineHeight: 11 * 1.15, // tighter bullet spacing
    });

    y -= SPACING.xs; // small gap between bullets
    continue;
  }

  // Section headers (lines ending with :)
  if (paragraph.endsWith(":")) {
    y = drawParagraph({
      page,
      text: paragraph,
      x: boxX + padding,
      y,
      font,
      size: 11,
      maxWidth: boxWidth - padding * 2,
      lineHeight: 11 * 1.25,
    });

    y -= SPACING.xs;
    continue;
  }

  // Normal body text
  y = drawParagraph({
    page,
    text: paragraph,
    x: boxX + padding,
    y,
    font,
    size: 11,
    maxWidth: boxWidth - padding * 2,
    lineHeight: 11 * 1.3,
  });

  y -= SPACING.sm;
}

    return {
      page,
      cursorY: y - SPACING.lg,
    };
  }