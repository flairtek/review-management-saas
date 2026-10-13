import { describe, it, expect } from "vitest";
import { computeAnalyticsFromReviews } from "@/lib/services/analytics";

describe("Analytics Service", () => {
  it("handles empty review list gracefully", () => {
    const res = computeAnalyticsFromReviews([]);
    expect(res.totalReviews).toBe(0);
    expect(res.averageRating).toBe(0);
    expect(res.responseRate).toBe(0);
    expect(res.ratingDistribution[5]).toBe(0);
  });

  it("calculates averages and breakdowns accurately", () => {
    const reviews = [
      { rating: 5, sentiment: "positive", status: "published" },
      { rating: 4, sentiment: "positive", status: "drafted" },
      { rating: 1, sentiment: "negative", status: "unanswered" },
    ];
    const res = computeAnalyticsFromReviews(reviews);
    expect(res.totalReviews).toBe(3);
    expect(res.averageRating).toBe(3.33);
    expect(res.responseRate).toBe(66.7);
    expect(res.sentimentBreakdown.positive).toBe(2);
    expect(res.sentimentBreakdown.negative).toBe(1);
    expect(res.ratingDistribution[5]).toBe(1);
    expect(res.ratingDistribution[1]).toBe(1);
  });
});
