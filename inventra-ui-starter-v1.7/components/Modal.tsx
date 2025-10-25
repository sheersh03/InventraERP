'use client';
import { ReactNode } from 'react';
import { GlassPanel } from './GlassPanel';

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: ()=>void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="cmd-overlay water-in" onClick={onClose}>
      <div className="max-w-lg mx-auto mt-24 px-4" onClick={e=>e.stopPropagation()}>
        <GlassPanel>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">{title}</h2>
            <button onClick={onClose} className="text-sm underline">Close</button>
          </div>
          <div className="mt-3">{children}</div>
        </GlassPanel>
      </div>
    </div>
  );
}
