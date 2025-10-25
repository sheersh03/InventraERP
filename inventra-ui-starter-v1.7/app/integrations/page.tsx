'use client';
import { AppShell } from '@/components/AppShell';
import { GlassPanel } from '@/components/GlassPanel';
import { useState } from 'react';
import { CsvMappingWizard } from '@/components/CsvMappingWizard';

export default function IntegrationsPage() {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Integrations Hub</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassPanel>
          <div className="text-sm font-medium">Tally / CSV Import</div>
          <p className="text-sm text-textc-secondary mt-1">Import inventory & opening balances from CSV.</p>
          <label className="mt-3 inline-block">
            <input type="file" accept=".csv" className="hidden" onChange={e=> setFileName(e.target.files?.[0]?.name || null)} />
            <span className="px-3 py-2 text-sm rounded-md border border-borderc-soft cursor-pointer">Select CSV…</span>
          </label>
          {fileName && <div className="text-xs mt-2">Selected: {fileName}</div>}
        <div className="mt-4"><CsvMappingWizard sampleHeaders={["Item Code","Description","UoM","Qty","CoverDays"]} /></div>
        </GlassPanel>

        <GlassPanel>
          <div className="text-sm font-medium">Webhooks</div>
          <p className="text-sm text-textc-secondary mt-1">Receive events (order.created, invoice.paid…).</p>
          <div className="mt-2 text-xs">POST /api/webhooks/inventra</div>
          <div className="mt-1 text-xs">Stripe: /api/webhooks/stripe</div>
          <button className="mt-3 px-3 py-2 text-sm rounded-md border border-borderc-soft">Send Test Event</button>
        </GlassPanel>
      </div>
    </AppShell>
  );
}
