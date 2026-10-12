import React from "react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Dashboard" subtitle="Overview of your Google Business Profile performance" />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
