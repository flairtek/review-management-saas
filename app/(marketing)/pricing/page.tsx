"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Ideal for single-location cafés, clinics, and local shops.",
      monthlyPrice: 999,
      annualPrice: 799,
      badge: null,
      features: [
        "1 Google Business Location",
        "100 AI Replies per month",
        "Official Google API sync",
        "Contextual AI tones (4 options)",
        "Approval Queue workflow",
        "Email notifications for new reviews",
        "Standard email support",
      ],
      ctaText: "Start 14-Day Free Trial",
      popular: false,
    },
    {
      name: "Growth",
      description: "Best for growing businesses and multi-outlet restaurants.",
      monthlyPrice: 2499,
      annualPrice: 1999,
      badge: "Most Popular",
      features: [
        "Up to 5 Google Business Locations",
        "500 AI Replies per month",
        "Safe Auto-Pilot for 5-star reviews",
        "Custom brand voice instructions",
        "Review request automation (Email & QR)",
        "Advanced sentiment & keyword analytics",
        "Weekly automated executive reports",
        "Priority support",
      ],
      ctaText: "Start 14-Day Free Trial",
      popular: true,
    },
    {
      name: "Agency",
      description: "For digital agencies and multi-brand regional franchises.",
      monthlyPrice: 5999,
      annualPrice: 4799,
      badge: "Scale & Agencies",
      features: [
        "Up to 20 Google Business Locations",
        "Unlimited AI Replies",
        "Multi-client team workspace & roles",
        "WhatsApp & Email review campaigns",
        "White-label PDF & CSV reports",
        "Cross-location comparative analytics",
        "Custom integration & API access",
        "Dedicated Account Manager",
      ],
      ctaText: "Get Started Now",
      popular: false,
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="glow" className="mb-4">
            Pricing Plans (INR)
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Simple, Transparent Subscription Plans
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            No surprise fees. No long-term lock-in. Cancel or upgrade anytime via Razorpay.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${billingCycle === "monthly" ? "text-slate-900" : "text-slate-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  billingCycle === "annual" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${billingCycle === "annual" ? "text-slate-900" : "text-slate-500"}`}>
              Annual
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            return (
              <Card
                key={plan.name}
                className={`p-8 flex flex-col justify-between relative transition-all ${
                  plan.popular
                    ? "border-2 border-blue-600 shadow-xl shadow-blue-500/10 scale-105 z-10 bg-white"
                    : "border-slate-200/80 hover:shadow-md bg-white"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white shadow-sm font-bold px-3 py-1 text-xs">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {formatCurrencyINR(price)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  {billingCycle === "annual" && (
                    <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                      Billed annually (₹{price * 12}/yr)
                    </div>
                  )}

                  <hr className="my-6 border-slate-100" />

                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Included Features:
                  </div>
                  <ul className="space-y-3 text-sm text-slate-700">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link href="/onboarding" className="w-full block">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className={`w-full font-bold ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    >
                      {plan.ctaText}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Security & Payment Notes */}
        <div className="mt-16 text-center text-xs text-slate-500 max-w-2xl mx-auto flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Secure payment processing via Razorpay. UPI, NetBanking, and credit/debit cards accepted.</span>
          </div>
          <p>
            Taxes (GST) applicable at checkout where required. 14-day free trial on Starter and Growth tiers.
          </p>
        </div>
      </div>
    </div>
  );
}
