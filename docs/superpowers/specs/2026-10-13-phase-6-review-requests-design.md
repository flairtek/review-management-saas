# Design Spec: Phase 6 — Review Request Automation

**Project:** Flairtek Review AI  
**Author:** Pair Programming Assistant & Developer  
**Status:** Approved  
**Date:** 2026-10-13  

---

## 1. Overview & Objectives
Phase 6 introduces automated review request campaigns via Email and WhatsApp to help businesses proactively collect authentic customer feedback and boost Google review volume. It provides:
1. **QR Code & Direct Review Link Generator**: Instantly generate, preview, and download print-ready QR codes and direct Google review shortlinks for each business location.
2. **Multi-Channel Dispatcher (Email & WhatsApp)**: Send automated review requests via Email (Resend/SendGrid abstraction) and WhatsApp (Cloud API/Twilio abstraction), complete with opt-out handling.
3. **Tracking & Conversion Analytics**: Track request delivery status (`sent`, `opened`, `clicked`, `opted_out`) through dedicated public shortlink redirects (`/r/[trackingCode]`).
4. **Dashboard Interface (`app/dashboard/review-requests/page.tsx`)**: Unified management for sending review requests and viewing conversion metrics.

---

## 2. Architecture & Modules

### 2.1 Database Schema Extensions (`supabase/migrations/`)
- `review_campaigns`:
  - `id` (UUID PK), `organization_id` (UUID FK), `location_id` (UUID FK), `name` (TEXT), `channel` (`email` | `whatsapp`), `status` (`draft` | `active` | `completed`), `created_at` (TIMESTAMPTZ).
- `review_requests`:
  - `id` (UUID PK), `organization_id` (UUID FK), `location_id` (UUID FK), `campaign_id` (UUID FK optional), `recipient_name` (TEXT), `recipient_contact` (TEXT — email or phone), `channel` (`email` | `whatsapp`), `tracking_code` (TEXT UNIQUE), `status` (`queued` | `sent` | `opened` | `clicked` | `opted_out`), `sent_at` (TIMESTAMPTZ), `clicked_at` (TIMESTAMPTZ), `created_at` (TIMESTAMPTZ).

### 2.2 Messaging & QR Services (`lib/services/messaging.ts`, `lib/services/qr.ts`)
- `sendReviewRequest(requestId: string)`: Dispatches email or WhatsApp message containing the personalized tracking URL (`https://reviews.flairtek.com/r/[tracking_code]`).
- `generateLocationQRCode(locationId: string)`: Generates data URL or SVG for location review QR codes.

### 2.3 Public Redirection & Tracking (`app/r/[code]/route.ts`)
- Intercepts requests to `/r/[code]`.
- Updates `review_requests` status to `clicked` and records `clicked_at`.
- Redirects the customer to their location's official Google Business Profile write-review URL.

---

## 3. Implementation Plan Summary
1. **Database Migration:** Create `review_campaigns` and `review_requests` tables with indexes and RLS policies.
2. **Messaging & QR Services:** Implement messaging abstraction and QR code generator.
3. **Tracking & Redirect Route:** Implement `/r/[code]` tracking endpoint.
4. **Dashboard Page:** Build `app/dashboard/review-requests/page.tsx` for QR code generation, sending single requests, and viewing conversion metrics.
