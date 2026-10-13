import { createClient } from "@/lib/supabase/server";

export async function createAlert(
  orgId: string,
  title: string,
  message: string,
  type: "low_rating" | "safety_flag" | "sync_error" | "general"
) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("notifications").insert({
    organization_id: orgId,
    title,
    message,
    type,
  }).select().single();

  if (error) {
    console.error("Failed to create alert notification:", error);
  }

  return data;
}
