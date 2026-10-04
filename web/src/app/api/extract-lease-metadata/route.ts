import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { extractLeaseMetadata } from "@/lib/leaseMetadata";

export const runtime = "nodejs";

const MAX_PDF_BYTES = 10 * 1024 * 1024;
const privateHeaders = { "Cache-Control": "private, no-store" };

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  if (!token) {
    return NextResponse.json({ error: "Please log in before uploading a lease." }, { status: 401 });
  }

  const auth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: { user }, error: authError } = await auth.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: "Please log in before uploading a lease." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose a PDF lease file." }, { status: 400 });
    }
    if (file.size > MAX_PDF_BYTES) {
      return NextResponse.json({ error: "PDF must be 10 MB or smaller." }, { status: 413 });
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (new TextDecoder().decode(bytes.subarray(0, 5)) !== "%PDF-") {
      return NextResponse.json({ error: "The selected file is not a PDF." }, { status: 415 });
    }

    const parsed = await pdfParse(bytes);
    if (!parsed.text.trim()) {
      return NextResponse.json(
        { error: "This PDF has no selectable text. Enter the lease details manually." },
        { status: 422 }
      );
    }

    const metadata = extractLeaseMetadata(parsed.text);
    return NextResponse.json(
      { metadata, source: "PDF text", pageCount: parsed.numpages },
      { status: 200, headers: privateHeaders }
    );
  } catch (err) {
    console.error("Metadata extraction error:", err);
    return NextResponse.json(
      { error: "Could not read this PDF. Enter the lease details manually." },
      { status: 422 }
    );
  }
}
