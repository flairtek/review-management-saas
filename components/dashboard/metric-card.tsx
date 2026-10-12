import React from "react";
import { Card } from "@/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
}

export function MetricCard({
  title,
  value,
  change,
  isPositive,
  subtitle,
  icon: Icon,
  badge,
  badgeColor,
}: MetricCardProps) {
  return (
    <Card className="p-5 border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-emerald-600" : "text-red-600"
            )}
          >
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 flex items-center justify-between">
          <span>{subtitle}</span>
          {badge && (
            <span
              className={cn(
                "px-1.5 py-0.5 text-[10px] font-bold rounded",
                badgeColor || "bg-slate-100 text-slate-600"
              )}
            >
              {badge}
            </span>
          )}
        </p>
      )}
    </Card>
  );
}
