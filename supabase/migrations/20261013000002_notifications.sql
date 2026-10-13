-- ==============================================================================
-- FLAIRTEK REVIEW AI — NOTIFICATIONS TABLE & RLS POLICIES
-- Phase 5: Notifications & Alerts Schema
-- ==============================================================================

-- 1. Notifications Table for Alerts
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('low_rating', 'safety_flag', 'sync_error', 'general')),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
CREATE POLICY "Members can view organization notifications" ON public.notifications
    FOR SELECT USING (public.is_org_member(organization_id));

CREATE POLICY "Members can update notification read status" ON public.notifications
    FOR UPDATE USING (public.is_org_member(organization_id));
