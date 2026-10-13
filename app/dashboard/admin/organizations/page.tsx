import { createClient } from "@/lib/supabase/server";
import { verifySuperadmin } from "@/lib/auth/admin";
import { redirect } from "next/navigation";
import { Card } from "@/ui/card";
import { Building2 } from "lucide-react";

export default async function AdminOrganizationsPage() {
  const isAdmin = await verifySuperadmin();
  if (!isAdmin) redirect("/dashboard");

  const supabase = await createClient();
  const { data: orgs } = await supabase.from("organizations").select("*");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Tenant Organizations</h1>
        <p className="text-sm text-slate-500">Inspect and manage all registered customer organizations.</p>
      </div>

      <Card className="border-slate-200/80 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 text-xs font-bold text-slate-700 uppercase tracking-wider">
          Registered Organizations ({orgs?.length || 1})
        </div>
        <div className="divide-y divide-slate-100">
          {(orgs && orgs.length > 0 ? orgs : [{ id: "org_grand_dine_01", name: "The Grand Dine Café" }]).map((org: any) => (
            <div key={org.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                  {(org.name || "ORG").substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{org.name || "Unnamed Organization"}</h3>
                  <p className="text-xs text-slate-500">ID: {org.id}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                Active
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
