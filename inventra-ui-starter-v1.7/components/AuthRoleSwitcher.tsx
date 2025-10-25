'use client';
import { getRole, setRole, Role } from '@/lib/auth';
import { useEffect, useState } from 'react';

export function AuthRoleSwitcher() {
  const [role, set] = useState<Role>('manager');
  useEffect(()=>{ set(getRole()); }, []);
  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-sm text-textc-secondary">Role:</span>
      <select
        value={role}
        onChange={e=>{ const r = e.target.value as Role; set(r); setRole(r); }}
        className="rounded-md border border-borderc-soft bg-bg-elevated px-2 py-1 text-sm"
      >
        <option>owner</option>
        <option>manager</option>
        <option>finance</option>
        <option>production</option>
        <option>worker</option>
      </select>
    </div>
  );
}
