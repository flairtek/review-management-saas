"use client";

import React, { useState } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Badge } from "@/ui/badge";
import {
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  Sparkles,
  Bell,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  ArrowRight,
  X,
  Briefcase,
  FileText,
  Edit,
  Zap,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState("");
  const [orgName, setOrgName] = useState("");
  const [website, setWebsite] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [gbpConnected, setGBPConnected] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [aiTone, setAITone] = useState("Professional");
  const [automationMode, setAutomationMode] = useState("approval-required");
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    whatsapp: false,
    lowRatingAlert: true,
    newReviewAlert: true,
  });

  const steps = [
    { id: 1, title: "Welcome", subtitle: "Let's set up your reputation management workspace" },
    { id: 2, title: "Business Type", subtitle: "Tell us about your business category" },
    { id: 3, title: "Organization Details", subtitle: "Enter your business information" },
    { id: 4, title: "Connect Google", subtitle: "Link your Google Business Profile account" },
    { id: 5, title: "Select Locations", subtitle: "Choose which locations to manage" },
    { id: 6, title: "AI Response Tone", subtitle: "Select your preferred reply style" },
    { id: 7, title: "Automation Mode", subtitle: "Choose how responses are published" },
    { id: 8, title: "Notification Settings", subtitle: "Configure alerts and updates" },
    { id: 9, title: "Almost Done", subtitle: "Review your setup and finish" },
  ];

  const getProgress = () => Math.round(((step - 1) / (steps.length - 1)) * 100);

  const handleNext = () => {
    if (step < steps.length) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSkip = () => setStep(steps.length);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar Progress */}
      <aside className="w-64 border-r border-slate-200/80 bg-white flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm">
              F
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 leading-tight">
                Flairtek <span className="text-blue-600">Review AI</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">
                Onboarding in Progress
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkip}
            className="ml-auto"
          >
            <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full bg-blue-600 transition-all duration-300 w-${getProgress()}%`} />
          </div>
          <p className="mt-2 text-center text-xs font-medium text-slate-600">
            Step {step} of {steps.length}
          </p>

          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg",
                  s.id < step
                    ? "text-emerald-600 font-semibold bg-emerald-50"
                    : s.id === step
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-slate-400 hover:bg-slate-50"
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                  {s.id < step && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                  {s.id === step && (
                    <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
                  )}
                  {s.id > step && (
                    <div className="h-4 w-4 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs">
                      {s.id}
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-sm font-medium">{s.title}</span>
                  <span className="text-xs text-slate-500">{s.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <Button
            onClick={handlePrev}
            variant="outline"
            size="sm"
            disabled={step === 1}
            className="w-full justify-between"
          >
            <span>Previous</span>
            {step > 1 && <ArrowRight className="h-4 w-4 rotate-180" />}
          </Button>
          <Button
            onClick={() => (step === steps.length ? window.location.href = "/dashboard" : handleNext())}
            variant={step === steps.length ? "default" : "outline"}
            size="sm"
            className="w-full mt-2 justify-between"
          >
            {step === steps.length ? (
              <>
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Card className="p-6 border-slate-200/80">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">
            Flairtek Review AI Setup
          </h1>

          {/* Step Content */}
          {step === 1 && (
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Welcome to Flairtek Review AI
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto mb-6">
                We'll help you connect your Google Business Profile, set up AI-powered responses, and get ready to manage your online reputation in just a few minutes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Connect GBP</h3>
                  <p className="text-sm text-slate-600">Link your Google Business locations</p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">AI Responses</h3>
                  <p className="text-sm text-slate-600">Generate contextual replies in seconds</p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-3">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Analytics</h3>
                  <p className="text-sm text-slate-600">Track sentiment and trends</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                What type of business do you operate?
              </h2>
              <p className="text-sm text-slate-600">
                This helps us tailor the AI response tone and safety guardrails to your industry.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Restaurant & Café",
                  "Hotel & Resort",
                  "Clinic & Healthcare",
                  "Real Estate",
                  "Retail Store",
                  "Automotive Service",
                  "Salon & Spa",
                  "Digital Agency",
                  "Other",
                ].map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    size="lg"
                    onClick={() => setBusinessType(type)}
                    className={cn(
                      "w-full justify-start border-slate-200 hover:border-blue-300",
                      businessType === type && "border-blue-300 bg-blue-50 text-blue-600"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                        {type.split(" ")[0][0]}
                      </div>
                      <span className="text-base font-medium">{type}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <form className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Enter your business details
              </h2>
              <p className="text-sm text-slate-600">
                This information will be used for your workspace profile and invoices.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Business Name</Label>
                  <Input
                    id="org-name"
                    required
                    placeholder="e.g. The Grand Dine Café"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://yourbusiness.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@yourbusiness.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone / WhatsApp</Label>
                    <Input
                      id="contact-phone"
                      placeholder="+91 98765 43210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Connect Your Google Business Profile
              </h2>
              <p className="text-sm text-slate-600">
                Securely connect using your Google account to access reviews and publish responses.
              </p>
              <div className="border-2 border-slate-200/50 rounded-xl p-8 text-center hover:border-slate-100 transition-all">
                {gbpConnected ? (
                  <>
                    <CheckCircle2 className="h-12 w-12 text-emerald-600 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Google Business Profile Connected
                    </h3>
                    <p className="text-sm text-slate-600">
                      Successfully connected to your Google account. Ready to select locations.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="h-16 w-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                      <Building2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Connect with Google
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                      We'll never access your password or post without your permission.
                    </p>
                    <Button
                      onClick={() => setGBPConnected(true)}
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      Connect Google Account
                    </Button>
                  </>
                )}
              </div>
              {gbpConnected && (
                <div className="mt-6">
                  <p className="text-sm text-slate-600">
                    Connected locations: 3 (e.g., Indiranagar, Koramangala, Whitefield)
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Select Locations to Manage
              </h2>
              <p className="text-sm text-slate-600">
                Choose which Google Business Profile locations you'd like to manage in this workspace.
              </p>
              <div className="space-y-4">
                <div className="border border-slate-200/80 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-700">
                      Discovered Locations ({selectedLocations.length} selected)
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedLocations([])}
                    >
                      Clear Selection
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      "The Grand Dine Café - Indiranagar",
                      "The Grand Dine Café - Koramangala",
                      "The Grand Dine Café - Whitefield",
                      "The Grand Dine Café - MG Road",
                    ].map((loc) => (
                      <label
                        key={loc}
                        className={cn(
                          "flex items-center gap-3 p-3 border border-slate-200/80 rounded-lg cursor-pointer transition-all",
                          selectedLocations.includes(loc)
                            ? "border-blue-300 bg-blue-50"
                            : "hover:bg-slate-50"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(loc)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLocations([...selectedLocations, loc]);
                            } else {
                              setSelectedLocations(selectedLocations.filter((l) => l !== loc));
                            }
                          }}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-base font-medium">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                You can always add or remove locations later from the Locations page.
              </p>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Choose Your AI Response Tone
              </h2>
              <p className="text-sm text-slate-600">
                Select how you'd like the AI to respond to reviews. You can change this anytime.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Professional",
                      desc: "Formal, courteous, and brand-aligned responses",
                      icon: "briefcase",
                    },
                    {
                      title: "Friendly",
                      desc: "Warm, conversational, and approachable tone",
                      icon: "smile",
                    },
                    {
                      title: "Warm & Empathetic",
                      desc: "Understanding and compassionate for sensitive feedback",
                      icon: "heart",
                    },
                    {
                      title: "Concise",
                      desc: "Short, direct, and to-the-point responses",
                      icon: "clipboard",
                    },
                  ].map((tone) => (
                    <Card
                      key={tone.title}
                      className={cn(
                        "p-6 border-slate-200/80 hover:border-blue-300 transition-colors cursor-pointer",
                        aiTone === tone.title && "border-blue-300 bg-blue-50"
                      )}
                      onClick={() => setAITone(tone.title)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center">
                          {tone.icon === "briefcase" && (
                            <Briefcase className="h-5 w-5 text-slate-600" />
                          )}
                          {tone.icon === "smile" && (
                            <Mail className="h-5 w-5 text-slate-600" />
                          )}
                          {tone.icon === "heart" && (
                            <CheckCircle2 className="h-5 w-5 text-slate-600" />
                          )}
                          {tone.icon === "clipboard" && (
                            <FileText className="h-5 w-5 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="text-lg font-bold text-slate-900">{tone.title}</h3>
                          <p className="text-sm text-slate-600">{tone.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Select Automation Mode
              </h2>
              <p className="text-sm text-slate-600">
                Choose how responses are published. For safety, we recommend starting with Approval Required.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Manual (Draft Only)",
                      desc: "AI generates drafts that you manually copy/publish. Zero automation.",
                      icon: "edit",
                      value: "manual",
                    },
                    {
                      title: "Approval Required (Recommended)",
                      desc: "AI creates drafts for your review. You approve before publishing.",
                      icon: "check-circle",
                      value: "approval-required",
                    },
                    {
                      title: "Eligible Auto-Reply",
                      desc: "Only safe, positive reviews auto-publish based on your rules.",
                      icon: "zap",
                      value: "auto-reply",
                    },
                  ].map((mode) => (
                    <Card
                      key={mode.title}
                      className={cn(
                        "p-6 border-slate-200/80 hover:border-blue-300 transition-colors cursor-pointer",
                        automationMode === mode.value && "border-blue-300 bg-blue-50"
                      )}
                      onClick={() => setAutomationMode(mode.value)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center">
                          {mode.icon === "edit" && (
                            <Edit className="h-5 w-5 text-slate-600" />
                          )}
                          {mode.icon === "check-circle" && (
                            <CheckCircle2 className="h-5 w-5 text-slate-600" />
                          )}
                          {mode.icon === "zap" && (
                            <Zap className="h-5 w-5 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="text-lg font-bold text-slate-900">{mode.title}</h3>
                          <p className="text-sm text-slate-600">{mode.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Negative, sensitive, or low-rating (&lt; 3 stars) reviews are always routed to human approval, regardless of mode.
                </p>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Configure Notification Preferences
              </h2>
              <p className="text-sm text-slate-600">
                Choose how you'd like to be alerted about important review activity.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={notificationPrefs.email}
                      onChange={(e) =>
                        setNotificationPrefs({ ...notificationPrefs, email: e.target.checked })
                      }
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-base font-medium">
                      Email notifications for new reviews and alerts
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={notificationPrefs.whatsapp}
                      onChange={(e) =>
                        setNotificationPrefs({ ...notificationPrefs, whatsapp: e.target.checked })
                      }
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-base font-medium">
                      WhatsApp alerts for urgent feedback (Growth/Agency plans)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={notificationPrefs.lowRatingAlert}
                      onChange={(e) =>
                        setNotificationPrefs({
                          ...notificationPrefs,
                          lowRatingAlert: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-base font-medium">
                      Instant alerts for 1-star and 2-star reviews
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={notificationPrefs.newReviewAlert}
                      onChange={(e) =>
                        setNotificationPrefs({
                          ...notificationPrefs,
                          newReviewAlert: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-base font-medium">
                      Notify when new reviews arrive (sync complete)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-6 text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Setup Complete!
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto mb-6">
                Your Flairtek Review AI workspace is ready. Let's review your configuration before diving in.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 border-slate-200/80">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Workspace Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-600" />
                      <span className="font-medium">Business Type:</span>
                      <span>{businessType || "Not selected"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-slate-600" />
                      <span className="font-medium">Organization:</span>
                      <span>{orgName || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Google Connection:</span>
                      <span>{gbpConnected ? "Connected" : "Not connected"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-600" />
                      <span className="font-medium">Locations Selected:</span>
                      <span>{selectedLocations.length} locations</span>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-slate-200/80">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">AI & Automation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Response Tone:</span>
                      <span>{aiTone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-600" />
                      <span className="font-medium">Automation Mode:</span>
                      <span>
                        {automationMode === "manual"
                          ? "Manual (Draft Only)"
                          : automationMode === "approval-required"
                          ? "Approval Required"
                          : "Eligible Auto-Reply"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-slate-600" />
                      <span className="font-medium">Email Alerts:</span>
                      <span>{notificationPrefs.email ? "Enabled" : "Disabled"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-600" />
                      <span className="font-medium">WhatsApp Alerts:</span>
                      <span>
                        {notificationPrefs.whatsapp ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              <Button
                onClick={() => (window.location.href = "/dashboard")}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
