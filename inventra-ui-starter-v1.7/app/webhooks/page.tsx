import { AppShell } from "@/components/AppShell";
import { prisma } from "@/lib/db";

export default async function WebhooksPage() {
  const logs = await prisma.webhookLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });

  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">Webhook Logs</h1>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-borderc-soft bg-bg-elevated p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-textc-secondary">
              <th className="py-2">Time</th>
              <th className="py-2">Source</th>
              <th className="py-2">Event</th>
              <th className="py-2">Payload</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id} className="border-t border-borderc-soft align-top">
                <td className="py-2">{l.createdAt.toISOString?.() || String(l.createdAt)}</td>
                <td className="py-2">{l.source}</td>
                <td className="py-2">{l.event}</td>
                <td className="py-2 whitespace-pre-wrap max-w-[640px]">{l.payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
