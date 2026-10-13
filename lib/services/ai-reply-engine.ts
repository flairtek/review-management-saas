import { createClient } from "@/lib/supabase/server";
import { getAIProvider } from "@/lib/ai/factory";
import { evaluateSafetyGuardrails } from "@/lib/ai/guardrails";
import { processReplyApproval } from "@/lib/services/google-reply-publisher";
import { ReviewTone } from "@/lib/ai/types";

export interface GenerateReplyOptions {
  toneOverride?: ReviewTone;
  customInstructions?: string;
  forceAutoPublish?: boolean;
}

export async function generateReviewReply(reviewId: string, options?: GenerateReplyOptions) {
  const supabase = await createClient();

  const { data: review, error: revError } = await supabase
    .from("reviews")
    .select("*, business_locations(*)")
    .eq("id", reviewId)
    .single();

  if (revError || !review) throw new Error("Review not found");

  const location = review.business_locations;
  const provider = getAIProvider();

  // 1. Run safety guardrails
  const safety = evaluateSafetyGuardrails(review.comment || "", review.rating);

  // 2. Select tone & instructions
  const tone = options?.toneOverride || (location.ai_tone as ReviewTone) || "Professional";
  const customInstructions = options?.customInstructions || location.ai_custom_instructions;

  // 3. Generate reply via AI provider
  const generation = await provider.generateReply({
    reviewText: review.comment || "",
    rating: review.rating,
    authorName: review.author_name,
    businessName: location.name,
    tone,
    customInstructions,
  });

  // 4. Save reply draft in database
  const { data: reply, error: repError } = await supabase
    .from("review_replies")
    .insert({
      review_id: review.id,
      organization_id: review.organization_id,
      reply_text: generation.replyText,
      tone_used: tone,
      is_ai_generated: true,
      model_used: generation.model,
      prompt_tokens: generation.promptTokens,
      completion_tokens: generation.completionTokens,
      safety_flags: safety.flags,
    })
    .select()
    .single();

  if (repError) throw repError;

  // 5. Update review status
  await supabase
    .from("reviews")
    .update({ status: "drafted" })
    .eq("id", review.id);

  // 6. Handle eligible auto-reply
  const shouldAutoReply =
    options?.forceAutoPublish ||
    (location.automation_mode === "auto-reply" &&
      safety.safeForAutoReply &&
      review.rating >= (location.auto_reply_min_rating || 4));

  if (shouldAutoReply) {
    try {
      await processReplyApproval(reply.id);
    } catch (err) {
      console.error("Auto-reply publication failed:", err);
    }
  }

  return reply;
}
