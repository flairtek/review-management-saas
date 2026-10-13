import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const supabase = await createClient();

  // 1. Find review request by tracking code
  const { data: req, error } = await supabase
    .from("review_requests")
    .select("*, business_locations(google_location_id)")
    .eq("tracking_code", code)
    .single();

  if (error || !req) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Update request status to clicked
  await supabase
    .from("review_requests")
    .update({
      status: "clicked",
      clicked_at: new Date().toISOString(),
    })
    .eq("id", req.id);

  // 3. Resolve Google review destination URL
  const placeId = req.business_locations?.google_location_id || "ChIJD7fiBh99rjsR0B6p47qFnoU";
  const googleReviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;

  return NextResponse.redirect(googleReviewUrl);
}
