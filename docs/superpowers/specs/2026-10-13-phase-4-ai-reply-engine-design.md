# Design Spec: Phase 4 — AI Review Reply Engine

**Project:** Flairtek Review AI  
**Author:** Pair Programming Assistant & Developer  
**Status:** Approved  
**Date:** 2026-10-13  

---

## 1. Overview & Objectives
Phase 4 introduces the AI Review Reply Engine, the core intelligence layer of Flairtek Review AI. It provides:
1. A **Provider-Agnostic LLM Adapter Layer** supporting dynamic runtime selection (Anthropic, OpenAI, or local/mock models).
2. **Context-Aware Prompt Engineering & Injection Hardening** preventing prompt injection via review text.
3. **Multi-Tone Generation & Custom Instructions** allowing businesses to define their brand voice and location-specific constraints.
4. **Sentiment & Risk Guardrails** analyzing review content for sentiment and flagging sensitive/legal/abusive text for human review.
5. **Automation Pipelines** supporting `manual`, `approval-required`, and `auto-reply` modes, integrated seamlessly with Google Review synchronization and reply publishing.

---

## 2. Architecture & Modules

### 2.1 Provider-Agnostic LLM Abstraction (`lib/ai/`)
- `lib/ai/types.ts`: Core interfaces (`AIProvider`, `GenerationRequest`, `GenerationResponse`, `ReviewSentiment`, `SafetyCheckResult`).
- `lib/ai/providers/anthropic.ts`: Anthropic Claude implementation (defaulting to latest models with fallback).
- `lib/ai/providers/openai.ts`: OpenAI GPT-4o implementation.
- `lib/ai/providers/mock.ts`: Deterministic mock provider for local development, CI/CD, and unit testing without active API keys.
- `lib/ai/factory.ts`: Factory resolving the active provider based on environment variables or organization-level overrides.

### 2.2 Prompt Hardening & Guardrails (`lib/ai/prompts.ts`, `lib/ai/guardrails.ts`)
- **System Prompt Framing:** Distinct XML/Markdown framing (`<review_text>...</review_text>`) instructing the model that review content is untrusted user input.
- **Rules Injection:** Injection of business name, business category, location, and explicit business rules (e.g. "Do not offer refunds in replies").
- **Safety Pre-Check / Sentiment Analysis:** Classifies reviews into `positive`, `neutral`, or `negative`, and identifies risk triggers (legal threat, profanity, physical harm, PII disclosure).

### 2.3 Orchestration Engine (`lib/services/ai-reply-engine.ts`)
- `generateReviewReply(reviewId: string, options?: GenerationOptions)`:
  - Fetches review and business location settings.
  - Runs safety and sentiment analysis.
  - Constructs system prompt and generates reply.
  - Stores result in `review_replies` as a draft or publishes automatically if location is set to `auto-reply` and passes safety filters.
- `processIncomingReview(reviewId: string)`:
  - Triggered post-sync from Google Business Profile.
  - Automatically drafts or publishes replies according to the location's `automation_mode`.

---

## 3. Data Model & Schema Updates

### 3.1 Enhancements to `business_locations`
- `ai_custom_instructions TEXT`: Optional freeform instructions (e.g. "Always invite customers back for Sunday Brunch").
- `auto_reply_min_rating INT DEFAULT 4`: Minimum star rating allowed for automated publication without manual review.
- `safety_guardrails_enabled BOOLEAN DEFAULT TRUE`: Whether to bypass auto-reply when negative sentiment or sensitive keywords are detected.

### 3.2 Enhancements to `review_replies`
- `model_used TEXT`: Name/identifier of the model that generated the reply.
- `prompt_tokens INT`: Token usage metrics.
- `completion_tokens INT`: Token usage metrics.
- `safety_flags JSONB`: Any safety warnings generated during evaluation.

---

## 4. API Endpoints

1. `POST /api/ai/generate-reply`:
   - Generates an on-demand draft reply for a given review.
   - Body: `{ reviewId, toneOverride?, customInstructions? }`
2. `POST /api/ai/sentiment-analyze`:
   - Analyzes sentiment and risk flags for a review.
   - Body: `{ reviewId }`
3. `PATCH /api/locations/[id]/ai-settings`:
   - Updates AI tone, custom instructions, automation mode, and minimum rating.

---

## 5. Verification & Testing Plan
- **Unit Tests:** Mock provider tests for injection detection, tone switching, and prompt compilation.
- **Integration Tests:** End-to-end reply drafting and auto-reply pipeline execution.
- **Safety Tests:** Adversarial test cases ensuring prompt injection phrases in reviews do not override system prompts.
