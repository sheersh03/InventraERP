'use client';
import { useState } from 'react';
import { Spinner } from '@/components/Spinner';

export function AsyncButton({ onClick, children }: { onClick: ()=>Promise<void> | void; children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const run = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await onClick();
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={run} className="btn-ripple relative inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-brand-gradient transition-all hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B5CCFF] ring-offset-bg-app">
      {loading ? <span className="inline-flex items-center gap-2"><Spinner size={14} /> Working…</span> : children}
    </button>
  );
}
