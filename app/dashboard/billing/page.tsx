"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { PLANS } from "@/lib/config/plans";
import { CreditCard, Check, Sparkles } from "lucide-react";

export default function BillingPage() {
  const [subscription, setSubscription] = useState<any>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    async function loadBilling() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: membership } = await supabase
          .from("organization_members")
          .select("organization_id")
          .eq("user_id", user.id)
          .single();

        if (membership) {
          setOrgId(membership.organization_id);
          const { data: sub } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("organization_id", membership.organization_id)
            .single();

          if (sub) setSubscription(sub);
        }
      } catch (err) {
        console.error("Failed to load billing:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBilling();
  }, []);

  const handleUpgrade = async (planId: string) => {
    if (!orgId) return;
    setCheckoutLoading(planId);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, organizationId: orgId }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setCheckoutLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-sm text-slate-500">Loading billing information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Subscription & Billing</h1>
        <p className="text-sm text-slate-500">Manage your subscription plan, billing cycle, and Razorpay payment settings.</p>
      </div>

      {/* Current Subscription Card */}
      <Card className="p-6 border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-blue-400" />
            <div>
              <h3 className="text-base font-bold capitalize">
                {subscription ? `${subscription.plan_tier} Plan` : "Free Trial / Starter"}
              </h3>
              <p className="text-xs text-slate-400">
                {subscription?.razorpay_subscription_id ? `ID: ${subscription.razorpay_subscription_id}` : "No active subscription"}
              </p>
            </div>
          </div>
          <Badge variant={subscription?.status === "active" ? "success" : "warning"} className="uppercase">
            {subscription?.status || "Trialing"}
          </Badge>
        </div>
      </Card>

      {/* Plan Tiers */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(PLANS).map((plan) => {
            const isCurrent = subscription?.plan_tier === plan.id;
            return (
              <Card key={plan.id} className={`p-6 border-slate-200/80 flex flex-col justify-between ${isCurrent ? 'ring-2 ring-blue-600 bg-blue-50/20' : ''}`}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹{plan.priceINR}</span>
                      <span className="text-xs text-slate-500">/ month</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Button
                    disabled={isCurrent || checkoutLoading === plan.id}
                    onClick={() => handleUpgrade(plan.id)}
                    className={`w-full text-xs font-bold ${isCurrent ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    {isCurrent ? "Current Plan" : checkoutLoading === plan.id ? "Redirecting..." : "Upgrade via Razorpay"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
