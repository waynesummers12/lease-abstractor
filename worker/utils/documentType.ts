/** Recognize SaveOnLease output accidentally submitted as a source lease. */
export function isGeneratedAuditReport(text: string): boolean {
  const beginning = text.slice(0, 1200).replace(/\s+/g, " ").trim();
  return /SAVEONLEASE\s*(?:\/\s*)?(?:CAM\s*\/\s*NNN\s+Lease Audit Summary|COMMERCIAL LEASE REVIEW)/i.test(beginning) ||
    /Automated Lease Risk\s*&\s*Cost Exposure Review/i.test(beginning);
}
