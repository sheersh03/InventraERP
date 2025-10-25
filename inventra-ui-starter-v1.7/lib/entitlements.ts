export type Plan = 'starter' | 'growth' | 'enterprise';

export const FEATURES = {
  approvalsAdvanced: { minPlan: 'growth' as Plan, label: 'Advanced Approvals' },
  invisActions:      { minPlan: 'growth' as Plan, label: 'invis Action Execution' },
  webhooks:          { minPlan: 'starter' as Plan, label: 'Webhooks' },
  auditExport:       { minPlan: 'enterprise' as Plan, label: 'Audit Export' },
  realtime:          { minPlan: 'growth' as Plan, label: 'Realtime Collaboration' },
};

export function hasFeature(plan: Plan, featureKey: keyof typeof FEATURES) {
  const order: Plan[] = ['starter','growth','enterprise'];
  return order.indexOf(plan) >= order.indexOf(FEATURES[featureKey].minPlan);
}
