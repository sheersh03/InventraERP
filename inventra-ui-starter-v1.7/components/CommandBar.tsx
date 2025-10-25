'use client';
import { useEffect, useRef, useState } from 'react';
import { GlassPanel } from '@/components/GlassPanel';

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen(true);
        setTimeout(()=>inputRef.current?.focus(), 0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 ai-glow rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-on-primary)] bg-[color:var(--color-brand-solid)] shadow-glass"
        aria-label="Open Command Bar"
      >
        ⌘K Command
      </button>

      {open && (
        <div className="cmd-overlay water-in" onClick={()=>setOpen(false)}>
          <div className="max-w-2xl mx-auto mt-24 px-4" onClick={e=>e.stopPropagation()}>
            <GlassPanel>
              <div className="flex items-center gap-2">
                <input ref={inputRef} placeholder="Ask Inventra… (e.g., 'Reorder 2000kg 30s combed yarn')" className="w-full bg-transparent outline-none text-sm" />
                <span className="kbd">Esc</span>
              </div>
              <div className="mt-3 text-xs text-textc-secondary">Try: “Show production constraints for Friday”</div>
            </GlassPanel>
          </div>
        </div>
      )}
    </>
  );
}
