# Product Requirements Document (PRD): Flairtek Review AI

**Product Name:** Flairtek Review AI  
**Tagline:** Every Review. A Smarter Response.  
**Parent Company:** Flairtek ([https://flairtek.com](https://flairtek.com))  
**Product URL:** `https://reviews.flairtek.com/`  
**Category:** AI Automation, Online Reputation Management, and Customer Feedback Automation  

---

## 1. Executive Summary
Flairtek Review AI is a standalone, multi-tenant SaaS application designed to help businesses manage Google Business Profile (GBP) reviews, generate contextual AI-powered responses, collect authentic customer feedback, monitor sentiment, and automate reporting through an intuitive, non-technical dashboard.

Initially targeted at Indian markets (restaurants, hotels, clinics, real estate, retail, automotive services, and digital agencies) with international scalability, the product operates under strict security, data compliance, and multi-tenant isolation via Supabase RLS.

---

## 2. Target Audience & User Personas
1. **Small Business Owner / Store Manager:** Non-technical, busy, needs quick AI-suggested responses to reviews with minimal clicks or set to safe auto-pilot.
2. **Multi-Location Operations Manager:** Manages several GBP locations, needs consolidated sentiment tracking, aggregated ratings, and team approval workflows.
3. **Digital Marketing Agency:** Manages reviews and reputation on behalf of multiple client organizations under one agency workspace.

---

## 3. Core Functional Requirements

### Phase 1: Marketing & UI Design System
- Clean, premium SaaS aesthetic reflecting Flairtek branding.
- Comprehensive public marketing pages (Home, Features, Pricing, Industries, Integrations, About, Contact, FAQ, Blog, Legal/Privacy/Terms).
- Responsive authenticated dashboard with quick stats (connected locations, new reviews, average rating, response rate, urgent/negative feedback).
- Guided onboarding wizard (Account creation -> Workspace creation -> GBP connection -> Location selection -> AI tone setup -> Automation rule -> Billing/Subscription).

### Phase 2: Database, Auth & Tenant Security
- Supabase Auth (Email/Password, Google OAuth, password reset, session management).
- Multi-tenant data model with normalized tables (`organizations`, `organization_members`, `business_locations`, `reviews`, `review_replies`, `subscriptions`, etc.).
- Strict Row Level Security (RLS) policies enforcing tenant isolation across all tables.
- Role-based permissions: Owner, Admin, Manager, Member.
- Secure token storage & audit logging.

### Phase 3: Google Business Profile (GBP) Integration
- OAuth 2.0 connection flow for Google accounts.
- Fetch authorized business accounts and locations.
- Initial and incremental review synchronization.
- Deduplication, rating normalization, timestamp tracking.
- Secure reply publication back to Google Business Profile API with error handling and retry logic.

### Phase 4: AI Review Reply Engine
- Provider-independent AI abstraction layer.
- Support for tone selection (Professional, Friendly, Warm/Empathetic, Concise, Formal, Custom).
- Prompt hardening against prompt injection contained within reviews.
- Three automation modes: Manual (drafts only), Approval Required (default), and Eligible Auto-Reply (rule-based).
- Safety guardrails flagging sensitive/legal/negative reviews for human review.

### Phase 5: Reviews Inbox, Alerts & Analytics
- Unified inbox with search, pagination, filters (rating, status, location, sentiment), and sorting.
- In-app and email notifications for new reviews, low ratings, failed syncs, and subscription events.
- Analytics dashboard showing rating trends, response time, sentiment distribution, and thematic analysis.
- PDF/CSV scheduled report generation.

### Phase 6: Review Request Automation
- Compliant review request campaigns via Email and WhatsApp (via approved templates).
- QR code generation linking directly to genuine review collection pages.
- Opt-out handling and deduplication respecting review platform guidelines.

### Phase 7: Razorpay Subscriptions & Payments
- INR pricing tiers (Starter, Growth, Agency).
- Monthly and annual billing cycles.
- Secure checkout, order/subscription creation, and HMAC webhook signature verification.
- Grace periods, past-due states, upgrades/downgrades, and invoice history.

### Phase 8: SEO, GEO & AEO
- Traditional SEO metadata, semantic HTML, XML sitemap, robots.txt, Open Graph tags.
- Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) structure for AI search engines.
- Dedicated landing pages for industries and use cases.

### Phase 9: Administrative Console
- Secure internal admin panel for Flairtek staff to manage organizations, monitor subscription health, view usage quotas, inspect failed webhooks, and audit logs.

### Phase 10 & 11: QA, Security, Deployment & Launch
- Automated testing suite (Unit, Integration, RLS, E2E, OAuth).
- Production deployment on Vercel + Supabase with custom domain `reviews.flairtek.com`.
