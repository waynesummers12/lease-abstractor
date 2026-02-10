import { PDFPage, PDFFont } from "npm:pdf-lib@1.17.1";

/**
 * Draws wrapped paragraph text and returns the next Y position.
 * This is the backbone for all multi-line text in PDFs.
 */
export function drawParagraph({
  page,
  text,
  x,
  y,
  font,
  size,
  maxWidth,
  lineHeight = size * 1.4,
}: {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  font: PDFFont;
  size: number;
  maxWidth: number;
  lineHeight?: number;
}): number {
  page.drawText(text, {
    x,
    y,
    size,
    font,
    maxWidth,
    lineHeight,
  });

  // Estimate how many lines were rendered
  const words = text.split(" ");
  let currentLine = "";
  let lineCount = 1;

  for (const word of words) {
    const testLine = currentLine
      ? `${currentLine} ${word}`
      : word;

    const width = font.widthOfTextAtSize(testLine, size);

    if (width > maxWidth) {
      lineCount++;
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  return y - lineCount * lineHeight;
}