-- Add is_superadmin column to profiles if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_superadmin BOOLEAN DEFAULT FALSE;

-- Create Superadmin RLS Bypass Policies
CREATE POLICY "Superadmins can view all organizations" ON organizations
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_superadmin = true)
    );

CREATE POLICY "Superadmins can view all subscriptions" ON subscriptions
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_superadmin = true)
    );

CREATE POLICY "Superadmins can view all audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_superadmin = true)
    );
