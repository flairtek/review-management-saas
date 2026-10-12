import React from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Link2,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Shield,
  Clock,
  Layers,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      step: "01",
      title: "Connect Your Google Business Profile",
      description:
        "Authenticate using your official Google account in 30 seconds. Flairtek Review AI automatically discovers your authorized business locations and syncs all past and incoming reviews.",
      icon: Link2,
    },
    {
      step: "02",
      title: "Configure AI Brand Voice & Guardrails",
      description:
        "Select your preferred response tone (Professional, Friendly, Empathetic, Concise) and establish business context (e.g., parking availability, manager name, special policies).",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Review, Approve, or Auto-Pilot",
      description:
        "For maximum control, keep responses in the Approval Queue where you can edit and approve with a single tap. Or turn on Safe Auto-Pilot for verified 5-star reviews.",
      icon: CheckCircle2,
    },
    {
      step: "04",
      title: "Analyze Sentiment & Request New Reviews",
      description:
        "Track customer satisfaction trends across branches, identify operational bottlenecks, and launch automated review request campaigns to attract more authentic 5-star ratings.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="glow" className="mb-4">
            Simple 4-Step Process
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            How Flairtek Review AI Works
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Designed from the ground up for busy business owners who want a 5-star online reputation without spending hours typing replies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.step} className="p-8 relative border-slate-200/80 hover:border-blue-300 transition-colors">
                <div className="text-3xl font-extrabold text-blue-600/30 mb-4">
                  {s.step}
                </div>
                <div className="p-3 w-fit rounded-xl bg-blue-50 text-blue-600 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 border border-slate-200 rounded-2xl bg-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="success" className="mb-3">
                Built-in Safety
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Never worry about inappropriate or hallucinated AI responses
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Flairtek Review AI enforces strict safety guardrails. Our engine treats all review text as untrusted data to prevent prompt injection. It never promises unauthorized refunds, unverified appointments, or false claims.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Negative and sensitive reviews always trigger human approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Healthcare & clinic reviews respect patient confidentiality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Full audit log of all generated and published responses</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">
                Response Workflow Architecture
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">1. Google Review Event</span>
                  <Badge variant="secondary">API Webhook / Sync</Badge>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between">
                  <span className="font-semibold text-blue-900">2. Prompt Validation & Safety Filter</span>
                  <Badge variant="glow">Anti-Injection</Badge>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">3. Human Approval or Auto-Pilot Rule</span>
                  <Badge variant="success">Workspace Policy</Badge>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
                  <span className="font-semibold text-emerald-900">4. Published to Google Business Profile</span>
                  <Badge variant="success">Verified Live</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
