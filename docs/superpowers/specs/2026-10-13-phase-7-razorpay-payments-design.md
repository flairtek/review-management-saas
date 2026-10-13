# Design Spec: Phase 7 — Razorpay Subscriptions & Payments

**Project:** Flairtek Review AI  
**Author:** Pair Programming Assistant & Developer  
**Status:** Approved  
**Date:** 2026-10-13  

---

## 1. Overview & Objectives
Phase 7 implements the monetization layer of the platform using Razorpay. The goal is to convert users into paying subscribers via a simple, hosted checkout experience with automated lifecycle management.

**Key Objectives:**
1. **Hosted Checkout Integration**: Seamless redirection to Razorpay for subscription creation and payment.
2. **Secure Lifecycle Management**: Use signed webhooks to track subscription status (Active, Past Due, Canceled).
3. **Feature Gating**: Enforce plan-based limits (Starter, Growth, Agency) across the platform.
4. **Billing Transparency**: Provide users with their current plan status and subscription details in the dashboard.

---

## 2. Architecture & Modules

### 2.1 Payment Workflow (`lib/services/razorpay.ts`)
- **Subscription Creation**: 
  - Server-side call to Razorpay API to create a `subscription` object linked to a pre-defined `plan_id`.
  - Returns a `subscription_id` and a hosted `short_url` for the user to complete payment.
- **Verification Logic**:
  - Utility to verify the authenticity of webhook signatures using the Razorpay Webhook Secret.

### 2.2 Webhook Handler (`app/api/webhooks/razorpay/route.ts`)
- **Endpoint**: `POST /api/webhooks/razorpay`
- **Event Mapping**:
  - `subscription.activated` $\rightarrow$ Set `subscriptions.status = 'active'`.
  - `subscription.charged` $\rightarrow$ Update `current_period_end` and log audit event.
  - `subscription.halted` / `subscription.cancelled` $\rightarrow$ Set `subscriptions.status = 'canceled'`.
  - `payment.failed` $\rightarrow$ Set `subscriptions.status = 'past_due'`.

### 2.3 Feature Gating & Plan Logic (`lib/config/plans.ts`, `lib/services/subscription.ts`)
- **Plan Configuration**:
  - `starter`: Limited locations, basic AI tone, no auto-replies.
  - `growth`: Multiple locations, all AI tones, limited auto-replies.
  - `agency`: Unlimited locations, full automation, priority support.
- **Access Guard**: A middleware or utility function `verifyPlanAccess(orgId, feature)` that blocks requests if the current plan tier is insufficient or the status is not `active` or `trialing`.

---

## 3. Data Model & Schema
The existing `public.subscriptions` table is sufficient:
- `plan_tier` (`starter` | `growth` | `agency`)
- `status` (`trialing` | `active` | `past_due` | `canceled` | `paused`)
- `razorpay_subscription_id` (used for API lookups and cancellations)

---

## 4. Implementation Plan Summary
1. **Payment Service**: Implement Razorpay SDK wrapper for subscription creation.
2. **Webhook System**: Build the HMAC-verified webhook endpoint for status synchronization.
3. **Checkout UI**: Create a simple "Pricing/Upgrade" page in the dashboard that triggers the hosted redirect.
4. **Feature Gating**: Implement the `verifyPlanAccess` logic and apply it to Phase 4 (AI) and Phase 6 (Campaigns) endpoints.
5. **Billing Dashboard**: Add a subscription management section to the Account Settings page.
