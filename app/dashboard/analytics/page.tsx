"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { computeAnalyticsFromReviews } from "@/lib/services/analytics";
import { Card } from "@/ui/card";
import { Star } from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({
    totalReviews: 0,
    averageRating: 0,
    responseRate: 0,
    sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const supabase = createClient();
        const { data: reviews } = await supabase.from("reviews").select("rating, sentiment, status");
        if (reviews) {
          setAnalytics(computeAnalyticsFromReviews(reviews));
        }
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-sm text-slate-500">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Analytics & Sentiment</h1>
        <p className="text-sm text-slate-500">Comprehensive insights into customer satisfaction and review response metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 border-slate-200/80 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Reviews</span>
          <div className="text-3xl font-black text-slate-900">{analytics.totalReviews}</div>
        </Card>
        <Card className="p-6 border-slate-200/80 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Rating</span>
          <div className="text-3xl font-black text-slate-900 flex items-center gap-2">
            {analytics.averageRating} <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
          </div>
        </Card>
        <Card className="p-6 border-slate-200/80 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Response Rate</span>
          <div className="text-3xl font-black text-slate-900">{analytics.responseRate}%</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Sentiment Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-700">Positive</span>
              <span>{analytics.sentimentBreakdown.positive}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-amber-700">Neutral</span>
              <span>{analytics.sentimentBreakdown.neutral}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-red-700">Negative</span>
              <span>{analytics.sentimentBreakdown.negative}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-medium">{star} Stars</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{
                      width: `${analytics.totalReviews > 0 ? (analytics.ratingDistribution[star as keyof typeof analytics.ratingDistribution] / analytics.totalReviews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right text-slate-500">
                  {analytics.ratingDistribution[star as keyof typeof analytics.ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
