import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email");

  // TODO: store in Supabase / database here

  console.log("New lead:", email);

  return NextResponse.redirect(
    new URL("/assets/cam-audit-checklist-v1.pdf", req.url)
  );
}