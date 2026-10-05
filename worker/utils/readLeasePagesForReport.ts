import pdfParse from "npm:pdf-parse@1.1.1";
import { supabase } from "../lib/supabase.ts";

export type LeaseTextPage = { page: number; text: string };

/** Read the private upload, retaining page numbers for checkable text matches. */
export async function readLeasePagesForReport(auditId: string): Promise<LeaseTextPage[] | null> {
  for (const path of [`leases/${auditId}.pdf`, `${auditId}.pdf`]) {
    const { data, error } = await supabase.storage.from("leases").download(path);
    if (error || !data) continue;
    try {
      const pages: LeaseTextPage[] = [];
      await pdfParse(new Uint8Array(await data.arrayBuffer()), {
        pagerender: async (page: {
          pageNumber: number;
          getTextContent: () => Promise<{ items: Array<{ str: string }> }>;
        }) => {
          const content = await page.getTextContent();
          const text = content.items.map((item) => item.str).join(" ");
          pages.push({ page: page.pageNumber, text });
          return text;
        },
      });
      return pages.length ? pages : null;
    } catch (error) {
      console.error("Lease text could not be extracted for report", { auditId, error });
      return null;
    }
  }
  return null;
}
