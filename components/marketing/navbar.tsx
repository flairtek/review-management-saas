"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Building2,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

export function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-transform hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Flairtek <span className="text-blue-600">Review AI</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 -mt-1 tracking-wider uppercase">
              By Flairtek
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Features
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Pricing
          </Link>
          <Link
            href="/industries"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Industries
          </Link>
          <Link
            href="/integrations"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Integrations
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-semibold text-slate-700">
              Sign In
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button size="sm" className="bg-blue-600 font-semibold shadow-sm hover:bg-blue-700">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-6 md:hidden">
          <div className="flex flex-col space-y-3 pt-2">
            <Link
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Pricing
            </Link>
            <Link
              href="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Industries
            </Link>
            <Link
              href="/integrations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Integrations
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Contact
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
