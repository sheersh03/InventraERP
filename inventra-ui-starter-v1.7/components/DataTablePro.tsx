'use client';
import { useMemo, useState } from 'react';

type Row = Record<string, any>;
type Column = { key: string; header: string; sortable?: boolean };

export function DataTablePro({ columns, rows, pageSize=8 }: { columns: Column[]; rows: Row[]; pageSize?: number }) {
  const [q, setQ] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return !text ? rows : rows.filter(r => Object.values(r).join(' ').toLowerCase().includes(text));
  }, [q, rows]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const arr = [...filtered];
    arr.sort((a,b) => {
      const va = a[sortKey]; const vb = b[sortKey];
      if (va === vb) return 0;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return sortDir === 'asc' ? -1 : 1;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageRows = sorted.slice((page-1)*pageSize, page*pageSize);

  const onSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key); setSortDir('asc');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          placeholder="Search…"
          className="w-60 rounded-lg border border-borderc-soft bg-bg-elevated px-3 py-2 text-sm outline-none focus:border-borderc-strong"
          value={q} onChange={e=>{ setQ(e.target.value); setPage(1); }}
        />
        <div className="text-xs text-textc-secondary">Rows: {sorted.length}</div>
        <div className="flex-1" />
        <div className="text-xs text-textc-secondary">Page {page}/{totalPages}</div>
        <button className="px-2 py-1 text-sm rounded-md border border-borderc-soft" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
        <button className="px-2 py-1 text-sm rounded-md border border-borderc-soft" disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-textc-secondary">
              {columns.map(col => (
                <th key={col.key} className="py-2 select-none cursor-pointer" onClick={()=> col.sortable && onSort(col.key)}>
                  <span>{col.header}</span>
                  {sortKey === col.key && <span className="ml-1 text-xs">{sortDir==='asc'?'▲':'▼'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r, i) => (
              <tr key={i} className="border-t border-borderc-soft hover:bg-bg-subtle">
                {columns.map(c => <td key={c.key} className="py-2">{String(r[c.key])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
