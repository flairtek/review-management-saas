import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: locationId } = await params;
    const { aiTone, aiCustomInstructions, autoReplyMinRating, safetyGuardrailsEnabled, automationMode } = await request.json();

    const supabase = await createClient();

    const updateData: any = {};
    if (aiTone !== undefined) updateData.ai_tone = aiTone;
    if (aiCustomInstructions !== undefined) updateData.ai_custom_instructions = aiCustomInstructions;
    if (autoReplyMinRating !== undefined) updateData.auto_reply_min_rating = autoReplyMinRating;
    if (safetyGuardrailsEnabled !== undefined) updateData.safety_guardrails_enabled = safetyGuardrailsEnabled;
    if (automationMode !== undefined) updateData.automation_mode = automationMode;

    const { data, error } = await supabase
      .from("business_locations")
      .update(updateData)
      .eq("id", locationId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, location: data });
  } catch (error: any) {
    console.error("Update AI settings error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}