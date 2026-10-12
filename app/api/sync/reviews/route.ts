import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchReviews } from "@/lib/google/gbp";

export async function POST(request: Request) {
  const { organizationId, locationId } = await request.json();

  if (!organizationId || !locationId) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const supabase = await createClient();

  // 1. Get connection & location info
  const { data: locationData, error: locError } = await supabase
    .from("business_locations")
    .select("*, google_connections(access_token)")
    .eq("id", locationId)
    .single();

  if (locError || !locationData || !locationData.google_connections) {
    return NextResponse.json({ error: "Location or connection not found" }, { status: 404 });
  }

  // 2. Fetch from Google
  const reviews = await fetchReviews(
    locationData.google_connections.access_token,
    locationData.google_location_id
  );

  // 3. Upsert into Supabase
  for (const review of reviews) {
    await supabase.from("reviews").upsert({
      organization_id: organizationId,
      location_id: locationId,
      external_review_id: review.externalReviewId,
      author_name: review.authorName,
      author_photo_url: review.authorPhotoUrl,
      rating: review.rating,
      comment: review.comment,
      review_date: review.reviewDate.toISOString(),
      status: "unanswered",
    }, { onConflict: "external_review_id" });
  }

  return NextResponse.json({ success: true, count: reviews.length });
}
