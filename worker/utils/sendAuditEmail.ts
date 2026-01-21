// worker/utils/sendAuditEmail.ts

export async function sendAuditEmail(_: {
  leaseName: string;
  signedUrl: string;
}): Promise<void> {
  console.log("📧 Audit email skipped (MVP mode)");
  return;
}
