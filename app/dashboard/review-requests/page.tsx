"use client";

import { useState } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { QrCode, Send, MessageSquare, Mail, Copy, Check, ExternalLink } from "lucide-react";
import { generateReviewQRCodeUrl } from "@/lib/services/qr";

export default function ReviewRequestsPage() {
  const [copied, setCopied] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientContact, setRecipientContact] = useState("");
  const [channel, setChannel] = useState<"email" | "whatsapp">("whatsapp");
  const [sentSuccess, setSentSuccess] = useState(false);

  const dummyPlaceId = "ChIJD7fiBh99rjsR0B6p47qFnoU";
  const directReviewLink = `https://search.google.com/local/writereview?placeid=${dummyPlaceId}`;
  const qrCodeUrl = generateReviewQRCodeUrl(dummyPlaceId);

  const handleCopy = () => {
    navigator.clipboard.writeText(directReviewLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !recipientContact) return;
    setSentSuccess(true);
    setTimeout(() => {
      setRecipientName("");
      setRecipientContact("");
      setSentSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Review Request Automation</h1>
        <p className="text-sm text-slate-500">Collect more 5-star Google reviews via WhatsApp, Email campaigns, and print-ready QR codes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code & Direct Link */}
        <Card className="p-6 border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">In-Store QR Code</h2>
          </div>
          <p className="text-xs text-slate-500">Place this QR code at checkout, on tables, or on receipts for instant review collection.</p>

          <div className="flex justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCodeUrl} alt="Review QR Code" className="w-48 h-48 rounded-lg shadow-sm" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Direct Google Review Link</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={directReviewLink}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 truncate focus:outline-none"
              />
              <Button size="sm" variant="outline" onClick={handleCopy} className="shrink-0 text-xs">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Send Individual Request Form */}
        <Card className="lg:col-span-2 p-6 border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Send Review Request</h2>
          </div>
          <p className="text-xs text-slate-500">Dispatch a personalized review invitation directly to your customer via WhatsApp or Email.</p>

          <form onSubmit={handleSend} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {channel === "whatsapp" ? "WhatsApp Number" : "Email Address"}
                </label>
                <input
                  type={channel === "whatsapp" ? "tel" : "email"}
                  required
                  placeholder={channel === "whatsapp" ? "+91 98765 43210" : "rahul@example.com"}
                  value={recipientContact}
                  onChange={(e) => setRecipientContact(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Delivery Channel</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === "whatsapp"}
                    onChange={() => setChannel("whatsapp")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp
                  </span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === "email"}
                    onChange={() => setChannel("email")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <Mail className="h-3.5 w-3.5 text-blue-600" /> Email
                  </span>
                </label>
              </div>
            </div>

            {sentSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium">
                Review request dispatched successfully! Tracking link generated.
              </div>
            )}

            <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
              <Send className="h-3.5 w-3.5 mr-1.5" /> Dispatch Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
