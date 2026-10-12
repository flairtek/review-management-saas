import React from "react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Star,
  MessageSquare,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Average Rating"
          value="4.8"
          change="+0.3"
          isPositive={true}
          subtitle="Across 3 connected locations"
          icon={Star}
          badge="Top Tier"
          badgeColor="bg-amber-50 text-amber-700"
        />
        <MetricCard
          title="Response Rate"
          value="96.4%"
          change="+4.1%"
          isPositive={true}
          subtitle="142 of 148 reviews answered"
          icon={MessageSquare}
          badge="Healthy"
          badgeColor="bg-emerald-50 text-emerald-700"
        />
        <MetricCard
          title="Avg. Response Time"
          value="4.2 mins"
          change="-12m"
          isPositive={true}
          subtitle="Powered by AI Assistant"
          icon={Clock}
          badge="Lightning"
          badgeColor="bg-blue-50 text-blue-700"
        />
        <MetricCard
          title="Pending Approvals"
          value="3 reviews"
          subtitle="Awaiting your sign-off"
          icon={Sparkles}
          badge="Action Needed"
          badgeColor="bg-amber-50 text-amber-700"
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reviews Inbox Preview */}
        <Card className="lg:col-span-2 p-6 border-slate-200/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Customer Reviews</h3>
              <p className="text-xs text-slate-500">Showing latest Google Business Profile reviews</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              View All Inbox
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                author: "Priya Nair",
                rating: 5,
                location: "Indiranagar",
                time: "1 hour ago",
                text: "Wonderful ambiance and the staff made our anniversary dinner extra special. Highly recommended!",
                status: "Replied via AI",
              },
              {
                author: "Vikram Malhotra",
                rating: 4,
                location: "Koramangala",
                time: "3 hours ago",
                text: "Great coffee and pastries. Wi-Fi was a bit slow during peak hours though.",
                status: "Pending Approval",
              },
              {
                author: "Ananya Sen",
                rating: 1,
                location: "Whitefield",
                time: "Yesterday",
                text: "Had to wait 45 minutes for our table despite having a confirmed reservation.",
                status: "Flagged for Manager",
              },
            ].map((rev, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{rev.author}</span>
                    <span className="text-xs text-slate-400">• {rev.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <Badge
                      variant={
                        rev.status === "Replied via AI"
                          ? "success"
                          : rev.status === "Pending Approval"
                          ? "warning"
                          : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {rev.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{rev.time}</span>
                  <button className="text-blue-600 font-semibold hover:underline">
                    View Details & Response →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions & AI Status */}
        <div className="space-y-6">
          <Card className="p-6 border-slate-200/80 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-blue-200" />
              <h3 className="text-base font-bold">AI Reply Assistant Active</h3>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              Your AI agent is trained on your business profile and ready to draft contextual, brand-aligned replies instantly.
            </p>
            <Button size="sm" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold">
              Test AI Response Generator
            </Button>
          </Card>

          <Card className="p-6 border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Connected Locations Health</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <span className="font-semibold text-emerald-900">Indiranagar Branch</span>
                <span className="text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Synced
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <span className="font-semibold text-emerald-900">Koramangala Branch</span>
                <span className="text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Synced
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-100">
                <span className="font-semibold text-amber-900">Whitefield Branch</span>
                <span className="text-amber-700 flex items-center gap-1 font-medium">
                  <AlertCircle className="h-3.5 w-3.5" /> Re-auth needed
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
