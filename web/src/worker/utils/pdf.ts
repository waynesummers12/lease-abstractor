// worker/utils/pdf.ts
import pdfjs from "https://esm.sh/pdfjs-dist@4.0.379";

export async function extractTextFromPdf(bytes: Uint8Array): Promise<string> {
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ");
    fullText += `\n${pageText}`;
  }

  return fullText;
}
