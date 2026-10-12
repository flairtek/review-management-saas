import React from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Google Business Profile",
      status: "Live & Official",
      description:
        "Direct OAuth 2.0 integration with Google's Business Profile APIs for instant review sync, rating updates, and direct reply publishing.",
      category: "Review Source",
      badge: "Official Partner API",
    },
    {
      name: "Razorpay",
      status: "Live & Verified",
      description:
        "Secure subscription billing for India and international markets. Supports UPI, credit/debit cards, NetBanking, and automated recurring cycles.",
      category: "Payments",
      badge: "PCI-DSS Compliant",
    },
    {
      name: "WhatsApp Business API",
      status: "Available on Growth & Agency",
      description:
        "Send verified, compliant review request messages directly to customers' WhatsApp with direct Google review link pre-filled.",
      category: "Messaging",
      badge: "Meta Verified",
    },
    {
      name: "Transactional Email",
      status: "Built-in",
      description:
        "Instant alerts on low ratings and automated review invitation campaigns with high deliverability via Resend/SendGrid infrastructure.",
      category: "Notifications",
      badge: "High Deliverability",
    },
    {
      name: "Supabase & Postgres Webhooks",
      status: "Enterprise Ready",
      description:
        "Real-time event streaming and Row Level Security isolation protecting all multi-tenant customer and business data.",
      category: "Infrastructure",
      badge: "SOC2 & ISO Ready",
    },
    {
      name: "Custom Webhooks & Zapier",
      status: "Coming Soon",
      description:
        "Connect review events, sentiment alerts, and sync data into your CRM, Slack, or internal POS systems effortlessly.",
      category: "Automation",
      badge: "Beta",
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="glow" className="mb-4">
            Ecosystem Integrations
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Seamlessly Connected to the Tools You Trust
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Enterprise-grade APIs and official developer connections built for security, reliability, and real-time synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((item) => (
            <Card key={item.name} className="p-8 border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {item.category}
                </span>
                <Badge variant="secondary" className="text-[11px]">
                  {item.badge}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>{item.status}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/onboarding">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Connect Your Google Business Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
