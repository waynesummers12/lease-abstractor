// worker/utils/generateAuditPdf.ts
import { PDFDocument, StandardFonts } from "npm:pdf-lib@1.17.1";

export async function generateAuditPdf(analysis: any) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]); // US Letter
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  let y = 740;

  function line(text: string, size = 12) {
    page.drawText(text, { x: 40, y, size, font });
    y -= size + 6;
  }

  line("CAM / NNN Lease Audit Summary", 18);
  y -= 10;

  line(`Tenant: ${analysis.tenant ?? "—"}`);
  line(`Landlord: ${analysis.landlord ?? "—"}`);
  line(`Premises: ${analysis.premises ?? "—"}`);
  line(`Lease End: ${analysis.lease_end ?? "—"}`);

  y -= 12;
  line("Risk Findings:", 14);

  for (const flag of analysis.health?.flags ?? []) {
    line(`• ${flag.label} (${flag.severity})`);
    line(`  ${flag.recommendation}`, 10);
    if (flag.estimated_impact) {
      line(`  Estimated impact: ${flag.estimated_impact}`, 10);
    }
    y -= 6;
  }

  return await pdf.save();
}
