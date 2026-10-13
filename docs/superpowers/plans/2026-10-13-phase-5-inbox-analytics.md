# Phase 5: Review Inbox, Alerts & Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade review inbox with advanced filtering, real-time analytics aggregation, and automated alerting for negative or flagged reviews.

**Architecture:** Analytics query services (`lib/services/analytics.ts`), notification dispatcher (`lib/services/alerts.ts`), a database migration for notifications (`supabase/migrations/`), and fully interactive dashboard pages for Inbox (`app/dashboard/reviews/page.tsx`) and Analytics (`app/dashboard/analytics/page.tsx`), wiring up the Overview metrics.

**Tech Stack:** TypeScript, Next.js (App Router), Supabase (PostgreSQL & RLS), Tailwind CSS, Lucide icons.

**Spec:** `docs/superpowers/specs/2026-10-13-phase-5-inbox-analytics-design.md`

## Global Constraints
- Enforce strict Supabase RLS tenant isolation on `notifications` and review queries.
- Maintain responsive layout across mobile and desktop.
- Ensure all analytics calculations handle zero-review edge cases gracefully.

---

### Task 1: Notifications Database Schema & Migration

**Files:**
- Create: `supabase/migrations/20261013000002_notifications.sql`
- Test: Verify schema and RLS policies

- [ ] **Step 1: Write migration SQL**
```sql
-- Migration: Notifications Table for Alerts
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('low_rating', 'safety_flag', 'sync_error', 'general')),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view organization notifications" ON public.notifications
    FOR SELECT USING (public.is_org_member(organization_id));

CREATE POLICY "Members can update notification read status" ON public.notifications
    FOR UPDATE USING (public.is_org_member(organization_id));
```

- [ ] **Step 2: Commit**
```bash
git add supabase/migrations/20261013000002_notifications.sql
git commit -m "feat(db): add notifications table and rls policies"
```

---

### Task 2: Analytics & Alerts Services

**Files:**
- Create: `lib/services/analytics.ts`
- Create: `lib/services/alerts.ts`
- Test: `tests/services/analytics.test.ts`

- [ ] **Step 1: Write failing test / implementation**

Create `lib/services/analytics.ts`:
```typescript
import { createClient } from "@/lib/supabase/server";

export async function getOrganizationAnalytics(organizationId: string) {
  const supabase = await createClient();

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("rating, sentiment, status, review_date")
    .eq("organization_id", organizationId);

  if (error || !reviews) {
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
    if (r.status === "published" || r.status === "drafted") answeredCount++;
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
```

Create `lib/services/alerts.ts`:
```typescript
import { createClient } from "@/lib/supabase/server";

export async function createAlert(orgId: string, title: string, message: string, type: "low_rating" | "safety_flag" | "sync_error" | "general") {
  const supabase = await createClient();
  await supabase.from("notifications").insert({
    organization_id: orgId,
    title,
    message,
    type,
  });
}
```

- [ ] **Step 2: Commit**
```bash
git add lib/services/analytics.ts lib/services/alerts.ts
git commit -m "feat(services): add analytics aggregation and alert dispatching services"
```

---

### Task 3: Unified Review Inbox Page

**Files:**
- Create: `app/dashboard/reviews/page.tsx`
- Test: Build check

- [ ] **Step 1: Implement Inbox Page**
```tsx
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Star, Search, Filter, Sparkles, Send } from "lucide-react";

export default async function ReviewsInboxPage({
  searchParams,
}: {
  searchParams: Promise<{ rating?: string; status?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("reviews").select("*, business_locations(name), review_replies(*)");

  if (resolvedParams.rating) {
    query = query.eq("rating", parseInt(resolvedParams.rating));
  }
  if (resolvedParams.status) {
    query = query.eq("status", resolvedParams.status);
  }
  if (resolvedParams.search) {
    query = query.ilike("comment", `%${resolvedParams.search}%`);
  }

  const { data: reviews, error } = await query.order("review_date", { ascending: false }).limit(50);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Review Inbox</h1>
          <p className="text-sm text-slate-500">Manage and respond to all customer reviews across your locations.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-4 border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <form method="GET" className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={resolvedParams.search || ""}
              placeholder="Search review comments..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" size="sm" variant="outline">
            Filter
          </Button>
        </form>
      </Card>

      {/* Review List */}
      <div className="space-y-4">
        {error && <p className="text-sm text-red-600">Failed to load reviews.</p>}
        {(!reviews || reviews.length === 0) && (
          <Card className="p-12 text-center text-slate-500">
            <p className="text-sm font-medium">No reviews found matching your criteria.</p>
          </Card>
        )}
        {reviews?.map((rev: any) => {
          const latestReply = rev.review_replies?.[0];
          return (
            <Card key={rev.id} className="p-6 border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                    {rev.author_name?.[0] || "C"}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{rev.author_name}</h3>
                    <p className="text-xs text-slate-400">{rev.business_locations?.name} • {new Date(rev.review_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <Badge
                    variant={
                      rev.status === "published"
                        ? "success"
                        : rev.status === "drafted"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {rev.status}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-slate-700">&ldquo;{rev.comment}&rdquo;</p>

              {latestReply && (
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600" /> AI Reply Draft ({latestReply.tone_used})
                    </span>
                    <span className="text-[10px] text-blue-500">{latestReply.published_to_google ? "Published to Google" : "Pending Approval"}</span>
                  </div>
                  <p className="text-xs text-blue-950">&ldquo;{latestReply.reply_text}&rdquo;</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                {!latestReply && (
                  <form action="/api/ai/generate" method="POST">
                    <input type="hidden" name="reviewId" value={rev.id} />
                    <Button size="sm" variant="default" className="text-xs bg-blue-600 hover:bg-blue-700">
                      <Sparkles className="h-3.5 w-3.5 mr-1" /> Generate AI Reply
                    </Button>
                  </form>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add app/dashboard/reviews/page.tsx
git commit -m "feat(ui): implement unified review inbox page"
```

---

### Task 4: Analytics Dashboard & Overview Wiring

**Files:**
- Create: `app/dashboard/analytics/page.tsx`
- Modify: `app/dashboard/page.tsx`
- Test: Build check

- [ ] **Step 1: Implement Analytics Page**
```tsx
import { createClient } from "@/lib/supabase/server";
import { getOrganizationAnalytics } from "@/lib/services/analytics";
import { Card } from "@/ui/card";
import { Star, MessageSquare, TrendingUp, BarChart3 } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user's org
  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user?.id)
    .single();

  const analytics = membership ? await getOrganizationAnalytics(membership.organization_id) : {
    totalReviews: 0,
    averageRating: 0,
    responseRate: 0,
    sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };

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
```

- [ ] **Step 2: Commit**
```bash
git add app/dashboard/analytics/page.tsx
git commit -m "feat(ui): implement analytics and sentiment dashboard page"
```
