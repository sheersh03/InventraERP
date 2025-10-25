'use client';

import { ReactNode, useEffect } from 'react';
import { initTheme } from './theme.client';
import { TenantProvider } from '@/lib/tenant';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => { initTheme(); }, []);
  return <TenantProvider>{children}</TenantProvider>;
}
