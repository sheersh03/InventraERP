'use client';
import { AppShell } from "@/components/AppShell";
import { GlassPanel } from "@/components/GlassPanel";
import { DataTablePro } from "@/components/DataTablePro";
import { TextInput, Select } from "@/components/Inputs";
import { BrandButton } from "@/components/BrandButton";
import { ToastProvider, useToast } from "@/components/Toast";
import { useMemo, useState } from "react";

const data = [
  { id: 'INV-001', customer: 'A-One Exports', value: 240000, status: 'Pending' },
  { id: 'INV-002', customer: 'BlueWeave Ltd', value: 540000, status: 'Paid' },
  { id: 'INV-003', customer: 'TexWorld Co', value: 180000, status: 'Overdue' },
  { id: 'INV-004', customer: 'CottonHub', value: 320000, status: 'Pending' },
  { id: 'INV-005', customer: 'Stitch & Co', value: 210000, status: 'Paid' },
  { id: 'INV-006', customer: 'Global Apparel', value: 470000, status: 'Pending' },
  { id: 'INV-007', customer: 'Navy Threads', value: 150000, status: 'Paid' },
  { id: 'INV-008', customer: 'WeaveWorks', value: 390000, status: 'Pending' },
  { id: 'INV-009', customer: 'Prime Garments', value: 285000, status: 'Overdue' },
];

function NewInvoiceForm() {
  const { push } = useToast();
  const [form, setForm] = useState({ customer: '', value: '', status: 'Pending' });
  const [errors, setErrors] = useState<{customer?:string; value?:string}>({});

  const validate = () => {
    const e: any = {};
    if (!form.customer.trim()) e.customer = "Customer is required";
    const v = Number(form.value);
    if (isNaN(v) || v <= 0) e.value = "Value must be a positive number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) { push({ title: "Fix errors", description: "Please correct highlighted fields.", tone: "warning" }); return; }
    push({ title: "Invoice created", description: `${form.customer} • ₹${Number(form.value).toLocaleString()}`, tone: "success" });
    setForm({ customer: '', value: '', status: 'Pending' });
  };

  return (
    <GlassPanel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <div className="small text-textc-secondary mb-1">Customer</div>
          <TextInput
            value={form.customer}
            onChange={e=>setForm(s=>({ ...s, customer: e.target.value }))}
            placeholder="e.g., A-One Exports"
          />
          {errors.customer && <div className="small text-[color:var(--color-error)] mt-1">{errors.customer}</div>}
        </div>
        <div>
          <div className="small text-textc-secondary mb-1">Value (₹)</div>
          <TextInput
            value={form.value}
            onChange={e=>setForm(s=>({ ...s, value: e.target.value }))}
            placeholder="e.g., 250000"
            inputMode="numeric"
          />
          {errors.value && <div className="small text-[color:var(--color-error)] mt-1">{errors.value}</div>}
        </div>
        <div>
          <div className="small text-textc-secondary mb-1">Status</div>
          <Select value={form.status} onChange={e=>setForm(s=>({ ...s, status: e.target.value }))}>
            <option>Pending</option>
            <option>Paid</option>
            <option>Overdue</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <BrandButton onClick={submit}>Create Invoice</BrandButton>
      </div>
    </GlassPanel>
  );
}

export default function SalesPage() {
  const columns = useMemo(() => [
    { key: 'id', header: 'Invoice #', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'value', header: 'Value', sortable: true },
    { key: 'status', header: 'Status', sortable: true },
  ], []);

  return (
    <ToastProvider>
      <AppShell>
        <header className="flex items-center gap-3 water-in">
          <h1 className="text-xl font-semibold">Sales</h1>
        </header>

        <div className="mt-4">
          <DataTablePro columns={columns as any} rows={data as any} pageSize={6} />
        </div>

        <h2 className="text-base font-medium mt-8 mb-2">New Invoice</h2>
        <NewInvoiceForm />
      </AppShell>
    </ToastProvider>
  );
}
