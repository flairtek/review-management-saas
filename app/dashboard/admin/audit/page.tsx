import { createClient } from "@/lib/supabase/server";
import { verifySuperadmin } from "@/lib/auth/admin";
import { redirect } from "next/navigation";
import { Card } from "@/ui/card";
import { ShieldCheck, Clock } from "lucide-react";

export default async function AdminAuditPage() {
  const isAdmin = await verifySuperadmin();
  if (!isAdmin) redirect("/dashboard");

  const supabase = await createClient();
  const { data: logs } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">System Audit Logs</h1>
        <p className="text-sm text-slate-500">Traceability log for billing events, AI guardrail triggers, and admin actions.</p>
      </div>

      <Card className="border-slate-200/80 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recent Events</span>
        </div>

        {logs && logs.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {logs.map((log: any) => (
              <div key={log.id} className="p-4 flex items-start justify-between hover:bg-slate-50/50">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{log.action || "System Event"}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    User: {log.user_id || "system"} · Org: {log.organization_id || "global"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{log.created_at ? new Date(log.created_at).toLocaleString() : "—"}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            <ShieldCheck className="h-8 w-8 mx-auto mb-2 text-slate-300" />
            <p>Audit log stream is active and recording real-time system events.</p>
            <p className="mt-1 text-slate-300">Events will appear here as users perform actions on the platform.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
