'use client';

import { createContext, createElement, useContext, useEffect, useState } from 'react';

type TenantCtx = { tenant: string; setTenant: (t:string)=>void };
const Ctx = createContext<TenantCtx | null>(null);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<string>(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('tenant') || 'acme' : 'acme'));
  useEffect(()=>{ try { localStorage.setItem('tenant', tenant); } catch {} }, [tenant]);
  return createElement(Ctx.Provider, { value: { tenant, setTenant } }, children);
}

export function useTenant() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTenant must be inside TenantProvider');
  return v;
}
