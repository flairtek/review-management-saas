-- ==============================================================================
-- FLAIRTEK REVIEW AI — AI REPLY ENGINE & GUARDRAILS EXTENSIONS
-- Phase 4: Database Migration for AI Settings & Generation Metadata
-- ==============================================================================

-- 1. Extend business_locations with AI custom instructions and auto-reply constraints
ALTER TABLE public.business_locations
ADD COLUMN IF NOT EXISTS ai_custom_instructions TEXT,
ADD COLUMN IF NOT EXISTS auto_reply_min_rating INT DEFAULT 4,
ADD COLUMN IF NOT EXISTS safety_guardrails_enabled BOOLEAN DEFAULT TRUE;

-- 2. Extend review_replies with model metadata, token usage metrics, and safety flags
ALTER TABLE public.review_replies
ADD COLUMN IF NOT EXISTS model_used TEXT,
ADD COLUMN IF NOT EXISTS prompt_tokens INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS completion_tokens INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS safety_flags JSONB DEFAULT '[]'::jsonb;
