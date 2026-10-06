import { NextResponse } from "next/server";
import { saveChecklistLead } from "@/lib/server/checklistLead";

export const dynamic = "force-dynamic";

function returnToPage(req: Request, status: string) {
  const url = new URL("/marketing/reconciliation-pilot", req.url);
  url.searchParams.set("status", status);
  const response = NextResponse.redirect(url, { status: 303 });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    if (form.get("website")) return returnToPage(req, "received");

    const saved = await saveChecklistLead(form.get("email"), "reconciliation_pilot_interest");
    if (saved.error === "invalid") return returnToPage(req, "invalid");
    if (saved.error) return returnToPage(req, "unavailable");
    return returnToPage(req, "received");
  } catch (error) {
    console.error("Reconciliation pilot signup failed", error);
    return returnToPage(req, "unavailable");
  }
}
