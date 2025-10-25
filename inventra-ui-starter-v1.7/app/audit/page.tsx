'use client';
import { AppShell } from '@/components/AppShell';
import { GlassPanel } from '@/components/GlassPanel';

const rows = [
  { at: '2025-10-01 10:12', actor: 'Riya', action: 'po.create', entity: 'PO', id: '1991' },
  { at: '2025-10-01 10:18', actor: 'Ankit', action: 'comment.add', entity: 'PO', id: '1991' },
  { at: '2025-10-01 10:22', actor: 'Raj', action: 'approval.request', entity: 'PO', id: '1991' },
];

export default function AuditPage() {
  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Audit Trail</h1>
      </header>

      <GlassPanel>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-textc-secondary">
                <th className="py-2">Time</th>
                <th className="py-2">Actor</th>
                <th className="py-2">Action</th>
                <th className="py-2">Entity</th>
                <th className="py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=> (
                <tr key={i} className="border-t border-borderc-soft">
                  <td className="py-2">{r.at}</td>
                  <td className="py-2">{r.actor}</td>
                  <td className="py-2">{r.action}</td>
                  <td className="py-2">{r.entity}</td>
                  <td className="py-2">{r.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </AppShell>
  );
}
