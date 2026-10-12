# Testing Strategy: Flairtek Review AI

## 1. Test Layers
- **Unit Tests:** Component logic, utility functions, prompt templates.
- **Integration Tests:** Database transactions, RLS policy enforcement, API routes.
- **End-to-End Tests:** Authentication, onboarding wizard, checkout flows, review reply publication.

## 2. Security Testing
- Automated RLS violation checks (verifying cross-tenant queries fail).
- Webhook signature spoofing resistance checks.
