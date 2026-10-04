import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type PortfolioAccess =
  | { db: SupabaseClient; userId: string; error?: never }
  | { error: NextResponse; db?: never; userId?: never };

async function getPortfolioAccess(req: Request): Promise<PortfolioAccess> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return { error: NextResponse.json({ error: "Server misconfigured" }, { status: 500 }) };
  }

  const token = req.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
  if (!token) {
    return { error: NextResponse.json({ error: "Authentication required" }, { status: 401 }) };
  }

  const auth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: { user }, error } = await auth.auth.getUser(token);
  if (error || !user) {
    return { error: NextResponse.json({ error: "Authentication required" }, { status: 401 }) };
  }

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return { db, userId: user.id };
}

const privateHeaders = { "Cache-Control": "private, no-store" };

export async function POST(req: Request) {
  const access = await getPortfolioAccess(req);
  if (access.error) return access.error;
  const { db, userId } = access;

  try {
    const body = await req.json();

    const {
      property_name,
      landlord,
      square_footage,
      lease_type,
      renewal_date,
    } = body ?? {};

    if (typeof property_name !== "string" || !property_name.trim()) {
      return NextResponse.json(
        { error: "Property name is required" },
        { status: 400 }
      );
    }

    const { data, error } = await db
      .from("portfolio_leases")
      .insert([
        {
          user_id: userId,
          property_name: property_name.trim(),
          landlord: landlord || null,
          square_feet: square_footage
            ? Number(square_footage)
            : null,
          lease_type: lease_type || null,
          renewal_date: renewal_date || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { error: "Failed to save lease" },
        { status: 500 }
      );
    }

    return NextResponse.json({ lease: data }, { status: 201, headers: privateHeaders });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const access = await getPortfolioAccess(req);
  if (access.error) return access.error;
  const { db, userId } = access;

  try {
    const { data, error } = await db
      .from("portfolio_leases")
      .select("*")
      .eq("user_id", userId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      return NextResponse.json(
        { error: "Failed to load leases" },
        { status: 500 }
      );
    }

    return NextResponse.json({ leases: data }, { status: 200, headers: privateHeaders });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const access = await getPortfolioAccess(req);
  if (access.error) return access.error;
  const { db, userId } = access;

  try {
    const body = await req.json();

    const {
      id,
      propertyName,
      landlord,
      squareFeet,
      leaseType,
      renewalDate,
    } = body ?? {};

    if (typeof id !== "string" || !id) {
      return NextResponse.json(
        { error: "Lease ID is required" },
        { status: 400 }
      );
    }
    if (typeof propertyName !== "string" || !propertyName.trim()) {
      return NextResponse.json({ error: "Property name is required" }, { status: 400 });
    }

    const { data, error } = await db
      .from("portfolio_leases")
      .update({
        property_name: propertyName.trim(),
        landlord: landlord || null,
        square_feet: squareFeet ? Number(squareFeet) : null,
        lease_type: leaseType || null,
        renewal_date: renewalDate || null,
      })
      .eq("id", id)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json(
        { error: "Failed to update lease" },
        { status: 500 }
      );
    }

    if (!data) return NextResponse.json({ error: "Lease not found" }, { status: 404 });
    return NextResponse.json({ lease: data }, { status: 200, headers: privateHeaders });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const access = await getPortfolioAccess(req);
  if (access.error) return access.error;
  const { db, userId } = access;

  try {
    const body = await req.json();

    const { id } = body ?? {};

    if (typeof id !== "string" || !id) {
      return NextResponse.json(
        { error: "Lease ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await db
      .from("portfolio_leases")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete lease" },
        { status: 500 }
      );
    }

    if (!data) return NextResponse.json({ error: "Lease not found" }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200, headers: privateHeaders });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
