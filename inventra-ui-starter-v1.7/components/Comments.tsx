'use client';
import { useState } from 'react';

type Comment = { id: number; author: string; text: string; ts: string };
export function CommentsThread({ objectRef }: { objectRef: string }) {
  const [list, setList] = useState<Comment[]>([
    { id: 1, author: 'Riya', text: 'Please verify the supplier rate.', ts: '10:12' },
    { id: 2, author: 'Ankit', text: '@Raj add to approval chain', ts: '10:18' },
  ]);
  const [txt, setTxt] = useState('');

  const add = () => {
    const t = txt.trim(); if (!t) return;
    setList(l => [...l, { id: Date.now(), author: 'You', text: t, ts: new Date().toLocaleTimeString() }]);
    setTxt('');
  };

  return (
    <div className="rounded-2xl p-4 border border-borderc-soft bg-bg-elevated">
      <div className="text-sm font-medium">Comments on {objectRef}</div>
      <ul className="mt-2 space-y-2">
        {list.map(c => (
          <li key={c.id} className="text-sm">
            <span className="text-xs opacity-60 mr-2">{c.author}</span>
            {c.text} <span className="text-xs opacity-50 ml-2">{c.ts}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <input value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Type @ to mention…"
          className="flex-1 rounded-lg border border-borderc-soft bg-bg-elevated px-3 py-2 text-sm outline-none" />
        <button onClick={add} className="px-3 py-2 text-sm rounded-md border border-borderc-soft">Comment</button>
      </div>
    </div>
  );
}
