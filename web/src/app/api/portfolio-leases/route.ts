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