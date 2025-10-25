'use client';
import { AppShell } from "@/components/AppShell";
import { GlassPanel } from "@/components/GlassPanel";
import { BrandButton } from "@/components/BrandButton";

const rows = [
  { sku: "YRN-30S-CMB", name: "Yarn 30s Combed", uom: "kg", onHand: 8240, coverDays: 5.2 },
  { sku: "FAB-KNT-220G", name: "Knit Fabric 220gsm", uom: "m", onHand: 12400, coverDays: 7.1 },
  { sku: "DYE-BLUE-IND", name: "Indigo Blue Dye", uom: "L", onHand: 640, coverDays: 2.8 },
];

export default function InventoryPage() {
  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Inventory Command Center</h1>
        <div className="flex-1" />
        <BrandButton>Receive Stock</BrandButton>
      </header>

      <GlassPanel>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-textc-secondary">
                <th className="py-2">SKU</th>
                <th className="py-2">Item</th>
                <th className="py-2">UoM</th>
                <th className="py-2">On Hand</th>
                <th className="py-2">Cover (days)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sku} className="border-t border-borderc-soft">
                  <td className="py-2">{r.sku}</td>
                  <td className="py-2">{r.name}</td>
                  <td className="py-2">{r.uom}</td>
                  <td className="py-2">{r.onHand.toLocaleString()}</td>
                  <td className="py-2">{r.coverDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </AppShell>
  );
}
