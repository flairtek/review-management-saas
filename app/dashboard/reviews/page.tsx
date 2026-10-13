import { createClient } from "@/lib/supabase/server";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Star, Search, Sparkles } from "lucide-react";

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
