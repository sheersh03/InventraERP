'use client';
import { AppShell } from "@/components/AppShell";
import { GlassPanel } from "@/components/GlassPanel";
import { BrandButton } from "@/components/BrandButton";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { TextInput, Select } from "@/components/Inputs";

const orders = [
  { id: "WO-1001", item: "T-Shirt Black L", qty: 1200, status: "Cutting" },
  { id: "WO-1002", item: "Hoodie Grey M", qty: 600, status: "Stitching" },
  { id: "WO-1003", item: "Polo Navy S", qty: 900, status: "Finishing" }
];

export default function ProductionPage() {
  const [open, setOpen] = useState(false);
  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Production Planning</h1>
        <div className="flex-1" />
        <BrandButton onClick={()=>setOpen(true)}>Create Work Order</BrandButton>
      </header>

      <GlassPanel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {orders.map(o => (
            <div key={o.id} className="rounded-xl p-4 border border-borderc-soft bg-bg-elevated water-in">
              <div className="text-xs text-textc-muted">{o.id}</div>
              <div className="text-base font-medium mt-1">{o.item}</div>
              <div className="text-sm text-textc-secondary mt-1">Qty: {o.qty}</div>
              <div className="mt-2 inline-flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-md bg-[color:var(--color-info)] text-white">{o.status}</span>
                <button className="ml-auto text-xs underline">Open</button>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <Modal open={open} onClose={()=>setOpen(false)} title="New Work Order">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="small text-textc-secondary mb-1">Item</div>
            <TextInput placeholder="e.g., T-Shirt Black L" />
          </div>
          <div>
            <div className="small text-textc-secondary mb-1">Quantity</div>
            <TextInput type="number" placeholder="e.g., 1200" />
          </div>
          <div>
            <div className="small text-textc-secondary mb-1">Process</div>
            <Select>
              <option>Cutting</option>
              <option>Stitching</option>
              <option>Dyeing</option>
              <option>Finishing</option>
            </Select>
          </div>
          <div>
            <div className="small text-textc-secondary mb-1">Due Date</div>
            <TextInput type="date" />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-2 text-sm rounded-md border border-borderc-soft">Cancel</button>
          <button className="px-3 py-2 text-sm rounded-md text-white bg-[color:var(--color-brand-solid)] quantum-snap">Create</button>
        </div>
      </Modal>
    </AppShell>
  );
}
