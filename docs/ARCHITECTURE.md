# Architecture Document: Flairtek Review AI

## 1. System Overview
Flairtek Review AI is built as a modern, cloud-native, multi-tenant SaaS application using a decoupled frontend and backend architecture deployed on Vercel and Supabase.

```
┌─────────────────────────────────────────────────────────────┐
│                       Next.js App Router                    │
│             (Vercel Deployment: reviews.flairtek.com)       │
└──────┬──────────────────────┬──────────────────────┬────────┘
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────┐      ┌───────────────┐      ┌────────────────┐
│ Supabase Auth│      │ Supabase DB   │      │ Supabase Edge  │
│ & OAuth 2.0  │      │ (PostgreSQL & │      │ Functions /    │
│              │      │  RLS Policies)│      │ Scheduled Jobs │
└──────────────┘      └───────────────┘      └────────────────┘
       │                      │                      │
       └──────────────────────┼──────────────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       ▼                      ▼                      ▼
┌──────────────┐      ┌───────────────┐      ┌────────────────┐
│ Google GBP   │      │ AI Providers  │      │ Razorpay       │
│ API          │      │ (Anthropic/   │      │ (Payments &    │
│              │      │  OpenAI)      │      │  Webhooks)     │
└──────────────┘      └───────────────┘      └────────────────┘
```

---

## 2. Technical Stack
- **Frontend:** Next.js 15+ (App Router), React 19, TypeScript (Strict), Tailwind CSS, shadcn/ui components, Lucide icons.
- **Backend Services:** Next.js Server Actions & API Route Handlers, Supabase PostgreSQL, Supabase Auth, Supabase Edge Functions / Deno cron jobs for background synchronization.
- **Payment Gateway:** Razorpay (Subscriptions, Orders, Webhook verification via HMAC SHA256).
- **External APIs:** Google Business Profile API (OAuth 2.0), AI Model Provider API, Email (Resend/SendGrid), WhatsApp Business API.

---

## 3. Multi-Tenancy & Data Isolation Architecture
Tenant isolation is enforced at the database level using Supabase Row Level Security (RLS). Every query executed against tenant-owned tables must be scoped to the authenticated user's organization memberships.

- **Organizations:** Top-level tenant entity.
- **Organization Members:** Junction table linking users to organizations with specific roles (`owner`, `admin`, `manager`, `member`).
- **RLS Policies:** PostgreSQL policies inspect `auth.uid()` and join against `organization_members` to ensure cross-tenant data access is strictly blocked.
