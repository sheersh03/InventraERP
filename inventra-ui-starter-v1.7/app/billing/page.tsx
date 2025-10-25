'use client';
import { AppShell } from '@/components/AppShell';
import { GlassPanel } from '@/components/GlassPanel';
import { useTenant } from '@/lib/tenant';
import { useMemo } from 'react';

export default function BillingPage() {
  const { tenant } = useTenant();
  const usage = useMemo(()=> ({
    seats: 8,
    ordersThisMonth: 412,
    storageGb: 3.2
  }), [tenant]);

  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Billing & Plans</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassPanel>
          <div className="text-sm font-medium mb-2">Current Plan</div>
          <div className="text-lg font-semibold">Growth</div>
          <div className="text-sm text-textc-secondary mt-1">₹12,000 / month</div>
          <button className="mt-3 px-3 py-2 text-sm rounded-md border border-borderc-soft">Manage</button>
        </GlassPanel>

        <GlassPanel>
          <div className="text-sm font-medium mb-2">Usage</div>
          <div className="text-sm">Seats: {usage.seats}/20</div>
          <div className="text-sm mt-1">Orders: {usage.ordersThisMonth}/5,000</div>
          <div className="text-sm mt-1">Storage: {usage.storageGb} GB / 50 GB</div>
        </GlassPanel>

        <GlassPanel>
          <div className="text-sm font-medium mb-2">Upgrade</div>
          <ul className="text-sm list-disc pl-5">
            <li>Higher limits</li>
            <li>Priority support</li>
            <li>Advanced approvals</li>
          </ul>
          <button className="mt-3 px-3 py-2 text-sm rounded-md text-white bg-[color:var(--color-brand-solid)]">Upgrade to Enterprise</button>
        </GlassPanel>
      </div>
    </AppShell>
  );
}
