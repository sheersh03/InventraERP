import { AppShell } from "@/components/AppShell";
import { InvisPanel } from "@/components/InvisPanel";
import { NotificationsCenter } from "@/components/NotificationsCenter";

export default function InvisPage() {
  return (
    <AppShell>
      <header className="flex items-center gap-3 water-in">
        <h1 className="text-xl font-semibold">invis Copilot</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <InvisPanel />
        </div>
        <NotificationsCenter />
      </div>
    </AppShell>
  );
}
