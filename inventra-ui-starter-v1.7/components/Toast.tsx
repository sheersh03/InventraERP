'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Toast = { id: number; title: string; description?: string; tone?: 'success'|'warning'|'error'|'info' };
const ToastCtx = createContext<{ push:(t:Omit<Toast,'id'>)=>void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((t: Omit<Toast,'id'>) => {
    setToasts(ts => [...ts, { id: Date.now()+Math.random(), ...t }]);
    setTimeout(() => setToasts(ts => ts.slice(1)), 2800);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className="water-in rounded-xl p-3 min-w-[240px] shadow-glass [background:var(--glass-bg)] [border:1px_solid_var(--glass-br)] backdrop-blur-12">
            <div className="text-sm font-medium">{t.title}</div>
            {t.description && <div className="text-xs text-textc-secondary mt-1">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
