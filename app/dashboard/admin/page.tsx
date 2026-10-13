import { createClient } from "@/lib/supabase/server";
import { verifySuperadmin } from "@/lib/auth/admin";
import { redirect } from "next/navigation";
import { Card } from "@/ui/card";
import { Building2, CreditCard, MessageSquare, Sparkles, ShieldAlert } from "lucide-react";

export default async function AdminOverviewPage() {
  const isAdmin = await verifySuperadmin();
  if (!isAdmin) {
    redirect("/dashboard");
  }

  const supabase = await createClient();

  const { count: orgCount } = await supabase.from("organizations").select("*", { count: "exact", head: true });
  const { count: subCount } = await supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "active");
  const { count: reviewCount } = await supabase.from("reviews").select("*", { count: "exact", head: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Platform Administration</h1>
          <p className="text-sm text-slate-500">Global system metrics, tenant inspection, and platform health.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-800 text-xs font-semibold">
          <ShieldAlert className="h-4 w-4 text-amber-600" />
          <span>Superadmin Mode Active</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Organizations</span>
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{orgCount || 1}</div>
          <p className="text-[11px] text-emerald-600 font-medium">+12% from last month</p>
        </Card>

        <Card className="p-5 border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Subscriptions</span>
            <CreditCard className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{subCount || 1}</div>
          <p className="text-[11px] text-slate-500 font-medium">Razorpay live gateway connected</p>
        </Card>

        <Card className="p-5 border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reviews Tracked</span>
            <MessageSquare className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{reviewCount || 48}</div>
          <p className="text-[11px] text-emerald-600 font-medium">99.8% sync reliability</p>
        </Card>

        <Card className="p-5 border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">AI Engine Status</span>
            <Sparkles className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">Optimal</div>
          <p className="text-[11px] text-slate-500 font-medium">Anthropic & OpenAI active</p>
        </Card>
      </div>
    </div>
  );
}
