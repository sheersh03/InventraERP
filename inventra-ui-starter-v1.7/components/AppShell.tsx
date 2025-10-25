'use client';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { TopbarSearch } from '@/components/TopbarSearch';
import { OrgSwitcher } from '@/components/OrgSwitcher';
import { AuthRoleSwitcher } from '@/components/AuthRoleSwitcher';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [density, setDensity] = useState<'simple' | 'pro'>('simple');
  const [theme, setTheme] = useState<'light'|'dim'|'dark'>(
    (typeof document !== 'undefined' ? (document.documentElement.getAttribute('data-theme') as any) : 'light')
  );

  useEffect(() => { document.documentElement.setAttribute('data-density', density); }, [density]);
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 text-sm">
        <TopbarSearch />
        <OrgSwitcher />
        <AuthRoleSwitcher />
        <div className="flex-1" />
        <span className="text-textc-secondary">Mode:</span>
        <button onClick={()=>setDensity('simple')} className={`px-2 py-1 rounded-md border ${density==='simple'?'bg-bg-elevated border-borderc-strong':'border-borderc-soft'}`}>Simple</button>
        <button onClick={()=>setDensity('pro')} className={`px-2 py-1 rounded-md border ${density==='pro'?'bg-bg-elevated border-borderc-strong':'border-borderc-soft'}`}>Pro</button>
        <span className="ml-4 text-textc-secondary">Theme:</span>
        <button onClick={()=>setTheme('light')} className="px-2 py-1 rounded-md border border-borderc-soft">Light</button>
        <button onClick={()=>setTheme('dim')} className="px-2 py-1 rounded-md border border-borderc-soft">Dim</button>
        <button onClick={()=>setTheme('dark')} className="px-2 py-1 rounded-md border border-borderc-soft">Dark</button>
      </div>
      <div className="mx-auto max-w-6xl flex gap-6 px-4">
        <Sidebar />
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  );
}
