// worker/utils/sendAuditEmail.ts
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

export async function sendAuditEmail({
  leaseName,
  signedUrl,
  toEmail,
}: {
  leaseName: string;
  signedUrl: string;
  toEmail: string | null;
}): Promise<void> {
  if (!toEmail) {
    console.warn("⚠️ No customer email found, skipping audit email");
    return;
  }

  try {
    await resend.emails.send({
      from: "SaveOnLease <audits@saveonlease.com>",
      to: toEmail,
      subject: "Your CAM / NNN Lease Audit is Ready",
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif;">
          <h2>Your Lease Audit is Ready</h2>

          <p>
            Your CAM / NNN audit${leaseName ? ` for <strong>${leaseName}</strong>` : ""} is complete.
          </p>

          <p>
            <a href="${signedUrl}" target="_blank" style="
              display:inline-block;
              padding:12px 18px;
              background:#000;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
              font-weight:600;
            ">
              Download Your Audit PDF
            </a>
          </p>

          <p style="margin-top:24px;color:#666;font-size:13px;">
            This secure link expires in 10 minutes.  
            You can always re-download your audit from your dashboard.
          </p>
        </div>
      `,
    });

    console.log("📧 Audit email sent to", toEmail);
  } catch (err) {
    console.error("❌ Failed to send audit email", err);
  }
}

