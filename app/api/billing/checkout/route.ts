import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createRazorpaySubscription } from "@/lib/services/razorpay";
import { PLANS } from "@/lib/config/plans";

export async function POST(request: Request) {
  try {
    const { planId, organizationId } = await request.json();
    const plan = PLANS[planId];

    if (!plan || !organizationId) {
      return NextResponse.json({ error: "Invalid plan or organization ID" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { subscriptionId, shortUrl } = await createRazorpaySubscription(
      plan.razorpayPlanId,
      user?.email || "billing@flairtek.com"
    );

    // Upsert subscription record in pending/trialing state
    await supabase.from("subscriptions").upsert({
      organization_id: organizationId,
      razorpay_subscription_id: subscriptionId,
      plan_tier: plan.id,
      status: "trialing",
      billing_cycle: "monthly",
    }, { onConflict: "organization_id" });

    return NextResponse.json({ success: true, checkoutUrl: shortUrl });
  } catch (error: any) {
    console.error("Checkout creation error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
