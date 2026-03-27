import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const body = await req.json();

    const {
      propertyName,
      landlord,
      squareFeet,
      leaseType,
      renewalDate,
    } = body;

    if (!propertyName) {
      return NextResponse.json(
        { error: "Property name is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("portfolio_leases")
      .insert([
        {
          property_name: propertyName,
          landlord: landlord || null,
          square_feet: squareFeet ? Number(squareFeet) : null,
          lease_type: leaseType || null,
          renewal_date: renewalDate || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { error: "Failed to create lease" },
        { status: 500 }
      );
    }

    return NextResponse.json({ lease: data }, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase
      .from("portfolio_leases")
      .select("*")
      .is("deleted_at", null)
      .order("renewal_date", { ascending: true });

    if (error) {
      console.error("Fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch leases" },
        { status: 500 }
      );
    }

    return NextResponse.json({ leases: data }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const body = await req.json();

    const {
      id,
      propertyName,
      landlord,
      squareFeet,
      leaseType,
      renewalDate,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lease ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("portfolio_leases")
      .update({
        property_name: propertyName,
        landlord: landlord || null,
        square_feet: squareFeet ? Number(squareFeet) : null,
        lease_type: leaseType || null,
        renewal_date: renewalDate || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json(
        { error: "Failed to update lease" },
        { status: 500 }
      );
    }

    return NextResponse.json({ lease: data }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lease ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("portfolio_leases")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete lease" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}