import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Temporary mock extraction
    const mockExtraction = {
      propertyName: file.name.replace(".pdf", ""),
      landlord: "Detected Landlord LLC",
      squareFeet: 2500,
      leaseType: "NNN",
      renewalDate: "2026-12-31",
    };

    return NextResponse.json({ metadata: mockExtraction });
  } catch (err) {
    console.error("Metadata extraction error:", err);
    return NextResponse.json(
      { error: "Failed to extract lease metadata" },
      { status: 500 }
    );
  }
}