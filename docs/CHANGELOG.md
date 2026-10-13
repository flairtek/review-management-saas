# Changelog: Flairtek Review AI

## [Unreleased]
### Phase 8 - SEO, GEO & AEO
- Implemented dynamic Next.js `sitemap.ts` routing for all marketing and authentication pages.
- Configured dynamic crawler rules in `robots.ts` with disallow paths for sensitive dashboard routes.
- Added structured JSON-LD schemas for `SoftwareApplication` and `Organization` to boost rich snippets.
- Integrated Open Graph (`og:*`) and Twitter Cards metadata with canonical base URL in `app/layout.tsx`.
- Formatted crawlable, structured factual data for Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO).
- Added unit tests for sitemap and robots metadata rules.

### Phase 7 - Razorpay Subscriptions & Payments
- Configured plan limits, tiers, and pricing definitions (`Starter`, `Growth`, `Agency`).
- Implemented Razorpay SDK service wrapper with hosted checkout redirect and mock provider.
- Added cryptographic HMAC signature verification for Razorpay webhooks.
- Created Razorpay webhook listener (`/api/webhooks/razorpay`) to synchronize subscription statuses (`active`, `past_due`, `canceled`).
- Implemented `/api/billing/checkout` endpoint to initiate recurring subscription checkouts.
- Built subscription & billing management dashboard (`/dashboard/billing`) with plan cards and status indicators.

### Phase 6 - Review Request Automation
- Implemented review campaigns and requests schema with tenant isolation RLS.
- Added messaging service abstraction for WhatsApp and Email review invitation dispatching.
- Implemented print-ready QR code generation and direct review shortlinks for locations.
- Created public click-tracking redirect route (`/r/[code]`) forwarding to Google review pages.
- Built interactive Review Request Automation dashboard page (`/dashboard/review-requests`).

### Phase 5 - Review Inbox, Alerts & Analytics
- Implemented unified, filterable Review Inbox with live status updates.
- Added Analytics aggregation service (rating trends, response rates, distribution, sentiment).
- Built notification/alerts framework for negative/flagged reviews and sync errors.
- Integrated live analytics and inbox previews into Dashboard Overview.

### Phase 4 - AI Review Reply Engine
- Added provider-agnostic AI layer supporting multiple models with fallbacks and Mock adapter.
- Implemented prompt hardening and injection defense with XML encapsulation.
- Added tone configuration (Professional, Friendly, Warm/Empathetic, Concise, Formal, Custom).
- Built automated safety guardrails flagging sensitive words, legal threats, and low star ratings.
- Implemented orchestration service for drafting and conditional auto-reply publication.
- Added API endpoints for reply generation (`/api/ai/generate`) and location AI settings (`/api/locations/[id]/ai-settings`).
- Created database migration for AI location instructions, token tracking, and safety flags.

### Phase 3 - Google Business Profile Integration
- Completed OAuth 2.0 connection, business location discovery, review synchronization, and reply publishing.

### Phase 2 - Database, Authentication & Multi-Tenant Security
- Configured Supabase Auth and schema with Row Level Security (RLS) policies.

### Phase 1 - Product Design System & UX
- Scaffolded Next.js dashboard shell, Tailwind CSS, shadcn/ui primitives, and public marketing pages.

### Phase 0 - Discovery & Planning
- Initialized project documentation structure.
- Drafted Product Requirements, Architecture, Database Schema, Security, and API Integration specifications.
