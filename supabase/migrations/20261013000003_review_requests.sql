-- ==============================================================================
-- FLAIRTEK REVIEW AI — REVIEW REQUEST CAMPAIGNS & TRACKING
-- Phase 6: Review Request Automation Schema
-- ==============================================================================

-- 1. Review Campaigns Table
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

-- 2. Review Requests Table
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

-- 3. Enable RLS
ALTER TABLE public.review_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Members can manage review campaigns" ON public.review_campaigns
    FOR ALL USING (public.is_org_member(organization_id));

CREATE POLICY "Members can manage review requests" ON public.review_requests
    FOR ALL USING (public.is_org_member(organization_id));
