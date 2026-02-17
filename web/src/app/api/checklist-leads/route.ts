
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Basic validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }

    // TODO: Replace this with real database logic (Supabase, etc.)
    // For now, just log the email so we confirm capture works.
    console.log("New CAM Checklist Lead:", email);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Checklist lead error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}