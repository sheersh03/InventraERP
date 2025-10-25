import { AppShell } from "@/components/AppShell";
import { GlassPanel } from "@/components/GlassPanel";
import { ListReveal } from "@/components/ListReveal";
import { AsyncButton } from "@/components/AsyncButton";
import { Tooltip } from "@/components/Tooltip";

async function getOrders() {
  // simulate network work
  await new Promise(res=>setTimeout(res, 1200));
  return [
    { id: "SO-1001", customer: "A-One Exports", items: 12, eta: "3 days" },
    { id: "SO-1002", customer: "Global Apparel", items: 6, eta: "1 day" },
    { id: "SO-1003", customer: "WeaveWorks", items: 18, eta: "5 days" },
    { id: "SO-1004", customer: "Stitch & Co", items: 7, eta: "2 days" },
    { id: "SO-1005", customer: "Prime Garments", items: 11, eta: "4 days" },
    { id: "SO-1006", customer: "CottonHub", items: 9, eta: "2 days" }
  ];
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Orders</h1>
        <div className="flex-1" />
        <Tooltip tip="Creates a simulated order with optimistic UI">
          <AsyncButton onClick={async ()=>{ await new Promise(r=>setTimeout(r, 800)); }}>
            Create Order
          </AsyncButton>
        </Tooltip>
      </header>

      <GlassPanel>
        <ListReveal
          items={orders}
          render={(o) => (
            <div className="rounded-xl p-4 border border-borderc-soft bg-bg-elevated mb-3">
              <div className="text-xs text-textc-muted">{o.id}</div>
              <div className="text-base font-medium mt-1">{o.customer}</div>
              <div className="text-sm text-textc-secondary mt-1">Line Items: {o.items} • ETA: {o.eta}</div>
            </div>
          )}
        />
      </GlassPanel>
    </AppShell>
  );
}
