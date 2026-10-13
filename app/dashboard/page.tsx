"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Star,
  MessageSquare,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardOverviewPage() {
  const [analytics, setAnalytics] = useState({
    totalReviews: 148,
    averageRating: 4.8,
    responseRate: 96.4,
    sentimentBreakdown: { positive: 120, neutral: 20, negative: 8 },
    ratingDistribution: { 1: 5, 2: 3, 3: 10, 4: 30, 5: 100 },
  });
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) throw userError;

        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select("*, business_locations(name)")
          .order("review_date", { ascending: false })
          .limit(3);

        if (reviewsError) throw reviewsError;

        setRecentReviews(reviewsData || []);
      } catch (err: any) {
        setError(err.message);
        console.error("Dashboard data loading error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Average Rating"
          value={analytics.averageRating ? analytics.averageRating.toString() : "0.0"}
          change="+0.3"
          isPositive={true}
          subtitle="Across connected locations"
          icon={Star}
          badge="Live"
          badgeColor="bg-amber-50 text-amber-700"
        />
        <MetricCard
          title="Response Rate"
          value={`${analytics.responseRate}%`}
          change="+4.1%"
          isPositive={true}
          subtitle={`${analytics.totalReviews} total reviews`}
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
            <Link href="/dashboard/reviews">
              <Button variant="outline" size="sm" className="text-xs">
                View All Inbox
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentReviews.length > 0 ? (
              recentReviews.map((rev: any, i: number) => (
                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{rev.author_name}</span>
                      <span className="text-xs text-slate-400">• {rev.business_locations?.name || "Location"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="h-3.5 w-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <Badge
                        variant={
                          rev.status === "published"
                            ? "success"
                            : rev.status === "drafted"
                            ? "warning"
                            : "destructive"
                        }
                        className="text-[10px]"
                      >
                        {rev.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{new Date(rev.review_date).toLocaleDateString()}</span>
                    <Link href="/dashboard/reviews" className="text-blue-600 font-semibold hover:underline">
                      View Details & Response →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                No reviews found yet. Connect your Google Profile or run a sync.
              </div>
            )}
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
            <Link href="/dashboard/reviews">
              <Button size="sm" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold">
                Open Review Inbox
              </Button>
            </Link>
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
