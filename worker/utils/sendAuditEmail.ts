// worker/utils/sendAuditEmail.ts
import { resend } from "../lib/resend.ts";

export async function sendAuditEmail({
  to,
  leaseName,
  signedUrl,
}: {
  to: string;
  leaseName: string;
  signedUrl: string;
}) {
  await resend.emails.send({
    from: "Lease Abstractor <audits@yourdomain.com>",
    to,
    subject: "Your CAM / NNN Lease Audit is Ready",
    html: `
      <h2>Your Lease Audit is Ready</h2>
      <p><strong>Lease:</strong> ${leaseName}</p>
      <p>
        <a href="${signedUrl}">
          Download your audit PDF
        </a>
      </p>
      <p>This secure link expires for your protection.</p>
    `,
  });
}

