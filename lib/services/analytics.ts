import { createClient } from "@/lib/supabase/server";

export interface AnalyticsSummary {
  totalReviews: number;
  averageRating: number;
  responseRate: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export function computeAnalyticsFromReviews(reviews: Array<{ rating: number; sentiment?: string | null; status?: string | null }>): AnalyticsSummary {
  if (!reviews || reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      responseRate: 0,
      sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }

  const totalReviews = reviews.length;
  let ratingSum = 0;
  let answeredCount = 0;
  const sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 };
  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const r of reviews) {
    ratingSum += r.rating;
    if (r.status === "published" || r.status === "drafted") {
      answeredCount++;
    }
    if (r.sentiment && r.sentiment in sentimentBreakdown) {
      sentimentBreakdown[r.sentiment as keyof typeof sentimentBreakdown]++;
    }
    if (r.rating >= 1 && r.rating <= 5) {
      ratingDistribution[r.rating as keyof typeof ratingDistribution]++;
    }
  }

  const averageRating = totalReviews > 0 ? Number((ratingSum / totalReviews).toFixed(2)) : 0;
  const responseRate = totalReviews > 0 ? Number(((answeredCount / totalReviews) * 100).toFixed(1)) : 0;

  return {
    totalReviews,
    averageRating,
    responseRate,
    sentimentBreakdown,
    ratingDistribution,
  };
}

export async function getOrganizationAnalytics(organizationId: string): Promise<AnalyticsSummary> {
  const supabase = await createClient();

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("rating, sentiment, status, review_date")
    .eq("organization_id", organizationId);

  if (error || !reviews) {
    return computeAnalyticsFromReviews([]);
  }

  return computeAnalyticsFromReviews(reviews);
}
