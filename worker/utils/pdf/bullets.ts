import { PDFPage, PDFFont } from "npm:pdf-lib@1.17.1";
import { drawParagraph } from "./text.ts";

export function drawBullet({
  page,
  text,
  x,
  y,
  font,
  size,
  maxWidth,
}: {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  font: PDFFont;
  size: number;
  maxWidth: number;
}): number {
  const bulletX = x;
  const textX = x + 12;

  page.drawText("•", {
    x: bulletX,
    y,
    size,
    font,
  });

  const nextY = drawParagraph({
    page,
    text,
    x: textX,
    y,
    font,
    size,
    maxWidth: maxWidth - 12,
  });

  return nextY;
}