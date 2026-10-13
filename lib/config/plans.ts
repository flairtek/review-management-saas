export interface PlanDefinition {
  id: 'starter' | 'growth' | 'agency';
  name: string;
  priceINR: number;
  razorpayPlanId: string;
  maxLocations: number;
  features: string[];
}

export const PLANS: Record<string, PlanDefinition> = {
  starter: {
    id: 'starter',
    name: 'Starter Plan',
    priceINR: 1999,
    razorpayPlanId: process.env.RAZORPAY_PLAN_STARTER || 'plan_starter_dummy',
    maxLocations: 1,
    features: ['1 Business Location', 'Manual & Approval AI Replies', 'Standard Review Inbox', 'Email Support'],
  },
  growth: {
    id: 'growth',
    name: 'Growth Plan',
    priceINR: 4999,
    razorpayPlanId: process.env.RAZORPAY_PLAN_GROWTH || 'plan_growth_dummy',
    maxLocations: 5,
    features: ['Up to 5 Business Locations', 'Eligible Auto-Reply Mode', 'Review Request Automation (WhatsApp/Email)', 'Priority Support'],
  },
  agency: {
    id: 'agency',
    name: 'Agency Plan',
    priceINR: 12999,
    razorpayPlanId: process.env.RAZORPAY_PLAN_AGENCY || 'plan_agency_dummy',
    maxLocations: 25,
    features: ['Up to 25 Business Locations', 'Multi-Client Agency Dashboard', 'Custom AI Prompt Rules', 'Dedicated Account Manager'],
  },
};
