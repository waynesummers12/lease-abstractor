// worker/utils/sendAuditEmail.ts

import { resend } from "../lib/resend.ts";

/* ---------- EMAIL SENDER ---------- */

export async function sendAuditEmail({
  leaseName,
  signedUrl,
}: {
  leaseName: string;
  signedUrl: string;
}): Promise<void> {
  if (!signedUrl) {
    throw new Error("Missing signedUrl for audit email");
  }

  const result = await resend.emails.send({
    // ✅ Resend allows this sender for testing
    from: "Lease Abstractor <onboarding@resend.dev>",

    // ✅ HARD-CODED GMAIL (FOR TESTING)
    to: "waynesummers12@gmail.com",

    subject: "Your CAM / NNN Lease Audit is Ready",

    html: `
      <h2>Your Lease Audit is Ready</h2>

      <p><strong>Lease:</strong> ${leaseName}</p>

      <p>
        <a href="${signedUrl}">
          Download your CAM / NNN audit (PDF)
        </a>
      </p>

      <p style="font-size:12px;color:#666;">
        This secure link expires in 1 hour for your protection.
      </p>
    `,
  });

  console.log("📧 Audit email sent:", result);
}
