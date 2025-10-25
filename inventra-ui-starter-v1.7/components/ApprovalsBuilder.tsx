'use client';
import { useState } from 'react';

type Step = { id: number; label: string; role: string; condition?: string };

export function ApprovalsBuilder() {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, label: 'Manager Review', role: 'manager' },
    { id: 2, label: 'Finance Approval', role: 'finance', condition: 'value > 500000' },
  ]);

  function addStep() {
    setSteps(s => [...s, { id: Date.now(), label: 'New Step', role: 'manager' }]);
  }

  return (
    <div className="rounded-2xl p-4 border border-borderc-soft bg-bg-elevated">
      <div className="flex items-center">
        <div className="text-sm font-medium">Approval Flow</div>
        <div className="flex-1" />
        <button className="text-xs underline" onClick={addStep}>Add Step</button>
      </div>
      <ol className="mt-3 space-y-3">
        {steps.map((s, i) => (
          <li key={s.id} className="rounded-xl p-3 border border-borderc-soft bg-bg-subtle">
            <div className="text-xs text-textc-muted">Step {i+1}</div>
            <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-2">
              <input defaultValue={s.label} className="rounded-md border border-borderc-soft bg-bg-elevated px-2 py-1 text-sm" />
              <select defaultValue={s.role} className="rounded-md border border-borderc-soft bg-bg-elevated px-2 py-1 text-sm">
                <option value="manager">Manager</option>
                <option value="finance">Finance</option>
                <option value="owner">Owner</option>
                <option value="qc">QC</option>
              </select>
              <input placeholder="Condition (optional)" defaultValue={s.condition || ''} className="rounded-md border border-borderc-soft bg-bg-elevated px-2 py-1 text-sm" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
