'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error('Logout failed with status', response.status);
      }
    } catch (error) {
      console.error('Logout request failed', error);
    } finally {
      setIsLoading(false);
      router.push('/login');
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-sm font-medium text-textc-secondary hover:text-white transition-colors duration-200 ease-[var(--ease-standard)] disabled:opacity-60"
    >
      {isLoading ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
