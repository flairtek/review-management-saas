# Architecture & Discovery Spec: Flairtek Review AI

**Document:** Phase 0 Architecture Discovery and Baseline Design  
**Status:** Ready for Review  
**Date:** 2026-10-13  

---

## 1. Executive Assessment
- **Repository Status:** Fresh/empty repository ready for clean scaffolding.
- **Node & Tooling:** Node v24.20.0, npm 11.19.0, pnpm 10.27.0, Supabase CLI 2.107.0, Git available.
- **Architectural Approach:** Multi-tenant SaaS with Next.js App Router, Supabase (PostgreSQL, Auth, RLS), Google Business Profile OAuth, Razorpay Subscriptions, and an AI provider abstraction.

---

## 2. Risk Register & Mitigations
| Risk | Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| Google API OAuth verification delays | High | Design mock/sandbox adapters for development while configuring real credentials. |
| Razorpay Webhook delivery failures / tampering | High | Implement strict HMAC verification, idempotent DB operations, and dead-letter event tables. |
| Cross-tenant data leakage | Critical | Enforce Supabase Row Level Security (RLS) policies at the DB layer with automated tenant-leak test suites. |
| Prompt injection via user reviews | Medium | Treat review texts strictly as untrusted input; wrap in clear demarcation tokens in prompts. |

---

## 3. Recommended Phase Progression
1. **Phase 1:** Product Design System & UX (Scaffold Next.js, shadcn/ui, responsive marketing & dashboard layout).
2. **Phase 2:** Database, Authentication & Tenant Security (Supabase schema, Auth, RLS, onboarding).
3. **Phase 3:** Google Business Profile Integration (OAuth, review sync, reply publishing).
4. **Phase 4:** AI-Powered Review Reply Engine.
5. **Phase 5:** Review Inbox, Alerts & Analytics.
6. **Phase 6:** Review Request Automation (Email/WhatsApp/QR).
7. **Phase 7:** Razorpay Subscriptions & Payments.
8. **Phase 8:** SEO, GEO & AEO.
9. **Phase 9:** Administrative Console.
10. **Phase 10:** QA, Security & Performance Verification.
11. **Phase 11:** Deployment & Launch.
