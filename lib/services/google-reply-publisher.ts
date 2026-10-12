import { createClient } from "@/lib/supabase/server";
import { publishReply } from "@/lib/google/gbp";

export async function processReplyApproval(replyId: string) {
  const supabase = await createClient();

  // 1. Get reply and connection
  const { data: reply, error: replyError } = await supabase
    .from("review_replies")
    .select("*, reviews(external_review_id, location_id), business_locations!inner(google_connections(access_token))")
    .eq("id", replyId)
    .single();

  if (replyError || !reply) throw new Error("Reply not found");

  // 2. Publish to Google
  const success = await publishReply(
    reply.business_locations.google_connections.access_token,
    `accounts/x/locations/${reply.reviews.location_id}/reviews/${reply.reviews.external_review_id}`,
    reply.reply_text
  );

  if (success) {
    await supabase.from("review_replies").update({
      published_to_google: true,
      published_at: new Date().toISOString(),
    }).eq("id", replyId);

    await supabase.from("reviews").update({ status: "published" }).eq("id", reply.review_id);
  }

  return success;
}
