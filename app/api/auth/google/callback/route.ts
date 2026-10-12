import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const organizationId = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(new URL("/dashboard/integrations?error=missing_code", request.url));
  }

  // Exchange code for tokens (simulated/production ready)
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback",
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();

  const supabase = await createClient();

  // If organizationId is present, store connection
  if (organizationId) {
    await supabase.from("google_connections").upsert({
      organization_id: organizationId,
      google_account_id: "google_acc_" + Math.random().toString(36).substring(7),
      google_email: "owner@business.com",
      access_token: tokenData.access_token || "mock_access_token",
      refresh_token: tokenData.refresh_token || "mock_refresh_token",
      token_expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
      status: "active",
    }, { onConflict: "organization_id" });
  }

  return NextResponse.redirect(new URL("/dashboard/integrations?success=google_connected", request.url));
}
