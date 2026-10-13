import { NextResponse } from "next/server";
import { generateReviewReply } from "@/lib/services/ai-reply-engine";

export async function POST(request: Request) {
  try {
    const { reviewId, toneOverride, customInstructions, forceAutoPublish } = await request.json();

    if (!reviewId) {
      return NextResponse.json({ error: "Missing required parameter: reviewId" }, { status: 400 });
    }

    const reply = await generateReviewReply(reviewId, {
      toneOverride,
      customInstructions,
      forceAutoPublish,
    });

    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    console.error("AI reply generation error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}