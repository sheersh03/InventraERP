'use client';
import { useState } from 'react';

type Note = { id: number; title: string; detail?: string; link?: string; read?: boolean };

export function NotificationsCenter() {
  const [items, setItems] = useState<Note[]>([
    { id: 1, title: 'Approval needed: PO #1991', detail: 'Value: ₹6,40,000', link: '/approvals' },
    { id: 2, title: 'Stock risk: Yarn 30s', detail: 'Cover 2.8 days — reorder suggested' },
    { id: 3, title: 'Invoice INV-003 overdue', detail: '15 days overdue — send reminder', link: '/sales' }
  ]);

  const markAll = () => setItems(arr => arr.map(i => ({ ...i, read: true })));

  return (
    <div className="rounded-2xl p-4 border border-borderc-soft bg-bg-elevated">
      <div className="flex items-center">
        <div className="text-sm font-medium">Notifications</div>
        <div className="flex-1" />
        <button className="text-xs underline" onClick={markAll}>Mark all read</button>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map(n => (
          <li key={n.id} className={`rounded-md px-3 py-2 ${n.read?'opacity-60':''} border border-borderc-soft`}>
            <div className="text-sm">{n.title}</div>
            {n.detail && <div className="text-xs text-textc-secondary mt-1">{n.detail}</div>}
            {n.link && <a className="text-xs underline" href={n.link}>Open</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}
