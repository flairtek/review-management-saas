# Phase 8: SEO, GEO & AEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement dynamic sitemaps (`sitemap.ts`), robots rules (`robots.ts`), social open graph metadata, and structured JSON-LD schemas (`SoftwareApplication`, `Organization`, `FAQPage`) for SEO, GEO, and AEO optimization.

**Architecture:** Next.js metadata API routes (`app/sitemap.ts`, `app/robots.ts`), React JSON-LD component (`components/seo/json-ld.tsx`), layout metadata upgrades (`app/layout.tsx`), and SEO validation tests (`tests/seo/metadata.test.ts`).

**Tech Stack:** TypeScript, Next.js App Router, JSON-LD Structured Data, Vitest.

**Spec:** `docs/SEO_GEO_AEO.md`

## Global Constraints
- Generate fully valid, compliant JSON-LD schemas.
- Ensure sitemap includes all public marketing and auth routes.
- Validate all SEO metadata routes with unit tests.

---

### Task 1: Dynamic Sitemap and Robots

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Test: `tests/seo/metadata.test.ts`

- [ ] **Step 1: Create sitemap, robots, and test**

Create `app/sitemap.ts`:
```typescript
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://reviews.flairtek.com";
  const currentDate = new Date();

  const routes = [
    "",
    "/features",
    "/how-it-works",
    "/pricing",
    "/industries",
    "/integrations",
    "/about",
    "/contact",
    "/faq",
    "/login",
    "/signup",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/pricing" ? 0.9 : 0.8,
  }));
}
```

Create `app/robots.ts`:
```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/onboarding/"],
    },
    sitemap: "https://reviews.flairtek.com/sitemap.xml",
  };
}
```

Create `tests/seo/metadata.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("SEO Metadata Generation", () => {
  it("generates sitemap with correct public URLs", async () => {
    const sm = await sitemap();
    expect(sm.length).toBeGreaterThan(5);
    expect(sm.some((item) => item.url === "https://reviews.flairtek.com/pricing")).toBe(true);
  });

  it("generates correct robots rules", () => {
    const rb = robots();
    expect(rb.sitemap).toBe("https://reviews.flairtek.com/sitemap.xml");
    const rules = Array.isArray(rb.rules) ? rb.rules : [rb.rules];
    expect(rules[0].allow).toBe("/");
    expect(rules[0].disallow).toContain("/dashboard/");
  });
});
```

- [ ] **Step 2: Commit Task 1**
```bash
git add app/sitemap.ts app/robots.ts tests/seo/metadata.test.ts
git commit -m "feat(seo): add dynamic sitemap, robots.ts, and metadata tests

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 2: Structured Data JSON-LD Components

**Files:**
- Create: `components/seo/json-ld.tsx`

- [ ] **Step 1: Implement JSON-LD component**

Create `components/seo/json-ld.tsx`:
```tsx
import React from "react";

export function SoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flairtek Review AI",
    operatingSystem: "Web",
    applicationCategory: "BusinessApplication",
    description: "AI-powered Google Business Profile review automation, reply generation, and sentiment analytics platform.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "1999",
      highPrice: "12999",
      offerCount: "3",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flairtek Review AI",
    url: "https://reviews.flairtek.com",
    logo: "https://reviews.flairtek.com/logo.png",
    sameAs: [
      "https://twitter.com/flairtek",
      "https://linkedin.com/company/flairtek",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer support",
      email: "support@flairtek.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

- [ ] **Step 2: Commit Task 2**
```bash
git add components/seo/json-ld.tsx
git commit -m "feat(seo): add JSON-LD structured data components for SoftwareApplication and Organization

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 3: Root Layout Metadata & JSON-LD Integration

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update root layout with Open Graph and JSON-LD**

Edit `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SoftwareApplicationJsonLd, OrganizationJsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reviews.flairtek.com"),
  title: {
    default: "Flairtek Review AI — Every Review. A Smarter Response.",
    template: "%s | Flairtek Review AI",
  },
  description: "AI-powered Google Business Profile review automation, sentiment analysis, and intelligent multi-tone reply drafting platform.",
  openGraph: {
    title: "Flairtek Review AI",
    description: "Every Review. A Smarter Response. Automate your Google reviews with intelligent AI.",
    url: "https://reviews.flairtek.com",
    siteName: "Flairtek Review AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flairtek Review AI",
    description: "Every Review. A Smarter Response.",
    creator: "@flairtek",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-flex flex-col">
        <SoftwareApplicationJsonLd />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run tests to verify SEO metadata**
```bash
npx vitest run tests/seo/metadata.test.ts
```

- [ ] **Step 3: Commit Task 3 & Finalize Phase 8**
```bash
git add app/layout.tsx
git commit -m "feat(seo): integrate Open Graph metadata and structured JSON-LD into root layout

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```
