import React from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Sparkles, Shield, Heart, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="glow" className="mb-4">
            About Flairtek Review AI
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Empowering Businesses to Lead with Authentic Reputation
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Owned and built by Flairtek, we deliver AI automation that helps local businesses, healthcare providers, and agencies turn reviews into trusted customer relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why We Built Flairtek Review AI
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Every day, millions of customers make buying decisions based on Google reviews. Yet, business owners and store managers are stretched thin—often leaving reviews unanswered for weeks or sending robotic, copy-pasted responses that turn customers away.
            </p>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              We built <strong>Flairtek Review AI</strong> to solve this fundamental gap. With deep Google API integration, intelligent safety guardrails, and contextual response generation, we give businesses the power to respond to every review in seconds while maintaining a human, authentic voice.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://flairtek.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                Visit Parent Company: Flairtek.com ↗
              </a>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Our Guiding Commitments</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Absolute Policy Compliance</strong>
                  We never buy, manipulate, or fake reviews. We work exclusively with Google’s official APIs and review guidelines.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Safety Before Speed</strong>
                  Negative or sensitive reviews are never blind-published. Critical feedback receives the human attention it deserves.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Built for Non-Technical Users</strong>
                  If you can use WhatsApp or check an email, you can use Flairtek Review AI without any technical training.
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center rounded-2xl bg-blue-50 border border-blue-200/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Ready to upgrade your business reputation?
          </h2>
          <p className="mt-2 text-slate-600 max-w-lg mx-auto text-sm">
            Join hundreds of satisfied business owners who trust Flairtek Review AI for their Google Business Profile reputation.
          </p>
          <div className="mt-6">
            <Link href="/onboarding">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your 14-Day Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
