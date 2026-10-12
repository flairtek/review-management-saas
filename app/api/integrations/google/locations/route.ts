import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchBusinessLocations } from "@/lib/google/gbp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get("organization_id");

  if (!organizationId) {
    return NextResponse.json({ error: "Missing organization_id" }, { status: 400 });
  }

  const supabase = await createClient();

  // Fetch active connection for org
  const { data: connection, error: connError } = await supabase
    .from("google_connections")
    .select("*")
    .eq("organization_id", organizationId)
    .single();

  if (connError || !connection) {
    return NextResponse.json({ error: "No Google connection found for organization" }, { status: 404 });
  }

  try {
    // Fetch live locations from Google GBP API
    const locations = await fetchBusinessLocations(connection.access_token);

    // Upsert locations into business_locations table
    for (const loc of locations) {
      await supabase.from("business_locations").upsert({
        organization_id: organizationId,
        google_connection_id: connection.id,
        google_location_id: loc.googleLocationId,
        name: loc.name,
        address: loc.address,
        phone: loc.phone,
        average_rating: loc.rating || 0.0,
        total_reviews: loc.reviewCount || 0,
      }, { onConflict: "google_location_id" });
    }

    // Return stored locations
    const { data: storedLocations } = await supabase
      .from("business_locations")
      .select("*")
      .eq("organization_id", organizationId);

    return NextResponse.json({ success: true, locations: storedLocations });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch locations" }, { status: 500 });
  }
}
