'use client';
import { useTenant } from '@/lib/tenant';

export function OrgSwitcher() {
  const { tenant, setTenant } = useTenant();
  const tenants = ['acme', 'orchid', 'blueweave'];
  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-sm text-textc-secondary">Org:</span>
      <select value={tenant} onChange={e=>setTenant(e.target.value)} className="rounded-md border border-borderc-soft bg-bg-elevated px-2 py-1 text-sm">
        {tenants.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  );
}
