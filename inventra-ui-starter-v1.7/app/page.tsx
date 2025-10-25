'use client';
import { AppShell } from "@/components/AppShell";
import { BrandButton } from "@/components/BrandButton";
import { GlassPanel } from "@/components/GlassPanel";
import { CopilotTrigger } from "@/components/CopilotTrigger";
import { StatCard } from "@/components/StatCard";
import { CommandBar } from "@/components/CommandBar";
import { Tabs } from "@/components/Tabs";
import { Badge } from "@/components/Badge";

export default function Page() {
  return (
    <AppShell>
      <header className="flex items-center gap-4 water-in">
        <div className="h-10 w-10 rounded-xl bg-brand-gradient quantum-snap" />
        <div>
          <h1 className="text-xl font-semibold">Inventra Dashboard</h1>
          <p className="text-sm text-textc-secondary">Water + Quantum ERP • AE2 + DV2 • Auto-Adaptive</p>
        </div>
        <div className="flex-1" />
        <CopilotTrigger />
        <BrandButton>New Work Order</BrandButton>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StatCard title="On-hand Yarn" value="18,240 kg" hint="+3% vs last week" />
        <StatCard title="Open Work Orders" value="27" hint="Avg lead time 3.2 days" />
        <StatCard title="OTIF (On-time in full)" value="96.4%" hint="Target ≥ 95%" />
      </section>

      <div className="mt-8">
        <Tabs tabs={[
          { id: 'alerts', label: 'Smart Alerts', content: (
            <GlassPanel>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-medium">Smart Alerts</h2>
                  <p className="text-sm text-textc-secondary mt-1">
                    AI flags inventory risks & production constraints proactively.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge tone="success">Stable</Badge>
                  <Badge tone="warning">2 Warnings</Badge>
                  <Badge tone="error">1 Critical</Badge>
                </div>
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                <li>• Dyeing capacity may bottleneck on Friday. Suggest reschedule lot #A-142.</li>
                <li>• Yarn 30s Combed stock may fall below 3-day cover. Reorder 2,000 kg.</li>
                <li>• Export order INV-094 needs LC document validation by EOD.</li>
              </ul>
            </GlassPanel>
          )},
          { id: 'kpis', label: 'KPIs', content: (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <StatCard title="Capacity Utilization" value="82%" hint="↑ good load" />
              <StatCard title="Rejections (QC)" value="1.1%" hint="↓ trend" />
              <StatCard title="Avg Order Cycle" value="6.8 days" hint="holding" />
              <StatCard title="Backorders" value="3" hint="review dispatch" />
            </div>
          )},
        ]} />
      </div>

      <CommandBar />
    </AppShell>
  );
}
