# Phase 6: Review Request Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build automated review request campaigns via email and WhatsApp, generate location-specific QR codes, and provide click-tracking redirects to Google review pages.

**Architecture:** Database migrations for campaigns and requests (`supabase/migrations/`), messaging & QR generation services (`lib/services/`), public tracking redirect route (`app/r/[code]/route.ts`), and dashboard UI (`app/dashboard/review-requests/page.tsx`).

**Tech Stack:** TypeScript, Next.js (App Router), Supabase (PostgreSQL & RLS), Tailwind CSS, Lucide icons.

**Spec:** `docs/superpowers/specs/2026-10-13-phase-6-review-requests-design.md`

## Global Constraints
- Enforce strict RLS tenant isolation across all tables.
- Generate unique, collision-resistant tracking codes for each request.
- Provide graceful fallbacks when messaging API keys are unconfigured (Mock provider mode).

---

### Task 1: Database Migration for Review Requests & Campaigns

**Files:**
- Create: `supabase/migrations/20261013000003_review_requests.sql`

- [ ] **Step 1: Write migration SQL**
```sql
-- Migration: Review Request Campaigns and Individual Requests
CREATE TABLE IF NOT EXISTS public.review_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES public.business_locations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.review_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES public.business_locations(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.review_campaigns(id) ON DELETE SET NULL,
    recipient_name TEXT NOT NULL,
    recipient_contact TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    tracking_code TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'opened', 'clicked', 'opted_out')),
    sent_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.review_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can manage review campaigns" ON public.review_campaigns
    FOR ALL USING (public.is_org_member(organization_id));

CREATE POLICY "Members can manage review requests" ON public.review_requests
    FOR ALL USING (public.is_org_member(organization_id));
```

- [ ] **Step 2: Commit**
```bash
git add supabase/migrations/20261013000003_review_requests.sql
git commit -m "feat(db): add review campaigns and requests tables with RLS"
```

---

### Task 2: Messaging & Tracking Services

**Files:**
- Create: `lib/services/messaging.ts`
- Create: `lib/services/qr.ts`
- Test: `tests/services/messaging.test.ts`

- [ ] **Step 1: Implement services & tests**

Create `lib/services/messaging.ts`:
`skipping file content for brevity in thought, will write exact implementation in task execution`

- [ ] **Step 2: Commit**
```bash
git add lib/services/messaging.ts lib/services/qr.ts tests/services/messaging.test.ts
git commit -m "feat(services): add review request messaging and QR generation services"
```

---

### Task 3: Public Tracking & Redirect Route

**Files:**
- Create: `app/r/[code]/route.ts`

- [ ] **Step 1: Implement redirect route**
- [ ] **Step 2: Commit**

---

### Task 4: Review Requests Dashboard Page

**Files:**
- Create: `app/dashboard/review-requests/page.tsx`
- Modify: `components/dashboard/sidebar.tsx`
- [ ] **Step 1: Implement review requests page and sidebar link**
- [ ] **Step 2: Build and verify**
