import React from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Lock,
  RefreshCw,
  Unplug,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StateType =
  | "empty"
  | "error"
  | "loading"
  | "permission-denied"
  | "disconnected"
  | "success";

interface StateBannerProps {
  type: StateType;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function StateBanner({
  type,
  title,
  description,
  actionText,
  onAction,
  className,
}: StateBannerProps) {
  const config = {
    empty: {
      icon: Inbox,
      iconColor: "text-slate-400 bg-slate-100",
      border: "border-slate-200",
    },
    error: {
      icon: AlertTriangle,
      iconColor: "text-red-600 bg-red-50",
      border: "border-red-200 bg-red-50/20",
    },
    loading: {
      icon: RefreshCw,
      iconColor: "text-blue-600 bg-blue-50 animate-spin",
      border: "border-blue-200 bg-blue-50/20",
    },
    "permission-denied": {
      icon: Lock,
      iconColor: "text-amber-600 bg-amber-50",
      border: "border-amber-200 bg-amber-50/20",
    },
    disconnected: {
      icon: Unplug,
      iconColor: "text-rose-600 bg-rose-50",
      border: "border-rose-200 bg-rose-50/20",
    },
    success: {
      icon: CheckCircle,
      iconColor: "text-emerald-600 bg-emerald-50",
      border: "border-emerald-200 bg-emerald-50/20",
    },
  }[type];

  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "p-8 text-center flex flex-col items-center justify-center border",
        config.border,
        className
      )}
    >
      <div
        className={cn(
          "h-12 w-12 rounded-xl flex items-center justify-center mb-3",
          config.iconColor
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
      {actionText && (
        <Button
          onClick={onAction}
          variant={type === "error" || type === "disconnected" ? "outline" : "default"}
          size="sm"
          className="mt-4"
        >
          {actionText}
        </Button>
      )}
    </Card>
  );
}
