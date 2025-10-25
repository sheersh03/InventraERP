'use client';
import { useState } from 'react';

export function TopbarSearch({ onEnter }: { onEnter?: (q:string)=>void }) {
  const [q, setQ] = useState('');
  return (
    <div className="hidden md:flex items-center gap-2 rounded-xl border border-borderc-soft bg-bg-elevated px-3 py-1.5">
      <input
        className="bg-transparent outline-none text-sm w-56"
        placeholder="Search orders, items, customers…"
        value={q}
        onChange={e=>setQ(e.target.value)}
        onKeyDown={e=>{ if(e.key==='Enter'){ onEnter?.(q);} }}
      />
      <span className="kbd">Enter</span>
    </div>
  );
}
