# Security & Compliance: Flairtek Review AI

## 1. Data Isolation
- Strictly enforced PostgreSQL Row Level Security (RLS).
- No hardcoded authorization logic; all policies managed centrally in the database layer.

## 2. Secrets Management
- DO NOT commit secrets to git.
- Use Vercel environment variables for production.
- Use `.env.local` locally (never committed).
- Sensitive tokens are encrypted at rest where the underlying infrastructure allows.

## 3. Webhook Security
- **Razorpay/External Webhooks:** Must verify HMAC signatures using shared secrets. Events are processed idempotently.

## 4. Input Validation
- All inputs (reviews, customer details, settings) are treated as untrusted, validated on both client and server sides.
- AI prompts include instructions to treat review content as data to avoid injection.

## 5. Audit Logging
- Track critical actions (account change, billing update, review publication) in `audit_logs` including `user_id`, `action`, `tenant_id`, and `timestamp`.
