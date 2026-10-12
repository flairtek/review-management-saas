# API Integrations: Flairtek Review AI

## 1. Google Business Profile API
- OAuth 2.0 flow for permission granting.
- Scopes: Management of Google Business accounts and reviews.
- Handles review synchronization and publication of replies.

## 2. AI Model Provider
- Decoupled abstraction supporting Anthropic / OpenAI APIs.
- Generates responses with customizable tones, strict safety checks, and anti-injection instructions.

## 3. Razorpay Integration
- Subscriptions and One-time Payments.
- Webhook signature verification (`X-Razorpay-Signature`).
- Idempotent processing of payment events.

## 4. Email & Messaging
- Transactional notifications via Resend / SendGrid.
- WhatsApp automation via authorized business partners.
