import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }

    // 1️⃣ Store lead
    await supabase.from("checklist_leads").insert({
      email,
      source: "learn_page",
    });

    // 2️⃣ Send email
    await resend.emails.send({
      from: "SaveOnLease <audit@saveonlease.com>",
      to: email,
      subject: "Your Tenant-First CAM Audit Checklist",
      html: `
        <h2>Your CAM Audit Checklist</h2>
        <p>Thanks for requesting the Tenant-First CAM Audit Checklist.</p>
        <p>You can download it here:</p>
        <p>
          <a href="https://saveonlease.com/checklist-download.pdf">
            Download Checklist
          </a>
        </p>
        <p>– Wayne</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Checklist lead error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}