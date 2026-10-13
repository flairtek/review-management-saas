# Design Spec: Phase 5 — Review Inbox, Alerts & Analytics

**Project:** Flairtek Review AI  
**Author:** Pair Programming Assistant & Developer  
**Status:** Approved  
**Date:** 2026-10-13  

---

## 1. Overview & Objectives
Phase 5 transforms the Flairtek Review AI dashboard from a static UI shell into a fully functional operational hub. It delivers:
1. **Unified Review Inbox (`app/dashboard/reviews/page.tsx`)**: Real-time filtering, search, pagination, sentiment tags, and quick AI/publishing actions.
2. **Alerts & Notification Dispatcher (`lib/services/alerts.ts`)**: Automatic triggering of in-app and email alerts for negative reviews, safety flags, and low ratings.
3. **Analytics & Performance Metrics (`lib/services/analytics.ts`, `app/dashboard/analytics/page.tsx`)**: Comprehensive aggregation of ratings, sentiment breakdown, response time, and live metric cards on the overview dashboard.

---

## 2. Architecture & Modules

### 2.1 Unified Review Inbox (`app/dashboard/reviews/`)
- **Server Components & Client State:** 
  - Server-side fetching with Supabase filtering for `rating`, `sentiment`, `status`, and `location_id`.
  - Debounced search input for customer names and review text.
  - Action tray for bulk or individual reply approvals, AI draft regeneration, and status toggling.

### 2.2 Alerts & Notifications (`lib/services/alerts.ts`, database `notifications`)
- **Database Schema (`notifications`):**
  - `id` (UUID), `organization_id` (UUID), `user_id` (UUID optional), `title` (TEXT), `message` (TEXT), `type` (TEXT: `low_rating`, `safety_flag`, `sync_error`), `read` (BOOLEAN), `created_at` (TIMESTAMPTZ).
- **Trigger Logic:**
  - When new reviews are ingested or AI safety guardrails flag a review, an entry is created in `notifications` and an email notification is dispatched via Resend/SendGrid if configured.

### 2.3 Analytics Engine (`lib/services/analytics.ts`)
- **Aggregation Queries:**
  - Average rating per location and organization over selected time ranges (7d, 30d, 90d, All-Time).
  - Total review count and response percentage.
  - Sentiment ratios (`positive` vs `neutral` vs `negative`).
  - Rating distribution histogram (1-star through 5-star counts).

---

## 3. Implementation Plan Summary
1. **Database Migration:** Create `notifications` table and indexes for reviews.
2. **Analytics Service:** Implement `getOrganizationAnalytics(orgId, timeRange)`.
3. **Alerts Service:** Implement notification creation and email triggers.
4. **Unified Inbox Page:** Build `app/dashboard/reviews/page.tsx` with filters, search, and action handlers.
5. **Analytics Page & Overview Wiring:** Build `app/dashboard/analytics/page.tsx` and connect `app/dashboard/page.tsx` to live data.
