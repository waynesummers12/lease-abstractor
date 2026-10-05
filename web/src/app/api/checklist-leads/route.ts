import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveChecklistLead } from "@/lib/server/checklistLead";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const saved = await saveChecklistLead(body?.email, "learn_page");

    if (saved.error === "invalid") {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }
    if (saved.error || !saved.email) {
      return NextResponse.json({ error: "Unable to save your request. Please try again." }, { status: 503 });
    }

    // 2️⃣ Send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: sendError } = await resend.emails.send({
      from: "SaveOnLease <audit@saveonlease.com>",
      to: saved.email,
      subject: "Your Tenant-First CAM Audit Checklist",
      html: `
        <h2>Your CAM Audit Checklist</h2>
        <p>Thanks for requesting the Tenant-First CAM Audit Checklist.</p>
        <p>You can download it here:</p>
        <p>
          <a href="https://www.saveonlease.com/assets/Tenant-First-CAM-Audit-Checklistv1.pdf">
            Download Checklist
          </a>
        </p>
        <p>– Wayne</p>
      `,
    });
    if (sendError) {
      console.error("Checklist email failed", sendError.name);
      return NextResponse.json({ error: "Checklist email could not be sent. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Checklist lead error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
