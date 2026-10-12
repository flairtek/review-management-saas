# Database Schema: Flairtek Review AI

The database is powered by PostgreSQL within Supabase. Every tenant-owned table implements Row Level Security (RLS) to ensure data isolation.

## Core Entities

### Organization & User Management
- `profiles` (User profile details linked to `auth.users`)
- `organizations` (Top-level tenant)
- `organization_members` (Users, roles, and org membership)
- `audit_logs` (System-wide tracked actions)

### Core Integration Data
- `google_connections` (OAuth tokens and connection status)
- `business_locations` (GBP location endpoints and metadata)
- `reviews` (Stored reviews per location)
- `review_replies` (Drafts and published responses)
- `reply_approvals` (Workflow status and approval trails)

### Campaigns & Notifications
- `review_request_campaigns`
- `review_request_events`
- `notification_preferences`
- `notifications`

### Billing & Usage
- `subscription_plans`
- `subscriptions`
- `usage_records`

---

## Example Tenant Policy Implementation
All tenant-owned tables must adhere to this pattern:

```sql
-- Example for table 'reviews'
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reviews in their org" ON reviews
    FOR SELECT 
    USING (organization_id IN (
        SELECT organization_id FROM organization_members 
        WHERE user_id = auth.uid()
    ));
```
*(Detailed schema definition with foreign keys and RLS policies will be maintained in the project's migration files.)*
