// worker/utils/sendAuditEmail.ts

import { resend } from "../lib/resend.ts";

/* ---------- TYPES ---------- */

type SendAuditEmailArgs = {
  to: string;
  leaseName: string;
  signedUrl: string;
};

/* ---------- EMAIL SENDER ---------- */

export async function sendAuditEmail({
  to,
  leaseName,
  signedUrl,
}: SendAuditEmailArgs): Promise<void> {
  if (!to || !signedUrl) {
    throw new Error("Missing required email fields");
  }

  await resend.emails.send({
    from: "Lease Abstractor <audits@yourdomain.com>",
    to,
    subject: "Your CAM / NNN Lease Audit is Ready",
    html: `
      <h2>Your Lease Audit is Ready</h2>
      <p><strong>Lease:</strong> ${leaseName}</p>
      <p>
        <a href="${signedUrl}">
          Download your CAM / NNN audit (PDF)
        </a>
      </p>
      <p style="font-size: 12px; color: #666;">
        This secure link expires in 1 hour for your protection.
      </p>
    `,
  });
}


