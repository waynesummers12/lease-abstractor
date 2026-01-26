// deno-lint-ignore-file
// worker/utils/pdf.ts
import * as pdfjs from "https://esm.sh/pdfjs-dist@4.0.379/legacy/build/pdf.mjs";

export async function extractTextFromPdf(pdfBytes: Uint8Array): Promise<string> {
  const loadingTask = pdfjs.getDocument({ data: pdfBytes });
  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    for (const item of content.items as any[]) {
      if (item.str) {
        text += item.str + " ";
      }
    }
  }

  return text;
}
