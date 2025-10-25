'use client';
import { useMemo, useState } from 'react';

type Mapping = Record<string, string>;

export function CsvMappingWizard({ sampleHeaders }: { sampleHeaders: string[] }) {
  const fields = ['sku','name','uom','onHand','coverDays'];
  const [map, setMap] = useState<Mapping>(() => Object.fromEntries(fields.map(f=>[f,''])));

  const canImport = useMemo(()=> fields.every(f=> map[f]), [map]);

  return (
    <div className="rounded-2xl p-4 border border-borderc-soft bg-bg-elevated">
      <div className="text-sm font-medium">Map CSV Columns</div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-2">
        {fields.map(f => (
          <div key={f}>
            <div className="small text-textc-secondary mb-1">{f}</div>
            <select value={map[f]} onChange={e=>setMap(s=>({ ...s, [f]: e.target.value }))}
              className="w-full rounded-md border border-borderc-soft bg-bg-elevated px-2 py-2 text-sm">
              <option value="">— Select —</option>
              {sampleHeaders.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button disabled={!canImport} className="px-3 py-2 text-sm rounded-md border border-borderc-soft disabled:opacity-50">
          Import (Demo)
        </button>
      </div>
    </div>
  );
}
