'use client';

import Cookies from 'js-cookie';

export type Role = 'owner'|'manager'|'finance'|'production'|'worker';

export function getRole(): Role {
  return (Cookies.get('role') as Role) || 'manager';
}
export function setRole(r: Role) {
  Cookies.set('role', r, { path: '/' });
}
