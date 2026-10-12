"use client";

import React, { useState } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Badge } from "@/ui/badge";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="glow" className="mb-4">
            Get in Touch
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            We’d Love to Hear From You
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Have questions about multi-location plans, Google API integrations, or custom agency onboarding? Our team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <Card className="p-6 border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Email Us</div>
                  <div className="text-sm font-bold text-slate-900">support@flairtek.com</div>
                  <div className="text-xs text-slate-500">sales@flairtek.com</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Call / WhatsApp</div>
                  <div className="text-sm font-bold text-slate-900">+91 (India Support)</div>
                  <div className="text-xs text-slate-500">Mon - Sat, 9:30 AM - 6:30 PM IST</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Headquarters</div>
                  <div className="text-sm font-bold text-slate-900">Flairtek Technologies</div>
                  <div className="text-xs text-slate-500">Bengaluru & Pan-India Operations</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-slate-200/80 shadow-sm bg-white">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                  <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out to Flairtek Review AI. A specialist will contact you within 24 business hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="sm"
                    className="mt-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" required placeholder="Ramesh Patel" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Work Email</Label>
                      <Input id="email" type="email" required placeholder="ramesh@business.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone / WhatsApp Number</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="locations">Number of Google Locations</Label>
                      <Input id="locations" placeholder="e.g. 1 to 5 locations" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">How can we help your business?</Label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Tell us about your business, current review challenges, or required integrations..."
                      className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
