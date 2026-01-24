// src/app/api/audits/route.ts

export async function POST(req: NextRequest) {
  try {
    const { auditId } = await req.json();

    if (!auditId) {
      return NextResponse.json(
        { error: "Missing auditId" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("lease_audits")
      .insert({
        id: auditId,
        status: "pending",
        currency: "usd",
        object_path: `leases/${auditId}.pdf`,
      });

    if (error) {
      console.error("❌ Failed to create audit row:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ /api/audits POST error:", err);
    return NextResponse.json(
      { error: err?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
