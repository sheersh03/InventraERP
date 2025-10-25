'use client';
import { AppShell } from '@/components/AppShell';
import { useState } from 'react';

export default function CheckoutPage() {
  const [url, setUrl] = useState<string | null>(null);
  const create = async () => {
    const r = await fetch('/api/billing/checkout', { method: 'POST' });
    const j = await r.json();
    setUrl(j.url);
  };
  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Checkout (Demo)</h1>
      </header>
      <button onClick={create} className="px-3 py-2 text-sm rounded-md text-white bg-[color:var(--color-brand-solid)]">Create Session</button>
      {url && <div className="mt-3 text-sm">Session URL: <a className="underline" href={url}>{url}</a></div>}
    </AppShell>
  );
}
