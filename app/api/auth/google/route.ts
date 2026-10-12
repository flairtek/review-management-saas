import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get("organization_id");

  const clientId = process.env.GOOGLE_CLIENT_ID || "dummy-client-id";
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";

  const scope = encodeURIComponent("https://www.googleapis.com/auth/business.manage");

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=${organizationId || ""}`;

  return NextResponse.redirect(googleAuthUrl);
}
