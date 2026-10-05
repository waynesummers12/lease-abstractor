import { NextResponse } from "next/server";
import { saveChecklistLead } from "@/lib/server/checklistLead";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const saved = await saveChecklistLead(formData.get("email"), "checklist_form");
    if (saved.error === "invalid") {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (saved.error) {
      return NextResponse.json({ error: "Unable to save your request. Please try again." }, { status: 503 });
    }
    return NextResponse.redirect(
      new URL("/assets/Tenant-First-CAM-Audit-Checklistv1.pdf", req.url),
      { status: 303 }
    );
  } catch (error) {
    console.error("Checklist form failed", error);
    return NextResponse.json({ error: "Unable to process your request." }, { status: 500 });
  }
}
