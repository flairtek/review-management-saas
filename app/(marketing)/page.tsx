"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import {
  Sparkles,
  Star,
  CheckCircle2,
  ShieldCheck,
  Building2,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Zap,
  Clock,
  Send,
  Users,
} from "lucide-react";

export default function HomePage() {
  const [selectedTone, setSelectedTone] = useState("Friendly");

  const sampleReview = {
    author: "Rahul Sharma",
    rating: 5,
    location: "The Grand Dine Café, Indiranagar",
    time: "2 hours ago",
    text: "Had an amazing Sunday brunch here! The truffle pasta was out of this world, and the staff was extremely attentive. Will definitely recommend to friends.",
  };

  const sampleReplies: Record<string, string> = {
    Friendly:
      "Hi Rahul! Thank you so much for the wonderful 5-star review! We're thrilled that you enjoyed our Sunday brunch and truffle pasta. Our team looks forward to welcoming you back soon! ☕✨",
    Professional:
      "Dear Mr. Sharma, Thank you for taking the time to share your dining experience. We are pleased to hear that our culinary offerings and service met your expectations. We appreciate your recommendation and look forward to serving you again.",
    "Warm & Empathetic":
      "Hello Rahul, reading your review made our whole team smile! Knowing our brunch and truffle pasta made your Sunday special means the world to us. Thank you for your kindness, and we can't wait to see you next time!",
    Concise:
      "Thanks Rahul! Glad you loved the truffle pasta and attentive service. See you again soon!",
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-6 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>AI Automation for Google Business Profiles</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-none">
            Every Review. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              A Smarter Response.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Manage Google reviews, generate contextual AI replies in seconds, understand customer sentiment, and build a stronger online reputation from one simple dashboard.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 text-base">
                Start 14-Day Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full text-base">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Official Google API Integration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Safe Auto-Pilot & Approval Queue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>No Credit Card Required for Trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Reply Demo Preview */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 -mt-6 mb-20">
        <Card className="overflow-hidden border-slate-200/80 shadow-xl bg-white">
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-semibold text-slate-500">
                Live AI Response Generator Demo
              </span>
            </div>
            <Badge variant="glow" className="text-[11px]">
              Ready to Publish
            </Badge>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Incoming Customer Review */}
            <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                      RS
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{sampleReview.author}</div>
                      <div className="text-[11px] text-slate-500">{sampleReview.location}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
                  &ldquo;{sampleReview.text}&rdquo;
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Received via Google Business Profile</span>
                <span>{sampleReview.time}</span>
              </div>
            </div>

            {/* AI Generated Reply */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Response Tone:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Friendly", "Professional", "Warm & Empathetic", "Concise"].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                        selectedTone === tone
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>

                <div className="relative rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AI Drafted Response</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {sampleReplies[selectedTone]}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <Button variant="outline" size="sm" className="text-xs">
                  Regenerate
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Publish to Google
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Value Pillars */}
      <section className="w-full bg-white py-20 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Why Businesses Choose Flairtek
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Turn customer feedback into your biggest growth driver
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Contextual AI Responses</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Generate tailored, brand-aligned replies taking into account review sentiment, specific dishes or services mentioned, and tone guidelines.
              </p>
            </Card>

            <Card className="p-8 border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Safety & Approval Guardrails</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Negative, sensitive, or legal reviews are automatically routed to human approval. Auto-reply only runs on eligible, safe positive reviews.
              </p>
            </Card>

            <Card className="p-8 border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Multi-Location Scaling</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Manage 1 to 500+ Google Business Profile locations in a single unified dashboard with aggregated sentiment analytics and team permissions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Industries */}
      <section className="w-full py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Built For Your Industry
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Specialized tone and guardrails for every vertical
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Restaurants & Cafés", desc: "Dishes, ambiance & service", icon: "☕" },
              { title: "Clinics & Doctors", desc: "Strict HIPAA/privacy safe", icon: "🩺" },
              { title: "Hotels & Resorts", desc: "Guest experience & rooms", icon: "🏨" },
              { title: "Real Estate", desc: "Property visits & trust", icon: "🏢" },
              { title: "Retail Stores", desc: "Products & checkout", icon: "🛍️" },
              { title: "Agencies", desc: "Multi-client client portal", icon: "💼" },
            ].map((ind) => (
              <Card key={ind.title} className="p-5 text-center hover:border-blue-300 transition-colors">
                <div className="text-3xl mb-2">{ind.icon}</div>
                <div className="text-sm font-bold text-slate-900">{ind.title}</div>
                <div className="text-[11px] text-slate-500 mt-1">{ind.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Banner */}
      <section className="w-full py-20 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Simple & Transparent Pricing
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Plans starting from ₹999/month
            </p>
            <p className="mt-3 text-slate-600">
              Includes full Google Business Profile synchronization, AI generation credits, and multi-location support.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View All Plans & Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Start Protecting Your Online Reputation Today
          </h2>
          <p className="mt-4 text-base text-blue-100 max-w-2xl mx-auto">
            Join hundreds of local businesses and agencies automating Google review responses safely with Flairtek Review AI.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold">
                Get Started in 2 Minutes
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
