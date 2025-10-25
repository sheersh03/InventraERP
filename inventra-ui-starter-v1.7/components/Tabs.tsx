'use client';
import { useState } from 'react';

export function Tabs({ tabs }: { tabs: { id: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  return (
    <div>
      <div className="flex gap-2 border-b border-borderc-soft">
        {tabs.map(t => (
          <button key={t.id} onClick={()=>setActive(t.id)} className={`px-3 py-2 text-sm ${active===t.id ? 'border-b-2 border-[color:var(--color-brand-solid)] text-textc-primary' : 'text-textc-secondary'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-3 water-in">
        {tabs.find(t=>t.id===active)?.content}
      </div>
    </div>
  );
}
