import React from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Utensils,
  Stethoscope,
  Building,
  Wrench,
  ShoppingBag,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

export default function IndustriesPage() {
  const industries = [
    {
      title: "Restaurants, Cafés & Food Outlets",
      icon: Utensils,
      color: "text-amber-600 bg-amber-50",
      description:
        "Respond swiftly to foodie reviews praising your dishes or highlighting dining service. Build authentic engagement that turns casual diners into loyal patrons.",
      points: [
        "Mention specific dishes and seasonal specials automatically",
        "Empathetic escalation for food quality or wait-time complaints",
        "Multi-branch sentiment comparison across dining locations",
      ],
    },
    {
      title: "Healthcare Providers & Dental Clinics",
      icon: Stethoscope,
      color: "text-emerald-600 bg-emerald-50",
      description:
        "Protect doctor-patient confidentiality with strict healthcare guardrails. Respond professionally without disclosing private medical information.",
      points: [
        "HIPAA/patient privacy compliance safeguards",
        "Empathetic replies acknowledging compassionate care",
        "Mandatory approval routing for clinical grievances",
      ],
    },
    {
      title: "Real Estate Agencies & Developers",
      icon: Building,
      color: "text-blue-600 bg-blue-50",
      description:
        "Property buyers research extensively before visiting. High-rating consistency and professional responses validate credibility for high-ticket sales.",
      points: [
        "Professional and formal tones for investor confidence",
        "Multi-property location management",
        "Prompt handling of site-visit inquiries and feedback",
      ],
    },
    {
      title: "Automotive & Service Centers",
      icon: Wrench,
      color: "text-slate-700 bg-slate-100",
      description:
        "Build trust in vehicle servicing, transparent pricing, and mechanic professionalism with tailored review responses.",
      points: [
        "Acknowledge turnaround time and repair transparency",
        "De-escalate negative feedback on service delays",
        "Automated review requests after service completion",
      ],
    },
    {
      title: "Retail Stores, Salons & Spas",
      icon: ShoppingBag,
      color: "text-pink-600 bg-pink-50",
      description:
        "Boost local foot traffic by showcasing customer satisfaction regarding product variety, styling, and staff hospitality.",
      points: [
        "Warm, personal response tone reflecting boutique hospitality",
        "QR codes on checkout counters to collect verified reviews",
        "Identify staff members frequently praised by customers",
      ],
    },
    {
      title: "Digital Marketing & SEO Agencies",
      icon: Briefcase,
      color: "text-indigo-600 bg-indigo-50",
      description:
        "Manage review reputation for all your client brands in a single agency portal with white-label reports and team permission controls.",
      points: [
        "Multi-tenant agency workspace with separate client views",
        "White-label weekly/monthly PDF & CSV executive reports",
        "Granular team roles (Owner, Manager, Approver)",
      ],
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="glow" className="mb-4">
            Tailored Industry Solutions
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Customized AI Workflows for Every Industry
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            One size doesn’t fit all. Flairtek Review AI configures terminology, tone, and safety rules matching the exact expectations of your market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Card key={ind.title} className="p-8 border-slate-200/80 hover:shadow-md transition-shadow">
                <div className={`p-3.5 w-fit rounded-xl ${ind.color} mb-5`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{ind.title}</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {ind.description}
                </p>

                <hr className="my-5 border-slate-100" />

                <ul className="space-y-2 text-xs text-slate-700">
                  {ind.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link href="/onboarding">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started for Your Business
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
