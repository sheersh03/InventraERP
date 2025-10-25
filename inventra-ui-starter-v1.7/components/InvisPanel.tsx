'use client';
import { useState } from 'react';
import { classifyToIntent, runIntent } from '@/lib/invis';

export function InvisPanel() {
  const [q, setQ] = useState('');
  const [msgs, setMsgs] = useState<{role:'user'|'invis'; text:string}[]>([]);
  const ctx = { orgId:'demo', userId:'u1', role:'manager' as const };

  const send = async () => {
    if (!q.trim()) return;
    const userMsg = q.trim();
    setMsgs(m => [...m, { role:'user', text:userMsg }]);
    setQ('');

    const intent = classifyToIntent(userMsg);
    if (!intent) {
      setMsgs(m => [...m, { role:'invis', text:'I could not understand that yet — try “Show low stock under 3 days”.' }]);
      return;
    }
    const replies = await runIntent(intent, ctx);
    replies.forEach(r => {
      if (r.kind === 'TEXT') setMsgs(m => [...m, { role:'invis', text:r.text }]);
      if (r.kind === 'SUGGESTION') setMsgs(m => [...m, { role:'invis', text:`💡 ${r.title}${r.details ? ' — ' + r.details : ''}` }]);
      if (r.kind === 'ACTION_DRAFT') setMsgs(m => [...m, { role:'invis', text:`🛠️ ${r.summary}` }]);
      if (r.kind === 'ERROR') setMsgs(m => [...m, { role:'invis', text:`⚠️ ${r.message}` }]);
    });
  };

  return (
    <div className="rounded-2xl p-4 shadow-glass [background:var(--glass-bg)] [border:1px_solid_var(--glass-br)] backdrop-blur-12 h-[520px] flex flex-col">
      <div className="text-sm font-medium mb-2">invis — your AI co-worker</div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {msgs.map((m, i) => (
          <div key={i} className={`${m.role==='user'?'text-textc-primary':'text-textc-secondary'} text-sm`}>
            <span className="text-xs mr-2 opacity-60">{m.role==='user'?'You':'invis'}</span>
            {m.text}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }}
          placeholder="Try: Plan production for next 7 days"
          className="flex-1 rounded-lg border border-borderc-soft bg-bg-elevated px-3 py-2 text-sm outline-none focus:border-borderc-strong" />
        <button onClick={send} className="px-3 py-2 text-sm rounded-md text-white bg-[color:var(--color-brand-solid)]">Send</button>
      </div>
    </div>
  );
}
