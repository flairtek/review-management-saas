# Changelog: Flairtek Review AI

## [Unreleased]
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
