import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Heart } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Flairtek <span className="text-blue-400">Review AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-400 leading-relaxed">
              Every Review. A Smarter Response. Help your business manage Google reviews, generate contextual AI replies, monitor sentiment, and protect your online reputation.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Official Google Business Profile API OAuth Integration</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Product</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing (INR)
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Flairtek
                </Link>
              </li>
              <li>
                <a
                  href="https://flairtek.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Parent Company ↗
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Sales & Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Reputation Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Legal & Compliance</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie & Data Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Flairtek. All rights reserved. Designed for businesses across India &amp; worldwide.</p>
          <p className="flex items-center gap-1">
            Built with precision by <span className="text-slate-300 font-medium">Flairtek Engineering</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
