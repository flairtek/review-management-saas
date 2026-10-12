"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import {
  Bell,
  Search,
  Building,
  RefreshCw,
  User,
  Sparkles,
} from "lucide-react";

export function DashboardHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="h-16 border-b border-slate-200/80 bg-white px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Sync Action */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-600"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sync Now</span>
        </Button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews, authors..."
            className="h-9 w-60 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Notifications */}
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative text-slate-600">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </Button>
        </Link>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
            SK
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-900">Sanjay Kumar</div>
            <div className="text-[10px] text-slate-500 capitalize">Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
}
