"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Inbox,
  Sparkles,
  CheckCircle2,
  Send,
  BarChart3,
  FileText,
  Bell,
  Blocks,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

const navigationItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Reviews Inbox", href: "/dashboard/reviews", icon: Inbox, badge: "12" },
  { name: "AI Reply Assistant", href: "/dashboard/ai-assistant", icon: Sparkles },
  { name: "Approval Queue", href: "/dashboard/approval-queue", icon: CheckCircle2, badge: "3" },
  { name: "Locations", href: "/dashboard/locations", icon: MapPin },
  { name: "Google Profiles", href: "/dashboard/google-profiles", icon: Building2 },
  { name: "Review Requests", href: "/dashboard/review-requests", icon: Send },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Integrations", href: "/dashboard/integrations", icon: Blocks },
  { name: "Team Members", href: "/dashboard/team", icon: Users },
  { name: "Subscription & Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Account Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help & Support", href: "/dashboard/help", icon: HelpCircle },
  { name: "Admin Console", href: "/dashboard/admin", icon: ShieldAlert, adminOnly: true },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200/80 bg-white flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand & Workspace Switcher */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm">
            F
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 leading-tight">
              Flairtek <span className="text-blue-600">Review AI</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">
              The Grand Dine Café
            </span>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Core Workspace
        </div>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          // Admin-only items render with amber styling
          const isAdminItem = (item as any).adminOnly === true;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? isAdminItem
                    ? "bg-amber-50 text-amber-800 font-semibold"
                    : "bg-blue-50 text-blue-700 font-semibold"
                  : isAdminItem
                  ? "text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive
                      ? isAdminItem ? "text-amber-700" : "text-blue-600"
                      : isAdminItem ? "text-amber-500" : "text-slate-400 group-hover:text-slate-500"
                  )}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] rounded-full font-bold",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer / Status Card */}
      <div className="p-3 border-t border-slate-100">
        <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <span>Growth Plan</span>
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
              Active
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-1.5 rounded-full w-[45%]" />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-500">
            45/100 AI Replies used
          </p>
        </div>
      </div>
    </aside>
  );
}
