import { createClient } from "@/lib/supabase/server";

export async function verifySuperadmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_superadmin")
      .eq("id", user.id)
      .single();

    return profile?.is_superadmin === true;
  } catch (err) {
    // When called outside request context (e.g. tests or pre-renders)
    return false;
  }
}
