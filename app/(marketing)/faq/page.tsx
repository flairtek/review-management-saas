"use client";

import React, { useState } from "react";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Flairtek Review AI connect to my Google Business Profile?",
      a: "We connect securely using Google's official Business Profile APIs via OAuth 2.0. You simply sign in with your Google Account, grant permissions to view and reply to reviews, and choose which locations to sync. We never ask for or store your Google password.",
    },
    {
      q: "Can the AI post replies automatically without my approval?",
      a: "Yes, but only if you explicitly choose to enable 'Safe Auto-Pilot'. By default, all new accounts start in 'Approval Required' mode where you or your team must review and click 'Publish' for each reply. Furthermore, negative, sensitive, or low-rating reviews are always routed for human review, even when auto-pilot is turned on.",
    },
    {
      q: "Will the AI sound robotic or repeat the same reply to everyone?",
      a: "No. Our AI engine is context-aware. It analyzes the specific details mentioned in each review—such as specific food items, staff names, or service experiences—and crafts varied, thoughtful responses in your preferred tone (Friendly, Professional, Empathetic, or Concise).",
    },
    {
      q: "Does this violate Google's review policies?",
      a: "Not at all. Google actively encourages business owners to respond promptly to reviews. Flairtek Review AI uses official Google APIs to submit responses. We strictly comply with Google's guidelines: we do not buy reviews, incentivize fake feedback, or attempt review gating.",
    },
    {
      q: "What payment methods are supported via Razorpay?",
      a: "We accept all major payment methods across India, including UPI (Google Pay, PhonePe, Paytm), NetBanking across 50+ Indian banks, and all major Credit and Debit cards (Visa, Mastercard, RuPay). Subscriptions renew automatically, and you can cancel anytime with a single click.",
    },
    {
      q: "Can I manage multiple locations or client accounts?",
      a: "Yes. Our Growth plan supports up to 5 locations, and our Agency plan supports up to 20+ locations. Agencies can set up dedicated sub-workspaces, invite client team members with limited roles, and generate white-label PDF/CSV reports.",
    },
    {
      q: "What happens if a customer leaves a 1-star or angry review?",
      a: "The system immediately flags the review as negative sentiment, generates an empathetic, de-escalating draft addressing the complaint respectfully, and alerts your team via email and dashboard notification for immediate attention.",
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="glow" className="mb-4">
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Everything You Need to Know
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Clear answers about Google API integrations, AI response safety, and subscription management.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={faq.q}
                className="overflow-hidden border-slate-200/80 transition-all cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 pr-4">{faq.q}</h3>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2 pt-4">
                    {faq.a}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
