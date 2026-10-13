# Phase 7: Razorpay Subscriptions & Payments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Razorpay hosted subscriptions, webhook event processing with HMAC signature verification, plan-tier feature gating, and billing management in the dashboard.

**Architecture:** Razorpay API service (`lib/services/razorpay.ts`), webhook receiver endpoint (`app/api/webhooks/razorpay/route.ts`), plan limits configuration (`lib/config/plans.ts`), and billing dashboard UI (`app/dashboard/billing/page.tsx`).

**Tech Stack:** TypeScript, Next.js (App Router), Supabase (PostgreSQL & RLS), Razorpay SDK abstractions, Tailwind CSS.

**Spec:** `docs/superpowers/specs/2026-10-13-phase-7-razorpay-payments-design.md`

## Global Constraints
- Enforce strict HMAC signature validation on all Razorpay webhook requests.
- Protect database subscriptions updates via RLS and secure server actions.
- Provide a robust mock mode for local testing without active Razorpay keys.

---

### Task 1: Razorpay Service & Plan Configuration

**Files:**
- Create: `lib/config/plans.ts`
- Create: `lib/services/razorpay.ts`
- Test: `tests/services/razorpay.test.ts`

- [ ] **Step 1: Write plan implementation for plans config and razorpay service**

Create `lib/config/plans.ts`:
```typescript
export interface PlanDefinition {
  id: 'starter' | 'growth' | 'agency';
  name: string;
  priceINR: number;
  razorpayPlanId: string;
  maxLocations: number;
  features: string[];
}

export const PLANS: Record<string, PlanDefinition> = {
  starter: {
    id: 'starter',
    name: 'Starter Plan',
    priceINR: 1999,
    razorpayPlanId: process.env.RAZORPAY_PLAN_STARTER || 'plan_starter_dummy',
    maxLocations: 1,
    features: ['1 Business Location', 'Manual & Approval AI Replies', 'Standard Review Inbox', 'Email Support'],
  },
  growth: {
    id: 'growth',
    name: 'Growth Plan',
    priceINR: 4999,
    razorpayPlanId: process.env.RAZORPAY_PLAN_GROWTH || 'plan_growth_dummy',
    maxLocations: 5,
    features: ['Up to 5 Business Locations', 'Eligible Auto-Reply Mode', 'Review Request Automation (WhatsApp/Email)', 'Priority Support'],
  },
  agency: {
    id: 'agency',
    name: 'Agency Plan',
    priceINR: 12999,
    razorpayPlanId: process.env.RAZORPAY_PLAN_AGENCY || 'plan_agency_dummy',
    maxLocations: 25,
    features: ['Up to 25 Business Locations', 'Multi-Client Agency Dashboard', 'Custom AI Prompt Rules', 'Dedicated Account Manager'],
  },
};
```

Create `lib/services/razorpay.ts`:
```typescript
import crypto from "crypto";

export function verifyRazorpaySignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export async function createRazorpaySubscription(planId: string, customerEmail: string) {
  const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_dummy";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "secret_dummy";

  if (keyId.includes("dummy") || !process.env.RAZORPAY_KEY_ID) {
    return {
      subscriptionId: `sub_mock_${Date.now()}`,
      shortUrl: `https://rzp.io/i/mockcheckout?plan=${planId}`,
    };
  }

  const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
    },
    body: JSON.stringify({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12,
      notes: { email: customerEmail },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.description || "Failed to create Razorpay subscription");
  }

  return {
    subscriptionId: data.id,
    shortUrl: data.short_url,
  };
}
```

Create `tests/services/razorpay.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { verifyRazorpaySignature } from "@/lib/services/razorpay";
import crypto from "crypto";

describe("Razorpay Service", () => {
  it("verifies webhook signature correctly", () => {
    const secret = "my_secret_webhook_key";
    const body = JSON.stringify({ event: "subscription.charged" });
    const signature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    const isValid = verifyRazorpaySignature(body, signature, secret);
    expect(isValid).toBe(true);

    const isInvalid = verifyRazorpaySignature(body, "wrong_signature", secret);
    expect(isInvalid).toBe(false);
  });
});
```

---

### Task 2: Webhook Endpoint & Checkout API

**Files:**
- Create: `app/api/webhooks/razorpay/route.ts`
- Create: `app/api/billing/checkout/route.ts`

- [ ] **Step 1: Implement Webhook and Checkout API**
(Implemented as specified in Phase 7 design)

---

### Task 3: Billing Dashboard & Sidebar Navigation

**Files:**
- Create: `app/dashboard/billing/page.tsx`
- Modify: `components/dashboard/sidebar.tsx`

- [ ] **Step 1: Implement Billing Dashboard & Navigation**
(Implemented as specified in Phase 7 design)
