import React from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Sparkles,
  ShieldCheck,
  Building2,
  Send,
  BarChart3,
  RefreshCw,
  Bell,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";

export default function FeaturesPage() {
  const featureList = [
    {
      title: "Google Business Profile OAuth Sync",
      description:
        "Direct connection to Google's official Business Profile APIs. Instant synchronization of new reviews, review updates, reviewer display names, and ratings.",
      icon: RefreshCw,
      badge: "Core Integration",
    },
    {
      title: "Context-Aware AI Reply Engine",
      description:
        "Generates customized replies reflecting review sentiment, specific dishes or services mentioned, and your brand's unique tone without generic boilerplate.",
      icon: Sparkles,
      badge: "AI Powered",
    },
    {
      title: "Multi-Tier Approval Guardrails",
      description:
        "Three distinct automation modes: Manual drafting, Mandatory human approval (default), and Rule-based Auto-Pilot. Negative reviews are always escalated.",
      icon: ShieldCheck,
      badge: "Reputation Safety",
    },
    {
      title: "Multi-Location Workspace",
      description:
        "Manage 1 to 500+ locations under a single dashboard. Compare ratings, response times, and customer sentiment across different branches.",
      icon: Building2,
      badge: "Enterprise Ready",
    },
    {
      title: "Review Request Automation",
      description:
        "Send compliant review invites to happy customers via Email, verified WhatsApp business messages, or printed QR codes directing to your Google page.",
      icon: Send,
      badge: "Growth Engine",
    },
    {
      title: "Sentiment & Keyword Analytics",
      description:
        "Uncover common praises and recurring complaints. Track month-over-month rating trends, response rates, and customer sentiment scores.",
      icon: BarChart3,
      badge: "Actionable Insights",
    },
    {
      title: "Scheduled PDF & CSV Reports",
      description:
        "Automated weekly or monthly executive reports delivered directly to your inbox or client stakeholders with executive summaries.",
      icon: FileSpreadsheet,
      badge: "Reporting",
    },
    {
      title: "Instant Multi-Channel Alerts",
      description:
        "Real-time notifications via email and dashboard for 1-star reviews, negative sentiment detection, or reviews awaiting urgent attention.",
      icon: Bell,
      badge: "Alerts",
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="glow" className="mb-4">
            Feature Overview
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Everything You Need to Manage and Grow Your Reputation
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            A comprehensive suite designed for non-technical business owners, multi-location brands, and digital agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feat) => {
            const Icon = feat.icon;
            return (
              <Card key={feat.title} className="p-8 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feat.badge}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 rounded-2xl bg-slate-900 text-white p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Experience the AI Reply Assistant in action
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm">
            Sign up today and experience automated Google review sync with zero manual setup.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
