import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyRazorpaySignature } from "@/lib/services/razorpay";

export async function POST(request: Request) {
  try {
    const bodyText = await request.text();
    const signature = request.headers.get("x-razorpay-signature") || "";
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "secret_dummy";

    if (secret !== "secret_dummy" && !verifyRazorpaySignature(bodyText, signature, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);
    const supabase = await createClient();

    const subscriptionEntity = event.payload?.subscription?.entity;
    if (subscriptionEntity) {
      const razorpaySubId = subscriptionEntity.id;
      const status = subscriptionEntity.status === "active" ? "active" : "past_due";

      await supabase
        .from("subscriptions")
        .update({
          status,
          current_period_end: new Date(subscriptionEntity.current_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_subscription_id", razorpaySubId);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
