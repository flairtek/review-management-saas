-- ==============================================================================
-- FLAIRTEK REVIEW AI — INITIAL DATABASE SCHEMA & TENANT ISOLATION (RLS)
-- Phase 2: Database, Authentication, and Multi-Tenant Security
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Organizations Table (Tenants)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    business_type TEXT,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Organization Members Table (Junction with Roles)
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'member')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- 4. Google Connections (OAuth Tokens per Org)
CREATE TABLE IF NOT EXISTS public.google_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    google_account_id TEXT NOT NULL,
    google_email TEXT NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disconnected', 'expired')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Business Locations (Google Business Profile Locations)
CREATE TABLE IF NOT EXISTS public.business_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    google_connection_id UUID REFERENCES public.google_connections(id) ON DELETE SET NULL,
    google_location_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    average_rating NUMERIC(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    ai_tone TEXT DEFAULT 'Professional',
    automation_mode TEXT DEFAULT 'approval-required' CHECK (automation_mode IN ('manual', 'approval-required', 'auto-reply')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES public.business_locations(id) ON DELETE CASCADE,
    external_review_id TEXT UNIQUE NOT NULL,
    author_name TEXT NOT NULL,
    author_photo_url TEXT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    status TEXT DEFAULT 'unanswered' CHECK (status IN ('unanswered', 'drafted', 'published', 'flagged')),
    review_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Review Replies Table
CREATE TABLE IF NOT EXISTS public.review_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    reply_text TEXT NOT NULL,
    tone_used TEXT,
    is_ai_generated BOOLEAN DEFAULT TRUE,
    published_to_google BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Subscriptions & Billing (Razorpay Integration)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID UNIQUE NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    razorpay_subscription_id TEXT UNIQUE,
    plan_tier TEXT NOT NULL CHECK (plan_tier IN ('starter', 'growth', 'agency')),
    status TEXT DEFAULT 'trialing' CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'paused')),
    billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user belongs to an organization
CREATE OR REPLACE FUNCTION public.is_org_member(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE organization_id = org_id AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can manage own profile" ON public.profiles
    FOR ALL USING (auth.uid() = id);

-- Organizations: Members can view their organization
CREATE POLICY "Members can view organization" ON public.organizations
    FOR SELECT USING (public.is_org_member(id));

-- Organization Members: Members can view their team
CREATE POLICY "Members can view team members" ON public.organization_members
    FOR SELECT USING (public.is_org_member(organization_id));

-- Google Connections: Scoped to Org members
CREATE POLICY "Members can view Google connections" ON public.google_connections
    FOR SELECT USING (public.is_org_member(organization_id));

-- Business Locations: Scoped to Org members
CREATE POLICY "Members can view locations" ON public.business_locations
    FOR SELECT USING (public.is_org_member(organization_id));

CREATE POLICY "Admins can manage locations" ON public.business_locations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE organization_id = business_locations.organization_id
              AND user_id = auth.uid()
              AND role IN ('owner', 'admin')
        )
    );

-- Reviews: Scoped to Org members
CREATE POLICY "Members can view reviews" ON public.reviews
    FOR SELECT USING (public.is_org_member(organization_id));

CREATE POLICY "Members can update review status" ON public.reviews
    FOR UPDATE USING (public.is_org_member(organization_id));

-- Review Replies: Scoped to Org members
CREATE POLICY "Members can view and create replies" ON public.review_replies
    FOR ALL USING (public.is_org_member(organization_id));

-- Subscriptions: Scoped to Org members
CREATE POLICY "Members can view subscriptions" ON public.subscriptions
    FOR SELECT USING (public.is_org_member(organization_id));

-- Audit Logs: Scoped to Org members
CREATE POLICY "Members can view audit logs" ON public.audit_logs
    FOR SELECT USING (public.is_org_member(organization_id));
